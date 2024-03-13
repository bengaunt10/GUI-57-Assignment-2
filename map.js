import React, { useState } from 'react';

function BeachMap(searchTerm) {


  const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=beaches+in+${searchTerm}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div>
      <input type="text" value={searchTerm} placeholder="Search for beaches" />
      <iframe title="map" width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={mapUrl}/>
    </div>
    
   
  );
}

export default BeachMap;

//link to map page
