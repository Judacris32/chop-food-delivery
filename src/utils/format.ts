export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}
export function formatDeliveryTime(min: number, max: number): string {
  return `${min}–${max} min`
}
