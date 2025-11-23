export type City = {
  id: string;
  name: string;
  country: string;
  population: number;
  area: number;
  image: any;
};

export const cities = [
    {
        id: '1',
        name: 'New York',
        country: 'USA',
        population: 8419600,
        area: 789.4,
        image: require('../assets/images/new-york.jpg'),
    },
    {
        id: '2',
        name: 'Los Angeles',
        country: 'USA',
        population: 3980400,
        area: 1214.9,
        image: require('../assets/images/los-angeles.jpg'),
    },
    {
        id: '3',
        name: 'Chicago',
        country: 'USA',
        population: 2716000,
        area: 606.1,
        image: require('../assets/images/chicago.jpg'),
    },
    {
        id: '4',
        name: 'Chicago',
        country: 'USA',
        population: 2716000,
        area: 606.1,
        image: require('../assets/images/chicago.jpg'),
    }
]