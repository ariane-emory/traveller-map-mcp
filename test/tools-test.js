const fs = require('fs');
const path = require('path');

// Read the tools.json file
const toolsPath = path.join(__dirname, '..', 'src', 'tools.json');
const toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

console.log(`Found ${toolsData.tools.length} tools in tools.json:`);
toolsData.tools.forEach((tool, index) => {
  console.log(`${index + 1}. ${tool.name}: ${tool.description}`);
});

// Also test the dist version
const distToolsPath = path.join(__dirname, '..', 'dist', 'tools.json');
if (fs.existsSync(distToolsPath)) {
  const distToolsData = JSON.parse(fs.readFileSync(distToolsPath, 'utf8'));
  console.log(`\nFound ${distToolsData.tools.length} tools in dist/tools.json:`);
  distToolsData.tools.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name}: ${tool.description}`);
  });
} else {
  console.log('\ndist/tools.json does not exist yet');
}