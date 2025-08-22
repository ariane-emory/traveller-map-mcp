#!/usr/bin/env node

// Simple test script to verify the Traveller Map MCP server is working
const { spawn } = require('child_process');
const path = require('path');

// Start the Traveller Map MCP server
const server = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, '..', 'dist')
});

// Handle server errors
server.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Send a tools/list request to the server
const request = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/list",
  params: {}
};

// Send the request after a short delay to ensure server is ready
setTimeout(() => {
  server.stdin.write(JSON.stringify(request) + '\n');
}, 1000);

// Wait for the response
setTimeout(() => {
  server.stdin.end();
}, 3000);

// Process server output
let responseReceived = false;
server.stdout.on('data', (data) => {
  const lines = data.toString().split('\n');
  for (const line of lines) {
    if (line.trim() === '') continue;
    
    try {
      const response = JSON.parse(line);
      if (response.id === 1 && response.result && response.result.tools) {
        console.log('SUCCESS: Server is working correctly');
        console.log(`Found ${response.result.tools.length} tools:`);
        response.result.tools.forEach(tool => {
          console.log(`  - ${tool.name}: ${tool.description}`);
        });
        responseReceived = true;
        server.kill();
        process.exit(0);
      }
    } catch (error) {
      // Not a JSON response, ignore
    }
  }
});

// Timeout after 5 seconds
setTimeout(() => {
  if (!responseReceived) {
    console.log('ERROR: Server did not respond in time');
    server.kill();
    process.exit(1);
  }
}, 5000);