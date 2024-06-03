import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArtistInfo from './ArtistList';
import AddArt from './AddArt';
import ArtistDetails from './ArtistInformation';

const ArtistPage = () => {
  
  return (

    <div>
    {/* <ArtistInfo artist={artist} /> */}
    
    <ArtistInfo/>
    {/* <ArtistDetails/> */}
    {/* <AddArt/> */}

  </div>
  );
};

export default ArtistPage;