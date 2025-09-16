import type { Village } from "../../types";
import api from "../../utils/api";

type HierarchicalQuery = {
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
};

export type HierarchicalData = {
  success: boolean;
  message: string;
  data: {
    provinces?: string[];
    districts?: string[];
    sectors?: string[];
    cells?: string[];
    villages?: Village[];
  };
};

export async function fetchLocations(
  query: HierarchicalQuery = {}
): Promise<HierarchicalData> {
  const params = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  const url = params
    ? `/view/locations/hierarchical/?${params}`
    : `/view/locations/hierarchical/`;

  const response = await api.get<HierarchicalData>(url);
  return response.data;
}
