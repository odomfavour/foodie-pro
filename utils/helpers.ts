export const convertToDMS = (lat: number, lng: number) => {
  const toDMS = (deg: number, isLat: boolean) => {
    const d = Math.floor(Math.abs(deg));
    const m = Math.floor((Math.abs(deg) - d) * 60);
    const s = ((Math.abs(deg) - d - m / 60) * 3600).toFixed(1);
    const direction = isLat ? (deg >= 0 ? 'N' : 'S') : deg >= 0 ? 'E' : 'W';
    return `${d}°${m}'${s}" ${direction}`;
  };
  return `${toDMS(lat, true)}, ${toDMS(lng, false)}`;
};

export const formatNumberWithCommas = (
  value: string | number
): string | number => {
  const cleanValue = value?.toString().replace(/[^\d.]/g, '');

  const number = parseFloat(cleanValue);

  if (isNaN(number)) return '';

  return number.toLocaleString('en-US');
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateToReadableString = (dateStr: string): string => {
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    month: 'short', // "Apr"
    day: 'numeric', // "14"
    year: 'numeric', // "2025"
    hour: '2-digit', // "10"
    minute: '2-digit', // "38"
    hour12: false, // 24-hour format
  };

  const formatted = new Intl.DateTimeFormat('en-US', options).format(date);
  return formatted.replace(/,/g, ''); // remove commas to match desired format
};

export const getInitials = (name?: string) => {
  if (!name) return '';
  const [first = '', second = ''] = name.trim().split(' ');
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();
};
