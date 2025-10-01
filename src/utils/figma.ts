import { Api } from 'figma-api';

interface FigmaNode {
  id: string;
  name: string;
  children?: FigmaNode[];
  [key: string]: unknown;
}

interface FigmaPage {
  id: string;
  name: string;
  children?: FigmaNode[];
  [key: string]: unknown;
}

export interface FigmaAsset {
  id: string;
  name: string;
  type: 'flag' | 'map';
  countryCode: string;
  imageUrl?: string;
}

export class FigmaAssetManager {
  private api: Api;
  private fileKey: string;

  constructor(accessToken: string, fileKey: string) {
    this.api = new Api({ personalAccessToken: accessToken });
    this.fileKey = fileKey;
  }

  async getFileStructure() {
    try {
      const file = await this.api.getFile(this.fileKey);
      return file;
    } catch (error) {
      console.error('Error fetching Figma file:', error);
      throw error;
    }
  }

  async extractAssets(): Promise<FigmaAsset[]> {
    try {
      const file = await this.getFileStructure();
      const assets: FigmaAsset[] = [];

      // Recursively search for flag and map components
      const searchNodes = (nodes: FigmaNode[]) => {
        nodes.forEach(node => {
          const nodeName = node.name.toLowerCase();
          
          // Detect flags (look for patterns like "flag", country names, or ISO codes)
          if (nodeName.includes('flag') || this.isCountryFlag(nodeName)) {
            const countryCode = this.extractCountryCode(nodeName);
            if (countryCode) {
              assets.push({
                id: node.id,
                name: node.name,
                type: 'flag',
                countryCode: countryCode
              });
            }
          }
          
          // Detect maps (look for patterns like "map", "outline", country names)
          if (nodeName.includes('map') || nodeName.includes('outline') || this.isCountryMap(nodeName)) {
            const countryCode = this.extractCountryCode(nodeName);
            if (countryCode) {
              assets.push({
                id: node.id,
                name: node.name,
                type: 'map',
                countryCode: countryCode
              });
            }
          }

          // Recursively search child nodes
          if (node.children) {
            searchNodes(node.children);
          }
        });
      };

      // Search through all pages
      file.document.children.forEach((page: FigmaPage) => {
        if (page.children) {
          searchNodes(page.children);
        }
      });

      return assets;
    } catch (error) {
      console.error('Error extracting assets:', error);
      throw error;
    }
  }

  async getAssetImages(assets: FigmaAsset[]): Promise<FigmaAsset[]> {
    try {
      if (assets.length === 0) return assets;
      
      const nodeIds = assets.map(asset => asset.id);
      const images = await this.api.getImages(this.fileKey, {
        ids: nodeIds,
        format: 'svg',
        scale: 2
      });

      // Map image URLs to assets
      return assets.map(asset => ({
        ...asset,
        imageUrl: images.images[asset.id]
      }));
    } catch (error) {
      console.error('Error fetching asset images:', error);
      throw error;
    }
  }

  private isCountryFlag(name: string): boolean {
    const flagKeywords = ['flag', 'banner', '🏴', '🏳️'];
    return flagKeywords.some(keyword => name.includes(keyword));
  }

  private isCountryMap(name: string): boolean {
    const mapKeywords = ['map', 'outline', 'silhouette', 'border', 'country'];
    return mapKeywords.some(keyword => name.includes(keyword));
  }

  private extractCountryCode(name: string): string | null {
    // Common country codes and patterns
    const patterns = [
      /\b([A-Z]{2})\b/, // ISO 2-letter codes (US, GB, FR)
      /\b([A-Z]{3})\b/, // ISO 3-letter codes (USA, GBR, FRA)
    ];

    for (const pattern of patterns) {
      const match = name.toUpperCase().match(pattern);
      if (match) {
        return match[1];
      }
    }

    // Country name mapping
    const countryNameMap: { [key: string]: string } = {
      'united states': 'US',
      'america': 'US',
      'usa': 'US',
      'united kingdom': 'GB',
      'britain': 'GB',
      'england': 'GB',
      'france': 'FR',
      'germany': 'DE',
      'japan': 'JP',
      'china': 'CN',
      'india': 'IN',
      'brazil': 'BR',
      'canada': 'CA',
      'australia': 'AU',
      'italy': 'IT',
      'spain': 'ES',
      'russia': 'RU',
      'mexico': 'MX',
      'south africa': 'ZA',
      'egypt': 'EG',
      'nigeria': 'NG',
      'south korea': 'KR',
      'thailand': 'TH',
      'argentina': 'AR'
    };

    const lowerName = name.toLowerCase();
    for (const [country, code] of Object.entries(countryNameMap)) {
      if (lowerName.includes(country)) {
        return code;
      }
    }

    return null;
  }
}

// Export a function to initialize the manager
export function createFigmaAssetManager() {
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;
  
  if (!accessToken || !fileKey) {
    throw new Error('Figma access token and file key are required. Please set FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY in your environment variables.');
  }
  
  return new FigmaAssetManager(accessToken, fileKey);
}
