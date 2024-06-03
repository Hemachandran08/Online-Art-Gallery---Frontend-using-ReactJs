import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarA from './NavbarA';
import Footer from './Footer';

const AddArt = () => {
  // const [id,setId] = useState('');
  const [artTitle, setTitle] = useState('');
  const [artDescription, setDescription] = useState('');
  const [artPrice, setPrice] = useState(0);
  const [artTagName, setTagName] = useState('');
  const [artStyle, setStyle] = useState('');
  const [image, setImage] = useState(null);

  const artistIds = sessionStorage.getItem('artistId')
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  

  const id=window.sessionStorage.getItem("artistId")

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(artistIds)
    console.log(artTitle)
    const formData = new FormData();
    formData.append('artTitle', artTitle);
    formData.append('artDescription', artDescription);
    formData.append('artPrice', artPrice);
    formData.append('artTagName', artTagName);
    formData.append('artStyle', artStyle);
    formData.append('artistId', id);
    formData.append('image', image);

    axios.post('http://localhost:8001/rest/art/art', formData)
     .then((response) => {
        console.log(response.data);
        toast.success('Art uploaded successfully!');

        setTimeout(()=>{
        window.location.href="/artist-information";
        },[2000])
       
      })
     .catch((error) => {
        console.error(error);
        toast.error('Error uploading art!');
      });
  };

  return (
    <div>
      <NavbarA/>
    <div className="container mt-5" id='addArt'>
      <h1 className="text-center mb-5">Welcome to Artist Page</h1>
      <h4 className="text-center mb-5">Upload Your Artworks</h4>
      <div className='flex'>
        <form onSubmit={handleSubmit} id='form' >
          <div className='row'>
            <div className='col-6'>
        {/* <img src='https://t3.ftcdn.net/jpg/05/72/11/68/360_F_572116833_7r5QkgqJLWiWLguww6Kv7IHIhOQr5yLd.jpg'/> */}
        </div>
        </div>
      
        <div className="form-group mb-3">
          <label htmlFor="title">Title:</label>
          <input type="text" className="form-control" id="title" value={artTitle} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description:</label>
          <textarea className="form-control" id="description" rows="3" value={artDescription} onChange={(event) => setDescription(event.target.value)}></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Price:</label>
          <input type="number" className="form-control" id="price" value={artPrice} onChange={(event) => setPrice(event.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="tagName">Tag Name:</label>
          <input type="text" className="form-control" id="tagName" value={artTagName} onChange={(event) => setTagName(event.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="style">Style:</label>
          <input type="text" className="form-control" id="style" value={artStyle} onChange={(event) => setStyle(event.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="image">Image:</label>
          <input type="file" className="form-control-file" id="image" onChange={handleImageChange} />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      <ToastContainer />
    </div>


    <Footer/>
    </div>
  );
};

export default AddArt;