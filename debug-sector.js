const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function debugSectorData() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Fetching Deneb sector data as text...');
    // Let's try getting the data in 'sec' format first to see what we get
    const sectorDataText = await client.get_sector('Deneb', 'sec');
    console.log('Deneb Sector Data (sec format):');
    console.log(sectorDataText.substring(0, 500) + '...');
    
    console.log('');
    console.log('Fetching Deneb sector data as json...');
    // Now let's try the json format
    const sectorDataJson = await client.get_sector('Deneb', 'json');
    console.log('Deneb Sector Data (json format):');
    console.log(JSON.stringify(sectorDataJson, null, 2));
  } catch (error) {
    console.error('Error fetching Deneb sector data:', error.message);
    console.error('Error stack:', error.stack);
  }
}

debugSectorData();