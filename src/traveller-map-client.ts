/**
 * Traveller Map API Client
 * 
 * This client provides access to the Traveller Map API endpoints.
 * Documentation: https://travellermap.com/doc/api
 */

// We'll use the built-in fetch API for HTTP requests
// For Node.js versions < 18, you might need to install node-fetch

export class TravellerMapClient {
  private base_url: string;
  
  constructor(base_url: string = 'https://travellermap.com') {
    this.base_url = base_url;
  }
  
  /**
   * Get the list of all sectors in the Traveller universe
   */
  async get_universe(): Promise<any> {
    const response = await fetch(`${this.base_url}/api/universe`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  
  /**
   * Get data for a specific sector
   * @param sector_name Name of the sector
   * @param format Data format (sec, t5ss, json, etc.)
   */
  async get_sector(sector_name: string, format: string = 'sec'): Promise<any> {
    const params = new URLSearchParams({
      sector: sector_name,
      type: format
    });
    
    const response = await fetch(`${this.base_url}/api/sec?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Sector data is returned as text in various formats
    return await response.text();
  }
  
  /**
   * Search for sectors, subsectors, worlds, or regions
   * @param query Search query
   */
  async search(query: string): Promise<any> {
    const params = new URLSearchParams({
      q: query
    });
    
    const response = await fetch(`${this.base_url}/api/search?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  
  /**
   * Get a route between two locations
   * @param start Starting location
   * @param end Ending location
   * @param jumps Number of jumps allowed
   */
  async get_route(start: string, end: string, jumps: number = 4): Promise<any> {
    const params = new URLSearchParams({
      start: start,
      end: end,
      jumps: jumps.toString()
    });
    
    const response = await fetch(`${this.base_url}/api/route?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  
  /**
   * Get metadata for a specific sector
   * @param sector_name Name of the sector
   */
  async get_sector_metadata(sector_name: string): Promise<any> {
    const params = new URLSearchParams({
      sector: sector_name
    });
    
    const response = await fetch(`${this.base_url}/api/metadata?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  
  /**
   * Get data for a specific hex in a sector
   * @param sector_name Name of the sector
   * @param hex Hex location (e.g., "0101")
   */
  async get_hex_data(sector_name: string, hex: string): Promise<any> {
    // Encode the sector name for URL
    const encoded_sector = encodeURIComponent(sector_name);
    
    const response = await fetch(`${this.base_url}/data/${encoded_sector}/${hex}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  
  /**
   * Get an image of a sector
   * @param sector_name Name of the sector
   * @param options Image options
   */
  async get_sector_image(sector_name: string, options: { 
    style?: string; 
    width?: number; 
    height?: number 
  } = {}): Promise<Buffer> {
    const params = new URLSearchParams({
      sector: sector_name,
      style: options.style || 'poster',
      ...(options.width && { width: options.width.toString() }),
      ...(options.height && { height: options.height.toString() })
    });
    
    const response = await fetch(`${this.base_url}/api/poster?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
  }
  
  /**
   * Get an image of a subsector
   * @param sector_name Name of the sector
   * @param subsector Subsector letter (A-P)
   * @param options Image options
   */
  async get_subsector_image(sector_name: string, subsector: string, options: { 
    style?: string; 
    width?: number; 
    height?: number 
  } = {}): Promise<Buffer> {
    // Encode the sector name for URL
    const encoded_sector = encodeURIComponent(sector_name);
    
    const params = new URLSearchParams({
      style: options.style || 'poster',
      ...(options.width && { width: options.width.toString() }),
      ...(options.height && { height: options.height.toString() })
    });
    
    const url = `${this.base_url}/data/${encoded_sector}/${subsector}/image${params.toString() ? '?' + params.toString() : ''}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
  }
  
  /**
   * Get worlds within a jump distance from a specific hex
   * @param sector_name Name of the sector
   * @param hex Hex location (e.g., "2913")
   * @param jump_distance Jump distance (0 through 12)
   */
  async get_worlds_in_jump_range(sector_name: string, hex: string, jump_distance: number): Promise<any> {
    // Validate jump distance
    if (jump_distance < 0 || jump_distance > 12) {
      throw new Error('Jump distance must be between 0 and 12');
    }
    
    // Encode the sector name for URL
    const encoded_sector = encodeURIComponent(sector_name);
    
    const url = `${this.base_url}/data/${encoded_sector}/${hex}/jump/${jump_distance}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  
  /**
   * Construct a wiki URL for a Traveller world
   * @param world_name Name of the world
   * @param sector_name Name of the sector (optional)
   * @param hex Hex location (optional)
   * @returns URL to the Traveller Wiki page for the world
   */
  get_world_wiki_url(world_name: string, sector_name?: string, hex?: string): string {
    // Based on the Traveller Map implementation, world pages use the "(world)" suffix
    let url = `https://wiki.travellerrpg.com/${encodeURIComponent(world_name.replace(/ /g, '_'))}_(world)`;
    if (sector_name && hex) {
      url += `?sector=${encodeURIComponent(sector_name)}&hex=${encodeURIComponent(hex)}`;
    }
    return url;
  }
  
  /**
   * Construct a wiki URL for a Traveller subsector
   * @param subsector_name Name of the subsector
   * @returns URL to the Traveller Wiki page for the subsector
   */
  get_subsector_wiki_url(subsector_name: string): string {
    return `https://wiki.travellerrpg.com/${encodeURIComponent(subsector_name.replace(/ /g, '_'))}_Subsector`;
  }
  
  /**
   * Construct a wiki URL for a Traveller sector
   * @param sector_name Name of the sector
   * @returns URL to the Traveller Wiki page for the sector
   */
  get_sector_wiki_url(sector_name: string): string {
    return `https://wiki.travellerrpg.com/${encodeURIComponent(sector_name.replace(/ /g, '_'))}_Sector`;
  }
  
  
}