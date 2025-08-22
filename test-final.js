const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function test() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Testing Traveller Map API client...');
    
    // Test get_universe
    console.log('1. Testing get_universe...');
    const universe = await client.get_universe();
    console.log(`   Found ${universe.Sectors.length} sectors`);
    
    // Test get_sector_metadata
    console.log('2. Testing get_sector_metadata...');
    const metadata = await client.get_sector_metadata('Spinward Marches');
    console.log(`   Sector file: ${metadata.File}`);
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

test();