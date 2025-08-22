// Comprehensive test for the Traveller Map client
const { TravellerMapClient } = require('../dist/traveller-map-client.js');

async function run_tests() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Testing Traveller Map API client...\n');
    
    // Test get_universe
    console.log('1. Testing get_universe...');
    const universe = await client.get_universe();
    console.log(`   Found ${universe.Sectors.length} sectors\n`);
    
    // Test get_sector with JSON format
    console.log('2. Testing get_sector...');
    const sector = await client.get_sector('Spinward Marches', 'json');
    console.log(`   Sector name: ${sector.Name}\n`);
    
    // Test search
    console.log('3. Testing search...');
    const search_results = await client.search('Earth');
    console.log(`   Found ${search_results.Results.length} results for "Earth"\n`);
    
    // Test get_sector_metadata
    console.log('4. Testing get_sector_metadata...');
    const metadata = await client.get_sector_metadata('Spinward Marches');
    console.log(`   Sector file: ${metadata.File}\n`);
    
    // Test get_hex_data
    console.log('5. Testing get_hex_data...');
    const hex_data = await client.get_hex_data('Spinward Marches', '1910');
    console.log(`   Hex data retrieved: ${Object.keys(hex_data).length} properties\n`);
    
    console.log('All tests passed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
    console.error('Error stack:', error.stack);
  }
}

console.log('Starting Traveller Map client tests...');
run_tests().then(() => {
  console.log('Tests completed.');
}).catch(console.error);