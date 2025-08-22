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

    // Test get_universe tool
    console.log('\n--- Testing get_universe ---');
    const universe_result = await client.request('tools/call', {
      name: 'get_universe',
      arguments: {}
    });
    console.log('Universe data:', JSON.parse(universe_result.content[0].text).length, 'sectors');

    // Test get_sector tool
    console.log('\n--- Testing get_sector ---');
    const sector_result = await client.request('tools/call', {
      name: 'get_sector',
      arguments: { sector: 'Spinward Marches' }
    });
    console.log('Spinward Marches metadata:', JSON.parse(sector_result.content[0].text).Name);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

// Run the test
run_test().catch(console.error);