package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/price"
	"github.com/stripe/stripe-go/v72/sub"
)

const corrilyAPI = "https://client.corrily.com/v1/prices"

// Structs for the Corrily request and response
type CorrilyRequestPayload struct {
	UserID   string   `json:"user_id"`
	IP       string   `json:"ip"`
	Country  string   `json:"country"`
	Products []string `json:"products"`
}

type CorrilyProduct struct {
	Price        float64      `json:"price"`
	Integrations Integrations `json:"integrations"`
}

type Integrations struct {
	Stripe StripeDetail `json:"stripe"`
}

type StripeDetail struct {
	Currency string `json:"currency"`
	Amount   int64  `json:"amount"`
}

type UserDetails struct {
	UserID  string
	IP      string
	Country string
}

func main() {
	// Set Stripe API key from environment variable
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
	// Get corrily api key from environment variable
	corrilyAPIKey := os.Getenv("CORRILY_API_KEY")

	userDetails := getUserDetails()

	// Get pricing from Corrily
	payload := getCorrilyRequestPayload(userDetails)
	products, err := getCorrilyPrice(corrilyAPIKey, payload)
	if err != nil {
		log.Fatalf("Failed to fetch pricing from Corrily: %v", err)
	}

	selectedProductCorrilyID := getUserProductSelection(products)
	selectedProductStripeID, productInterval, err := getStripeProductID(selectedProductCorrilyID)
	if err != nil {
		log.Fatalf("No product selected or available for subscription")
	}

	selectedProduct := products[selectedProductCorrilyID]
	currency := selectedProduct.Integrations.Stripe.Currency
	unitAmount := selectedProduct.Integrations.Stripe.Amount

	stripePriceID, err := createOrGetPrice(selectedProductStripeID, unitAmount, currency, productInterval)
	if err != nil {
		log.Printf("Failed to create or get stripe price for product %s: %v", selectedProductStripeID, err)
	}

	stripeCustomerID, err := getStripeCustomerID(userDetails.UserID)
	if err != nil {
		log.Printf("Error retrieving Stripe Customer ID: %v", err)
		return
	}

	if err := createStripeSubscription(stripeCustomerID, stripePriceID); err != nil {
		log.Printf("Failed to create stripe subscription for product %s: %v", selectedProductStripeID, err)
	}
}

func getCorrilyRequestPayload(userDetails UserDetails) CorrilyRequestPayload {
	// For now, these product IDs are hardcoded
	return CorrilyRequestPayload{
		UserID:  userDetails.UserID,
		IP:      userDetails.IP,
		Country: userDetails.Country,
		Products: []string{
			"corrily_product_id1",
			"corrily_product_id2",
		},
	}
}

func getCorrilyPrice(apiKey string, payload CorrilyRequestPayload) (map[string]CorrilyProduct, error) {
	data, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("Error marshalling Corrily payload: %v", err)
	}

	client := &http.Client{}
	req, err := http.NewRequest(http.MethodPost, corrilyAPI, bytes.NewBuffer(data))
	if err != nil {
		return nil, fmt.Errorf("Error creating new request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("x-api-key", apiKey) // Set the x-api-key header using the provided apiKey parameter

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("HTTP request to Corrily failed: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Corrily responded with status code: %d", resp.StatusCode)
	}

	var response struct {
		Products map[string]CorrilyProduct `json:"products"`
	}

	if err = json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return nil, fmt.Errorf("Error decoding Corrily response: %v", err)
	}

	return response.Products, nil
}

func createOrGetPrice(productID string, amount int64, currency string, productInterval string) (string, error) {
	existingPriceID, err := checkPriceExists(productID, amount, currency)
	if err != nil {
		return "", err
	}

	if existingPriceID != "" {
		return existingPriceID, nil
	}

	newPriceID, err := createPrice(productID, amount, currency, productInterval)
	if err != nil {
		return "", err
	}

	return newPriceID, nil
}

func checkPriceExists(productID string, amount int64, currency string) (string, error) {
	priceListParams := &stripe.PriceListParams{Product: stripe.String(productID)}
	pricesIter := price.List(priceListParams)

	stripeCurrency := getStripeCurrency(currency)
	for pricesIter.Next() {
		p := pricesIter.Price()

		if p.UnitAmount == amount && p.Currency == stripeCurrency {
			return p.ID, nil
		}
	}

	if err := pricesIter.Err(); err != nil {
		return "", fmt.Errorf("Error listing prices: %v", err)
	}

	return "", nil
}

func createPrice(productID string, amount int64, currency string, productInterval string) (string, error) {
	newPriceParams := &stripe.PriceParams{
		Product:    &productID,
		UnitAmount: stripe.Int64(amount),
		Currency:   stripe.String(currency),
		Recurring: &stripe.PriceRecurringParams{
			Interval: stripe.String(productInterval),
		},
	}

	newPrice, err := price.New(newPriceParams)
	if err != nil {
		return "", fmt.Errorf("Error creating new price: %v", err)
	}

	return newPrice.ID, nil
}

func createStripeSubscription(customerID string, priceID string) error {
	params := &stripe.SubscriptionParams{
		Customer: stripe.String(customerID),
		Items: []*stripe.SubscriptionItemsParams{
			{Price: stripe.String(priceID)},
		},
		// This is just for demo purpose
		// In real integration, this will be using actual payment id based on user
		// payment method selection
		CollectionMethod: stripe.String("send_invoice"),
		DaysUntilDue:     stripe.Int64(1),
	}

	if _, err := sub.New(params); err != nil {
		return fmt.Errorf("Error creating Stripe subscription: %v", err)
	}

	return nil
}

func getStripeCurrency(currencyCode string) stripe.Currency {
	return stripe.Currency(strings.ToUpper(currencyCode))
}

func getUserProductSelection(products map[string]CorrilyProduct) string {
	// in real world this will be the product user chooses to subscribe to
	// for eg purpose, we are returning the first product emulating user action
	for productID := range products {
		return productID
	}

	return ""
}

func getUserDetails() UserDetails {
	// Example user details; in a real-world scenario, this will be fetched dynamically
	return UserDetails{
		UserID:  "internal_user_id_passed_to_corrily",
		IP:      "192.168.1.1",
		Country: "GB",
	}
}

func getStripeProductID(corrilyProductID string) (string, string, error) {
	// Hardcoded mapping of Corrily product IDs to Stripe product IDs for demo purposes
	productMapping := map[string]struct {
		StripeID string
		Interval string
	}{
		"corrily_product_id1": {"stripe_product_id", "year"},
		"corrily_product_id2": {"stripe_product_id", "month"},
	}

	productData, exists := productMapping[corrilyProductID]
	if !exists {
		return "", "", fmt.Errorf("No Stripe product ID found for Corrily product ID: %s", corrilyProductID)
	}

	return productData.StripeID, productData.Interval, nil
}

func getStripeCustomerID(userID string) (string, error) {
	// Hardcoded mapping of internal user IDs to Stripe customer IDs.
	// In a real application, replace this with the appropriate logic to retrieve your users' Stripe customer IDs.
	customerMapping := map[string]string{
		"internal_user_id_passed_to_corrily": "stripe_customer_id",
	}

	stripeCustomerID, exists := customerMapping[userID]
	if !exists {
		return "", fmt.Errorf("No Stripe customer ID found for internal user ID: %s", userID)
	}

	return stripeCustomerID, nil
}
