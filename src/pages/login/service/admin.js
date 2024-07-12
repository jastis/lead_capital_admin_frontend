import { errorNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const getAdminDetails = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_ADMIN);
    // setData(data?.[0]);
    return data?.[0];
  } catch (e) {
    // if (e.response) {
    //   errorNotifier(
    //     console.log(
    //       e.response?.data?.message || e.response?.data?.data?.message
    //     )
    //   );
    // } else {
    //   errorNotifier("Network Error, please check your internet connections");
    // }
  }
  //   finally {
  //     setLoading(false);
  //   }
};
