import axiosInstance from "../utils/axios-instance";
import { SortOrder } from "../pages/cso/pending-requests/pending-requests.page";


class UserService {

  async getUsers(page: number, sortOrder: SortOrder) {
    const response = await axiosInstance.get('/tras', {
      params: {
        page,
        sortOrder,
      },
      withCredentials: true,
    });
    return response.data;
  }

  async deleteUser(userID: string) {
    const response = await axiosInstance.delete(`/users/${userID}`, {
      withCredentials: true,
    });
    return response.data;
  }
}

export default new UserService();