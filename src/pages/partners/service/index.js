import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const createPartner = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.PARTNER, payload);
    successNotifier("Partner successfully created");
  } catch (e) {
    errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
  }
};

export const getPartners = async (skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.PARTNER(skip));
    return data;
  } catch (e) {
    errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
    return [];
  }
};
