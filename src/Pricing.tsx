import { CorrilyProvider, Paywall } from '@corrily/react-sdk';
import '@corrily/react-sdk/style.css';

const PAYWALL_API_ID = '460_920244bb-7295-4cc1-9fa2-0b602f8593e2';

export const Pricing = () => {
  // if user is authenticated, pass in the user id
  // otherwise, pass in null
  const currentUserId = 'test-user-id';

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <div>
        <CorrilyProvider
          apiKey={PAYWALL_API_ID}
          params={{
            user_id: currentUserId,
          }}
        >
          <Paywall/>
        </CorrilyProvider>
      </div>
    </div>
  );
}
