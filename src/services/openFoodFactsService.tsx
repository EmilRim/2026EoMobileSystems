export async function fetchProductByBarcode(barcode: string) {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );

  if (!response.ok) {
    return null;
  }

  const json = await response.json();

  if (json.status !== 1) {
    return null;
  }

  return {
    name: json.product?.product_name ?? "",
    brand: json.product?.brands ?? "",
  };
}