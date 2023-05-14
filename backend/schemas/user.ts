import Seed from './seed';

export interface User {
    id: number;
    name: string;
    points: number;
    seed: Seed[];
}

export default User;