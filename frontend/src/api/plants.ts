import axios from 'axios';

// api call using axios to get user from database

const apiURL = process.env.REACT_APP_PLANTLY_API_URL;

const getPlants = async () => {
    const response = await axios.get(apiURL + '/plants');
    console.log(response.data);
    return response.data;
}

const getPlant = async (id: number) => {
    const response = await axios.get(apiURL + '/plants/' + id);
    console.log(response.data);
    return response.data;
}

const getPlantSpecies = async (speciesId: number) => {
    const response = await axios.get(apiURL + '/plants/species/' + speciesId);
    console.log(response.data);
    return response.data;
}