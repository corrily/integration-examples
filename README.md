# Corrily SDK integration examples

**Corrily integration involves two main tasks:**
1. Display prices sourced from Corrily on your pricing page.
2. Connect Corrily to your subscription management platform to feed revenue events for analytics.

👉 This repository provides examples for the first task,
while documentation for the second can be found in Corrily's [integration docs](https://docs.corrily.com/integrations/01_launch-checklist). 

**There are two common methods to display Corrily prices:**
1. Use Corrily's no-code [Paywall Builder](https://docs.corrily.com/paywall-builder/configure) for full control over your pricing page's design and content.
2. Integrate [Corrily API](https://docs.corrily.com/api-reference/calculate-price) to power the content on your existing pricing page without altering your unique design.


## Corrily API Integration
Retrieve user-specific prices by making API requests to Corrily from your back-end.

1. Stripe Golang example ([link](api-integration/stripe-golang))


## Corrily Paywalls Integration (React SDK)
Use the React SDK to render the Corrily Paywall in your application ([Next.js](https://nextjs.org/) recommended).

1. Recurly integration example ([link](react-sdk-integration/recurly))
    - integrate `@corrily/react-sdk` into your pricing page
    - interact with Recurly to do a checkout

2. Stripe integration example ([link](react-sdk-integration/stripe))
    - integrate `@corrily/react-sdk` into your pricing page
    - interact with Stripe to create checkout session
