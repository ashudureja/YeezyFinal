import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../CartContext/ContextHook';// adjust this path to your actual cart hook

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const Checkout = () => {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Checkout Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 grid gap-4">
      <button
        disabled={loading || items.length === 0}
        onClick={onCheckout}
        className="w-full py-2 px-4 text-lg bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default Checkout;
