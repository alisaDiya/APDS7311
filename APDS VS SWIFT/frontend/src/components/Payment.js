import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Payment.css';

const Payment = ({ token }) => {
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    bankName: '',
    routingNumber: '',
  });
  const [amount, setAmount] = useState('');
  const [payments, setPayments] = useState([]);

  let userInfo = null;
  if (token) {
    userInfo = jwtDecode(token);
  }

  const isAdmin = userInfo && userInfo.role === 'admin';

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://localhost:3000/api/payments',
        { bankDetails, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Payment created successfully');
      fetchPayments();
    } catch (error) {
      console.error('Error making payment:', error);

      let errorMessage = 'Error making payment.';

      if (error.response && error.response.data.errors) {
        const validationErrors = error.response.data.errors
          .map((err) => err.message || err.msg)
          .join('\n');
        errorMessage += `\n\nValidation Errors:\n${validationErrors}`;
      }

      alert(errorMessage);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('https://localhost:3000/api/payments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data.payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      alert('Error fetching payments');
    }
  };

  const markAsComplete = async (paymentId) => {
    try {
      await axios.put(
        `https://localhost:3000/api/payments/${paymentId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Payment marked as complete');
      fetchPayments();
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Error updating payment');
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="payment-container">
      <div className="payment-form-section">
        <h2>Make a Payment</h2>
        <form className="payment-form" onSubmit={handlePayment}>
          <div className="form-group">
            <label>Account Number:</label>
            <input
              type="text"
              value={bankDetails.accountNumber}
              onChange={(e) =>
                setBankDetails({ ...bankDetails, accountNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Bank Name:</label>
            <input
              type="text"
              value={bankDetails.bankName}
              onChange={(e) =>
                setBankDetails({ ...bankDetails, bankName: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Routing Number:</label>
            <input
              type="text"
              value={bankDetails.routingNumber}
              onChange={(e) =>
                setBankDetails({ ...bankDetails, routingNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button className="submit-payment-btn" type="submit">Submit Payment</button>
        </form>
      </div>

      <div className="payment-form-section">
        <h2>Payment History</h2>
        <table className="payment-table">
          <thead>
            <tr>
              {isAdmin && <th>User</th>}
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                {isAdmin && <td>{payment.user.username}</td>}
                <td>${payment.amount}</td>
                <td>
                  <span className={`status-badge status-${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                {isAdmin && payment.status !== 'completed' && (
                  <td>
                    <button className="complete-btn" onClick={() => markAsComplete(payment._id)}>
                      Mark as Complete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
