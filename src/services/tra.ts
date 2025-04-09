import axiosInstance from "../utils/axios-instance";

class TraService {

  async getTras(traName: string) {
    const response = await axiosInstance.get('/tras', {
      params: {
        traName
      },
      withCredentials: true,
    });
    return response.data;
  }
}

export default new TraService();