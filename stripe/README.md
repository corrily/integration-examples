# Stripe integration example

### Preparations
1. Corrily account  
2. In Corrily account you should have:
 - products  
 - a package  
 - a segmentation for a package  
 - (optional) create features and attach features to products  
 - a Paywall  
3. Stripe account  
 - Stripe API key  
 - Your products must be synchronized with stripe  
 - Stripe API key must be set in the Corrily Dashboard  

### Integration communication schema
<image src="./docs/stripe_integration.png" />

### Steps
1. Install @corrily/react-sdk into your frontend:

```bash
npm i --save @corrily/react-sdk
```

2. Add CorrilyProvider:  
_For authenticated users you should pass their id._  
```typescript
const currentUserId = 'test-user-id';
..
<CorrilyProvider
  apiKey={PAYWALL_API_ID}
  params={{
    user_id: currentUserId,
  }}
>
  ...
</CorrilyProvider>
```
**PAYWALL_API_ID** you can find in Corrily Dashboard:  
Dashboard => Paywalls => {Your Paywall} => Publish tab => "API ID" area  

3. Use a Paywall component to show the Paywall:

```typescript
const { goToCheckoutPage } = useStripe({
  // here you need to pass urls, where user
  // will be redirected in case of successfull payment or error
  onSuccessUrl: 'http://localhost:3000/success',
  onCancelUrl: 'http://localhost:3000/fail',
});

const handleProductSelected = async (product: Product) => {
  // here occurs redirect to Stripe Checkout Page
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
