import { DATA_ROWS } from "../components/CustomTable";

export const AUTH_ROUTES = {
  // AUTH
  LOGIN: "/auth/login-admin",
  TRUCK: "/truck",
  SEND_OTP: "/auth/send-otp",
  VERIFY_OTP: "/auth/verify/otp",
  RESET_PASSWORD: "/auth/reset/password",
  GET_ADMIN: "/admin",
  UPDATE_PASSWORD: "/auth/update/password",
  UPDATE_ADMIN_DETAILS: "/admin/update",

  // COMPANY
  COMPANY: (skip) =>
    `/company?limit=${DATA_ROWS.LIMIT}&sort=desc${skip ? `&skip=${skip}` : ""}`,
  SEARCH_COMPANY: (keyword) => `/company/search?search=${keyword}`,
  DELETE_COMPNAY: (companyId) => `/company/${companyId}`,

  // PARTNER
  PARTNER: (skip) =>
    `/partner?limit=${DATA_ROWS.LIMIT}&sort=desc${skip ? `&skip=${skip}` : ""}`,
  SEARCH_PARTNER: (keyword) => `/partner/search?search=${keyword}`,
  DELETE_PARTNER: (companyId) => `/partner/${companyId}`,

  //REQUEST
  GET_REQUEST: (skip) =>
    `/request?limit=${DATA_ROWS.LIMIT}&sort=desc${skip ? `&skip=${skip}` : ""}`,
  CREATE_REQUEST: "/request",
  EDIT_REQUEST: (requestId) => `/request/${requestId}`,
  ASSIGN_REQUEST: (requestId) => `/request/assign/${requestId}`,
  DELETE_REQUEST: (requestId) => `/request/delete/${requestId}`,

  //CUSTOMER
  CUSTOMER: (skip) =>
    `/customer?limit=${DATA_ROWS.LIMIT}&sort=desc${
      skip ? `&skip=${skip}` : ""
    }`,

  // TRIPS
  TRIPS: (skip) =>
    `trips?limit=${DATA_ROWS.LIMIT}&sort=desc${skip ? `&skip=${skip}` : ""}`,

  // SUPPORT
  SUPPORT: "support",
  ADDSUPPORT: "support/message",
  SUPPORT_RESPONSE: "support/response",
  CLOSE_SUPPORT: (supportId) => `/support/close/${supportId}`,

  // Dashboard
  ANALYTICS: "/analytics",
  TRIPS_ANALYTICS: `/analytics/trips`,
  INCOME_ANALYTICS: `/analytics/admin-monthly-payment`,

  // PAYMENT
  GET_PAYEMENT: (payment, skip) =>
    `/payment/records?paymentFor=${payment}&sort=desc&limit=${DATA_ROWS.LIMIT}${
      skip ? `&skip=${skip}` : ""
    }`,

  // NOTIFICATION
  NOTIFICATION:(userType)=>`notification?userType=${userType}`,
};
