import Seed from './seed';

export interface User {
    id: number;
    name: string;
    points: number;
    inventory: Seed[];
}

export default User;