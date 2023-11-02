# Integration example | Corrily React SDK + Recurly

## Example contains:
- Front-end React code illustrating how to render Corrily Paywall with prices and currencies coming from Corrily
- Back-end NodeJS server code with an example creating Recurly Subscription with Corrily prices.


## Communication Schema
<image src="./docs/recurly-control-flow.jpg" />


### Prerequisites
1. Create Corrily account
2. Create Recurly account
3. Integrate Recurly & Corrily
    - Generate Recurly Private API key
    - Recurly API Key on [integrations page](https://dashboard.corrily.com/integrations)  
    - (Optional) Import Recurly Plans into Corrily using [Import Wizard](https://dashboard.corrily.com/products)
4. Configure Corrily Catalog:
    - Manually define [Products](https://dashboard.corrily.com/products) if they weren't imported
    - Group a products together under a [Package](https://dashboard.corrily.com/packages)
    - (optional) define [Features](https://dashboard.corrily.com/features) and set Feature Values for each Product
    - Create a [Paywall](https://dashboard.corrily.com/paywalls) with type: `Pricing Page`, channel: `web` and selected package.


## Usage

### Front-end

1. Install `@corrily/react-sdk` package:

    ```bash
    cd front-end
    npm i --save @corrily/react-sdk
    ```

    For React version lower, than 17.0.2:
    ```bash
    npm i --save @corrily/react-sdk --legacy-peed-deps
    ```

2. Get Corrily API Key from [Resources page](https://dashboard.corrily.com/resources) and store it in `.env.local`:
    ``` 
    CORRILY_API_KEY=...
    ```

3. Generate Recurly Public Key on [Recurly API Credentials page](https://corrily.recurly.com/integrations/api_keys):
    ```
    RECURLY_PUBLIC_KEY=...
    ```

4. Configure `CorrilyProvider`:
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

5. Define "on-click" behaviour for selected product in `ProductList.tsx`.

       _Typically you would either redirect to signup page, or to send API call to your back-end to create Stripe Checkokut Session._

       ```typescript
       const handleProductSelected = async (product: Product) => {
         ...
       };
       ```

### Back-end

1. Install [stripe-node](https://github.com/stripe/stripe-node) package and the others:

    ```bash
    cd server
    npm i
    npm i --save stripe
    ```

2. Generate Recurly Private Key on [Recurly API Credentials page](https://corrily.recurly.com/integrations/api_keys):
    ```
    RECURLY_PRIVATE_KEY=...
    ```

3. Get Corrily API Key from [Resources page](https://dashboard.corrily.com/resources) and store it in `.env`:
    ```
    CORRILY_API_KEY=...
    ```

4. Run NodeJS server:

    ```bash
    node app.js
    ```

⚠️ Note, that we provide `price_data` to Stripe Checkout Session API call.
That allows us to pass any custome price and currency coming from Corrily API.

```javascript
line_items: [{
  price_data: {
    currency: currency,
    product: stripeProductId,
    unit_amount: amount,
    recurring: {
      interval: stripeInterval,
      interval_count: stripeIntervalCount,
    },
  },
  quantity: 1,
}],
```

Read more in [Stripe API docs](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-line_items-price_data-product_data)

### Links
 - [recurly-react](https://github.com/recurly/react-recurly)
 - [Paywalls documentation](https://docs.corrily.com/paywall-builder/configure)
 - [Corrily Architecture](https://docs.corrily.com/basics/02_corrily-architecture)
