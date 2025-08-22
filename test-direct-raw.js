async function testDirectApiRaw() {
  try {
    console.log('Testing direct API calls (raw text)...');
    
    // Try the /data/ endpoint for raw text
    console.log('');
    console.log('=== /data/ endpoint (raw) ===');
    const response = await fetch('https://travellermap.com/data/Deneb');
    const text = await response.text();
    console.log('First 1000 characters:');
    console.log(text.substring(0, 1000));
    
    // Try the /api/sec endpoint for raw text
    console.log('');
    console.log('=== /api/sec endpoint (raw) ===');
    const params = new URLSearchParams({
      sector: 'Deneb'
    });
    const response2 = await fetch(`https://travellermap.com/api/sec?${params}`);
    const text2 = await response2.text();
    console.log('First 1000 characters:');
    console.log(text2.substring(0, 1000));
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testDirectApiRaw();