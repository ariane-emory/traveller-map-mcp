async function testApiEndpoints() {
  try {
    console.log('=== Testing Traveller Map API Endpoints ===\n');
    
    // Test 1: Search for worlds
    console.log('1. Testing search endpoint with query "Regina"...');
    const searchParams = new URLSearchParams({ q: 'Regina' });
    const searchResponse = await fetch(`https://travellermap.com/api/search?${searchParams}`);
    console.log(`   Status: ${searchResponse.status}`);
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log(`   Response keys: ${Object.keys(searchData)}`);
      console.log(`   Results count: ${searchData.Results ? searchData.Results.length : 0}`);
      if (searchData.Results && searchData.Results.length > 0) {
        console.log(`   First result keys: ${Object.keys(searchData.Results[0])}`);
        console.log(`   First result: ${JSON.stringify(searchData.Results[0], null, 2)}`);
      }
    } else {
      console.log(`   Error: ${searchResponse.statusText}`);
    }
    console.log('');
    
    // Test 2: Get world info
    console.log('2. Testing world info endpoint for Regina (Spinward Marches 1910)...');
    const encodedSector = encodeURIComponent('Spinward Marches');
    const worldResponse = await fetch(`https://travellermap.com/data/${encodedSector}/1910`);
    console.log(`   Status: ${worldResponse.status}`);
    if (worldResponse.ok) {
      const worldData = await worldResponse.json();
      console.log(`   Response keys: ${Object.keys(worldData)}`);
      console.log(`   World name: ${worldData.Name}`);
      console.log(`   UWP: ${worldData.UWP}`);
    } else {
      console.log(`   Error: ${worldResponse.statusText}`);
    }
    console.log('');
    
    // Test 3: Get sector image
    console.log('3. Testing sector image endpoint for Deneb...');
    const encodedSector2 = encodeURIComponent('Deneb');
    const imageResponse = await fetch(`https://travellermap.com/data/${encodedSector2}/image`);
    console.log(`   Status: ${imageResponse.status}`);
    console.log(`   Content-Type: ${imageResponse.headers.get('Content-Type')}`);
    console.log(`   Content-Length: ${imageResponse.headers.get('Content-Length')}`);
    console.log('');
    
    // Test 4: Get subsector image
    console.log('4. Testing subsector image endpoint for Deneb E...');
    const imageResponse2 = await fetch(`https://travellermap.com/data/${encodedSector2}/E/image`);
    console.log(`   Status: ${imageResponse2.status}`);
    console.log(`   Content-Type: ${imageResponse2.headers.get('Content-Type')}`);
    console.log(`   Content-Length: ${imageResponse2.headers.get('Content-Length')}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testApiEndpoints();