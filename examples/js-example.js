// Traveller Map MCP JavaScript Example
//
// This example shows how to use the Traveller Map MCP server with the JavaScript MCP client.

const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

async function main() {
  // Create a transport to communicate with the Traveller Map MCP server
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['dist/server.js']
  });

  // Create a client
  const client = new Client({
    name: 'traveller-map-js-example',
    version: '1.0.0'
  });

  try {
    // Connect to the server
    await client.connect(transport);
    console.log('Connected to Traveller Map MCP server');

    // List available tools
    const tools = await client.request('tools/list', {});
    console.log('Available tools:');
    tools.tools.forEach(tool => {
      console.log(`- ${tool.name}: ${tool.description}`);
    });

    // Get universe data
    console.log('\n--- Getting Universe Data ---');
    const universeResult = await client.request('tools/call', {
      name: 'get_universe',
      arguments: {}
    });
    console.log('Universe data:', JSON.parse(universeResult.content[0].text).slice(0, 3));

    // Get sector data
    console.log('\n--- Getting Sector Data ---');
    const sectorResult = await client.request('tools/call', {
      name: 'get_sector',
      arguments: { sector: 'Spinward Marches' }
    });
    const sectorData = JSON.parse(sectorResult.content[0].text);
    console.log('Sector name:', sectorData.Name);
    console.log('Sector location:', `X: ${sectorData.X}, Y: ${sectorData.Y}`);

    // Search for a world
    console.log('\n--- Searching for Earth ---');
    const searchResult = await client.request('tools/call', {
      name: 'search',
      arguments: { query: 'Earth' }
    });
    const searchResults = JSON.parse(searchResult.content[0].text);
    console.log(`Found ${searchResults.Results.length} results for "Earth"`);

    // Get a route
    console.log('\n--- Getting Route ---');
    const routeResult = await client.request('tools/call', {
      name: 'get_route',
      arguments: { 
        start: 'Solomani Rim/Alpha Crucis', 
        end: 'Spinward Marches/Regina',
        jumps: 6
      }
    });
    const routeData = JSON.parse(routeResult.content[0].text);
    console.log(`Route has ${routeData.Route?.length || 0} jumps`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

// Run the example
main().catch(console.error);