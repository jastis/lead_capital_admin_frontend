import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const createCompany = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.COMPANY, payload);
    successNotifier("Company successfully created");
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

export const getCompany = async (skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.COMPANY(skip));
    return data;
  } catch (e) {
    errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
    return [];
  }
};
