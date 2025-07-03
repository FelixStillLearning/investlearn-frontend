import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../../store/slices/paymentSlice';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const DepositForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { clientSecret, loading, error } = useSelector(state => state.payment);

  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Create Payment Intent on your backend
    await dispatch(createPaymentIntent(amount)).unwrap();

    if (clientSecret) {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds, card declined)
        console.error(result.error.message);
        alert(`Payment failed: ${result.error.message}`);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          alert('Payment succeeded!');
          // You might want to redirect or update UI here
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Deposit Funds</h2>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
          Amount (USD)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="1"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Card Details
        </label>
        <CardElement className="p-3 border rounded shadow appearance-none" />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
      >
        {loading ? 'Processing...' : 'Deposit'}
      </button>
      {error.message && <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>}
    </form>
  );
};

export default DepositForm;
