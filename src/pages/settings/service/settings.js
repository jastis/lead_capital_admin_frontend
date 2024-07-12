import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const updateAccount = async (payload, setLoading) => {
  try {
    await axiosInstance.put(AUTH_ROUTES.UPDATE_ADMIN_DETAILS, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successNotifier("Account Updated successfully");
    setLoading(false)
  } catch (e) {
    setLoading(false)
    if (e.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
export const updatePassword = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.UPDATE_PASSWORD, payload);
    successNotifier("Password Changed successfully ");
  } catch (e) {
    if (e.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
