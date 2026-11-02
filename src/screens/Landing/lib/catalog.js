// Prix du catalogue iTakecare, lus en direct via le proxy public du site (api-proxy → Leazr),
// le même que celui du configurateur de pack.

const API_URL = import.meta.env.VITE_ITAKECARE_API_URL;
const PRODUCTS_URL = `${API_URL}/functions/v1/api-proxy/itakecare/products`;

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

// 33.95 → « 33,95 »
export const formatMonthly = (price) =>
  price.toLocaleString("fr-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
