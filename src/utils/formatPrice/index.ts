export default function formatPrice(
  price: number | bigint,
  isTotal = false
): string {
  if (!price && !isTotal) {
    return 'FREE'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
