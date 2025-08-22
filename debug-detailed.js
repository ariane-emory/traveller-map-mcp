async function debugApiResponses() {
  try {
    console.log('=== Detailed API Response Debugging ===\n');
    
    // Test 1: Search for worlds
    console.log('1. Detailed search response for "Regina":');
    const searchParams = new URLSearchParams({ q: 'Regina' });
    const searchResponse = await fetch(`https://travellermap.com/api/search?${searchParams}`);
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log(`   Full response: ${JSON.stringify(searchData, null, 2)}`);
    } else {
      console.log(`   Error: ${searchResponse.statusText}`);
    }
    console.log('');
    
    // Test 2: Get world info
    console.log('2. Detailed world info response for Regina:');
    const encodedSector = encodeURIComponent('Spinward Marches');
    const worldResponse = await fetch(`https://travellermap.com/data/${encodedSector}/1910`);
    if (worldResponse.ok) {
      const worldData = await worldResponse.json();
      console.log(`   Full response: ${JSON.stringify(worldData, null, 2)}`);
    } else {
      console.log(`   Error: ${worldResponse.statusText}`);
    }
    console.log('');
    
    // Test 3: Try a simpler search
    console.log('3. Simple search response for "Deneb":');
    const searchParams2 = new URLSearchParams({ q: 'Deneb' });
    const searchResponse2 = await fetch(`https://travellermap.com/api/search?${searchParams2}`);
    if (searchResponse2.ok) {
      const searchData2 = await searchResponse2.json();
      console.log(`   Full response: ${JSON.stringify(searchData2, null, 2)}`);
    } else {
      console.log(`   Error: ${searchResponse2.statusText}`);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugApiResponses();