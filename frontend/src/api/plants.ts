import axios from 'axios';

// api call using axios to get user from database

const apiURL = process.env.REACT_APP_PLANTLY_API_URL;

export const getPlants = async () => {
    const response = await axios.get(apiURL + '/plants');
    console.log(response.data);
    return response.data;
}

export const getPlant = async (id: number) => {
    const response = await axios.get(apiURL + '/plants/' + id);
    console.log(response.data);
    return response.data;
}

export const getPlantSpecies = async (speciesId: number) => {
    const response = await axios.get(apiURL + '/plants/species/' + speciesId);
    console.log(response.data);
    return response.data;
}

export const getAllPlantSpecies = async () => {
    const response = await axios.get(apiURL + '/species');
    console.log(response.data);
    return response.data;
}

export const putWaterLevel = async (id: number, waterLevel: number) => {
    const response = await axios.put(apiURL + '/plants/' + id + '/water-level', { waterLevel: waterLevel });
    console.log(response.data);
    return response.data;
}

export interface PlantInfo {
    Id: number,
    SpeciesId: number,
    Growth: number,
    WaterLevel: number,
    Description: string,
    WaterLow: number,
    WaterHigh: number,
    LossRate: number,
    Name: string,
}