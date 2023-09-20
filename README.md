# Getting Started @corrily/react-sdk

### Preparations
1. Corrily account  
2. In Corrily account you should have:
 - products  
 - a package  
 - a segmentation for a package  
 - (optional) create features and attach features to products  
 - a Paywall  
3. Recurly account  
 - Private API key  

### Integration communication schema
<image src="./docs/images/sequence.png" />

### Steps
1. Install @corrily/react-sdk into your frontend:

```bash
npm i --save @corrily/react-sdk

# if you use react version lower than 17.0.2, then you can use a command:

npm i --save @corrily/react-sdk --legacy-peed-deps
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
<Paywall />
```

4. Integrate recurly  
Add necessary dependencies and code changes according to documentation [here]([recurly-react](https://github.com/recurly/react-recurly))  


### Links
 - [Paywalls documentation](https://docs.corrily.com/paywall-builder/configure)  
 - [recurly-react](https://github.com/recurly/react-recurly)  
