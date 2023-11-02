import {useState} from 'react';
import {ChakraProvider} from '@chakra-ui/react'
import {CorrilyProvider, Paywall, Product} from '@corrily/react-sdk';
import {RecurlyProvider} from '@recurly/react-recurly';
import {CheckoutModal} from './CheckoutModal';
import '@corrily/react-sdk/style.css';

// set here your Recurly public key
const RECURLY_PUBLIC_KEY = process.env.REACT_APP_RECURLY_PUBLIC_KEY as string;

// Corrily API Key
const CORRILY_API_KEY = process.env.REACT_APP_CORRILY_API_KEY as string;


export const Pricing = () => {
  const [isOpenCheckoutForm, setIsOpenCheckoutForm] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  // For authenticated users, provide user_id
  // For unauthenticated, set userId to null
  const userId = 'test-user-id';

  // For authenticated users, provide country User belongs to
  // For unauthenticated, use IP address to let Corrily guess country by IP
  const country = "AE";

  const params = {
    user_id: userId,
    country: country,
  };

  return (
    <div className="App">
      <header className="App-header"></header>

      <div>
        <ChakraProvider>
          <RecurlyProvider publicKey={RECURLY_PUBLIC_KEY}>
            <CorrilyProvider
              apiKey={CORRILY_API_KEY}
              params={params}
            >
              <Paywall
                onProductSelected={(product) => {
                  setProduct(product);
                  setIsOpenCheckoutForm(true);
                }}
              />
              <CheckoutModal
                isOPen={isOpenCheckoutForm}
                onClose={() => setIsOpenCheckoutForm(false)}
                product={product}
              />
            </CorrilyProvider>
          </RecurlyProvider>
        </ChakraProvider>
      </div>
    </div>
  );
}
