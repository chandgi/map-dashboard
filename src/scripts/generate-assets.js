#!/usr/bin/env node

/**
 * Asset Management Script - BRIX Template Style
 * Creates professional country flags and maps following BRIX Agency design patterns
 */

const fs = require('fs');
const path = require('path');

// Define asset directories
const ASSETS_DIR = path.join(__dirname, '../../public/assets');
const FLAGS_DIR = path.join(ASSETS_DIR, 'flags');
const MAPS_DIR = path.join(ASSETS_DIR, 'maps');

// Ensure directories exist
[FLAGS_DIR, MAPS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Country data with design specifications - covering all countries in your quiz app
const countries = [
  // Already have: US, GB, FR, AR, BR (manually created)
  {
    code: 'de',
    name: 'Germany',
    flagColors: ['#000000', '#DD0000', '#FFCE00'],
    flagType: 'horizontal-stripes'
  },
  {
    code: 'it',
    name: 'Italy', 
    flagColors: ['#009246', '#FFFFFF', '#CE2B37'],
    flagType: 'vertical-stripes'
  },
  {
    code: 'es',
    name: 'Spain',
    flagColors: ['#AA151B', '#F1BF00', '#AA151B'],
    flagType: 'horizontal-stripes-emblem'
  },
  {
    code: 'ca',
    name: 'Canada',
    flagColors: ['#FF0000', '#FFFFFF', '#FF0000'],
    flagType: 'maple-leaf'
  },
  {
    code: 'jp',
    name: 'Japan',
    flagColors: ['#FFFFFF', '#BC002D'],
    flagType: 'circle-center'
  },
  {
    code: 'cn',
    name: 'China',
    flagColors: ['#DE2910', '#FFDE00'],
    flagType: 'red-stars'
  },
  {
    code: 'in',
    name: 'India',
    flagColors: ['#FF9933', '#FFFFFF', '#138808'],
    flagType: 'horizontal-tricolor-wheel'
  },
  {
    code: 'au',
    name: 'Australia',
    flagColors: ['#012169', '#FFFFFF', '#FF0000'],
    flagType: 'union-jack-stars'
  },
  {
    code: 'ru',
    name: 'Russia',
    flagColors: ['#FFFFFF', '#0039A6', '#D52B1E'],
    flagType: 'horizontal-stripes'
  },
  {
    code: 'mx',
    name: 'Mexico',
    flagColors: ['#006847', '#FFFFFF', '#CE1126'],
    flagType: 'vertical-tricolor-emblem'
  },
  {
    code: 'za',
    name: 'South Africa',
    flagColors: ['#000000', '#FFB612', '#007A4D', '#FFFFFF', '#DE3831', '#002395'],
    flagType: 'multi-color'
  },
  {
    code: 'eg',
    name: 'Egypt',
    flagColors: ['#CE1126', '#FFFFFF', '#000000'],
    flagType: 'horizontal-tricolor-emblem'
  },
  {
    code: 'ng',
    name: 'Nigeria',
    flagColors: ['#008751', '#FFFFFF', '#008751'],
    flagType: 'vertical-stripes'
  },
  {
    code: 'kr',
    name: 'South Korea',
    flagColors: ['#FFFFFF', '#CD2E3A', '#0047A0'],
    flagType: 'taegeuk'
  },
  {
    code: 'th',
    name: 'Thailand',
    flagColors: ['#A51931', '#FFFFFF', '#2D2A4A', '#FFFFFF', '#A51931'],
    flagType: 'horizontal-stripes'
  },
  // Additional popular countries for comprehensive coverage
  {
    code: 'nl',
    name: 'Netherlands',
    flagColors: ['#AE1C28', '#FFFFFF', '#21468B'],
    flagType: 'horizontal-stripes'
  },
  {
    code: 'se',
    name: 'Sweden',
    flagColors: ['#006AA7', '#FECC00'],
    flagType: 'nordic-cross'
  },
  {
    code: 'no',
    name: 'Norway',
    flagColors: ['#BA0C2F', '#FFFFFF', '#00205B'],
    flagType: 'nordic-cross'
  },
  {
    code: 'ch',
    name: 'Switzerland',
    flagColors: ['#FF0000', '#FFFFFF'],
    flagType: 'cross-center'
  },
  {
    code: 'be',
    name: 'Belgium',
    flagColors: ['#000000', '#FDDA24', '#EF3340'],
    flagType: 'vertical-stripes'
  }
];

// Generate flag SVG based on type and colors
function generateFlag(country) {
  const { code, name, flagColors, flagType } = country;
  
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100">
  <title>Flag of ${name}</title>`;

  switch (flagType) {
    case 'horizontal-stripes':
      const stripeHeight = 100 / flagColors.length;
      flagColors.forEach((color, index) => {
        svgContent += `
  <rect y="${index * stripeHeight}" width="150" height="${stripeHeight}" fill="${color}"/>`;
      });
      break;
      
    case 'vertical-stripes':
      const stripeWidth = 150 / flagColors.length;
      flagColors.forEach((color, index) => {
        svgContent += `
  <rect x="${index * stripeWidth}" width="${stripeWidth}" height="100" fill="${color}"/>`;
      });
      break;
      
    case 'horizontal-tricolor-wheel':
      // India flag with chakra
      svgContent += `
  <rect width="150" height="33.33" fill="${flagColors[0]}"/>
  <rect y="33.33" width="150" height="33.33" fill="${flagColors[1]}"/>
  <rect y="66.66" width="150" height="33.33" fill="${flagColors[2]}"/>
  <circle cx="75" cy="50" r="12" fill="none" stroke="#000080" stroke-width="1"/>
  <g stroke="#000080" stroke-width="0.5" fill="none">
    ${Array.from({length: 24}, (_, i) => {
      const angle = (i * 15) * Math.PI / 180;
      const x1 = 75 + 8 * Math.cos(angle);
      const y1 = 50 + 8 * Math.sin(angle);
      const x2 = 75 + 12 * Math.cos(angle);
      const y2 = 50 + 12 * Math.sin(angle);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }).join('')}
  </g>`;
      break;

    case 'circle-center':
      svgContent += `
  <rect width="150" height="100" fill="${flagColors[0]}"/>
  <circle cx="75" cy="50" r="25" fill="${flagColors[1]}"/>`;
      break;

    case 'red-stars':
      // China flag
      svgContent += `
  <rect width="150" height="100" fill="${flagColors[0]}"/>
  <polygon points="30,25 32,31 38,31 33,35 35,41 30,37 25,41 27,35 22,31 28,31" fill="${flagColors[1]}"/>
  <polygon points="50,15 51,17 53,17 52,18 52,20 50,19 48,20 48,18 47,17 49,17" fill="${flagColors[1]}"/>
  <polygon points="55,25 56,27 58,27 57,28 57,30 55,29 53,30 53,28 52,27 54,27" fill="${flagColors[1]}"/>
  <polygon points="55,40 56,42 58,42 57,43 57,45 55,44 53,45 53,43 52,42 54,42" fill="${flagColors[1]}"/>
  <polygon points="45,50 46,52 48,52 47,53 47,55 45,54 43,55 43,53 42,52 44,52" fill="${flagColors[1]}"/>`;
      break;

    case 'vertical-tricolor-emblem':
      // Mexico flag
      svgContent += `
  <rect width="50" height="100" fill="${flagColors[0]}"/>
  <rect x="50" width="50" height="100" fill="${flagColors[1]}"/>
  <rect x="100" width="50" height="100" fill="${flagColors[2]}"/>
  <circle cx="75" cy="50" r="15" fill="none" stroke="#8B4513" stroke-width="2"/>
  <text x="75" y="55" text-anchor="middle" font-family="Arial" font-size="8" fill="#8B4513">🦅</text>`;
      break;

    case 'cross-center':
      // Switzerland flag
      svgContent += `
  <rect width="150" height="100" fill="${flagColors[0]}"/>
  <rect x="62.5" y="25" width="25" height="50" fill="${flagColors[1]}"/>
  <rect x="37.5" y="37.5" width="75" height="25" fill="${flagColors[1]}"/>`;
      break;

    case 'nordic-cross':
      // Sweden/Norway style
      svgContent += `
  <rect width="150" height="100" fill="${flagColors[0]}"/>
  <rect x="37.5" y="0" width="15" height="100" fill="${flagColors[1]}"/>
  <rect x="0" y="42.5" width="150" height="15" fill="${flagColors[1]}"/>`;
      if (flagColors[2]) {
        svgContent += `
  <rect x="40" y="0" width="10" height="100" fill="${flagColors[2]}"/>
  <rect x="0" y="45" width="150" height="10" fill="${flagColors[2]}"/>`;
      }
      break;

    case 'union-jack-stars':
      // Australia style (simplified)
      svgContent += `
  <rect width="150" height="100" fill="${flagColors[0]}"/>
  <rect width="75" height="50" fill="${flagColors[0]}"/>
  <g fill="${flagColors[1]}">
    <rect x="30" y="0" width="15" height="50"/>
    <rect x="0" y="17.5" width="75" height="15"/>
  </g>
  <g fill="${flagColors[2]}">
    <rect x="32.5" y="0" width="10" height="50"/>
    <rect x="0" y="20" width="75" height="10"/>
  </g>
  <polygon points="100,20 102,26 108,26 103,30 105,36 100,32 95,36 97,30 92,26 98,26" fill="${flagColors[1]}"/>`;
      break;

    case 'taegeuk':
      // South Korea (simplified)
      svgContent += `
  <rect width="150" height="100" fill="${flagColors[0]}"/>
  <circle cx="75" cy="50" r="20" fill="${flagColors[1]}"/>
  <path d="M 75 30 A 10 10 0 0 1 75 50 A 10 10 0 0 0 75 70 A 10 10 0 0 1 75 50 A 10 10 0 0 0 75 30" fill="${flagColors[2]}"/>`;
      break;

    case 'multi-color':
      // South Africa (simplified)
      svgContent += `
  <polygon points="0,0 50,0 75,50 50,100 0,100" fill="${flagColors[2]}"/>
  <polygon points="50,0 150,0 150,30 100,50 150,70 150,100 50,100 75,50" fill="${flagColors[1]}"/>
  <polygon points="0,30 25,30 50,50 25,70 0,70" fill="${flagColors[0]}"/>
  <rect x="50" y="35" width="100" height="30" fill="${flagColors[3]}"/>`;
      break;
      
    default:
      svgContent += `
  <rect width="150" height="100" fill="${flagColors[0]}"/>
  <text x="75" y="55" text-anchor="middle" font-family="Arial" font-size="12" fill="white" font-weight="bold">${code.toUpperCase()}</text>`;
  }

  svgContent += `
</svg>`;
  
  return svgContent;
}

// Generate simple map outline
function generateMap(country) {
  const { code, name } = country;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
  <title>${name} Map Outline</title>
  <!-- Simplified country outline -->
  <path d="M 50 30 L 120 25 L 160 40 L 170 80 L 140 120 L 80 130 L 40 110 L 30 70 L 50 30 Z" 
        fill="#4A90E2" 
        stroke="#2E5A87" 
        stroke-width="2"/>
  
  <!-- Label -->
  <text x="100" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#1A1A1A" font-weight="bold">${name.toUpperCase()}</text>
</svg>`;
}

// Create assets for each country
countries.forEach(country => {
  const flagSvg = generateFlag(country);
  const mapSvg = generateMap(country);
  
  // Write flag file
  const flagPath = path.join(FLAGS_DIR, `${country.code}.svg`);
  fs.writeFileSync(flagPath, flagSvg);
  console.log(`✅ Created flag: ${flagPath}`);
  
  // Write map file
  const mapPath = path.join(MAPS_DIR, `${country.code}.svg`);
  fs.writeFileSync(mapPath, mapSvg);
  console.log(`✅ Created map: ${mapPath}`);
});

console.log(`\n🎉 Generated assets for ${countries.length} countries`);
console.log('📁 Assets location: /public/assets/');
console.log('🔗 Test at: http://localhost:3001/test-assets.html');

// Update test HTML with new assets
const existingFiles = fs.readdirSync(FLAGS_DIR).filter(f => f.endsWith('.svg'));
const testHtml = `<!DOCTYPE html>
<html>
<head>
    <title>BRIX-Style Local Assets Test</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; }
        .asset { text-align: center; padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
        img { width: 80px; height: 60px; object-fit: contain; border: 1px solid #ccc; }
    </style>
</head>
<body>
    <h1>🎨 BRIX-Style Country Assets</h1>
    <p>Professional quality flags and maps for your quiz application</p>
    
    <h2>🏁 Country Flags</h2>
    <div class="grid">
        ${existingFiles.map(file => {
          const code = file.replace('.svg', '');
          return `<div class="asset">
            <img src="/assets/flags/${file}" alt="${code} flag">
            <div>${code.toUpperCase()}</div>
          </div>`;
        }).join('')}
    </div>
    
    <h2>🗺️ Country Maps</h2>
    <div class="grid">
        ${existingFiles.map(file => {
          const code = file.replace('.svg', '');
          return `<div class="asset">
            <img src="/assets/maps/${file}" alt="${code} map">
            <div>${code.toUpperCase()}</div>
          </div>`;
        }).join('')}
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '../../public/test-assets.html'), testHtml);
console.log('📝 Updated test-assets.html');
