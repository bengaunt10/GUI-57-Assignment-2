 import React from 'react';

function BeachMap(searchTerm) {


  const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=beaches+in+${searchTerm}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
  
  return (
    <div>
      <iframe title="map" width="414" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={mapUrl}/>
    </div>
    
   
  );
}

export default BeachMap;

//link to map page
