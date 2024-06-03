import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Container, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import NavbarA from './NavbarA';
import { Card } from 'react-bootstrap';
import Footer from './Footer';


function ArtistList() {
  const [artists, setArtists] = useState([]);
  const imageUrls = [
    'https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-74858.jpg',
    'https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-74966.jpg',
    'https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-75386.jpg?w=360',
    'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png',
    'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369990.png',
    'https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg'
  ];

  useEffect(() => {
    // Fetch artists data from the backend API
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:8001/rest/art/getArtist');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} style={{ color: 'gold' }}>&#9733;</span>); // Gold star
      } else {
        stars.push(<span key={i} style={{ color: 'gray' }}>&#9733;</span>); // Gray star
      }
    }
  }

  const getRandomImageUrl = () => {
    if (imageUrls.length === 0) return ''; // Return empty string if no image URLs available
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  const handleClick = () => {
    // Retrieve artistId from sessionStorage
    const artistId = sessionStorage.getItem('artistId');
    console.log(sessionStorage);
    // Do something with artistId...
  };



  return (
    <div>
      <NavbarA />
      <img src='https://seller.dirums.com/images/banner.jpg' />
      <div className="fonth4">
        <h6 className="display-5 font-weight-bolder">WHY SELL ONLINE?</h6>
      </div>


      <div className="w-100 d-none d-md-flex justify-content-center align-items-center icon-container" id='IconlistArtist'>
        <div className="" id='icon'>
          <img src='https://seller.dirums.com/images/rocket.png' className='icon-image' />
          <div className='text-wrapper'>
            <p className='sample'>The Online market is Blooming</p>
          </div>
        </div>
        <div className="" id='icon'>
          <img src='https://seller.dirums.com/images/earth.png' className='icon-image' />
          <div className='text-wrapper'>
            <p className='sample'>Reach global customers by selling online</p>
          </div>
        </div>
        <div className="" id='icon'>
          <img src='https://seller.dirums.com/images/shop.png' className='icon-image' />
          <div className='text-wrapper'>
            <p className='sample'>Increased preference for buying art online</p>
          </div>
        </div>
        <div className="" id='icon'>
          <img src='https://seller.dirums.com/images/money.png' className='icon-image' />
          <div className='text-wrapper'>
            <p className='sample'>Online presence is a necessity of present time</p>
          </div>
        </div>
      </div>



      <div className="fonth4">
        <h6 className="display-5 font-weight-bolder">Here's Our Brilliant Artists</h6>
        <hr style={{ marginRight: "43%" }} />
      </div>

      <Grid container spacing={1}>
        {artists.map((artist, index) => (
          <Grid item xs={6} key={index}>
            <Paper elevation={2} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
              <img
                src={getRandomImageUrl()}
                alt="avatar"
                style={{ width: '150px', height: '150px', marginRight: '10px', marginBottom: '300px' }}
              />
              <div>
                <Typography variant="h4" gutterBottom>{artist.artistName}</Typography>
                <Typography variant="body1" gutterBottom><strong>Artist ID:</strong> {artist.artistId}</Typography>
                <div style={{ marginBottom: '10px' }}>
                  <Typography variant="body1" gutterBottom
                  ><strong>Bio:</strong>{artist.artistBio}</Typography>
                </div>
                <Typography variant="body1" gutterBottom><strong>Mobile Number:</strong> {artist.artistMobileNumber}</Typography>
                <Typography variant="body1" gutterBottom><strong>Address:</strong> {artist.artistAddress}</Typography>
                <Typography variant="body1" gutterBottom><strong>Rating:</strong> {renderRatingStars(Math.floor(Math.random() * 5) + 1)}</Typography>
              </div>
            </Paper>
          </Grid>
        ))}
        
      </Grid>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Card variant="outlined" id="addArt">

            <Link
              to="/login"
              className="btn btn-outline-primary"
            // onClick={handleClick}
            >
              Click here to Sign in
            </Link>

          </Card>

        </div>

      <Footer />

    </div>
  );
}

export default ArtistList;
