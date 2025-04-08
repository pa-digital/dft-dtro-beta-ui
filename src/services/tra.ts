import axiosInstance from "../utils/axios-instance";

class TraService {

  async getTras(traName: string, token: string) {
    const response = await axiosInstance.get('/tras', {
      params: {
        traName
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  }
}

export default new TraService();