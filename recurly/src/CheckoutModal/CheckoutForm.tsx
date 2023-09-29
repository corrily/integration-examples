import { FormEvent, useRef } from 'react';
import { Button, Flex, Input, useToast } from '@chakra-ui/react';
import { CardElement, useRecurly } from '@recurly/react-recurly';
import { Product } from '@corrily/react-sdk';

// Here you should set a url for an API that will create a subscription
const PURCHASE_API_URL = 'https://backend.com/create-subscription'

export interface CheckoutFormProps {
  product: Product;
  onClose: () => void;
}

export const CheckoutForm = ({product, onClose}: CheckoutFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const recurly = useRecurly();
  const toast = useToast();

  /**
   * This function is called when the user submits the form
   * Here we collect all the data from the form and do:
   * 1. Send a request to Recurly to get a token
   * 2. Send a request with received token to our backend to create a subscription
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current) return;

    recurly.token(formRef.current, async (err, token) => {
      if (err) {
        toast({
          title: 'Error on getting token',
          status: 'error',
        });
        return;
      }

      const response = await fetch(PURCHASE_API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          token: token.id,
        }),
      });
      const result = await response.json();
      console.log(result);
      toast({
        title: 'A subscription has been created',
        status: 'success',
      });
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Flex direction='column' gap={'10px'}>
        <Flex direction='row' gap={'20px'}>
        <Input
          type="text"
          required={true}
          data-recurly="first_name"
          placeholder="First name"
        />
        <Input
          type="text"
          required={true}
          data-recurly="last_name"
          placeholder="Last name"
        />
        </Flex>
        <Flex direction='row' gap={'20px'}>
        <Input
          type="text"
          required={true}
          data-recurly="address"
          placeholder="Address"
        />
        <Input
          type="text"
          required={true}
          data-recurly="address1"
          placeholder="Address 2"
        />
        </Flex>
        <Flex direction='row' gap={'20px'}>
        <Input
          type="text"
          required={true}
          data-recurly="city"
          placeholder="City"
        />
        <Input
          type="text"
          required={true}
          data-recurly="country"
          placeholder="Country"
        />
        </Flex>
        <Flex direction='row' gap={'20px'}>
        <Input
          type="text"
          required={true}
          data-recurly="postal_code"
          placeholder="Postal Code"
        />
        </Flex>
      </Flex>
      
      {/*
        Here we are using CardElement component from @recurly/react-recurly package
        to show the credit card form
      */}
      <CardElement />

      <Flex justify={'flex-end'} direction={'row'} style={{marginTop: 20}}>
        <Button variant='solid' type='submit'>Subscrbie</Button>
      </Flex>
    </form>
  );
}
