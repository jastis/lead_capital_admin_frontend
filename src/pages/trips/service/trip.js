import { errorNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const getTrips = async (skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.TRIPS(skip));
    return data;
  } catch (e) {
    errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
    return [];
  }
};
