import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  checkoutToken, backStep, shippingData, onCaptureCheckout, nextStep, timeout,
}) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      // eslint-disable-next-line consistent-return
      return error;
    }
    const orderData = {
      line_item: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: 'Primary',
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.subdivision,
        postal_zip_code: shippingData.Zip,
        country: shippingData.shippingCountry,
      },
      fullfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id,
        },
      },
    };

    onCaptureCheckout(checkoutToken.id, orderData);

    timeout();

    nextStep();
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                  Pay
                  {' '}
                  { checkoutToken.live.subtotal.formatted_with_symbol }
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

PaymentForm.propTypes = {
  checkoutToken: PropTypes.instanceOf(Object).isRequired,
  shippingData: PropTypes.instanceOf(Object).isRequired,
  backStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  onCaptureCheckout: PropTypes.instanceOf(Object).isRequired,
  timeout: PropTypes.func.isRequired,
};

export default PaymentForm;
