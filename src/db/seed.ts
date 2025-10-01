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
  {
    name: 'Italy',
    code: 'ITA',
    alpha2Code: 'IT',
    alpha3Code: 'ITA',
    numericCode: 380,
    capital: 'Rome',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 60360000,
    area: 301340,
    flagEmoji: '🇮🇹',
    latitude: 41.8719,
    longitude: 12.5674,
    currencies: JSON.stringify([{ code: 'EUR', name: 'Euro', symbol: '€' }]),
    languages: JSON.stringify([{ code: 'it', name: 'Italian' }]),
    timezones: JSON.stringify(['UTC+01:00']),
  },
  {
    name: 'Spain',
    code: 'ESP',
    alpha2Code: 'ES',
    alpha3Code: 'ESP',
    numericCode: 724,
    capital: 'Madrid',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 47350000,
    area: 505990,
    flagEmoji: '🇪🇸',
    latitude: 40.4637,
    longitude: -3.7492,
    currencies: JSON.stringify([{ code: 'EUR', name: 'Euro', symbol: '€' }]),
    languages: JSON.stringify([{ code: 'es', name: 'Spanish' }]),
    timezones: JSON.stringify(['UTC+01:00']),
  },
  {
    name: 'Russia',
    code: 'RUS',
    alpha2Code: 'RU',
    alpha3Code: 'RUS',
    numericCode: 643,
    capital: 'Moscow',
    continent: 'Asia',
    region: 'Europe',
    subregion: 'Eastern Europe',
    population: 146170000,
    area: 17098242,
    flagEmoji: '🇷🇺',
    latitude: 61.5240,
    longitude: 105.3188,
    currencies: JSON.stringify([{ code: 'RUB', name: 'Russian Ruble', symbol: '₽' }]),
    languages: JSON.stringify([{ code: 'ru', name: 'Russian' }]),
    timezones: JSON.stringify(['UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00', 'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00', 'UTC+12:00']),
  },
  {
    name: 'Mexico',
    code: 'MEX',
    alpha2Code: 'MX',
    alpha3Code: 'MEX',
    numericCode: 484,
    capital: 'Mexico City',
    continent: 'North America',
    region: 'Americas',
    subregion: 'Central America',
    population: 128900000,
    area: 1964375,
    flagEmoji: '🇲🇽',
    latitude: 23.6345,
    longitude: -102.5528,
    currencies: JSON.stringify([{ code: 'MXN', name: 'Mexican Peso', symbol: '$' }]),
    languages: JSON.stringify([{ code: 'es', name: 'Spanish' }]),
    timezones: JSON.stringify(['UTC-08:00', 'UTC-07:00', 'UTC-06:00']),
  },
  {
    name: 'South Africa',
    code: 'ZAF',
    alpha2Code: 'ZA',
    alpha3Code: 'ZAF',
    numericCode: 710,
    capital: 'Cape Town',
    continent: 'Africa',
    region: 'Africa',
    subregion: 'Southern Africa',
    population: 59310000,
    area: 1221037,
    flagEmoji: '🇿🇦',
    latitude: -30.5595,
    longitude: 22.9375,
    currencies: JSON.stringify([{ code: 'ZAR', name: 'South African Rand', symbol: 'R' }]),
    languages: JSON.stringify([{ code: 'af', name: 'Afrikaans' }, { code: 'en', name: 'English' }]),
    timezones: JSON.stringify(['UTC+02:00']),
  },
  {
    name: 'Egypt',
    code: 'EGY',
    alpha2Code: 'EG',
    alpha3Code: 'EGY',
    numericCode: 818,
    capital: 'Cairo',
    continent: 'Africa',
    region: 'Africa',
    subregion: 'Northern Africa',
    population: 102330000,
    area: 1001450,
    flagEmoji: '🇪🇬',
    latitude: 26.0975,
    longitude: 31.1343,
    currencies: JSON.stringify([{ code: 'EGP', name: 'Egyptian Pound', symbol: '£' }]),
    languages: JSON.stringify([{ code: 'ar', name: 'Arabic' }]),
    timezones: JSON.stringify(['UTC+02:00']),
  },
  {
    name: 'Nigeria',
    code: 'NGA',
    alpha2Code: 'NG',
    alpha3Code: 'NGA',
    numericCode: 566,
    capital: 'Abuja',
    continent: 'Africa',
    region: 'Africa',
    subregion: 'Western Africa',
    population: 206140000,
    area: 923768,
    flagEmoji: '🇳🇬',
    latitude: 9.0820,
    longitude: 8.6753,
    currencies: JSON.stringify([{ code: 'NGN', name: 'Nigerian Naira', symbol: '₦' }]),
    languages: JSON.stringify([{ code: 'en', name: 'English' }]),
    timezones: JSON.stringify(['UTC+01:00']),
  },
  {
    name: 'South Korea',
    code: 'KOR',
    alpha2Code: 'KR',
    alpha3Code: 'KOR',
    numericCode: 410,
    capital: 'Seoul',
    continent: 'Asia',
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 51780000,
    area: 100210,
    flagEmoji: '🇰🇷',
    latitude: 35.9078,
    longitude: 127.7669,
    currencies: JSON.stringify([{ code: 'KRW', name: 'South Korean Won', symbol: '₩' }]),
    languages: JSON.stringify([{ code: 'ko', name: 'Korean' }]),
    timezones: JSON.stringify(['UTC+09:00']),
  },
  {
    name: 'Thailand',
    code: 'THA',
    alpha2Code: 'TH',
    alpha3Code: 'THA',
    numericCode: 764,
    capital: 'Bangkok',
    continent: 'Asia',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    population: 69800000,
    area: 513120,
    flagEmoji: '🇹🇭',
    latitude: 15.8700,
    longitude: 100.9925,
    currencies: JSON.stringify([{ code: 'THB', name: 'Thai Baht', symbol: '฿' }]),
    languages: JSON.stringify([{ code: 'th', name: 'Thai' }]),
    timezones: JSON.stringify(['UTC+07:00']),
  },
  {
    name: 'Argentina',
    code: 'ARG',
    alpha2Code: 'AR',
    alpha3Code: 'ARG',
    numericCode: 32,
    capital: 'Buenos Aires',
    continent: 'South America',
    region: 'Americas',
    subregion: 'South America',
    population: 45380000,
    area: 2780400,
    flagEmoji: '🇦🇷',
    latitude: -38.4161,
    longitude: -63.6167,
    currencies: JSON.stringify([{ code: 'ARS', name: 'Argentine Peso', symbol: '$' }]),
    languages: JSON.stringify([{ code: 'es', name: 'Spanish' }]),
    timezones: JSON.stringify(['UTC-03:00']),
  },
  {
    name: 'Netherlands',
    code: 'NLD',
    alpha2Code: 'NL',
    alpha3Code: 'NLD',
    numericCode: 528,
    capital: 'Amsterdam',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Western Europe',
    population: 17440000,
    area: 41543,
    flagEmoji: '🇳🇱',
    latitude: 52.1326,
    longitude: 5.2913,
    currencies: JSON.stringify([{ code: 'EUR', name: 'Euro', symbol: '€' }]),
    languages: JSON.stringify([{ code: 'nl', name: 'Dutch' }]),
    timezones: JSON.stringify(['UTC+01:00']),
  },
  {
    name: 'Sweden',
    code: 'SWE',
    alpha2Code: 'SE',
    alpha3Code: 'SWE',
    numericCode: 752,
    capital: 'Stockholm',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 10350000,
    area: 450295,
    flagEmoji: '🇸🇪',
    latitude: 60.1282,
    longitude: 18.6435,
    currencies: JSON.stringify([{ code: 'SEK', name: 'Swedish Krona', symbol: 'kr' }]),
    languages: JSON.stringify([{ code: 'sv', name: 'Swedish' }]),
    timezones: JSON.stringify(['UTC+01:00']),
  },
  {
    name: 'Norway',
    code: 'NOR',
    alpha2Code: 'NO',
    alpha3Code: 'NOR',
    numericCode: 578,
    capital: 'Oslo',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 5379000,
    area: 323802,
    flagEmoji: '🇳🇴',
    latitude: 60.4720,
    longitude: 8.4689,
    currencies: JSON.stringify([{ code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' }]),
    languages: JSON.stringify([{ code: 'no', name: 'Norwegian' }]),
    timezones: JSON.stringify(['UTC+01:00']),
  },
  {
    name: 'Switzerland',
    code: 'CHE',
    alpha2Code: 'CH',
    alpha3Code: 'CHE',
    numericCode: 756,
    capital: 'Bern',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Western Europe',
    population: 8670000,
    area: 41285,
    flagEmoji: '🇨🇭',
    latitude: 46.8182,
    longitude: 8.2275,
    currencies: JSON.stringify([{ code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' }]),
    languages: JSON.stringify([{ code: 'de', name: 'German' }, { code: 'fr', name: 'French' }, { code: 'it', name: 'Italian' }]),
    timezones: JSON.stringify(['UTC+01:00']),
  },
  {
    name: 'Belgium',
    code: 'BEL',
    alpha2Code: 'BE',
    alpha3Code: 'BEL',
    numericCode: 56,
    capital: 'Brussels',
    continent: 'Europe',
    region: 'Europe',
    subregion: 'Western Europe',
    population: 11590000,
    area: 30528,
    flagEmoji: '🇧🇪',
    latitude: 50.5039,
    longitude: 4.4699,
    currencies: JSON.stringify([{ code: 'EUR', name: 'Euro', symbol: '€' }]),
    languages: JSON.stringify([{ code: 'nl', name: 'Dutch' }, { code: 'fr', name: 'French' }, { code: 'de', name: 'German' }]),
    timezones: JSON.stringify(['UTC+01:00']),
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
  // Country capitals based on our expanded countries list
  { name: 'Washington, D.C.', countryCode: 'USA', isCapital: true, population: 705749 },
  { name: 'London', countryCode: 'GBR', isCapital: true, population: 8982000 },
  { name: 'Paris', countryCode: 'FRA', isCapital: true, population: 2161000 },
  { name: 'Berlin', countryCode: 'DEU', isCapital: true, population: 3669491 },
  { name: 'Tokyo', countryCode: 'JPN', isCapital: true, population: 13929286 },
  { name: 'Ottawa', countryCode: 'CAN', isCapital: true, population: 994837 },
  { name: 'Canberra', countryCode: 'AUS', isCapital: true, population: 431380 },
  { name: 'Brasília', countryCode: 'BRA', isCapital: true, population: 3055149 },
  { name: 'New Delhi', countryCode: 'IND', isCapital: true, population: 28514000 },
  { name: 'Beijing', countryCode: 'CHN', isCapital: true, population: 21542000 },
  { name: 'Rome', countryCode: 'ITA', isCapital: true, population: 2873000 },
  { name: 'Madrid', countryCode: 'ESP', isCapital: true, population: 3223000 },
  { name: 'Moscow', countryCode: 'RUS', isCapital: true, population: 12537954 },
  { name: 'Mexico City', countryCode: 'MEX', isCapital: true, population: 21671908 },
  { name: 'Cape Town', countryCode: 'ZAF', isCapital: true, population: 4618000 },
  { name: 'Cairo', countryCode: 'EGY', isCapital: true, population: 10100000 },
  { name: 'Abuja', countryCode: 'NGA', isCapital: true, population: 3278000 },
  { name: 'Seoul', countryCode: 'KOR', isCapital: true, population: 9733509 },
  { name: 'Bangkok', countryCode: 'THA', isCapital: true, population: 8305218 },
  { name: 'Buenos Aires', countryCode: 'ARG', isCapital: true, population: 2890151 },
  { name: 'Amsterdam', countryCode: 'NLD', isCapital: true, population: 872680 },
  { name: 'Stockholm', countryCode: 'SWE', isCapital: true, population: 975551 },
  { name: 'Oslo', countryCode: 'NOR', isCapital: true, population: 697549 },
  { name: 'Bern', countryCode: 'CHE', isCapital: true, population: 133115 },
  { name: 'Brussels', countryCode: 'BEL', isCapital: true, population: 1211000 },
  
  // Some major non-capital cities
  { name: 'New York City', countryCode: 'USA', isCapital: false, population: 8336817 },
  { name: 'Los Angeles', countryCode: 'USA', isCapital: false, population: 3979576 },
  { name: 'Birmingham', countryCode: 'GBR', isCapital: false, population: 1141816 },
  { name: 'Manchester', countryCode: 'GBR', isCapital: false, population: 547899 },
  { name: 'Marseille', countryCode: 'FRA', isCapital: false, population: 861635 },
  { name: 'Lyon', countryCode: 'FRA', isCapital: false, population: 515695 },
  { name: 'Hamburg', countryCode: 'DEU', isCapital: false, population: 1899160 },
  { name: 'Munich', countryCode: 'DEU', isCapital: false, population: 1471508 },
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
