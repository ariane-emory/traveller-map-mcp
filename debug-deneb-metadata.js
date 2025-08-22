const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function debugDenebMetadata() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Debugging Deneb sector metadata...');
    
    // Test getting sector metadata (should be JSON)
    const metadata = await client.get_sector_metadata('Deneb');
    console.log('Metadata keys:', Object.keys(metadata));
    console.log('Full metadata:');
    console.log(JSON.stringify(metadata, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error stack:', error.stack);
  }
}

debugDenebMetadata();