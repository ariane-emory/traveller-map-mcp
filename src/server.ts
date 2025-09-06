import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  CallToolResult,
  ListToolsRequestSchema,
  ListToolsResult,
} from '@modelcontextprotocol/sdk/types.js';

// Import our Traveller Map API client
import { TravellerMapClient } from './traveller-map-client.js';
import * as fs from 'fs';
import * as path from 'path';

import * as https from 'https';

// Load tools manifest
const tools_manifest_path = path.join(__dirname, 'tools.json');
const tools_manifest = JSON.parse(fs.readFileSync(tools_manifest_path, 'utf-8'));

/**
 * Traveller Map MCP Server
 * 
 * This server provides access to the Traveller Map API through MCP tools.
 */
class TravellerMapServer {
  private server: Server;
  private traveller_map_client: TravellerMapClient;

  constructor() {
    this.server = new Server(
      { name: 'traveller-map', version: '0.1.0' },
      { capabilities: { tools: {} } }
    );
    
    this.traveller_map_client = new TravellerMapClient();
    
    // Set up request handlers
    this.setup_handlers();
  }

  private setup_handlers(): void {
    // Handle tool calls
    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        return await this.handle_call_tool(request.params.name, request.params.arguments);
      }
    );
    
    // Handle tool listings
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      async () => {
        return await this.handle_list_tools();
      }
    );
  }

  private async handle_list_tools(): Promise<ListToolsResult> {
    return {
      tools: tools_manifest.tools
    };
  }

  private async handle_call_tool(name: string, args: any): Promise<CallToolResult> {
    try {
      switch (name) {
        case 'get_universe':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.traveller_map_client.get_universe(), null, 2)
            }]
          };
          
        case 'get_sector':
          if (!args.sector) {
            throw new Error('Missing required argument: sector');
          }
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.traveller_map_client.get_sector(args.sector, args.format), null, 2)
            }]
          };
          
        case 'get_route':
          if (!args.start || !args.end) {
            throw new Error('Missing required arguments: start and end');
          }
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.traveller_map_client.get_route(args.start, args.end, args.jumps), null, 2)
            }]
          };
          
        case 'get_sector_metadata':
          if (!args.sector) {
            throw new Error('Missing required argument: sector');
          }
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.traveller_map_client.get_sector_metadata(args.sector), null, 2)
            }]
          };
          
        case 'get_hex_data':
          if (!args.sector || !args.hex) {
            throw new Error('Missing required arguments: sector and hex');
          }
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.traveller_map_client.get_hex_data(args.sector, args.hex), null, 2)
            }]
          };
          
        case 'get_sector_image':
          if (!args.sector) {
            throw new Error('Missing required argument: sector');
          }
          try {
            const image_buffer = await this.traveller_map_client.get_sector_image(
              args.sector, 
              { 
                style: args.style || 'poster',
                width: args.width,
                height: args.height
              }
            );
            
            // For now, we'll return a message with image info since we can't easily return binary data
            // In a full implementation, you might save the image to a file and return the path
            return {
              content: [{
                type: 'text',
                text: `Sector image retrieved for sector: ${args.sector}. Image size: ${image_buffer.length} bytes. Style: ${args.style || 'poster'}.`
              }]
            };
          } catch (error) {
            throw new Error(`Failed to retrieve sector image: ${error instanceof Error ? error.message : String(error)}`);
          };
          
        case 'get_subsector_image':
          if (!args.sector || !args.subsector) {
            throw new Error('Missing required arguments: sector and subsector');
          }
          try {
            const image_buffer = await this.traveller_map_client.get_subsector_image(
              args.sector, 
              args.subsector,
              { 
                style: args.style || 'poster',
                width: args.width,
                height: args.height
              }
            );
            
            // For now, we'll return a message with image info since we can't easily return binary data
            // In a full implementation, you might save the image to a file and return the path
            return {
              content: [{
                type: 'text',
                text: `Subsector image retrieved for sector: ${args.sector}, subsector: ${args.subsector}. Image size: ${image_buffer.length} bytes. Style: ${args.style || 'poster'}.`
              }]
            };
          } catch (error) {
            throw new Error(`Failed to retrieve subsector image: ${error instanceof Error ? error.message : String(error)}`);
          };

        case 'get_worlds_in_jump_range':
          if (!args.sector || !args.hex || args.jump_distance === undefined) {
            throw new Error('Missing required arguments: sector, hex, and jump_distance');
          }
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(await this.traveller_map_client.get_worlds_in_jump_range(
                args.sector, 
                args.hex, 
                args.jump_distance
              ), null, 2)
            }]
          };

        case 'traveller_map_search':
          if (!args.query) {
            throw new Error('Missing required argument: query');
          }
          const search_result = await this.traveller_map_client.search(args.query);
          const formatted = args.formatted !== undefined ? args.formatted : true;
          return {
            content: [{
              type: 'text',
              text: formatted ? JSON.stringify(search_result, null, 2) : JSON.stringify(search_result)
            }]
          };
          
        case 'get_world_info':
          if (!args.sector || !args.hex) {
            throw new Error('Missing required arguments: sector and hex');
          }
          
        case 'get_world_wiki_url':
          return await this.handle_get_world_wiki_url(args);
          
        case 'get_subsector_wiki_url':
          return await this.handle_get_subsector_wiki_url(args);
          
        case 'get_sector_wiki_url':
          return await this.handle_get_sector_wiki_url(args);
          
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Error calling tool ${name}: ${error instanceof Error ? error.message : String(error)}`
        }],
        isError: true
      };
    }
  }

  private async handle_get_world_wiki_url(args: any): Promise<CallToolResult> {
    if (!args.world_name) {
      throw new Error('Missing required argument: world_name');
    }
    const wiki_url = this.traveller_map_client.get_world_wiki_url(
      args.world_name, 
      args.sector_name, 
      args.hex
    );
    return {
      content: [{
        type: 'text',
        text: wiki_url
      }]
    };
  }

  private async handle_get_subsector_wiki_url(args: any): Promise<CallToolResult> {
    if (!args.subsector_name) {
      throw new Error('Missing required argument: subsector_name');
    }
    const wiki_url = this.traveller_map_client.get_subsector_wiki_url(args.subsector_name);
    return {
      content: [{
        type: 'text',
        text: wiki_url
      }]
    };
  }

  private async handle_get_sector_wiki_url(args: any): Promise<CallToolResult> {
    if (!args.sector_name) {
      throw new Error('Missing required argument: sector_name');
    }
    const wiki_url = this.traveller_map_client.get_sector_wiki_url(args.sector_name);
    return {
      content: [{
        type: 'text',
        text: wiki_url
      }]
    };
  }

  /**
   * Start the MCP server
   */
  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    // console.log('Traveller Map MCP server running on stdio');
  }
}

// Only run the server if this file is executed directly
if (require.main === module) {
  const server = new TravellerMapServer();
  server.run().catch(console.error);
}

export { TravellerMapServer };
