/**
 * Format price in COP (Colombian Peso).
 * Input: integer in COP (e.g. 129000)
 * Output: "COP 129.000"
 */
export function formatPriceCOP(price: number): string {
  return `COP ${price.toLocaleString("es-CO")}`;
}
