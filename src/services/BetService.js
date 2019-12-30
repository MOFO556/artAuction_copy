import axios from "axios";

const apiClient = axios.create({
    baseURL: ` http://localhost:8000`,
    withCredentials: false, // This is the default
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default {
    postBet(bet) {
        return apiClient.post("/makeBet", bet);
    },
    checkSession(session){
        return apiClient.post("/isLocked", session);
    },
    startSession(session) {
        return apiClient.post("/lock", session);
    },
    finishSession(session) {
        return apiClient.post("/unlock", session);
    },
    addUser(userData){
        return apiClient.post("/register", userData);
    },
    checkPhone(userPhone){
        return apiClient.post("/checkAuth", userPhone);
    },
    getPrice(){
        return apiClient.post("/getLastBet");
    },
    verificationStart(phone){
        return apiClient.post("/verification/start", phone);
    },
    completeVerification(code){
        return apiClient.post("/verification/verify", code);
    },
    getBetStep(){
        return apiClient.get("/getMinMax");
    },
    getRemainedTime(){
        return apiClient.post("/expirationDate");
    },
};
