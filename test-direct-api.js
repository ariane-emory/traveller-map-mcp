async function testDirectApi() {
  try {
    console.log('Testing direct API calls...');
    
    // Try the /data/ endpoint for JSON
    console.log('');
    console.log('=== /data/ endpoint ===');
    const response = await fetch('https://travellermap.com/data/Deneb');
    const data = await response.json();
    console.log('Data type:', typeof data);
    console.log('Keys:', Object.keys(data));
    console.log('Sample data:');
    console.log(JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testDirectApi();