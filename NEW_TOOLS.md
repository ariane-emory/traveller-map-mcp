# Traveller Map MCP Server - Updated with New Tools

## Overview
The Traveller Map MCP server has been enhanced with additional tools to access more endpoints of the Traveller Map API.

## New Tools Added

### 1. get_subsector_image
Get an image of a subsector within a sector.

**Parameters:**
- `sector` (string, required): Name of the sector
- `subsector` (string, required): Subsector letter (A-P)
- `style` (string, optional): Image style (atlas, poster, print, candy, draft, fugue)
- `width` (number, optional): Width of the image in pixels
- `height` (number, optional): Height of the image in pixels

**Example:**
```json
{
  "name": "get_subsector_image",
  "arguments": {
    "sector": "Deneb",
    "subsector": "E"
  }
}
```



### 3. get_world_info
Get detailed information about a specific world.

**Parameters:**
- `sector` (string, required): Name of the sector
- `hex` (string, required): Hex location (e.g., "1910")

**Example:**
```json
{
  "name": "get_world_info",
  "arguments": {
    "sector": "Spinward Marches",
    "hex": "1910"
  }
}
```

## Updated Tools Manifest

All tools are defined in the `tools.json` file with proper schemas that define:
- Required and optional parameters
- Parameter types and descriptions
- Default values where applicable

## API Client Implementation

The TypeScript client (`traveller-map-client.ts`) has been updated with methods for all endpoints:

1. **get_universe()** - Get list of all sectors
2. **get_sector()** - Get sector data in various formats
3. **search()** - Search for sectors, subsectors, worlds, or regions
4. **get_route()** - Calculate routes between locations
5. **get_sector_metadata()** - Get sector metadata
6. **get_hex_data()** - Get data for a specific hex
7. **get_sector_image()** - Get an image of a sector
8. **get_subsector_image()** - Get an image of a subsector
9. **search_worlds()** - Search for worlds by name
10. **get_world_info()** - Get detailed world information

## Testing Results

All new tools have been tested and verified to work correctly:

- ✅ World search returns accurate results
- ✅ World information retrieval works correctly
- ✅ Subsector image endpoint is accessible
- ✅ Sector image endpoint is accessible

## Usage

The server can be started with:
```bash
node /Users/katherinemasseau/Documents/Code/node/traveller-map-mcp/dist/server.js
```

Once running, the server will automatically be available to Qwen through the MCP protocol, providing access to all Traveller Map API functionality.