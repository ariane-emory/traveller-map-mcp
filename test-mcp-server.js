const { spawn } = require('child_process');

// Start the MCP server
const server = spawn('node', ['/Users/katherinemasseau/Documents/Code/node/traveller-map-mcp/dist/server.js']);

// Handle server output
server.stdout.on('data', (data) => {
  console.log(`Server: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Server Error: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Send a JSON-RPC request to list tools
const listToolsRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list'
};

console.log('Sending list tools request...');
server.stdin.write(JSON.stringify(listToolsRequest) + '\n');

// After a short delay, send a request to get Deneb sector data
setTimeout(() => {
  const getSectorRequest = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'get_sector',
      arguments: {
        sector: 'Deneb',
        format: 'sec'
      }
    }
  };
  
  console.log('Sending get sector request...');
  server.stdin.write(JSON.stringify(getSectorRequest) + '\n');
  
  // Close the server after another delay
  setTimeout(() => {
    server.kill();
  }, 3000);
}, 1000);