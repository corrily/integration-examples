# Getting Started @corrily/react-sdk

### Preparations
You need to create:  
 - products  
 - a package  
 - segmentation for a package  
 - (optional) create features and attach features to products  


### Integration
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
**PAYWALL_API_ID** you can find by path:  
Dashboard => Paywalls => {Your Paywall} => Publish tab => "API ID" area  

3. Use a Paywall component to show the Paywall:

```typescript
<Paywall />
```


### Links
 - [Paywalls documentation](https://docs.corrily.com/paywall-builder/configure)  
