## Stripe-Corrily Integration Guide

### **Introduction**

This Go application demonstrates the integration of the Corrily dynamic pricing platform with Stripe for payment processing.
This demo serves illustrative purposes and requires further refinements for production use.

### **Setup**

1. **Requirements**:
   - Go (latest version).
   - Stripe and Corrily accounts.

2. **Dependency Installation**:
   ```
   go get -u github.com/stripe/stripe-go/v72
   ```

3. **Environment Setup**:
STRIPE_SECRET_KEY: Your Stripe secret.
CORRILY_API_KEY: Your Corrily key.
Export these in your environment or adjust the code to include them.

4. **Execution**:
    ```
    go run main.go
    ```

## Assumptions

- **Corrily Product to Stripe Product Mapping**:
  The application contains a hardcoded mapping between Corrily product IDs and Stripe product IDs. For example, `"corrily_product_id1": {"stripe_product_id", "year"}`. Ensure you adjust or expand this mapping according to your requirements.

- **User-to-Stripe Customer Mapping**:
  A static map exists within the application correlating internal user IDs to Stripe customer IDs. In the demo, it's represented as `"internal_user_id_passed_to_corrily": "stripe_customer_id"`.
  In a real-world deployment, this mapping would likely be fetched dynamically or be a part of your database logic.

- **User Details**:
  The application uses sample user details for demonstration purposes, defined as `"internal_user_id_passed_to_corrily", "192.168.1.1", "GB"`. 
  Ensure you update and fetch these values based on actual user data in your application context.

- **User payment method**:
    In real integration, real payment method will be used instead of the one used here
    
