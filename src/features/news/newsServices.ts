import type { ApiResponse } from "../../types";
import api from "../../utils/api";
import type { GetVillageNewsApiResponse } from "./newsTypes";

const VillageService = {
  getVillageNews: async (
    villageId: string
  ): Promise<ApiResponse<GetVillageNewsApiResponse>> => {
    const res = await api.get(`/village/${villageId}/news/`, {
      headers: { "Cache-Control": "no-cache" },
    });

    return res.data;
  },
};

export default VillageService;
