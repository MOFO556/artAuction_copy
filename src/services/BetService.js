import axios from "axios";

const apiClient = axios.create({
    baseURL: `http://localhost:3000`,
    withCredentials: false, // This is the default
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default {
    postBet(bet) {
        return apiClient.post("/bets", bet);
    },
    startSession(session) {
        return apiClient.post("/sessions", session);
    },
    addUser(userData){
        return apiClient.post("/users", userData);
    }
};