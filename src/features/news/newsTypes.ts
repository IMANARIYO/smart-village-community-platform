import type { Village } from "../../types";
import type { Event } from "../events/types";

export interface GetVillageNewsApiResponse {
  total_residents: number;
  total_events: number;
  village: Village;
  events: Event[];
}
