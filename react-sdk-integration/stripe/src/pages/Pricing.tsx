import { ChakraProvider } from '@chakra-ui/react'
import { CorrilyProvider } from '@corrily/react-sdk';
import { ProductList } from '../components/ProductList';
import '@corrily/react-sdk/style.css';

// Corrily API Key
const CORRILY_API_KEY = process.env.REACT_APP_CORRILY_API_KEY as string;


export const Pricing = () => {
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
          <CorrilyProvider
            apiKey={CORRILY_API_KEY}
            apiUrl='https://staging.corrily.com/mainapi/'
            params={params}
          >
            <ProductList />
          </CorrilyProvider>
        </ChakraProvider>
      </div>
    </div>
  );
}
