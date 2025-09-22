import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import type {
  VolunteeringEventListItem,
  GetVolunteeringOptions,
} from "../types";
import VolunteerService from "../volunteeringServices";

export function useVolunteeringEvents(initialOptions?: GetVolunteeringOptions) {
  const [events, setEvents] = useState<VolunteeringEventListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<GetVolunteeringOptions>(
    initialOptions || {}
  );

  const fetchEvents = useCallback(
    async (newOptions?: GetVolunteeringOptions) => {
      try {
        setLoading(true);
        setError(null);

        const optionsToUse = newOptions || options;
        const response = await VolunteerService.getVolunteeringEvents(
          optionsToUse
        );

        if (response.success) {
          setEvents(response.data);
          if (newOptions) {
            setOptions(optionsToUse);
          }
        } else {
          setError(response.message);
          toast.error(response.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch events";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    options,
    fetchEvents,
    setOptions,
  };
}
