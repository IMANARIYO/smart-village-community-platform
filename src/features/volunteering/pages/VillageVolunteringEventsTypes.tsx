export interface VillageVolunteerEventsResponse {
    success: boolean;
    message: string;
    count: number;
    filters: {
        status: string | null;
        category: string | null;
        date: string | null;
    };
    village: {
        village_id: string;
        village: string;
        province: string;
        district: string;
        sector: string;
        cell: string;
    };
    data: VolunteerEvent[];
    meta: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
        next: string | null;
        previous: string | null;
    };
}

export interface VolunteerEvent {
    volunteer_id: string;
    organizer: Organizer;
    title: string;
    description: string;
    date: string;        // ISO date string "YYYY-MM-DD"
    start_time: string;  // "HH:mm:ss"
    end_time: string;    // "HH:mm:ss"
    capacity: number;
    status: "DRAFT" | "APPROVED" | "REJECTED"; // extend if more exist
    rejection_reason: string | null;
    location: string | null;
    skills_required: string[];
    category: string;
    created_at: string;
    updated_at: string;
    approved_at: string | null;
}

export interface Organizer {
    user_id: string;
    phone_number: string;
    role: string; // e.g. "resident"
    is_verified: boolean;
    is_active: boolean;
    person: {
        first_name: string;
        last_name: string;
        phone_number: string;
        national_id: number;
        gender: "male" | "female" | string;
        person_type: string; // e.g. "resident"
    };
    created_at: string;
}
