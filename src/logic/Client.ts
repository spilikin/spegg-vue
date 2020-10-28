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
    getSubjectVersion(id: string, version: string, compareVersion?: string) {
        if (compareVersion) {
            return http.get(`/Subject/${id}/${version}?compare=${compareVersion}`)
        } else {
            return http.get(`/Subject/${id}/${version}`)
        }
    }
    getReference(subjectId: string, subjectVersion: string, resourceId: string, compareVersion?: string) {
        if (compareVersion) {
            return http.get(`/Reference/${subjectId}/${subjectVersion}/${resourceId}?compare=${compareVersion}`)
        } else {
            return http.get(`/Reference/${subjectId}/${subjectVersion}/${resourceId}`)
        }
    }
    getAllResources() {
        return http.get('/Resource')
    }
}