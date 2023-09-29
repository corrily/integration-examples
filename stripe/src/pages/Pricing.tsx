import { ChakraProvider } from '@chakra-ui/react'
import { CorrilyProvider } from '@corrily/react-sdk';
import { ProductList } from '../components/ProductList';
import '@corrily/react-sdk/style.css';

// set here your Paywall API ID
const PAYWALL_API_ID = '460_355fcaa3-9bdc-4741-9a79-42c1143e7fcc';

export const Pricing = () => {
  // if user is authenticated, pass the user_id
  // otherwise, pass null
  const currentUserId = 'test-user-id';

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <ChakraProvider>
          <CorrilyProvider
            apiKey={PAYWALL_API_ID}
            apiUrl='http://0.0.0.0:8090' // TODO: remove
            params={{
              user_id: currentUserId,
            }}
          >
            <ProductList />
          </CorrilyProvider>
        </ChakraProvider>
      </div>
    </div>
  );
}
