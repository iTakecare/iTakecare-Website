// Prise de RDV avec un conseiller sur la page de remerciement : créneaux libres et réservation
// via la fonction Leazr `appointment-booking`, avec le jeton de l'offre gardé par submitLead.
// Sans jeton (page rechargée dans un autre onglet, stockage bloqué) ou sans créneau, rien ne s'affiche.

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

export const BookingWidget = ({ category }) => {
  const token = useMemo(readToken, []);
  const [data, setData] = useState(null);
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
  }, [token]);

  const timeZone = data?.timezone || "Europe/Brussels";
  const days = useMemo(() => {
    const byDay = new Map();
    const key = formatter(timeZone, { year: "numeric", month: "2-digit", day: "2-digit" });
    (data?.slots ?? []).forEach((slot) => {
      const k = key.format(new Date(slot.start));
      byDay.set(k, [...(byDay.get(k) ?? []), slot]);
    });
    return [...byDay.entries()].map(([k, slots]) => ({ key: k, slots }));
  }, [data, timeZone]);

  useEffect(() => {
    if (days.length && !days.some((d) => d.key === day)) setDay(days[0].key);
  }, [days]);

  if (!token || !data) return null;

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
        body: JSON.stringify({ token, start: selected }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok || result.appointment) {
        setBooked(result.appointment);
        if (response.ok) track("Schedule", { content_category: category });
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
      <p className="booking-title">Choisissez le moment de notre appel</p>
      <p className="booking-hint">
        {minutes} minutes avec un conseiller, pour faire le point et préparer votre offre. Sans engagement.
      </p>

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
            ? `Confirmer : ${fullLabel.format(new Date(selected))}`
            : "Choisissez un horaire"}
      </button>
    </div>
  );
};
