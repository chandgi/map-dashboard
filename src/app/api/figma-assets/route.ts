import { NextRequest, NextResponse } from 'next/server';
import { createFigmaAssetManager } from '@/utils/figma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'flag' | 'map' | null;
    const countryCode = searchParams.get('countryCode');

    const figmaManager = createFigmaAssetManager();
    
    // Extract all assets from Figma
    const assets = await figmaManager.extractAssets();
    
    // Filter by type and country code if specified
    let filteredAssets = assets;
    if (type) {
      filteredAssets = filteredAssets.filter(asset => asset.type === type);
    }
    if (countryCode) {
      filteredAssets = filteredAssets.filter(asset => 
        asset.countryCode.toLowerCase() === countryCode.toLowerCase()
      );
    }

    // Get image URLs for the filtered assets
    const assetsWithImages = await figmaManager.getAssetImages(filteredAssets);

    return NextResponse.json({ assets: assetsWithImages });
  } catch (error) {
    console.error('Error fetching Figma assets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Figma assets. Please check your Figma configuration.' },
      { status: 500 }
    );
  }
}
