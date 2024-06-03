import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMail } from "react-icons/io5";
import { FaMobileAlt, FaUser, FaLock } from "react-icons/fa";
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import Footer from './Footer';

function Register() {
  const navigate = useNavigate();
  const [all, setAll] = useState([]);

  const database = async () => {
    await axios.get(`http://localhost:8001/rest/art/getArtist`).then((res) => {
      console.log(res)
      setAll(res.data);
    }).catch((e) => {
      console.log(e)
    });

  }

  useEffect(() => {
    database();
  }, []);

  const [user, setUser] = useState({
    artistName: "",
    artistBio: "",
    artistEmailID: "",
    artistMobileNumber: "",
    artistAddress: "",
    password: ""
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onPost = async (e) => {
    e.preventDefault();
    const finder = all.find((item) => item.artistEmailID === user.artistEmailID);
    if ( finder && user.artistEmailID === finder.artistEmailID ) {
      Swal.fire({
        title: 'Error!',
        text: 'Email already exists!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log('Form submitted successfully!');
      
    } else {
      
      console.log(user)
      await axios.post("http://localhost:8001/rest/art/addArtist", user);
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully registered!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Login");
        }
      });
      
    }
  };

  const validateForm = () => {
    const isValidMobileNumber = user.artistMobileNumber.trim().length <= 10; // Check if mobile number doesn't exceed 10 characters
    return (
      user.artistName.trim() !== '' &&
      user.artistBio.trim() !== '' &&
      user.artistEmailID.trim() !== '' &&
      user.artistMobileNumber.trim() !== '' && isValidMobileNumber && // Include the mobile number validation here
      user.artistAddress.trim() !== '' &&
      validatePassword()
    );
  };
  const validatePassword = () => {
    // Define your password validation criteria here
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex;
  };

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-5">
            <div className="card">
            <div className="card-body">
      <h2 className="text-center mb-4">Register your Account</h2>
      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}
      <form onSubmit={onPost}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Enter Name" name="artistName" value={user.artistName} onChange={onInputChange} required />
        </div>
        <div className="mb-3">
          <textarea type="text" className="form-control" placeholder="Enter Bio" name="artistBio" value={user.artistBio} onChange={onInputChange} style={{ width: '100%', height: '150px' }} required />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Enter Email" name="artistEmailID" value={user.artistEmailID} onChange={onInputChange} required />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Mobile Number" name="artistMobileNumber" value={user.artistMobileNumber} onChange={onInputChange} required pattern="[789][0-9]{9}"/>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Enter Address" name="artistAddress" value={user.artistAddress} onChange={onInputChange} required />
        </div>
        <div className="mb-3">
          <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Enter Password" name="password" value={user.password} onChange={onInputChange} required />
          {!validatePassword() && (
            <div className="invalid-feedback">
              Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.
            </div>
          )}
          <input type="checkbox" className="mt-2" onClick={() => setShowPassword(!showPassword)} /> Show Password
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Register</button>
      </form>
      <p className="mt-3 text-center">Already a member? <Link to="/login">Login Here</Link></p>
    </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
