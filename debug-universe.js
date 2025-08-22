const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function debugUniverse() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Getting universe data...');
    const universe = await client.get_universe();
    console.log('Universe data type:', typeof universe);
    console.log('Universe data keys:', Object.keys(universe));
    console.log('Full universe data:');
    console.log(JSON.stringify(universe, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error stack:', error.stack);
  }
}

debugUniverse();