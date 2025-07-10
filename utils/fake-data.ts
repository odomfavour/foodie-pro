export const assets = [
  {
    size: 100,
    unit: 'Square meter (m2)',
    date: '8 Aug, 2025',
    status: 'Active',
  },
  {
    size: 200,
    unit: 'Square meter (m2)',
    date: '8 Sep, 2025',
    status: 'Active',
  },
  {
    size: 300,
    unit: 'Square meter (m2)',
    date: '8 Oct, 2025',
    status: 'Active',
  },
  {
    size: 400,
    unit: 'Square meter (m2)',
    date: '8 Nov, 2025',
    status: 'Active',
  },
];

export const assetTypes = [
  { name: 'Land', createdDate: '8 Aug, 2025', status: 'Active' },
  { name: 'Apartment', createdDate: '8 Sep, 2025', status: 'Active' },
  { name: 'Duplex', createdDate: '8 Oct, 2025', status: 'Active' },
  { name: 'Semi Detach Duplex', createdDate: '8 Nov, 2025', status: 'Active' },
];

export const locations = [
  {
    country: 'Nigeria',
    state: 'Lagos',
    city: '8 Aug, 2025',
    mapLocation: 'Yes',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
  {
    country: 'Nigeria',
    state: 'Abuja',
    city: '8 Sep, 2025',
    mapLocation: 'Yes',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
  {
    country: 'Nigeria',
    state: 'Ogun',
    city: '8 Oct, 2025',
    mapLocation: 'No',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
  {
    country: 'Nigeria',
    state: 'Port Harcourt',
    city: '8 Nov, 2025',
    mapLocation: 'Yes',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
];

export const landmarks = [
  {
    name: 'Epe town hall',
    location: 'Epe, Lagos Nigeria',
    city: 'Epe',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
  {
    name: 'Lekki toll gate',
    location: 'Lekki, Lagos Nigeria',
    city: 'Lekki',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
  {
    name: 'Ikorodo train station',
    location: 'Ikorodu, Lagos Nigeria',
    city: 'Ikorodu',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
  {
    name: 'Abuja Int, Airport',
    location: 'Wuse, Abuja Nigeria',
    city: 'Wuse',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
];

export const assetLocations = [
  {
    name: 'Danjuda Express Land',
    description: 'This is a land located by the...',
    assetType: 'Land',
    location: 'Yes',
    map: 'View map',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
  {
    name: 'Black Rock Apartments',
    description: '12 block of apartments wit...',
    assetType: 'Apartment',
    location: 'Yes',
    map: 'View map',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
  {
    name: 'Coaster Road Free Land',
    description: 'This is the land FG realloca...',
    assetType: 'Land',
    location: 'No',
    map: 'View map',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
  {
    name: 'Danjuda Express',
    description: 'This is a land located by the so...',
    assetType: 'Land',
    location: 'Yes',
    map: 'View map',
    status: 'Active',
    createdDate: '8 Aug, 2025',
  },
];

export const properties = [
  {
    id: 1,
    name: 'Haven Court 3, Epe',
    address: 'Kings Court Lekki Phase 3',
    size: 700,
    status: 'Selling',
    price: 15000000,
    image: 'land.png',
    rooms: 3,
    baths: 1,
  },
  {
    id: 2,
    name: 'Justice Ville, Ajah',
    address: 'Benjamin way, Epe Road',
    size: 350,
    rooms: 4,
    baths: 5,
    status: 'Selling',
    price: 15000000,
    image: 'land.png',
  },
  {
    id: 3,
    name: 'Haven Court 3, Epe',
    address: 'Kings Court Lekki Phase 3',
    size: 700,
    status: 'Sold',
    price: 15000000,
    image: 'land.png',
    rooms: 3,
    baths: 1,
  },
  {
    id: 4,
    name: 'Justice Ville, Ajah',
    address: 'Benjamin way, Epe Road',
    size: 350,
    rooms: 4,
    baths: 5,
    status: 'Sold',
    price: 15000000,
    image: 'land.png',
  },
];

export const userProperties = [
  {
    id: 1,
    name: 'Sapphire Court',
    price: 500000,
    paid: 500000,
    balance: 500000,
    status: 'isActive',
  },
  {
    id: 2,
    name: 'Sapphire Court',
    price: 500000,
    paid: 500000,
    balance: 500000,
    status: 'isActive',
  },
  {
    id: 3,
    name: 'Sapphire Court',
    price: 500000,
    paid: 500000,
    balance: 500000,
    status: 'isActive',
  },
  {
    id: 4,
    name: 'Sapphire Court',
    price: 500000,
    paid: 500000,
    balance: 500000,
    status: 'isActive',
  },
];

export const userTransactions = [
  {
    id: 'TXN-00192',
    type: 'Property Booking',
    amount: 50000,
    createdAt: 'Feb 5, 2024',
    status: 'success',
  },
  {
    id: 'TXN-00192',
    type: 'Property Booking',
    amount: 50000,
    createdAt: 'Feb 5, 2024',
    status: 'success',
  },
  {
    id: 'TXN-00192',
    type: 'Property Booking',
    amount: 50000,
    createdAt: 'Feb 5, 2024',
    status: 'success',
  },
];

export const referrals = [
  {
    name: 'Mary Emmanuel',
    email: 'maryemmanuel@gmail.com',
    amount: 2000,
    createdAt: 'Mar 10, 2025',
    status: 'active',
  },
  {
    name: 'Mary Emmanuel',
    email: 'maryemmanuel@gmail.com',
    amount: 2000,
    createdAt: 'Mar 10, 2025',
    status: 'active',
  },
  {
    name: 'Mary Emmanuel',
    email: 'maryemmanuel@gmail.com',
    amount: 2000,
    createdAt: 'Mar 10, 2025',
    status: 'active',
  },
];

export const userVerifications = [
  {
    id: 1,
    type: 'email',
    status: 'verified',
    note: '',
    createdAt: 'Feb 5, 2024',
  },
  {
    id: 2,
    type: 'email',
    status: 'verified',
    note: '',
    createdAt: 'Feb 5, 2024',
  },
  {
    id: 3,
    type: 'email',
    status: 'verified',
    note: '',
    createdAt: 'Feb 5, 2024',
  },
  {
    id: 4,
    type: 'email',
    status: 'Cancelled',
    note: 'Blurry',
    createdAt: 'Feb 5, 2024',
  },
];

export const payments = [
  {
    date: 'Mar 1, 2025',
    amount: 5000,
    method: 'Paystack',
    receipt: '',
  },
  {
    date: 'Mar 1, 2025',
    amount: 5000,
    method: 'Paystack',
    receipt: '',
  },
  {
    date: 'Mar 1, 2025',
    amount: 5000,
    method: 'Paystack',
    receipt: '',
  },
  {
    date: 'Mar 1, 2025',
    amount: 5000,
    method: 'Paystack',
    receipt: '',
  },
];

export enum UserGroup {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum LoginType {
  PASSWORD = 'PASSWORD',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum AssetSizeUnit {
  SQM = 'SQM',
  SQFT = 'SQFT',
  ACRE = 'ACRE',
  HECTARE = 'HECTARE',
}
export const countries = [
  { name: 'Nigeria', code: 'NG' },
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
];
