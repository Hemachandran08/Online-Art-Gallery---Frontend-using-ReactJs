import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

function LoginPage() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ artistEmailID: "", password: "", });


  const [all, setAll] = useState([]);

  const onInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }



  useEffect(() => {
    database();

  }, []);

  const database = async () => {

    const response = await axios.get("http://localhost:8001/rest/art/getArtist");
    console.log("hema")
    console.log(response.data)
    setAll(response.data);


  }

  const onPost = (e) => {
    e.preventDefault();
    console.log(details)
    const user = all.find((item) => item.artistEmailID === details.artistEmailID && item.password === details.password);

    if (user && user.artistEmailID === details.artistEmailID && user.password === details.password) {
      sessionStorage.setItem('artistId', user.artistId);
      console.log(sessionStorage);
      
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully logged in!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/artist-information", { state: { userDetails: user } });
        }
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid email or password!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault(); };

  return (
    <div>
      <Navbar />

      <div className="d-flex min-vh-100 justify-content-center align-items-center px-6 py-12" id='card'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm" id='card'>
          <h2 className="text-center mb-4">Sign in to your account</h2>
          <div className="card w-100">
            <form onSubmit={onPost} className="space-y-6 ">
              <div className="mb-3">
                {/* <FaUser className="form-icon" id='user' /> */}
                <input
                  type="email"
                  className="form-control"
                  id="textfield"
                  name="artistEmailID"
                  placeholder="Email"
                  value={details.email}
                  onChange={onInputChange}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="mb-3">
                {/* <RiLockPasswordFill className="form-icon" id='password' /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="textfield"
                  name="password"
                  placeholder="Password"
                  value={details.password}
                  onChange={onInputChange}
                  autoComplete="current-password"
                  required
                />
                
                <button className="btn btn-outline-secondary" type="button" id="show" onClick={handleClickShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </button>
                
              </div>
              <button type="submit" id='btn' className="btn btn-primary btn-sm">Sign in</button>
            </form>
            <p className="text-center">
              Not a member? <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to="/Register">Register Here</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default LoginPage;
