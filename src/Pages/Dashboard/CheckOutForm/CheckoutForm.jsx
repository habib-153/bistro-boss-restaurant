import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth()
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState('')
  const [error, setError] = useState()
  const axiosSecure = useAxiosSecure()
  const [cart, refetch] = useCart()
  const price = cart.reduce((total, item) => total + item.price,0)

  useEffect(()=>{
    if(price > 0 ){
      axiosSecure.post('/create-payment-intent', {price: price})
    .then(res =>{
        console.log(res.data)
        setClientSecret(res.data.clientSecret)
    })
    }
  },[axiosSecure, price])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
    })
    if (error) {
        console.log('[error]', error);
        setError(error)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setError('')
      }
    //   confirm payment
    const {paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })
    if(confirmError){
        console.log('Confirm Error')
    }
    else{
        console.log('payment intent', paymentIntent)
        if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id)
            Swal.fire({
                icon: "success",
                title: "Payment Successful",
                showConfirmButton: false,
                timer: 1500
              });
              const payment = {
                email: user.email,
                price: price,
                transactionId: paymentIntent.id,
                date: new Date(),
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.menuId),
                status: 'pending'
              }
              const res = await axiosSecure.post('/payments', payment)
              console.log('payment saved',res)
              refetch()
              navigate('//dashboard/paymentHistory')
        }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-outline btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">{transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
