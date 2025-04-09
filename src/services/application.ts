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

  async getApplication(appID: string) {
    const response = await axiosInstance.get(`/applications/${appID}`, {
      withCredentials: true
    });
    return response.data;
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