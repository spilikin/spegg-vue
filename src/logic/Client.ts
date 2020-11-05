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
    getReference(
        subjectId: string, 
        subjectVersion: string, 
        resourceId: string, 
        compareVersion?: string, 
        compareSubjectId?: string, 
        compareResourceId?: string) {

        let query=""
        if (compareVersion) {
            query = `?compare_version=${compareVersion}`
            if (compareSubjectId) {
                query = query + `&compare_subject_id=${compareSubjectId}`
            }
            if (compareResourceId) {
                query = query + `&compare_resource_id=${compareResourceId}`
            }
        }
        
        return http.get(`/Reference/${subjectId}/${subjectVersion}/${resourceId}`+query)
    }
    getAllResources() {
        return http.get('/Resource')
    }

    getResourceVersion(resourceId: string, resourceVersion: string) {
        return http.get(`/Resource/${resourceId}/${resourceVersion}`)
    }
}