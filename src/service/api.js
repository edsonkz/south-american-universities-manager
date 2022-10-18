import axios from "axios";

const apiUrl = "http://universities.hipolabs.com/";
const api = axios.create({
	baseURL: apiUrl,
});

export { api };
