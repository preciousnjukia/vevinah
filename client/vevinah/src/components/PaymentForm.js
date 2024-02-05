import React, { useState } from "react";
import { Link , useNavigate, useLocation} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const MpesaPaymentPage = () => {
  const { state } = useLocation(); // Get order details from props
  const order = state;
  console.log("state: " + JSON.stringify(order));


  const initialFormData = {
    phone: "",
    amount: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleContinueClick= ()=>{
  //   navigate("/mpesa_payment", { replace: false, state: order });
  // }
  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true);
    
    fetch("https://chai-veninah.onrender.com/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        setLoading(false);

        if (response.ok) {
          window.alert("Payment made");
          setFormData(initialFormData);
        } else {
          window.alert("Payment processing");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error: ", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="login-dialogue">
        <div className="form-dialogue">
          <form onSubmit={submitForm}>
            <h2>Mpesa Payment</h2>

            <div className="form-itemP">
              <label htmlFor="phone">Phone:</label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-item">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-buttons">
              <button
                type="submit"
                className="continue-shopping"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
              <Link to="/tracking" >
              <button className="continue-shopping">
                Continue
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MpesaPaymentPage;
