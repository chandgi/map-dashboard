# Maps Quiz - Geography Learning Platform

An interactive geography quiz application built with Next.js, featuring country flags, capitals, and maps to test your knowledge of world geography. Enhanced with Figma integration for high-quality flag and map visuals.

## Features

- 🌍 **Multiple Quiz Types**: Test your knowledge with flags, capitals, maps, or mixed quizzes
- 🎯 **Difficulty Levels**: Choose from easy, medium, or hard difficulty settings
- 📊 **Progress Tracking**: Real-time score tracking and progress indicators
- 📱 **Mobile Responsive**: Optimized for both desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js 15 and optimized for speed
- 🎨 **Modern UI**: Clean, accessible interface with Tailwind CSS
- 🎨 **Figma Integration**: High-quality flag and map images from Figma designs

## Quiz Types

### 🏴 Flag Recognition
Identify countries by their flags with multiple-choice questions.

### 🏛️ Capital Cities
Test your knowledge of world capitals.

### �️ Map Recognition
Identify countries by their geographical outlines and shapes.

### �🔀 Mixed Mode
Combination of flag, capital, and map questions for a comprehensive challenge.

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm
- Neon Database account (free tier available)
- Figma account (for asset integration)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. **Database Setup:**
   - Create a free account at [Neon](https://neon.tech)
   - Create a new database project
   - Copy your database connection string
   - Rename `.env.example` to `.env.local`
   - Add your database URL to `.env.local`:
   ```bash
   DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require"
   ```

4. **Figma Integration Setup (Optional):**
   - Get your Figma Personal Access Token:
     1. Go to [Figma Developer Settings](https://www.figma.com/developers/api#access-tokens)
     2. Click "Get personal access token"
     3. Generate a new token
   - Extract your Figma file key from the URL:
     - Example: `https://www.figma.com/file/ABC123/File-Name`
     - The file key is `ABC123`
   - Add to `.env.local`:
   ```bash
   FIGMA_ACCESS_TOKEN="your_figma_personal_access_token"
   FIGMA_FILE_KEY="your_figma_file_key"
   ```

5. **Database Migration and Seeding:**
```bash
# Generate and push database schema
npm run db:push

# Seed the database with initial data
npm run db:seed

# Sync Figma assets (optional, requires Figma credentials)
npm run figma:sync
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

### Figma Asset Synchronization

The application can automatically extract flag and map images from your Figma design file:

```bash
# Sync assets from Figma to database
npm run figma:sync
```

This command will:
- Connect to your Figma file using the API
- Extract flag and map components
- Match them to countries in the database
- Update the database with Figma image URLs
- Display detailed progress and results

**Note**: Figma integration is optional. The app works with emoji flags as fallback.

### Database Management

```bash
# View your database in Drizzle Studio
npm run db:studio

# Generate migrations after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Sync Figma assets
npm run figma:sync
```

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   ├── countries/     # Country data endpoints
│   │   ├── capitals/      # Capital data endpoints
│   │   └── figma-assets/  # Figma integration endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── QuizCard.tsx      # Individual quiz question display
│   ├── QuizComponent.tsx # Main quiz logic
│   ├── QuizProgress.tsx  # Progress tracking
│   ├── QuizResults.tsx   # Results display
│   └── QuizSetup.tsx     # Quiz configuration
├── data/
│   └── countries.ts      # Country data and utilities
├── db/                   # Database configuration
│   ├── schema.ts         # Database schema
│   ├── queries.ts        # Database queries
│   ├── seed.ts          # Database seeding
│   └── index.ts         # Database connection
├── scripts/
│   └── sync-figma-assets.ts # Figma synchronization script
├── types/
│   └── quiz.ts          # TypeScript type definitions
└── utils/
    ├── figma.ts         # Figma API integration
    └── quiz.ts          # Quiz generation and scoring logic
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Design Integration**: Figma API
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Database Schema

The application uses a robust PostgreSQL schema with the following tables:

### Core Tables
- **countries**: Complete country data with ISO codes, flags, capitals, Figma URLs, and geographical information
- **states**: States/provinces with relationship to countries
- **cities**: Cities including capitals with geographical data
- **users**: User profiles and authentication data

### Quiz System
- **quiz_sessions**: Individual quiz attempts with scoring and timing
- **quiz_questions**: Detailed question attempts and answers
- **user_stats**: Aggregated user performance statistics

### Figma Integration
- **flagFigmaUrl**: URLs to flag images from Figma
- **mapFigmaUrl**: URLs to map images from Figma

### Key Features
- Referential integrity with foreign keys
- Optimized indexes for fast queries
- Support for anonymous and authenticated users
- Comprehensive geographical data
- Dynamic asset management from Figma

## Figma Integration Details

### Asset Detection
The Figma integration automatically detects:
- **Flags**: Components containing "flag" in the name or related keywords
- **Maps**: Components containing "map", "outline", "country" in the name
- **Country Codes**: Extracts ISO 2/3-letter codes from component names
- **Country Names**: Matches full country names in component names

### Supported Naming Patterns
- `Flag_US`, `US_Flag`, `flag-us`
- `Map_France`, `France_Map`, `map-fr`
- `United States Flag`, `Germany Map`
- Components with country ISO codes (US, GB, FR, DE, etc.)

### Image Quality
- SVG format for scalable quality
- 2x scale for high-resolution displays
- Automatic fallback to emoji flags if Figma images unavailable

## Features in Detail

### Quiz Generation
- Dynamic question generation from country database
- Randomized answer options
- Difficulty-based question selection
- Support for flag, capital, and map-based questions

### Scoring System
- Real-time score calculation
- Percentage-based results
- Performance grading (Excellent, Great, Good, etc.)

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for various screen sizes
- High-quality images on all devices

### Asset Management
- Automatic Figma synchronization
- Fallback to emoji flags
- Optimized image loading
- CDN-ready image URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Country data sourced from public geographical databases
- Flag emojis provided by Unicode Consortium
- Icons by Lucide React
- Design assets integrated via Figma API
