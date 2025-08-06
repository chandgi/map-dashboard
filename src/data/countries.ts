import { Country } from '@/types/quiz';

export const COUNTRIES: Country[] = [
  {
    code: 'US',
    name: 'United States',
    capital: 'Washington, D.C.',
    continent: 'North America',
    flag: '🇺🇸',
    population: 331900000,
    area: 9833517
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    capital: 'London',
    continent: 'Europe',
    flag: '🇬🇧',
    population: 67220000,
    area: 243610
  },
  {
    code: 'FR',
    name: 'France',
    capital: 'Paris',
    continent: 'Europe',
    flag: '🇫🇷',
    population: 67390000,
    area: 643801
  },
  {
    code: 'DE',
    name: 'Germany',
    capital: 'Berlin',
    continent: 'Europe',
    flag: '🇩🇪',
    population: 83240000,
    area: 357114
  },
  {
    code: 'JP',
    name: 'Japan',
    capital: 'Tokyo',
    continent: 'Asia',
    flag: '🇯🇵',
    population: 125800000,
    area: 377930
  },
  {
    code: 'CN',
    name: 'China',
    capital: 'Beijing',
    continent: 'Asia',
    flag: '🇨🇳',
    population: 1439320000,
    area: 9596960
  },
  {
    code: 'IN',
    name: 'India',
    capital: 'New Delhi',
    continent: 'Asia',
    flag: '🇮🇳',
    population: 1380000000,
    area: 3287263
  },
  {
    code: 'BR',
    name: 'Brazil',
    capital: 'Brasília',
    continent: 'South America',
    flag: '🇧🇷',
    population: 212600000,
    area: 8514877
  },
  {
    code: 'CA',
    name: 'Canada',
    capital: 'Ottawa',
    continent: 'North America',
    flag: '🇨🇦',
    population: 38000000,
    area: 9984670
  },
  {
    code: 'AU',
    name: 'Australia',
    capital: 'Canberra',
    continent: 'Oceania',
    flag: '🇦🇺',
    population: 25500000,
    area: 7692024
  },
  {
    code: 'IT',
    name: 'Italy',
    capital: 'Rome',
    continent: 'Europe',
    flag: '🇮🇹',
    population: 60360000,
    area: 301340
  },
  {
    code: 'ES',
    name: 'Spain',
    capital: 'Madrid',
    continent: 'Europe',
    flag: '🇪🇸',
    population: 47350000,
    area: 505990
  },
  {
    code: 'RU',
    name: 'Russia',
    capital: 'Moscow',
    continent: 'Asia',
    flag: '🇷🇺',
    population: 146170000,
    area: 17098242
  },
  {
    code: 'MX',
    name: 'Mexico',
    capital: 'Mexico City',
    continent: 'North America',
    flag: '🇲🇽',
    population: 128900000,
    area: 1964375
  },
  {
    code: 'ZA',
    name: 'South Africa',
    capital: 'Cape Town',
    continent: 'Africa',
    flag: '🇿🇦',
    population: 59310000,
    area: 1221037
  },
  {
    code: 'EG',
    name: 'Egypt',
    capital: 'Cairo',
    continent: 'Africa',
    flag: '🇪🇬',
    population: 102330000,
    area: 1001450
  },
  {
    code: 'NG',
    name: 'Nigeria',
    capital: 'Abuja',
    continent: 'Africa',
    flag: '🇳🇬',
    population: 206140000,
    area: 923768
  },
  {
    code: 'KR',
    name: 'South Korea',
    capital: 'Seoul',
    continent: 'Asia',
    flag: '🇰🇷',
    population: 51780000,
    area: 100210
  },
  {
    code: 'TH',
    name: 'Thailand',
    capital: 'Bangkok',
    continent: 'Asia',
    flag: '🇹🇭',
    population: 69800000,
    area: 513120
  },
  {
    code: 'AR',
    name: 'Argentina',
    capital: 'Buenos Aires',
    continent: 'South America',
    flag: '🇦🇷',
    population: 45380000,
    area: 2780400
  }
];

export const getCountryByCode = (code: string): Country | undefined => {
  return COUNTRIES.find(country => country.code === code);
};

export const getCountriesByContinent = (continent: string): Country[] => {
  return COUNTRIES.filter(country => country.continent === continent);
};

export const getRandomCountries = (count: number): Country[] => {
  const shuffled = [...COUNTRIES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
