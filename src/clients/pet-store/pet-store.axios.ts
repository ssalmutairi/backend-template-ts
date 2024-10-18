import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { paths } from "./pet-store";

class PetStoreClient {
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

  // Axios Method for /pet - PUT
  async putPet(
    data: paths["/pet"]["put"]["requestBody"]["content"]["application/json"],
    config?: AxiosRequestConfig,
  ): Promise<paths["/pet"]["put"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.put("/pet", data, config);
    return response.data;
  }

  // Axios Method for /pet - POST
  async postPet(
    data: paths["/pet"]["post"]["requestBody"]["content"]["application/json"],
    config?: AxiosRequestConfig,
  ): Promise<paths["/pet"]["post"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.post("/pet", data, config);
    return response.data;
  }

  // Axios Method for /pet/findByStatus - GET
  async getPetFindByStatus(
    query?: paths["/pet/findByStatus"]["get"]["parameters"]["query"],
    config?: AxiosRequestConfig,
  ): Promise<paths["/pet/findByStatus"]["get"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.get("/pet/findByStatus", { params: query, ...config });
    return response.data;
  }

  // Axios Method for /pet/findByTags - GET
  async getPetFindByTags(
    query?: paths["/pet/findByTags"]["get"]["parameters"]["query"],
    config?: AxiosRequestConfig,
  ): Promise<paths["/pet/findByTags"]["get"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.get("/pet/findByTags", { params: query, ...config });
    return response.data;
  }

  // Axios Method for /pet/{petId} - GET
  async getPetBypetId(
    petId: number,
    config?: AxiosRequestConfig,
  ): Promise<paths["/pet/{petId}"]["get"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.get(`/pet/${petId}`, config);
    return response.data;
  }

  // Axios Method for /pet/{petId} - POST
  async postPetBypetId(
    petId: number,
    query?: paths["/pet/{petId}"]["post"]["parameters"]["query"],
    config?: AxiosRequestConfig,
  ): Promise<unknown> {
    const response = await this.axiosInstance.post(`/pet/${petId}`, { params: query, ...config });
    return response.data;
  }

  // Axios Method for /pet/{petId} - DELETE
  async deletePetBypetId(petId: number, config?: AxiosRequestConfig): Promise<unknown> {
    const response = await this.axiosInstance.delete(`/pet/${petId}`, config);
    return response.data;
  }

  // Axios Method for /pet/{petId}/uploadImage - POST
  async postPetBypetIdUploadImage(
    petId: number,
    data: paths["/pet/{petId}/uploadImage"]["post"]["requestBody"]["content"]["application/octet-stream"],
    query?: paths["/pet/{petId}/uploadImage"]["post"]["parameters"]["query"],
    config?: AxiosRequestConfig,
  ): Promise<paths["/pet/{petId}/uploadImage"]["post"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.post(`/pet/${petId}/uploadImage`, data, { params: query, ...config });
    return response.data;
  }

  // Axios Method for /store/inventory - GET
  async getStoreInventory(
    config?: AxiosRequestConfig,
  ): Promise<paths["/store/inventory"]["get"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.get("/store/inventory", config);
    return response.data;
  }

  // Axios Method for /store/order - POST
  async postStoreOrder(
    data: paths["/store/order"]["post"]["requestBody"]["content"]["application/json"],
    config?: AxiosRequestConfig,
  ): Promise<paths["/store/order"]["post"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.post("/store/order", data, config);
    return response.data;
  }

  // Axios Method for /store/order/{orderId} - GET
  async getStoreOrderByorderId(
    orderId: number,
    config?: AxiosRequestConfig,
  ): Promise<paths["/store/order/{orderId}"]["get"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.get(`/store/order/${orderId}`, config);
    return response.data;
  }

  // Axios Method for /store/order/{orderId} - DELETE
  async deleteStoreOrderByorderId(orderId: number, config?: AxiosRequestConfig): Promise<unknown> {
    const response = await this.axiosInstance.delete(`/store/order/${orderId}`, config);
    return response.data;
  }

  // Axios Method for /user - POST
  async postUser(
    data: paths["/user"]["post"]["requestBody"]["content"]["application/json"],
    config?: AxiosRequestConfig,
  ): Promise<unknown> {
    const response = await this.axiosInstance.post("/user", data, config);
    return response.data;
  }

  // Axios Method for /user/createWithList - POST
  async postUserCreateWithList(
    data: paths["/user/createWithList"]["post"]["requestBody"]["content"]["application/json"],
    config?: AxiosRequestConfig,
  ): Promise<paths["/user/createWithList"]["post"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.post("/user/createWithList", data, config);
    return response.data;
  }

  // Axios Method for /user/login - GET
  async getUserLogin(
    query?: paths["/user/login"]["get"]["parameters"]["query"],
    config?: AxiosRequestConfig,
  ): Promise<paths["/user/login"]["get"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.get("/user/login", { params: query, ...config });
    return response.data;
  }

  // Axios Method for /user/logout - GET
  async getUserLogout(config?: AxiosRequestConfig): Promise<unknown> {
    const response = await this.axiosInstance.get("/user/logout", config);
    return response.data;
  }

  // Axios Method for /user/{username} - GET
  async getUserByusername(
    username: string,
    config?: AxiosRequestConfig,
  ): Promise<paths["/user/{username}"]["get"]["responses"]["200"]["content"]["application/json"]> {
    const response = await this.axiosInstance.get(`/user/${username}`, config);
    return response.data;
  }

  // Axios Method for /user/{username} - PUT
  async putUserByusername(
    username: string,
    data: paths["/user/{username}"]["put"]["requestBody"]["content"]["application/json"],
    config?: AxiosRequestConfig,
  ): Promise<unknown> {
    const response = await this.axiosInstance.put(`/user/${username}`, data, config);
    return response.data;
  }

  // Axios Method for /user/{username} - DELETE
  async deleteUserByusername(username: string, config?: AxiosRequestConfig): Promise<unknown> {
    const response = await this.axiosInstance.delete(`/user/${username}`, config);
    return response.data;
  }
}

export default PetStoreClient;
