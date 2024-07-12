import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const getAnalytics = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.ANALYTICS);
    return data;
  } catch (e) {
    console.log(e)
  }
};

export const getTripsAnalytics = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.TRIPS_ANALYTICS);
    return data;
  } catch (e) {
    console.log(e)
  }
};

export const getIncomeAnalytics = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.INCOME_ANALYTICS);
    return data;
  } catch (e) {
    console.log(e)
  }
};
