const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function testSectorFormats() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Fetching Deneb sector data in different formats...');
    
    // Try the sec format
    console.log('\n=== SEC Format ===');
    const secData = await client.get_sector('Deneb', 'sec');
    console.log('First 500 characters:');
    console.log(secData.substring(0, 500) + '...');
    
    // Try the t5ss format
    console.log('\n=== T5SS Format ===');
    const t5ssData = await client.get_sector('Deneb', 't5ss');
    console.log('First 500 characters:');
    console.log(t5ssData.substring(0, 500) + '...');
    
    // Try without specifying a format (should default to sec)
    console.log('\n=== Default Format ===');
    const defaultData = await client.get_sector('Deneb');
    console.log('First 500 characters:');
    console.log(defaultData.substring(0, 500) + '...');
    
    // Let's also try getting the metadata
    console.log('\n=== Metadata ===');
    const metadata = await client.get_sector_metadata('Deneb');
    console.log(JSON.stringify(metadata, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testSectorFormats();