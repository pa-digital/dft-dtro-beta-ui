import axiosInstance from "../utils/axios-instance";

class ApplicationService {

  async getApplications(page: number, pageSize: number, token: string) {
    const response = await axiosInstance.get('/applications', {
      params: {
        page,
        pageSize: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  }

  async createApp(data: object, token: string) {
    const response = await axiosInstance.post('/applications', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async getApplication(appID: string, token: string) {
    const response = await axiosInstance.get(`/applications/${appID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  async getApplicationsInactive(page: number, pageSize: number, token: string) {
    const response = await axiosInstance.get('/applications/inactive', {
      params: {
        page,
        pageSize: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  }

  async getApplicationValidateName(name: string, token: string) {
    const response = await axiosInstance.get('/applications/validateName', {
      params: {
        name
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  }
}

export default new ApplicationService();