import { AppDetails } from "../pages/app-details/app-details.page";
import axiosInstance from "../utils/axios-instance";

class ApplicationService {

  async getApplications(page: number, pageSize: number) {
    const response = await axiosInstance.get('/applications', {
      params: {
        page,
        pageSize,
      },
      withCredentials: true,
    });
    return response.data;
  }

  async createApp(data: object) {
    const response = await axiosInstance.post('/applications', data, {
      withCredentials: true,
    });
    return response.data;
  }

  async getApplication(appID: string): Promise<AppDetails> {
    const response = await axiosInstance.get(`/applications/${appID}`, {
      withCredentials: true
    });
    return {
      appID: response.data.appId,
      appName: response.data.name,
      swaCode: response.data.swaCode,
      apiKey: response.data.credentials[0].consumerKey,
      apiSecret: response.data.credentials[0].consumerSecret,
      purpose: response.data.purpose
    }
  };

  async activateApplication(appID: string) {
    const response = await axiosInstance.post(`/applications/${appID}/activate`, {
      withCredentials: true
    });
    return response.data;
  };

  async getApplicationsInactive(page: number, pageSize: number) {
    const response = await axiosInstance.get('/applications/inactive', {
      params: {
        page,
        pageSize,
      },
      withCredentials: true,
    });
    return response.data;
  }

  async getApplicationValidateName(name: string) {
    const response = await axiosInstance.get('/applications/validateName', {
      params: {
        name
      },
      withCredentials: true,
    });
    return response.data;
  }
}

export default new ApplicationService();