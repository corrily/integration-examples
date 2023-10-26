import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { CorrilyProvider, Paywall, Product } from '@corrily/react-sdk';
import { RecurlyProvider } from '@recurly/react-recurly';
import { CheckoutModal } from './CheckoutModal';
import '@corrily/react-sdk/style.css';

// set here your Recurly public key
const RECURLY_PUBLIC_KEY = 'ewr1-..............fs8fm0';

// set here your Paywall API ID
const PAYWALL_API_ID = '460_920244bb-...-0b602f8593e2';


export const Pricing = () => {
  const [isOpenCheckoutForm, setIsOpenCheckoutForm] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  // if user is authenticated, pass the user_id
  // otherwise, pass null
  const currentUserId = 'test-user-id';

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <div>
        <ChakraProvider>
          <RecurlyProvider publicKey={RECURLY_PUBLIC_KEY}>
            <CorrilyProvider
              apiKey={PAYWALL_API_ID}
              params={{
                user_id: currentUserId,
              }}
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
