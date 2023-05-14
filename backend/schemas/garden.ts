import Plant from './plant';

interface Garden {
  id: number;
  name: string;
  plants: Plant[];
  latitude: number;
  longitude: number;
  radius: number;
}

export default Garden;
