import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from '../db/index';
import { countries } from '../db/schema';
import { createFigmaAssetManager, type FigmaAsset } from '../utils/figma';
import { eq } from 'drizzle-orm';

async function syncFigmaAssets() {
  console.log('🎨 Starting Figma assets sync...');

  try {
    // Check if Figma credentials are available
    if (!process.env.FIGMA_ACCESS_TOKEN || !process.env.FIGMA_FILE_KEY) {
      console.log('⚠️  Figma credentials not found. Please set FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY in .env.local');
      console.log('📝 To get these:');
      console.log('   1. Go to Figma → Account Settings → Personal Access Tokens');
      console.log('   2. Create a new token');
      console.log('   3. Extract file key from your Figma URL');
      console.log('   4. Add both to .env.local file');
      return;
    }

    const figmaManager = createFigmaAssetManager();
    
    // Extract assets from Figma
    console.log('🔍 Extracting assets from Figma file...');
    const assets = await figmaManager.extractAssets();
    console.log(`✅ Found ${assets.length} assets in Figma`);

    // Get image URLs
    console.log('🖼️  Fetching image URLs...');
    const assetsWithImages = await figmaManager.getAssetImages(assets);
    
    // Group assets by country code
    const assetsByCountry = assetsWithImages.reduce((acc, asset) => {
      if (!acc[asset.countryCode]) {
        acc[asset.countryCode] = { flags: [], maps: [] };
      }
      if (asset.type === 'flag') {
        acc[asset.countryCode].flags.push(asset);
      } else if (asset.type === 'map') {
        acc[asset.countryCode].maps.push(asset);
      }
      return acc;
    }, {} as Record<string, { flags: FigmaAsset[], maps: FigmaAsset[] }>);

    // Update database with Figma URLs
    console.log('💾 Updating database with Figma URLs...');
    let updatedCount = 0;

    for (const [countryCode, countryAssets] of Object.entries(assetsByCountry)) {
      const flagUrl = countryAssets.flags[0]?.imageUrl;
      const mapUrl = countryAssets.maps[0]?.imageUrl;

      if (flagUrl || mapUrl) {
        try {
          const updateData: { flagFigmaUrl?: string; mapFigmaUrl?: string } = {};
          if (flagUrl) updateData.flagFigmaUrl = flagUrl;
          if (mapUrl) updateData.mapFigmaUrl = mapUrl;

          // Try to update by alpha2Code first, then by code
          let updated = await db.update(countries)
            .set(updateData)
            .where(eq(countries.alpha2Code, countryCode.toUpperCase()))
            .returning();

          if (updated.length === 0) {
            updated = await db.update(countries)
              .set(updateData)
              .where(eq(countries.code, countryCode.toUpperCase()))
              .returning();
          }

          if (updated.length > 0) {
            updatedCount++;
            console.log(`✅ Updated ${updated[0].name} with Figma assets`);
          } else {
            console.log(`⚠️  No country found for code: ${countryCode}`);
          }
        } catch (error) {
          console.error(`❌ Error updating country ${countryCode}:`, error);
        }
      }
    }

    console.log('🎉 Figma assets sync completed!');
    console.log(`📊 Summary:`);
    console.log(`   - Total Figma assets found: ${assets.length}`);
    console.log(`   - Countries updated: ${updatedCount}`);
    console.log(`   - Flags: ${Object.values(assetsByCountry).reduce((sum, c) => sum + c.flags.length, 0)}`);
    console.log(`   - Maps: ${Object.values(assetsByCountry).reduce((sum, c) => sum + c.maps.length, 0)}`);

  } catch (error) {
    console.error('❌ Error syncing Figma assets:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('   - Check your Figma access token is valid');
    console.log('   - Verify the file key is correct');
    console.log('   - Ensure the Figma file is accessible');
    console.log('   - Check that assets in Figma have recognizable names');
  }
}

// Run the sync
syncFigmaAssets();
