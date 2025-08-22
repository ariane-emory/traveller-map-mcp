# Traveller Map MCP

This is a Model Context Protocol (MCP) server that provides access to the [Traveller Map API](https://travellermap.com/doc/api).

## Features

The Traveller Map MCP provides the following tools:

1. **get_universe** - Get the list of all sectors in the Traveller universe
2. **get_sector** - Get data for a specific sector
3. **traveller_map_search** - Search for sectors, subsectors, worlds, or regions
4. **get_route** - Get a route between two locations
5. **get_sector_metadata** - Get metadata for a specific sector
6. **get_hex_data** - Get data for a specific hex in a sector
7. **get_sector_image** - Get an image of a sector
8. **get_subsector_image** - Get an image of a subsector

### Tool Parameters

#### traveller_map_search
- `query` (string, required) - Search query term
- `formatted` (boolean, optional, default: true) - Whether to format the JSON output with indentation

## Installation

```bash
npm install
npm run build
```

## Usage

To start the MCP server:

```bash
npm start
```

The server communicates over stdio and is designed to be used with an MCP client.

## Configuration

To use this MCP server with Qwen, add the following to your `.qwen/settings.json` file:

```json
{
  "mcpServers": {
    "traveller-map": {
      "command": "node",
      "args": [
        "/path/to/traveller-map-mcp/dist/server.js"
      ]
    }
  }
}
```

Replace `/path/to/traveller-map-mcp` with the actual path to this repository on your system.

## Development

For development with hot reloading:

```bash
npm run dev
```

## Examples

See the [examples](examples/) directory for usage examples in different languages:

- [JavaScript example](examples/js-example.js)
- [Python example](examples/python-example.md)
