import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import Footer from './Footer';

function CustomerRegister() {
  const navigate = useNavigate();
  const [all, setAll] = useState([]);

  const database = async () => {
     await axios.get(`http://localhost:8001/rest/customer/getCustomer`).then((res)=>{
      console.log(res)
      setAll(res.data);
     }).catch((e)=>{
      console.log(e)
     });
   
  }

  useEffect(() => {
    database();
  }, []);

  const [customer, setCustomer] = useState({
    customerName: "",
    customerEmailID: "",
    customerMobileNumber: "",
    customerAddress: "",
    customerPassword: ""
  });

  const onInputChange = (e) => {
    setCustomer({...customer, [e.target.name]: e.target.value });
  };

  const onPost = async (e) => {
    e.preventDefault();
    const finder = all.find((item) => item.customerEmailID === customer.customerEmailID);
    if (finder && customer.customerEmailID === finder.customerEmailID) {
      Swal.fire({
        title: 'Error!',
        text: 'Email already exists!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      console.log(customer)
      await axios.post("http://localhost:8001/rest/customer/addCustomer", customer);
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully registered!',
        icon: 'uccess',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login-customer");
        }
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Register your Account</h2>
                <form onSubmit={(e) => onPost(e)}>
                  <div className="mb-3" id='textfield'>
                    {/* <FaUser className="form-icon" /> */}
                    <input type="text" className="form-control" placeholder="Enter Name" name="customerName" value={customer.customerName} onChange={(e) => onInputChange(e)} required />
                  </div>
                  <div className="mb-3" id='textfield'>
                    {/* <IoMail className="form-icon" /> */}
                    <input type="email" className="form-control" placeholder="Enter Email" name="customerEmailID" value={customer.customerEmailID} onChange={(e) => onInputChange(e)} required />
                  </div>
                  <div className="mb-3" id='textfield'>
                    {/* <FaMobileAlt className="form-icon" /> */}
                    <input type="text" className="form-control" placeholder="Mobile Number" name="customerMobileNumber" value={customer.customerMobileNumber} onChange={(e) => onInputChange(e)} />
                  </div>
                  <div className="mb-3" id='textfield'>
                    {/* <FaMobileAlt className="form-icon" /> */}
                    <input type="text" className="form-control" placeholder="Enter Address" name="customerAddress" value={customer.customerAddress} onChange={(e) => onInputChange(e)} />
                  </div>
                  <div className="mb-3" id='textfield'>
                    {/* <FaLock className="form-icon" /> */}
                    <input type={showPassword? 'text' : 'password'} className="form-control" placeholder="Enter Password" name="customerPassword" value={customer.customerPassword} onChange={(e) => onInputChange(e)} required />
                    <input type="checkbox" className="mt-2" onClick={() => setShowPassword(!showPassword)} /> Show Password
                  </div>
                  <button type="submit" id='btnR' className="btn btn-primary btn-sm">Register</button>
                </form>
                <p className="mt-3 text-center">Already a member? <Link to="/login-customer">Login Here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
} 

export default CustomerRegister;