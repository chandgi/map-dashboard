const { Api } = require('figma-api');
require('dotenv').config({ path: '.env.local' });

async function testFigmaAccess() {
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;
  
  console.log('Access Token:', accessToken ? `${accessToken.substring(0, 10)}...` : 'MISSING');
  console.log('File Key:', fileKey);
  
  if (!accessToken || !fileKey) {
    console.error('Missing required environment variables');
    return;
  }
  
  const api = new Api({ personalAccessToken: accessToken });
  
  try {
    console.log('\n🔍 Testing Figma API access...');
    const file = await api.getFile(fileKey);
    console.log('✅ Success! File name:', file.name);
    console.log('📄 Document children:', file.document.children.length);
    
    // List first few pages
    file.document.children.slice(0, 3).forEach((page, index) => {
      console.log(`📑 Page ${index + 1}: ${page.name} (${page.children?.length || 0} children)`);
    });
    
  } catch (error) {
    console.error('❌ Error accessing Figma file:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.message);
    console.error('Data:', error.response?.data);
  }
}

testFigmaAccess();
