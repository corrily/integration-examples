import { Elements } from '@recurly/react-recurly';
import { Product } from '@corrily/react-sdk';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { CheckoutForm } from './CheckoutForm';

export interface CheckoutFormProps {
  product: Product | null;
  isOPen: boolean;
  onClose: () => void;
}

export const CheckoutModal = ({isOPen, product, onClose}: CheckoutFormProps) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOPen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton onClick={onClose}/>
        <ModalBody>
          <div>
            <h2>Subscribe to: <b>{product.name}</b></h2>
            <h3 style={{ marginTop: '10px', marginBottom: '10px' }}>
              Price: {product.price} /month
            </h3>
            
            {/*
              Recurly's <Elements> component should wrap <CardElement> component
              We add it here, because useRecurly hook can be used only inside <Elements> component  
            */}
            <Elements>
              <CheckoutForm onClose={onClose} product={product} />
            </Elements>
          </div>
        </ModalBody>
    </ModalContent>
    </Modal>
  );
};
