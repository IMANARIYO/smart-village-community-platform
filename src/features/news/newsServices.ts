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

  getVillageNews1: async (
    villageId: string
  ): Promise<ApiResponse<GetVillageNewsApiResponse>> => {
    try {
      const res = await fetch(
        `https://smartville.onrender.com/village/${villageId}/news/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = (await res.json()) as ApiResponse<GetVillageNewsApiResponse>;
      return data;
    } catch (error) {
      console.error("❌ Error fetching village news:", error);
      throw error;
    }
  },
};

export default VillageService;
