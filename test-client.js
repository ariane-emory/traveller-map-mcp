const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function testClient() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Testing Traveller Map Client...');
    
    // Test getting universe data (should be JSON)
    console.log('');
    console.log('=== Universe Data ===');
    const universe = await client.get_universe();
    console.log(`Found ${universe.sectors.length} sectors in the universe`);
    console.log('First 5 sectors:');
    universe.sectors.slice(0, 5).forEach(sector => {
      console.log(`  ${sector.name} (${sector.location.x}, ${sector.location.y})`);
    });
    
    // Test getting sector metadata (should be JSON)
    console.log('');
    console.log('=== Deneb Sector Metadata ===');
    const metadata = await client.get_sector_metadata('Deneb');
    console.log(`Sector Name: ${metadata.Name}`);
    console.log(`Location: ${metadata.Location.X}, ${metadata.Location.Y}`);
    console.log(`Milieu: ${metadata.Milieu}`);
    
    // Test getting sector data (should be text)
    console.log('');
    console.log('=== Deneb Sector Data (SEC format) ===');
    const sectorData = await client.get_sector('Deneb', 'sec');
    console.log('First 500 characters:');
    console.log(sectorData.substring(0, 500) + '...');
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testClient();