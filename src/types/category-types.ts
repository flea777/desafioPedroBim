export type Category = 'Compact Hatch' | 'Medium Hatch' | 'Sedan' | 'Van' | 'Pickup';

export const categoryRank: { [key in Category]: number } = {
    'Compact Hatch': 1,
    'Medium Hatch': 2,
    'Sedan': 3,
    'Van': 4,
    'Pickup': 5,
  };