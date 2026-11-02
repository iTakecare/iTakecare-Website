// Prix du catalogue iTakecare, lus en direct via le proxy public du site (api-proxy → Leazr),
// le même que celui du configurateur de pack.

const API_URL = import.meta.env.VITE_ITAKECARE_API_URL;
const CATALOG_URL = `${API_URL}/functions/v1/api-proxy/itakecare`;
const PRODUCTS_URL = `${CATALOG_URL}/products`;

// Le portable le moins cher du catalogue, toutes variantes confondues : { name, monthlyPrice }.
export const fetchCheapestLaptop = async () => {
  const response = await fetch(`${PRODUCTS_URL}?category=Laptop&limit=100`);
  if (!response.ok) throw new Error(`Catalogue indisponible (${response.status})`);
  const { products = [] } = await response.json();

  let cheapest = null;
  products
    .filter((product) => product.active && !product.admin_only && product.categories?.name === "Laptop")
    .forEach((product) => {
      const prices = [product.monthly_price, ...(product.product_variant_prices ?? []).map((v) => v.monthly_price)];
      prices
        .filter((price) => price > 0)
        .forEach((price) => {
          if (!cheapest || price < cheapest.monthlyPrice) cheapest = { name: product.name.trim(), monthlyPrice: price };
        });
    });
  if (!cheapest) throw new Error("Aucun portable avec une mensualité");
  return cheapest;
};

// Prix affiché d'un pack, même règle que le site : promo en cours, sinon prix du pack, sinon somme des produits.
const effectivePackPrice = (pack) => {
  const now = new Date();
  const promoStarted = !pack.promo_valid_from || now >= new Date(pack.promo_valid_from);
  const promoRunning = !pack.promo_valid_to || now <= new Date(pack.promo_valid_to);
  if (pack.promo_active && pack.pack_promo_price > 0 && promoStarted && promoRunning) return pack.pack_promo_price;
  if (pack.pack_monthly_price > 0) return pack.pack_monthly_price;
  return pack.total_monthly_price;
};

// Packs actifs d'une page partenaire (ex. « prosante ») : { [id Leazr]: { monthlyPrice, url } }.
// L'URL reprend la numérotation des fiches du site : packs actifs, dans l'ordre de l'API (/prosante/pack/0, /1…).
export const fetchPartnerPacks = async (partnerSlug) => {
  const response = await fetch(`${CATALOG_URL}/partners/${partnerSlug}/packs`);
  if (!response.ok) throw new Error(`Packs indisponibles (${response.status})`);
  const { partner_packs: partnerPacks = [] } = await response.json();

  const packs = {};
  partnerPacks
    .filter(({ pack }) => pack && pack.is_active !== false)
    .forEach(({ pack }, index) => {
      const monthlyPrice = effectivePackPrice(pack);
      if (monthlyPrice > 0) {
        packs[pack.id] = { monthlyPrice, url: `https://www.itakecare.be/${partnerSlug}/pack/${index}` };
      }
    });
  return packs;
};

// 33.95 → « 33,95 »
export const formatMonthly = (price) =>
  price.toLocaleString("fr-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
