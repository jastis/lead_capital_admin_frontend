import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const getRequest = async (skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_REQUEST(skip));
    return data;
  } catch (e) {
    errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
    return [];
  }
};

export const createRequest = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.CREATE_REQUEST, payload);
    successNotifier("Request successfully created");
  } catch (e) {
    // if (e.response) {
    //   errorNotifier(
    //     e.response?.data?.message || e.response?.data?.data?.message
    //   );
    // } else {
    //   errorNotifier("Network Error, please check your internet connections");
    // }
  }
};

export const asignRequestToPartner = async (payload) => {
  try {
    await axiosInstance.put(
      AUTH_ROUTES.ASSIGN_REQUEST(payload?.requestId),
      payload
    );
    successNotifier("Request successfully assigned");
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
export const deleteRequest = async (id) => {
  try {
    await axiosInstance.put(AUTH_ROUTES.DELETE_REQUEST(id));
    successNotifier("Request Deleted Successfully");
    // setRefresh((prev) => !prev);
  } catch (e) {
    errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
  } finally {
    // setLoading(false);
  }
};

export const editRequest = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.EDIT_REQUEST, payload);
    successNotifier("Request successfully Updated");
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
