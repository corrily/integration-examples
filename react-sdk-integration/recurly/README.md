# Integration example | Corrily React SDK + Recurly

## Example illustrates:
- How to render Corrily Paywall with prices and currencies coming from Corrily
- How to create Recurly Subscription on "subscribe" button click


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
    - (Optional) configure Packaging Segmentation
    - (optional) define [Features](https://dashboard.corrily.com/features) and set Feature Values for each Product
    - Create a [Paywall](https://dashboard.corrily.com/paywalls)


### Usage
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
    RECURLY_PUBLIC_KEY=... 
    CORRILY_API_KEY=...
    ```

3. Add `CorrilyProvider`:
    _For authenticated users you should pass their id._

    ```typescript
    const currentUserId = 'test-user-id';
    ..
    <CorrilyProvider
      apiKey={PAYWALL_API_ID}
      params={{
        user_id: currentUserId,
        country: country,
      }}
    >
      ...
    </CorrilyProvider>
    ```

    **PAYWALL_API_ID** you can find in Corrily Dashboard:  
    Dashboard => Paywalls => {Your Paywall} => Publish tab => "API ID" area  

3. Use a Paywall component to render the Paywall:

    ```typescript
    <Paywall />
    ```

4. Integrate Recurly  
    Add necessary dependencies and code changes according to documentation [here]([recurly-react](https://github.com/recurly/react-recurly))  


### Links
 - [recurly-react](https://github.com/recurly/react-recurly)
 - [Paywalls documentation](https://docs.corrily.com/paywall-builder/configure)
 - [Corrily Architecture](https://docs.corrily.com/basics/02_corrily-architecture)
