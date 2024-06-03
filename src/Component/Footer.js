import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <div className="mt-5" style={{ backgroundColor: '#000', color: '#fff', paddingTop: '40px', paddingBottom: '20px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 style={{ color: '#cd853f' }}>About Us</h5>
            <p>ArtGallery.com is an exquisite online art marketplace that facilitates our buyers to come across illustrations that are pleasurable to their vision and absorbs them entirely into hallucinatory episodes of artists.</p>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: '#cd853f' }}>Quick Links</h5>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li style={{ marginBottom: '10px' }}><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/gallery" style={{ color: '#fff', textDecoration: 'none' }}>Gallery</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: '#cd853f' }}>Follow Us</h5>
            <ul className="list-inline" style={{ padding: '0' }}>
              <li className="list-inline-item"><a href="https://www.facebook.com" style={{ color: '#fff' }}><FaFacebook /></a></li>
              <li className="list-inline-item"><a href="https://www.twitter.com" style={{ color: '#fff' }}><FaTwitter /></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com" style={{ color: '#fff' }}><FaInstagram /></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center py-3" style={{ backgroundColor: '#000', color: '#fff' }}>
        <p>&copy; {new Date().getFullYear()} Art Gallery. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
