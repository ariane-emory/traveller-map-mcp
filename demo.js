const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function demonstrateClient() {
  const client = new TravellerMapClient();
  
  try {
    console.log('=== Traveller Map API Client Demo ===\n');
    
    // 1. Get universe data
    console.log('1. Getting universe data...');
    const universe = await client.get_universe();
    console.log(`   Found ${universe.Sectors.length} sectors in the universe`);
    console.log(`   First 5 sectors: ${universe.Sectors.slice(0, 5).map(s => s.Names[0].Text).join(', ')}\n`);
    
    // 2. Get Deneb sector metadata
    console.log('2. Getting Deneb sector metadata...');
    const metadata = await client.get_sector_metadata('Deneb');
    console.log(`   Sector Name: ${metadata.Names[0].Text}`);
    console.log(`   Location: ${metadata.X}, ${metadata.Y}`);
    console.log(`   Milieu: ${metadata.DataFile.Milieu}`);
    console.log(`   Subsectors: ${metadata.Subsectors.length}`);
    console.log(`   First 3 subsectors: ${metadata.Subsectors.slice(0, 3).map(s => `${s.Index}:${s.Name}`).join(', ')}\n`);
    
    // 3. Get Deneb sector data
    console.log('3. Getting Deneb sector data...');
    const sectorData = await client.get_sector('Deneb', 'sec');
    console.log(`   Sector data length: ${sectorData.length} characters`);
    console.log(`   First line: ${sectorData.split('\n')[0]}\n`);
    
    // 4. Get route data
    console.log('4. Getting route from Deneb 0108 to Deneb 0201...');
    const route = await client.get_route('Deneb 0108', 'Deneb 0201');
    console.log(`   Route found: ${route.Path ? 'Yes' : 'No'}`);
    if (route.Path) {
      console.log(`   Route: ${route.Path}\n`);
    }
    
    // 5. Get hex data
    console.log('5. Getting data for hex 0108 in Deneb sector...');
    const hexData = await client.get_hex_data('Deneb', '0108');
    console.log(`   World name: ${hexData.Name}`);
    console.log(`   UWP: ${hexData.UWP}\n`);
    
    console.log('=== Demo completed successfully ===');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

demonstrateClient();