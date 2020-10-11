import axios from "axios";

const http = axios.create({
    baseURL: "/api/v1"
});

export default class APIClient {
    info() {
        return http.get(`/info`);
    }
    getAllSubjects() {
        return http.get('/Subject')
    }
    getSubjectVersion(id: string, version: string) {
        return http.get(`/Subject/${id}/${version}`)
    }
}