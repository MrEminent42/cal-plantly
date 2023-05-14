import axios from 'axios';
// import setIcon from ../ components / TopBar / TopBar

export default function fetchWeatherData(apiKey: string, query: string) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`;
    return axios.get(apiUrl)
        .then(response => {
            const condition = response.data.current.condition.icon.slice(2);
            // console.log(condition);
            // setIcon(condition);
            return condition;
        })
        .catch(error => {
            console.error(error.message);
        });
}