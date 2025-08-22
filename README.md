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
9. **get_world_wiki_url** - Construct a wiki URL for a Traveller world
10. **get_subsector_wiki_url** - Construct a wiki URL for a Traveller subsector
11. **get_sector_wiki_url** - Construct a wiki URL for a Traveller sector

### Tool Parameters

#### get_universe
No parameters required.

#### get_sector
- `sector` (string, required) - Name of the sector
- `format` (string, optional, default: "json") - Data format (sec, t5ss, json, etc.)

#### traveller_map_search
- `query` (string, required) - Search query term
- `formatted` (boolean, optional, default: true) - Whether to format the JSON output with indentation

#### get_route
- `start` (string, required) - Starting location (sector/hex or world name)
- `end` (string, required) - Ending location (sector/hex or world name)
- `jumps` (number, optional, default: 4) - Number of jumps allowed

#### get_sector_metadata
- `sector` (string, required) - Name of the sector

#### get_hex_data
- `sector` (string, required) - Name of the sector
- `hex` (string, required) - Hex location (e.g., "0101")

#### get_sector_image
- `sector` (string, required) - Name of the sector
- `style` (string, optional, default: "poster") - Image style (atlas, poster, print, candy, draft, fugue)
- `width` (number, optional) - Width of the image in pixels
- `height` (number, optional) - Height of the image in pixels

#### get_subsector_image
- `sector` (string, required) - Name of the sector
- `subsector` (string, required) - Subsector letter (A-P)
- `style` (string, optional, default: "poster") - Image style (atlas, poster, print, candy, draft, fugue)
- `width` (number, optional) - Width of the image in pixels
- `height` (number, optional) - Height of the image in pixels

#### get_world_wiki_url
- `world_name` (string, required) - Name of the world
- `sector_name` (string, optional) - Name of the sector
- `hex` (string, optional) - Hex location

#### get_subsector_wiki_url
- `subsector_name` (string, required) - Name of the subsector

#### get_sector_wiki_url
- `sector_name` (string, required) - Name of the sector

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

To use this MCP server with qwen-code, add the following to your `~/.qwen/settings.json` file:

Configuration for other agents (e.g., gemini-cli, Claude Code, etc.) should be similar. 

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
