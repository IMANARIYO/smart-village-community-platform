// service.ts placeholder for Alerts feature
import api from "@/utils/api";
import { AlertQueryParams, AlertsListApiResponse } from "./types";

export const AlertService = {
  async getAll(params?: AlertQueryParams): Promise<AlertsListApiResponse> {
    const res = await api.get("/alerts/", { params });
    return res.data;
  },
};
