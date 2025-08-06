import { config } from 'dotenv';

// Load environment variables first
config({ path: '.env.local' });

// Verify DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables');
  console.log('Please check your .env.local file');
  process.exit(1);
}

// Now import database after environment is loaded
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { countries, states, cities } from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const countriesData = [
  {
    name: 'United States',
    code: 'USA',
    alpha2Code: 'US',
    alpha3Code: 'USA',
    numericCode: 840,
    capital: 'Washington, D.C.',
    continent: 'North America',
    region: 'Americas',
    subregion: 'Northern America',
    population: 331900000,
    area: 9833517,
    flagEmoji: '🇺🇸',
    latitude: 39.8283,
    longitude: -98.5795,
    currencies: JSON.stringify([{ code: 'USD', name: 'US Dollar', symbol: '$' }]),
    languages: JSON.stringify([{ code: 'en', name: 'English' }]),
    timezones: JSON.stringify(['UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00']),
  },
  {
    name: 'United Kingdom',
    code: 'GBR',
    alpha2Code: 'GB',
    alpha3Code: 'GBR',
    numericCode: 826,
    capital: 'London',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 67220000,
    area: 243610,
    flagEmoji: '🇬🇧',
    latitude: 55.3781,
    longitude: -3.4360,
    currencies: JSON.stringify([{ code: 'GBP', name: 'British Pound', symbol: '£' }]),
    languages: JSON.stringify([{ code: 'en', name: 'English' }]),
    timezones: JSON.stringify(['UTC+00:00']),
  },
  {
    name: 'France',
    code: 'FRA',
    alpha2Code: 'FR',
    alpha3Code: 'FRA',
    numericCode: 250,
    capital: 'Paris',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Western Europe',
    population: 67390000,
    area: 643801,
    flagEmoji: '🇫🇷',
    latitude: 46.2276,
    longitude: 2.2137,
    currencies: JSON.stringify([{ code: 'EUR', name: 'Euro', symbol: '€' }]),
    languages: JSON.stringify([{ code: 'fr', name: 'French' }]),
    timezones: JSON.stringify(['UTC+01:00']),
  },
  {
    name: 'Germany',
    code: 'DEU',
    alpha2Code: 'DE',
    alpha3Code: 'DEU',
    numericCode: 276,
    capital: 'Berlin',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Central Europe',
    population: 83240000,
    area: 357114,
    flagEmoji: '🇩🇪',
    latitude: 51.1657,
    longitude: 10.4515,
    currencies: JSON.stringify([{ code: 'EUR', name: 'Euro', symbol: '€' }]),
    languages: JSON.stringify([{ code: 'de', name: 'German' }]),
    timezones: JSON.stringify(['UTC+01:00']),
  },
  {
    name: 'Japan',
    code: 'JPN',
    alpha2Code: 'JP',
    alpha3Code: 'JPN',
    numericCode: 392,
    capital: 'Tokyo',
    continent: 'Asia',
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 125800000,
    area: 377930,
    flagEmoji: '🇯🇵',
    latitude: 36.2048,
    longitude: 138.2529,
    currencies: JSON.stringify([{ code: 'JPY', name: 'Japanese Yen', symbol: '¥' }]),
    languages: JSON.stringify([{ code: 'ja', name: 'Japanese' }]),
    timezones: JSON.stringify(['UTC+09:00']),
  },
  {
    name: 'Canada',
    code: 'CAN',
    alpha2Code: 'CA',
    alpha3Code: 'CAN',
    numericCode: 124,
    capital: 'Ottawa',
    continent: 'North America',
    region: 'Americas',
    subregion: 'Northern America',
    population: 38000000,
    area: 9984670,
    flagEmoji: '🇨🇦',
    latitude: 56.1304,
    longitude: -106.3468,
    currencies: JSON.stringify([{ code: 'CAD', name: 'Canadian Dollar', symbol: '$' }]),
    languages: JSON.stringify([{ code: 'en', name: 'English' }, { code: 'fr', name: 'French' }]),
    timezones: JSON.stringify(['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30']),
  },
  {
    name: 'Australia',
    code: 'AUS',
    alpha2Code: 'AU',
    alpha3Code: 'AUS',
    numericCode: 36,
    capital: 'Canberra',
    continent: 'Oceania',
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    population: 25500000,
    area: 7692024,
    flagEmoji: '🇦🇺',
    latitude: -25.2744,
    longitude: 133.7751,
    currencies: JSON.stringify([{ code: 'AUD', name: 'Australian Dollar', symbol: '$' }]),
    languages: JSON.stringify([{ code: 'en', name: 'English' }]),
    timezones: JSON.stringify(['UTC+05:00', 'UTC+06:30', 'UTC+07:00', 'UTC+08:00', 'UTC+09:30', 'UTC+10:00', 'UTC+10:30', 'UTC+11:00']),
  },
  {
    name: 'Brazil',
    code: 'BRA',
    alpha2Code: 'BR',
    alpha3Code: 'BRA',
    numericCode: 76,
    capital: 'Brasília',
    continent: 'South America',
    region: 'Americas',
    subregion: 'South America',
    population: 212600000,
    area: 8514877,
    flagEmoji: '🇧🇷',
    latitude: -14.2350,
    longitude: -51.9253,
    currencies: JSON.stringify([{ code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }]),
    languages: JSON.stringify([{ code: 'pt', name: 'Portuguese' }]),
    timezones: JSON.stringify(['UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00']),
  },
  {
    name: 'India',
    code: 'IND',
    alpha2Code: 'IN',
    alpha3Code: 'IND',
    numericCode: 356,
    capital: 'New Delhi',
    continent: 'Asia',
    region: 'Asia',
    subregion: 'Southern Asia',
    population: 1380000000,
    area: 3287263,
    flagEmoji: '🇮🇳',
    latitude: 20.5937,
    longitude: 78.9629,
    currencies: JSON.stringify([{ code: 'INR', name: 'Indian Rupee', symbol: '₹' }]),
    languages: JSON.stringify([{ code: 'hi', name: 'Hindi' }, { code: 'en', name: 'English' }]),
    timezones: JSON.stringify(['UTC+05:30']),
  },
  {
    name: 'China',
    code: 'CHN',
    alpha2Code: 'CN',
    alpha3Code: 'CHN',
    numericCode: 156,
    capital: 'Beijing',
    continent: 'Asia',
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 1439320000,
    area: 9596960,
    flagEmoji: '🇨🇳',
    latitude: 35.8617,
    longitude: 104.1954,
    currencies: JSON.stringify([{ code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }]),
    languages: JSON.stringify([{ code: 'zh', name: 'Chinese' }]),
    timezones: JSON.stringify(['UTC+08:00']),
  },
];

const usStatesData = [
  // All 50 US States + DC
  { name: 'Alabama', code: 'AL', capital: 'Montgomery', population: 5024279, area: 135767 },
  { name: 'Alaska', code: 'AK', capital: 'Juneau', population: 733391, area: 1723337 },
  { name: 'Arizona', code: 'AZ', capital: 'Phoenix', population: 7151502, area: 295234 },
  { name: 'Arkansas', code: 'AR', capital: 'Little Rock', population: 3011524, area: 137732 },
  { name: 'California', code: 'CA', capital: 'Sacramento', population: 39538223, area: 423967 },
  { name: 'Colorado', code: 'CO', capital: 'Denver', population: 5773714, area: 269601 },
  { name: 'Connecticut', code: 'CT', capital: 'Hartford', population: 3605944, area: 14357 },
  { name: 'Delaware', code: 'DE', capital: 'Dover', population: 989948, area: 6446 },
  { name: 'Florida', code: 'FL', capital: 'Tallahassee', population: 21538187, area: 170312 },
  { name: 'Georgia', code: 'GA', capital: 'Atlanta', population: 10711908, area: 153910 },
  { name: 'Hawaii', code: 'HI', capital: 'Honolulu', population: 1455271, area: 28313 },
  { name: 'Idaho', code: 'ID', capital: 'Boise', population: 1839106, area: 216443 },
  { name: 'Illinois', code: 'IL', capital: 'Springfield', population: 12812508, area: 149995 },
  { name: 'Indiana', code: 'IN', capital: 'Indianapolis', population: 6785528, area: 94326 },
  { name: 'Iowa', code: 'IA', capital: 'Des Moines', population: 3190369, area: 145746 },
  { name: 'Kansas', code: 'KS', capital: 'Topeka', population: 2937880, area: 213100 },
  { name: 'Kentucky', code: 'KY', capital: 'Frankfort', population: 4505836, area: 104656 },
  { name: 'Louisiana', code: 'LA', capital: 'Baton Rouge', population: 4657757, area: 135659 },
  { name: 'Maine', code: 'ME', capital: 'Augusta', population: 1395722, area: 91633 },
  { name: 'Maryland', code: 'MD', capital: 'Annapolis', population: 6177224, area: 32131 },
  { name: 'Massachusetts', code: 'MA', capital: 'Boston', population: 7001399, area: 27336 },
  { name: 'Michigan', code: 'MI', capital: 'Lansing', population: 10037261, area: 250487 },
  { name: 'Minnesota', code: 'MN', capital: 'Saint Paul', population: 5737915, area: 225163 },
  { name: 'Mississippi', code: 'MS', capital: 'Jackson', population: 2961279, area: 125438 },
  { name: 'Missouri', code: 'MO', capital: 'Jefferson City', population: 6196010, area: 180540 },
  { name: 'Montana', code: 'MT', capital: 'Helena', population: 1084225, area: 380831 },
  { name: 'Nebraska', code: 'NE', capital: 'Lincoln', population: 1961504, area: 200330 },
  { name: 'Nevada', code: 'NV', capital: 'Carson City', population: 3104614, area: 286380 },
  { name: 'New Hampshire', code: 'NH', capital: 'Concord', population: 1395231, area: 24214 },
  { name: 'New Jersey', code: 'NJ', capital: 'Trenton', population: 9288994, area: 22591 },
  { name: 'New Mexico', code: 'NM', capital: 'Santa Fe', population: 2117522, area: 314917 },
  { name: 'New York', code: 'NY', capital: 'Albany', population: 20201249, area: 141297 },
  { name: 'North Carolina', code: 'NC', capital: 'Raleigh', population: 10439388, area: 139391 },
  { name: 'North Dakota', code: 'ND', capital: 'Bismarck', population: 779094, area: 183108 },
  { name: 'Ohio', code: 'OH', capital: 'Columbus', population: 11799448, area: 116098 },
  { name: 'Oklahoma', code: 'OK', capital: 'Oklahoma City', population: 3959353, area: 181037 },
  { name: 'Oregon', code: 'OR', capital: 'Salem', population: 4237256, area: 254799 },
  { name: 'Pennsylvania', code: 'PA', capital: 'Harrisburg', population: 13002700, area: 119280 },
  { name: 'Rhode Island', code: 'RI', capital: 'Providence', population: 1097379, area: 4001 },
  { name: 'South Carolina', code: 'SC', capital: 'Columbia', population: 5118425, area: 82933 },
  { name: 'South Dakota', code: 'SD', capital: 'Pierre', population: 886667, area: 199729 },
  { name: 'Tennessee', code: 'TN', capital: 'Nashville', population: 6910840, area: 109153 },
  { name: 'Texas', code: 'TX', capital: 'Austin', population: 29145505, area: 695662 },
  { name: 'Utah', code: 'UT', capital: 'Salt Lake City', population: 3271616, area: 219882 },
  { name: 'Vermont', code: 'VT', capital: 'Montpelier', population: 643077, area: 24906 },
  { name: 'Virginia', code: 'VA', capital: 'Richmond', population: 8631393, area: 110787 },
  { name: 'Washington', code: 'WA', capital: 'Olympia', population: 7705281, area: 184661 },
  { name: 'West Virginia', code: 'WV', capital: 'Charleston', population: 1793716, area: 62756 },
  { name: 'Wisconsin', code: 'WI', capital: 'Madison', population: 5893718, area: 169635 },
  { name: 'Wyoming', code: 'WY', capital: 'Cheyenne', population: 576851, area: 253335 },
  { name: 'District of Columbia', code: 'DC', capital: 'Washington', population: 705749, area: 177 },
];

const canadianProvincesData = [
  { name: 'Alberta', code: 'AB', capital: 'Edmonton', population: 4428112, area: 661848 },
  { name: 'British Columbia', code: 'BC', capital: 'Victoria', population: 5214805, area: 944735 },
  { name: 'Manitoba', code: 'MB', capital: 'Winnipeg', population: 1383765, area: 647797 },
  { name: 'New Brunswick', code: 'NB', capital: 'Fredericton', population: 789225, area: 72908 },
  { name: 'Newfoundland and Labrador', code: 'NL', capital: 'St. John\'s', population: 520553, area: 405212 },
  { name: 'Northwest Territories', code: 'NT', capital: 'Yellowknife', population: 45504, area: 1346106 },
  { name: 'Nova Scotia', code: 'NS', capital: 'Halifax', population: 992055, area: 55284 },
  { name: 'Nunavut', code: 'NU', capital: 'Iqaluit', population: 39403, area: 2093190 },
  { name: 'Ontario', code: 'ON', capital: 'Toronto', population: 14826276, area: 1076395 },
  { name: 'Prince Edward Island', code: 'PE', capital: 'Charlottetown', population: 164318, area: 5660 },
  { name: 'Quebec', code: 'QC', capital: 'Quebec City', population: 8604495, area: 1542056 },
  { name: 'Saskatchewan', code: 'SK', capital: 'Regina', population: 1179844, area: 651036 },
  { name: 'Yukon', code: 'YT', capital: 'Whitehorse', population: 42986, area: 482443 },
];

const australianStatesData = [
  { name: 'New South Wales', code: 'NSW', capital: 'Sydney', population: 8166369, area: 800642 },
  { name: 'Victoria', code: 'VIC', capital: 'Melbourne', population: 6681000, area: 227416 },
  { name: 'Queensland', code: 'QLD', capital: 'Brisbane', population: 5206400, area: 1729742 },
  { name: 'Western Australia', code: 'WA', capital: 'Perth', population: 2675797, area: 2527013 },
  { name: 'South Australia', code: 'SA', capital: 'Adelaide', population: 1771703, area: 983482 },
  { name: 'Tasmania', code: 'TAS', capital: 'Hobart', population: 541965, area: 68401 },
  { name: 'Australian Capital Territory', code: 'ACT', capital: 'Canberra', population: 431215, area: 2358 },
  { name: 'Northern Territory', code: 'NT', capital: 'Darwin', population: 249129, area: 1349129 },
];

const germanStatesData = [
  { name: 'Baden-Württemberg', code: 'BW', capital: 'Stuttgart', population: 11124642, area: 35751 },
  { name: 'Bavaria', code: 'BY', capital: 'Munich', population: 13176989, area: 70550 },
  { name: 'Berlin', code: 'BE', capital: 'Berlin', population: 3669491, area: 892 },
  { name: 'Brandenburg', code: 'BB', capital: 'Potsdam', population: 2531071, area: 29654 },
  { name: 'Bremen', code: 'HB', capital: 'Bremen', population: 681202, area: 419 },
  { name: 'Hamburg', code: 'HH', capital: 'Hamburg', population: 1899160, area: 755 },
  { name: 'Hesse', code: 'HE', capital: 'Wiesbaden', population: 6293154, area: 21115 },
  { name: 'Lower Saxony', code: 'NI', capital: 'Hannover', population: 8003421, area: 47593 },
  { name: 'Mecklenburg-Vorpommern', code: 'MV', capital: 'Schwerin', population: 1610774, area: 23214 },
  { name: 'North Rhine-Westphalia', code: 'NW', capital: 'Düsseldorf', population: 17925570, area: 34113 },
  { name: 'Rhineland-Palatinate', code: 'RP', capital: 'Mainz', population: 4098391, area: 19854 },
  { name: 'Saarland', code: 'SL', capital: 'Saarbrücken', population: 990509, area: 2569 },
  { name: 'Saxony', code: 'SN', capital: 'Dresden', population: 4056941, area: 18420 },
  { name: 'Saxony-Anhalt', code: 'ST', capital: 'Magdeburg', population: 2194782, area: 20452 },
  { name: 'Schleswig-Holstein', code: 'SH', capital: 'Kiel', population: 2910875, area: 15804 },
  { name: 'Thuringia', code: 'TH', capital: 'Erfurt', population: 2133378, area: 16202 },
];

const majorCitiesData = [
  // US Cities
  { name: 'Washington, D.C.', countryCode: 'USA', isCapital: true, population: 705749 },
  { name: 'New York City', countryCode: 'USA', isCapital: false, population: 8336817 },
  { name: 'Los Angeles', countryCode: 'USA', isCapital: false, population: 3979576 },
  { name: 'Chicago', countryCode: 'USA', isCapital: false, population: 2693976 },
  
  // UK Cities
  { name: 'London', countryCode: 'GBR', isCapital: true, population: 8982000 },
  { name: 'Birmingham', countryCode: 'GBR', isCapital: false, population: 1141816 },
  { name: 'Manchester', countryCode: 'GBR', isCapital: false, population: 547899 },
  
  // France Cities
  { name: 'Paris', countryCode: 'FRA', isCapital: true, population: 2161000 },
  { name: 'Marseille', countryCode: 'FRA', isCapital: false, population: 861635 },
  { name: 'Lyon', countryCode: 'FRA', isCapital: false, population: 515695 },
  
  // Germany Cities
  { name: 'Berlin', countryCode: 'DEU', isCapital: true, population: 3669491 },
  { name: 'Hamburg', countryCode: 'DEU', isCapital: false, population: 1899160 },
  { name: 'Munich', countryCode: 'DEU', isCapital: false, population: 1471508 },
  
  // Japan Cities
  { name: 'Tokyo', countryCode: 'JPN', isCapital: true, population: 13929286 },
  { name: 'Osaka', countryCode: 'JPN', isCapital: false, population: 2691185 },
  { name: 'Kyoto', countryCode: 'JPN', isCapital: false, population: 1475183 },
];

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data (in reverse order due to foreign key constraints)
    console.log('🧹 Clearing existing data...');
    await db.delete(cities);
    await db.delete(states);
    await db.delete(countries);
    console.log('✅ Existing data cleared');

    // Insert countries
    console.log('📍 Inserting countries...');
    const insertedCountries = await db.insert(countries).values(countriesData).returning();
    console.log(`✅ Inserted ${insertedCountries.length} countries`);

    // Get country IDs for foreign key relationships
    const countryMap = new Map();
    insertedCountries.forEach(country => {
      countryMap.set(country.code, country.id);
    });

    // Insert states/provinces for multiple countries
    console.log('🏛️ Inserting states and provinces...');
    let totalStatesInserted = 0;

    // Insert US states
    const usCountryId = countryMap.get('USA');
    if (usCountryId) {
      const statesWithCountryId = usStatesData.map(state => ({
        ...state,
        countryId: usCountryId,
      }));
      const insertedUsStates = await db.insert(states).values(statesWithCountryId).returning();
      totalStatesInserted += insertedUsStates.length;
      console.log(`✅ Inserted ${insertedUsStates.length} US states`);
    }

    // Insert Canadian provinces
    const canadaCountryId = countryMap.get('CAN');
    if (canadaCountryId) {
      const provincesWithCountryId = canadianProvincesData.map(province => ({
        ...province,
        countryId: canadaCountryId,
      }));
      const insertedCanadianProvinces = await db.insert(states).values(provincesWithCountryId).returning();
      totalStatesInserted += insertedCanadianProvinces.length;
      console.log(`✅ Inserted ${insertedCanadianProvinces.length} Canadian provinces`);
    }

    // Insert Australian states
    const australiaCountryId = countryMap.get('AUS');
    if (australiaCountryId) {
      const australianStatesWithCountryId = australianStatesData.map(state => ({
        ...state,
        countryId: australiaCountryId,
      }));
      const insertedAustralianStates = await db.insert(states).values(australianStatesWithCountryId).returning();
      totalStatesInserted += insertedAustralianStates.length;
      console.log(`✅ Inserted ${insertedAustralianStates.length} Australian states`);
    }

    // Insert German states
    const germanyCountryId = countryMap.get('DEU');
    if (germanyCountryId) {
      const germanStatesWithCountryId = germanStatesData.map(state => ({
        ...state,
        countryId: germanyCountryId,
      }));
      const insertedGermanStates = await db.insert(states).values(germanStatesWithCountryId).returning();
      totalStatesInserted += insertedGermanStates.length;
      console.log(`✅ Inserted ${insertedGermanStates.length} German states`);
    }

    // Insert cities
    console.log('🏙️ Inserting cities...');
    const citiesWithCountryId = majorCitiesData.map(city => ({
      name: city.name,
      countryId: countryMap.get(city.countryCode),
      isCapital: city.isCapital,
      population: city.population,
    })).filter(city => city.countryId); // Only insert cities where we have the country ID

    const insertedCities = await db.insert(cities).values(citiesWithCountryId).returning();
    console.log(`✅ Inserted ${insertedCities.length} cities`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - ${insertedCountries.length} countries`);
    console.log(`   - ${totalStatesInserted} states/provinces`);
    console.log(`   - ${insertedCities.length} cities`);
    console.log('🌎 Geographic coverage:');
    console.log(`   - ${usCountryId ? usStatesData.length : 0} US states`);
    console.log(`   - ${canadaCountryId ? canadianProvincesData.length : 0} Canadian provinces`);
    console.log(`   - ${australiaCountryId ? australianStatesData.length : 0} Australian states`);
    console.log(`   - ${germanyCountryId ? germanStatesData.length : 0} German states`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seed();
