import { Paywall, Product, useStripe } from '@corrily/react-sdk';

export const ProductList = () => {
  const { goToCheckoutPage } = useStripe({
    onSuccessUrl: 'http://localhost:3000/success',
    onCancelUrl: 'http://localhost:3000/fail',
  });

  const handleProductSelected = async (product: Product) => {
    goToCheckoutPage(product);
  };

  return (
    <Paywall
      onProductSelected={handleProductSelected}
    />
  );
};
