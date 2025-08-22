const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

async function run_test() {
  // Start the Traveller Map MCP server as a child process
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['../dist/server.js']
  });

  const client = new Client({
    name: 'traveller-map-test-client',
    version: '1.0.0'
  });

  try {
    // Connect to the MCP server
    await client.connect(transport);
    console.log('Connected to Traveller Map MCP server');

    // List available tools
    const tools = await client.list_tools();
    console.log('Available tools:', tools.tools.map(t => t.name));

    // Test get_universe tool
    console.log('\n--- Testing get_universe ---');
    const universe_result = await client.call_tool('get_universe', {});
    console.log('Universe data:', JSON.parse(universe_result.content[0].text).slice(0, 3)); // First 3 sectors

    // Test get_sector tool
    console.log('\n--- Testing get_sector ---');
    const sector_result = await client.call_tool('get_sector', { sector: 'Spinward Marches' });
    console.log('Spinward Marches metadata:', JSON.parse(sector_result.content[0].text).Name);

    // Test search tool
    console.log('\n--- Testing search ---');
    const search_result = await client.call_tool('search', { query: 'Earth' });
    console.log('Search results for "Earth":', JSON.parse(search_result.content[0].text).Results.length, 'matches');

    // Test get_route tool
    console.log('\n--- Testing get_route ---');
    const route_result = await client.call_tool('get_route', { 
      start: 'Solomani Rim/Alpha Crucis', 
      end: 'Spinward Marches/Regina', 
      jumps: 6 
    });
    const route_data = JSON.parse(route_result.content[0].text);
    console.log('Route from Solomani Rim to Regina:', route_data.Route?.length, 'jumps');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

// Run the test
run_test().catch(console.error);