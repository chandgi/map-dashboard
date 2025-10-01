# How to Fix Figma Access for BRIX Agency Template

## Option 1: Make the File Public (Recommended)
1. Open the Figma file: https://www.figma.com/design/MUZsm2fOQ9PE0cciz2jnnM/Country-Flags-and-Country-Maps-_-BRIX-Agency--Community-
2. Click "Share" button in top-right
3. Change permissions to "Anyone with the link can view"
4. This will allow your API to access the assets

## Option 2: Fork/Duplicate the File
1. Open the Figma file
2. Click "Duplicate" to copy it to your account
3. Update FIGMA_FILE_KEY in .env.local with your new file ID
4. The new file will be accessible with your API token

## Option 3: Join BRIX Agency Community
1. Request access to the BRIX Agency Community
2. Get proper permissions for the file
3. Use existing configuration

## Testing After Fix
Run this command to test API access:
```bash
node -e "
const fetch = require('node-fetch');
fetch('http://localhost:3000/api/figma-assets?type=flag&countryCode=US')
  .then(res => res.json())
  .then(data => console.log('API Response:', data))
  .catch(err => console.error('Error:', err));
"
```
