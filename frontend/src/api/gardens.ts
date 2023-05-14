import axios from 'axios';
import { PlantInfo } from './plants';

// api call using axios to get user from database

const apiURL = process.env.REACT_APP_PLANTLY_API_URL;

export const getGardens = async () => {
    const response = await axios.get(apiURL + '/gardens');
    console.log(response.data);
    return response.data;
}

export const getGarden = async (id: number) => {
    const response = await axios.get(apiURL + '/gardens/' + id);
    console.log(response.data);
    return response.data;
}

export const getGardenByName = async (name: string) => {
    const response = await axios.get(apiURL + '/gardens/name/' + name);
    console.log(response.data);
    return response.data;
}

export const getPlantsInGarden = async (gardenId: number) => {
    const response = await axios.get<PlantInfo[]>(apiURL + '/gardens/' + gardenId + '/plants');
    console.log(response.data);
    return response.data;
}
