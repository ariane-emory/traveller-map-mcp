const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function testDenebSector() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Testing Deneb sector data retrieval...');
    
    // Test getting sector data (should be text)
    console.log('\n=== Deneb Sector Data (SEC format) ===');
    const sectorData = await client.get_sector('Deneb', 'sec');
    console.log('First 500 characters:');
    console.log(sectorData.substring(0, 500) + '...');
    
    // Test getting sector metadata (should be JSON)
    console.log('\n=== Deneb Sector Metadata ===');
    const metadata = await client.get_sector_metadata('Deneb');
    console.log(`Sector Name: ${metadata.Names[0].Text}`);
    console.log(`Location: ${metadata.X}, ${metadata.Y}`);
    console.log(`Milieu: ${metadata.DataFile.Milieu}`);
    console.log(`Abbreviation: ${metadata.Abbreviation}`);
    
    // Show some subsectors
    console.log('\nSubsectors:');
    metadata.Subsectors.slice(0, 5).forEach(subsector => {
      console.log(`  ${subsector.Index}: ${subsector.Name}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testDenebSector();