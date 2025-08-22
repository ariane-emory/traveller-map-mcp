const { TravellerMapClient } = require('./dist/traveller-map-client.js');

async function testSearch() {
  const client = new TravellerMapClient();
  
  try {
    console.log('Testing search functionality...');
    const searchResults = await client.search('Mora');
    console.log('Search Results:', JSON.stringify(searchResults, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testSearch();