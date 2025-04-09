import axiosInstance from "../utils/axios-instance";
import { SortOrder } from "../pages/cso/pending-requests/pending-requests.page";


class UserService {

  async getUsers(page: number, sortOrder: SortOrder, token: string) {
    const response = await axiosInstance.get('/tras', {
      params: {
        page,
        sortOrder,
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  }

  async deleteUser(userID: string, token: string) {
    const response = await axiosInstance.delete(`/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  }
}

export default new UserService();