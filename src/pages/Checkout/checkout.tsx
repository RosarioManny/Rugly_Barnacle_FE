import { useStripe } from "@stripe/react-stripe-js";

export const Checkout = () => {
  const stripe = useStripe()
  console.log(stripe)
  return (
    <main className="min-h-screen bg-fleece">
      Checkout
    </main>
  );
};