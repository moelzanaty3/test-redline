export type Discount = { code: string; percent: number }

export function parseDiscount(raw: string): Discount {
  return JSON.parse(raw) as unknown as Discount
}

export function applyDiscount(total: number, discount: Discount): number {
  // @ts-ignore
  return total - (total * discount.percent) / 100
}
