import axios from "axios";

const apiClient = axios.create({
    baseURL: `192.168.0.10:80`,
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
    finishSession(session) {
        return apiClient.post("/sessions", session);
    },
    addUser(userData){
        return apiClient.post("/users", userData);
    },
    checkPhone(userPhone){
        return apiClient.post("/users", userPhone);
    }
};