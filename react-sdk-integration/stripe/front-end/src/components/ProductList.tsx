import { Paywall, Product, useStripe } from '@corrily/react-sdk';

export const ProductList = () => {
  // Assume Purchase is available for authenticated users only
  const userId = "test-user-id";
  const country = "US";

  const handleProductSelected = async (product: Product) => {
    fetch(`http://localhost:4000/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_api_id: product.api_id,
        user_id: userId,
        country: country,
        success_url: "http://localhost:3000/",
        cancel_url: "http://localhost:3000/",
      }),
    })
      .then(async (response) => {
        const res = await response.json();
        window.location.href = res.session_url;
      })
      .catch((err) => {
        console.error('ERROR');
        console.error(err);
      });
  };

  return (
    <Paywall
      onProductSelected={handleProductSelected}
    />
  );
};
