import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavbarA from './NavbarA';
import Footer from './Footer';
import { Col, Image, Row } from 'react-bootstrap';

function ArtistInformation() {
  const [artist, setArtist] = useState({});
  const [art, setArt] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        // Retrieve artistId from sessionStorage
        const artistId = sessionStorage.getItem('artistId');
        // Check if artistId exists
        if (!artistId) {
          console.error('No artistId found in sessionStorage');
          return;
        }
        // Fetch artist information using the retrieved artistId
        const response = await axios.get(`http://localhost:8001/rest/art/getArtistById/${artistId}`);
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };

    fetchArtist();
  }, []);

  useEffect(() => {
    const fetchArts = async () => {
      const artistId = sessionStorage.getItem('artistId');
      try {
        const response = await axios.get(`http://localhost:8001/rest/art/getArtsByArtist/${artistId}`);
        setArt(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArts();
  }, []);

  return (
    <div>
      <NavbarA />

      <Container className='mt=5'>
        <Row>
          {Object.keys(artist).length > 0 ? (
            <>
              <Col sm={2} md={3}className='mt-3'>
                <Image
                  src={'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png'}
                /></Col>
              <Col sm={3} md={5} className="mx-auto mt-5">
                <Typography variant="h4" gutterBottom>{artist.artistName}</Typography>
                <Typography variant="body1" gutterBottom><strong>Bio:</strong> {artist.artistBio}</Typography>
                <Typography variant="body1" gutterBottom><strong>Mobile Number:</strong> {artist.artistMobileNumber}</Typography>
                <Typography variant="body1" gutterBottom><strong>Address:</strong> {artist.artistAddress}</Typography>
              </Col>
              <Col sm={1} md={2} className="mx-auto mt-5">
                <Link to="/add-art" className="btn btn-primary">Add Artwork</Link>
              </Col>
              <h4 className='mt-5'>Arts Uploaded by Artist</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '20px' }} className='mt-2'>
  {art.map((art, index) => {
    if (art.artTitle) {
      const image = atob(art.image);
      return (
        <div key={index} className="image-item">
          <img src={`data:image/jpeg;base64,${image}`} alt={art.artTitle} style={{ width: '100%', borderRadius: '5px' }} />
          <div className="image-details">
            <h5 className="card-title">{art.artTitle}</h5>
            <p className="card-text">{art.artDescription}</p>
            <p className="card-text">Price: ${art.artPrice}</p>
          </div>
        </div>
      )
    }
  })}
</div>

            </>
          ) : (
            <Typography variant="body1">Loading artist details...</Typography>
          )}
          
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default ArtistInformation;
