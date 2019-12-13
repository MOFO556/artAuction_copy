import axios from "axios";

const apiClient = axios.create({
    baseURL: `http://localhost:3000`,
    withCredentials: false, // This is the default
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    timeout: 10000
});

export default {
    postBet(bet) {
        return apiClient.post("/#", bet);
    }
};