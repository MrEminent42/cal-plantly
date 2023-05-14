import axios from 'axios';

// api call using axios to get user from database

const apiURL = process.env.REACT_APP_PLANTLY_API_URL;

const getGardens = async () => {
    const response = await axios.get(apiURL + '/gardens');
    console.log(response.data);
    return response.data;
}

const getGarden = async (id: number) => {
    const response = await axios.get(apiURL + '/gardens/' + id);
    console.log(response.data);
    return response.data;
}

const getGardenByName = async (name: string) => {
    const response = await axios.get(apiURL + '/gardens/name/' + name);
    console.log(response.data);
    return response.data;
}

const getPlantsInGarden = async (id: number) => {
    const response = await axios.get(apiURL + '/gardens/' + id + '/plants');
    console.log(response.data);
    return response.data;
}
