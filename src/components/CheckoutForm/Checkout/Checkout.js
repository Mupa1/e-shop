import React, { useState } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  // CircularProgress,
  // Divider,
  // Button,
} from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveState] = useState(0);

  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  );

  const Form = () => (activeStep === 0
    ? <AddressForm />
    : <PaymentForm />);

  console.log(setActiveState);

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.Paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={0} className={classes.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
