const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function getDenebSectorData() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Fetching Deneb sector data...');
    const sectorData = await client.get_sector('Deneb', 'json');
    console.log('Deneb Sector Data:');
    console.log(JSON.stringify(sectorData, null, 2));
    
    console.log('\nFetching Deneb sector metadata...');
    const metadata = await client.get_sector_metadata('Deneb');
    console.log('Deneb Sector Metadata:');
    console.log(JSON.stringify(metadata, null, 2));
  } catch (error) {
    console.error('Error fetching Deneb sector data:', error.message);
  }
}

getDenebSectorData();