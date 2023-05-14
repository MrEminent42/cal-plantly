import Plant from './plant';

interface Garden {
  id: number;
  name: string;
  plants: Plant[];
  latitude: number;
}

export default Garden;
