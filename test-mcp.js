const { spawn } = require('child_process');
const readline = require('readline');

// Start the MCP server
const server = spawn('node', ['/Users/katherinemasseau/Documents/Code/node/traveller-map-mcp/dist/server.js']);

// Set up readline interface for reading server responses
const rl = readline.createInterface({
  input: server.stdout,
  output: server.stdin
});

// Track if we've received a response
let receivedResponse = false;

// Handle server output
server.stdout.on('data', (data) => {
  console.log(`Server output: ${data}`);
});

// Handle server errors
server.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
});

// Handle server exit
server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Send a JSON-RPC request to get Deneb sector data
const request = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: {
    name: 'get_sector',
    arguments: {
      sector: 'Deneb',
      format: 'json'
    }
  }
};

// Send the request after a short delay to ensure server is ready
setTimeout(() => {
  console.log('Sending request for Deneb sector data...');
  server.stdin.write(JSON.stringify(request) + '\n');
  
  // Set a timeout to close the server if no response
  setTimeout(() => {
    if (!receivedResponse) {
      console.log('No response received, closing server...');
      server.kill();
    }
  }, 10000);
}, 1000);

// Process server responses
rl.on('line', (line) => {
  console.log(`Received: ${line}`);
  receivedResponse = true;
  
  try {
    const response = JSON.parse(line);
    if (response.id === 1) {
      console.log('Deneb sector data:');
      console.log(JSON.stringify(response.result, null, 2));
      server.kill();
    }
  } catch (e) {
    console.error('Error parsing response:', e);
  }
});