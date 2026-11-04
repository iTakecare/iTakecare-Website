// Prise de RDV avec un conseiller, par téléphone ou en visio au choix du prospect : créneaux libres
// et réservation via la fonction Leazr `appointment-booking`, avec le jeton de l'offre gardé par submitLead.
// Affichée en dernière étape (facultative) des formulaires (BookingStep), puis sur la page de remerciement.
// Sans jeton (page rechargée dans un autre onglet, stockage bloqué) ou sans créneau, rien ne s'affiche
// et `onUnavailable` est appelé.

import React, { useEffect, useMemo, useState } from "react";
import { BOOKING_TOKEN_KEY, track } from "../lib/leads";
import "./BookingWidget.css";

const API_URL = `${import.meta.env.VITE_LEAZR_API_URL || "https://api.leazr.co"}/functions/v1/appointment-booking`;

const readToken = () => {
  try {
    return sessionStorage.getItem(BOOKING_TOKEN_KEY);
  } catch {
    return null;
  }
};

const formatter = (timeZone, options) => new Intl.DateTimeFormat("fr-BE", { timeZone, ...options });

const MODES = [
  { value: "phone", label: "Par téléphone", detail: "Votre conseiller vous appelle" },
  { value: "video", label: "En visio", detail: "Lien envoyé par e-mail" },
];

export const BookingWidget = ({ category, title = "Choisissez le moment de notre échange", onBooked, onUnavailable }) => {
  const token = useMemo(readToken, []);
  const [data, setData] = useState(undefined);
  const [mode, setMode] = useState("phone");
  const [day, setDay] = useState(null);
  const [selected, setSelected] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [booked, setBooked] = useState(null);

  const load = () =>
    fetch(`${API_URL}?token=${encodeURIComponent(token)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        setData(result);
        if (result?.appointment) setBooked(result.appointment);
      })
      .catch(() => setData(null));

  useEffect(() => {
    if (token) load();
    else onUnavailable?.();
  }, [token]);

  useEffect(() => {
    if (data === null || (data && !data.appointment && !data.slots?.length)) onUnavailable?.();
  }, [data]);

  const timeZone = data?.timezone || "Europe/Brussels";
  // Modes proposés par les conseillers (chaque créneau porte les siens) ; le choix n'apparaît que s'il y en a deux.
  const modes = MODES.filter((m) => (data?.slots ?? []).some((slot) => (slot.modes ?? ["phone"]).includes(m.value)));
  const activeMode = modes.some((m) => m.value === mode) ? mode : (modes[0]?.value ?? "phone");
  const days = useMemo(() => {
    const byDay = new Map();
    const key = formatter(timeZone, { year: "numeric", month: "2-digit", day: "2-digit" });
    (data?.slots ?? []).filter((slot) => (slot.modes ?? ["phone"]).includes(activeMode)).forEach((slot) => {
      const k = key.format(new Date(slot.start));
      byDay.set(k, [...(byDay.get(k) ?? []), slot]);
    });
    return [...byDay.entries()].map(([k, slots]) => ({ key: k, slots }));
  }, [data, timeZone, activeMode]);

  useEffect(() => {
    if (days.length && !days.some((d) => d.key === day)) setDay(days[0].key);
  }, [days]);

  if (!token || data === null) return null;
  if (data === undefined) return <p className="booking-loading">Recherche des créneaux libres…</p>;

  const dayLabel = formatter(timeZone, { weekday: "short", day: "numeric", month: "short" });
  const timeLabel = formatter(timeZone, { hour: "2-digit", minute: "2-digit" });
  const fullLabel = formatter(timeZone, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

  if (booked) {
    return (
      <div className="booking-widget booking-done" role="status">
        <p className="booking-title">Rendez-vous confirmé</p>
        <p>
          <strong>{fullLabel.format(new Date(booked.start))}</strong>
          {booked.advisor_first_name ? ` avec ${booked.advisor_first_name}` : ""}
          {booked.meeting_mode === "video" ? ", en visio." : ", par téléphone : nous vous appelons."}
        </p>
        <p className="booking-hint">L’invitation vient d’arriver par e-mail : elle ajoute le rendez-vous à votre agenda.</p>
      </div>
    );
  }

  if (!days.length) return null;

  const book = async () => {
    if (!selected) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, start: selected, meeting_mode: activeMode }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok || result.appointment) {
        setBooked(result.appointment);
        if (response.ok) track("Schedule", { content_category: category });
        onBooked?.();
        return;
      }
      setError(result.error || "La réservation n’a pas abouti. Réessayez ou attendez notre appel.");
      setSelected(null);
      load();
    } catch {
      setError("Connexion impossible. Réessayez dans un instant.");
    } finally {
      setSending(false);
    }
  };

  const current = days.find((d) => d.key === day) ?? days[0];
  const minutes = current.slots[0]?.minutes ?? 15;

  return (
    <div className="booking-widget">
      <p className="booking-title">{title}</p>
      <p className="booking-hint">
        {minutes} minutes avec un conseiller, pour faire le point et préparer votre offre. Sans engagement.
      </p>

      {modes.length > 1 && (
        <div className="booking-modes" role="radiogroup" aria-label="Type de rendez-vous">
          {modes.map((m) => (
            <button
              key={m.value}
              type="button"
              role="radio"
              aria-checked={activeMode === m.value}
              className={activeMode === m.value ? "is-active" : ""}
              onClick={() => {
                setMode(m.value);
                setSelected(null);
              }}
            >
              <strong>{m.label}</strong>
              <small>{m.detail}</small>
            </button>
          ))}
        </div>
      )}

      <div className="booking-days" role="tablist" aria-label="Jour du rendez-vous">
        {days.map((d) => (
          <button
            key={d.key}
            type="button"
            role="tab"
            aria-selected={d.key === current.key}
            className={d.key === current.key ? "is-active" : ""}
            onClick={() => {
              setDay(d.key);
              setSelected(null);
            }}
          >
            {dayLabel.format(new Date(d.slots[0].start))}
          </button>
        ))}
      </div>

      <div className="booking-times">
        {current.slots.map((slot) => (
          <button
            key={slot.start}
            type="button"
            aria-pressed={selected === slot.start}
            className={selected === slot.start ? "is-active" : ""}
            onClick={() => setSelected(slot.start)}
          >
            {timeLabel.format(new Date(slot.start))}
          </button>
        ))}
      </div>

      {error && <p className="booking-error" role="alert">{error}</p>}

      <button type="button" className="booking-confirm" disabled={!selected || sending} onClick={book}>
        {sending
          ? "Réservation…"
          : selected
            ? `Confirmer : ${fullLabel.format(new Date(selected))}${activeMode === "video" ? ", en visio" : ""}`
            : "Choisissez un horaire"}
      </button>
    </div>
  );
};

// Dernière étape des formulaires, après l'envoi du lead : réserver tout de suite ou passer.
// `onFinish` mène à la page de remerciement (qui affiche le RDV s'il a été pris).
export const BookingStep = ({ category, onFinish }) => (
  <div className="booking-step">
    <div className="form-top">
      <span>ÉTAPE 4 SUR 4 · FACULTATIVE</span>
      <span>Votre rendez-vous</span>
    </div>
    <div className="progress" aria-hidden="true">
      <span style={{ width: "100%" }} />
    </div>
    <fieldset>
      <legend>Demande envoyée ! On se parle quand ?</legend>
      <p className="form-hint">Réservez un créneau maintenant, ou laissez votre conseiller vous rappeler sous 24 h.</p>
      <BookingWidget category={category} title="Votre rendez-vous" onBooked={onFinish} onUnavailable={onFinish} />
    </fieldset>
    <div className="form-controls">
      <button type="button" className="back-button" onClick={onFinish}>
        Je préfère être rappelé·e →
      </button>
    </div>
  </div>
);
