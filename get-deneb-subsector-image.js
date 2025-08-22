const { TravellerMapClient } = require('./dist/traveller-map-client.js');
const fs = require('fs');

async function getDenebSubsectorImage() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Fetching Deneb subsector image...');
    
    // Get image of subsector A (Pretoria) from Deneb sector
    const imageData = await client.get_subsector_image('Deneb', 'A', {
      style: 'atlas',
      width: 800,
      height: 600
    });
    
    // Save the image to a file
    fs.writeFileSync('deneb-subsector-A.png', imageData);
    console.log('Image saved as deneb-subsector-A.png');
    
    // Also try subsector B (Lamas)
    const imageDataB = await client.get_subsector_image('Deneb', 'B', {
      style: 'atlas',
      width: 800,
      height: 600
    });
    
    // Save the image to a file
    fs.writeFileSync('deneb-subsector-B.png', imageDataB);
    console.log('Image saved as deneb-subsector-B.png');
    
  } catch (error) {
    console.error('Error fetching Deneb subsector image:', error.message);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
  }
}

getDenebSubsectorImage();