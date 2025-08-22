const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

async function test_server() {
  // Start the Traveller Map MCP server as a child process
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['dist/server.js']
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
    const tools = await client.request('tools/list', {});
    console.log('Available tools:');
    tools.tools.forEach(tool => {
      console.log(`- ${tool.name}: ${tool.description}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

// Run the test
test_server().catch(console.error);