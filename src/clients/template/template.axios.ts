
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { paths } from "./template";

class TemplateClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string = "https://api.yourdomain.com") {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
    }
  
    // Axios Method for /api/auth/login - POST
    async PostApiAuthLogin(data: paths["/api/auth/login"]["post"]["requestBody"]["content"]["application/json"], config?: AxiosRequestConfig): Promise<paths["/api/auth/login"]["post"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.post("/api/auth/login", data, config);
        return response.data;
    }
  
    // Axios Method for /api/auth/logout - POST
    async PostApiAuthLogout(config?: AxiosRequestConfig): Promise<paths["/api/auth/logout"]["post"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.post("/api/auth/logout", config);
        return response.data;
    }
  
    // Axios Method for /api/template/ - GET
    async GetApiTemplate(query?: paths["/api/template/"]["get"]["parameters"]["query"], config?: AxiosRequestConfig): Promise<paths["/api/template/"]["get"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.get("/api/template/", { params: query, ...config });
        return response.data;
    }
  
    // Axios Method for /api/template/ - POST
    async PostApiTemplate(data: paths["/api/template/"]["post"]["requestBody"]["content"]["application/json"], config?: AxiosRequestConfig): Promise<paths["/api/template/"]["post"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.post("/api/template/", data, config);
        return response.data;
    }
  
    // Axios Method for /api/template/{id} - GET
    async GetApiTemplateById(id: string, config?: AxiosRequestConfig): Promise<paths["/api/template/{id}"]["get"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.get(`/api/template/${id}`, config);
        return response.data;
    }
  
    // Axios Method for /api/template/{id} - PUT
    async PutApiTemplateById(id: string, data: paths["/api/template/{id}"]["put"]["requestBody"]["content"]["application/json"], config?: AxiosRequestConfig): Promise<paths["/api/template/{id}"]["put"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.put(`/api/template/${id}`, data, config);
        return response.data;
    }
  
    // Axios Method for /api/template/{id} - DELETE
    async DeleteApiTemplateById(id: string, config?: AxiosRequestConfig): Promise<paths["/api/template/{id}"]["delete"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.delete(`/api/template/${id}`, config);
        return response.data;
    }
  
    // Axios Method for /api/users/ - GET
    async GetApiUsers(query?: paths["/api/users/"]["get"]["parameters"]["query"], config?: AxiosRequestConfig): Promise<paths["/api/users/"]["get"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.get("/api/users/", { params: query, ...config });
        return response.data;
    }
  
    // Axios Method for /api/users/ - POST
    async PostApiUsers(data: paths["/api/users/"]["post"]["requestBody"]["content"]["application/json"], config?: AxiosRequestConfig): Promise<paths["/api/users/"]["post"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.post("/api/users/", data, config);
        return response.data;
    }
  
    // Axios Method for /api/users/{id} - GET
    async GetApiUsersById(id: string, config?: AxiosRequestConfig): Promise<paths["/api/users/{id}"]["get"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.get(`/api/users/${id}`, config);
        return response.data;
    }
  
    // Axios Method for /api/users/{id} - PUT
    async PutApiUsersById(id: string, data: paths["/api/users/{id}"]["put"]["requestBody"]["content"]["application/json"], config?: AxiosRequestConfig): Promise<paths["/api/users/{id}"]["put"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.put(`/api/users/${id}`, data, config);
        return response.data;
    }
  
    // Axios Method for /api/users/{id} - DELETE
    async DeleteApiUsersById(id: string, config?: AxiosRequestConfig): Promise<paths["/api/users/{id}"]["delete"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.delete(`/api/users/${id}`, config);
        return response.data;
    }
  
    // Axios Method for /api/users/reset-password - PUT
    async PutApiUsersResetpassword(data: paths["/api/users/reset-password"]["put"]["requestBody"]["content"]["application/json"], config?: AxiosRequestConfig): Promise<paths["/api/users/reset-password"]["put"]["responses"]["200"]["content"]["application/json"]> {
        const response = await this.axiosInstance.put("/api/users/reset-password", data, config);
        return response.data;
    }
  
    // Axios Method for /websocket - GET
    async GetWebsocket(config?: AxiosRequestConfig): Promise<unknown> {
        const response = await this.axiosInstance.get("/websocket", config);
        return response.data;
    }
  
}

export default TemplateClient;
  