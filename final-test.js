const { spawn } = require('child_process');

// Send a JSON-RPC request to the MCP server
const server = spawn('node', ['/Users/katherinemasseau/Documents/Code/node/traveller-map-mcp/dist/server.js']);

let receivedResponse = false;

server.stdout.on('data', (data) => {
  const response = data.toString().trim();
  if (response.includes('{"result"')) {
    console.log('✅ Server responded correctly to tool request');
    receivedResponse = true;
    server.kill();
  }
});

server.stderr.on('data', (data) => {
  console.error(`Server Error: ${data}`);
});

server.on('close', (code) => {
  if (!receivedResponse) {
    console.log('❌ Server did not respond correctly');
  }
});

// Send a tool list request
const listToolsRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list'
};

server.stdin.write(JSON.stringify(listToolsRequest) + '\n');

// Timeout after 5 seconds
setTimeout(() => {
  if (!receivedResponse) {
    console.log('❌ Server did not respond in time');
    server.kill();
  }
}, 5000);