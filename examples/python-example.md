# Traveller Map MCP Example

This example shows how to use the Traveller Map MCP server with the Python MCP client.

## Installation

1. Install the Python MCP client:
```bash
pip install git+https://github.com/your-repo/mcp.git
```

2. Start the Traveller Map MCP server:
```bash
cd /path/to/traveller-map-mcp
npm start
```

3. Connect to the server using the Python client:
```python
from mcp import Client

async def main():
    async with Client.connect_stdio("node", ["/path/to/traveller-map-mcp/dist/server.js"]) as client:
        # List available tools
        tools = await client.list_tools()
        print("Available tools:")
        for tool in tools.tools:
            print(f"- {tool.name}: {tool.description}")
        
        # Get universe data
        result = await client.call_tool("get_universe", {})
        print("\nUniverse data:", result.content[0].text[:200] + "...")
        
        # Get sector data
        result = await client.call_tool("get_sector", {"sector": "Spinward Marches"})
        print("\nSpinward Marches data:", result.content[0].text[:200] + "...")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```