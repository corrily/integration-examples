# Integration example | Corrily React SDK + Stripe

## Example illustrates:
- How to render Corrily Paywall with prices and currencies coming from Corrily
- How to create Stripe Checkout Flow on "subscribe" button click


## Communication Schema
<image src="./docs/stripe-control-flow.jpg" />


## Prerequisites
1. Create Corrily account
2. Create Stripe account
3. Integrate Stripe & Corrily
    - [Connect](https://dashboard.corrily.com/integrations) Stripe to Corrily  
    - (Optional) Import Stripe Products into Corrily using [Import Wizard](https://dashboard.corrily.com/products)
4. Configure Corrily Catalog:
    - Manually define [Products](https://dashboard.corrily.com/products) if they weren't imported
    - Group a products together under a [Package](https://dashboard.corrily.com/packages)
    - (Optional) configure Packaging Segmentation
    - (optional) define [Features](https://dashboard.corrily.com/features) and set Feature Values for each Product
    - Create a [Paywall](https://dashboard.corrily.com/paywalls)


## Usage
1. Install `@corrily/react-sdk` package:

    ```bash
    npm i --save @corrily/react-sdk
    ```

    For React version lower, than 17.0.2:
    ```bash
    npm i --save @corrily/react-sdk --legacy-peed-deps
    ```

2. Get Corrily API Key from [Resources page](https://dashboard.corrily.com/resources) and store it in `.env.local`:
    ```
    REACT_APP_CORRILY_API_KEY=...
    ```

3. Add `CorrilyProvider`:
    _For authenticated users you should determine their id and country._

    ```typescript
    const CORRILY_API_KEY = process.env.REACT_APP_CORRILY_API_KEY as string;
 
    const userId = 'test-user-id';
    const country = 'US';

    const params = {
      user_id: userId,
      country: country,
    };

    <CorrilyProvider
      apiKey={CORRILY_API_KEY}
      params={params}
    >
      ...
    </CorrilyProvider>
    ```

3. Use a Paywall component to render the Paywall:

    ```typescript
    const { goToCheckoutPage } = useStripe({
      // Pass payment success and failure redirect URLs here
      onSuccessUrl: 'http://localhost:3000/success',
      onCancelUrl: 'http://localhost:3000/fail',
    });

    const handleProductSelected = async (product: Product) => {
      // Redirect to Stripe Checkout Page
      goToCheckoutPage(product);
    };

    return (
      <Paywall
        onProductSelected={handleProductSelected}
      />
    );
    ```


### Links
 - [Paywalls documentation](https://docs.corrily.com/paywall-builder/configure)  
 - [Corrily Architecture](https://docs.corrily.com/basics/02_corrily-architecture)  
