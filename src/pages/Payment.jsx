import { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripePromise from '../stripeConfig';

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [appointmentId, setAppointmentId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/payments/create-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appointmentId: appointmentId,
                    amountInCents: Math.round(parseFloat(amount) * 100)
                })
            });

            const clientSecret = await response.text();

            if (!response.ok) {
                setMessage(`Error: ${clientSecret}`);
                setLoading(false);
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (result.error) {
                setMessage(`Payment failed: ${result.error.message}`);
            } else if (result.paymentIntent.status === 'succeeded') {
                setMessage('Payment successful!');
            }
        } catch (error) {
            setMessage('Something went wrong. Is the backend server running?');
        }

        setLoading(false);
    }

    return (
        <div style={{
            minHeight: '90vh',
            backgroundColor: '#F4F9FF',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '50px',
            fontFamily: 'Arial'
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(111, 168, 220, 0.2)',
                width: '400px',
                height: 'fit-content'
            }}>
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '25px' }}>
                    Pay for Appointment
                </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="Appointment ID"
                        value={appointmentId}
                        onChange={(e) => setAppointmentId(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Amount (e.g. 50.00)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <div style={{ ...inputStyle, paddingTop: '14px', paddingBottom: '14px' }}>
                        <CardElement />
                    </div>
                    <button type="submit" disabled={!stripe || loading} style={buttonStyle}>
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
                {message && (
                    <p style={{ textAlign: 'center', color: '#4A90D9', marginTop: '15px' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

function Payment() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #DCEEFA',
    borderRadius: '8px',
    backgroundColor: '#F9FCFF',
    fontSize: '14px',
    boxSizing: 'border-box'
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6FA8DC',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer'
};

export default Payment;