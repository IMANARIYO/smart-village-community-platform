import api from "@/utils/api";

export type InquiryType = "general" | "support" | "sales"; // extend if needed
export type ContactStatus = "new" | "in_progress" | "resolved";

export interface ContactRequest {
  name: string;
  phone: string;
  organization: string;
  inquiry_type: InquiryType;
  message: string;
  status?: ContactStatus;
}

export interface ContactResponse {
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  replies: string[];
  organization: string;
  inquiry_type: InquiryType;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  next: boolean | null;
  previous: boolean | null;
  next_link: string | null;
  previous_link: string | null;
  count: number;
  page_count: number;
  data: T[];
}

export interface ContactReplyRequest {
  message: string;
}

export interface ContactReplyRequest {
  message: string;
}

const ContactService = {
  listContacts: async (page = 1, pageSize = 10, search = "") => {
    const res = await api.get("/contact/", {
      params: { page, page_size: pageSize, search },
    });
    return res.data as PaginatedResponse<ContactResponse>;
  },

  getContact: async (id: string) => {
    const res = await api.get(`/contact/${id}/`);
    return res.data;
  },

  createContact: async (data: ContactRequest) => {
    const res = await api.post("/contact/", data);
    return res.data;
  },

  updateContact: async (id: string, data: Partial<ContactRequest>) => {
    const res = await api.put(`/contact/${id}/`, data);
    return res.data;
  },

  patchContact: async (id: string, data: Partial<ContactRequest>) => {
    const res = await api.patch(`/contact/${id}/`, data);
    return res.data;
  },

  deleteContact: async (id: string) => {
    await api.delete(`/contact/${id}/`);
  },

  addReply: async (id: string, data: ContactReplyRequest) => {
    await api.post(`/contact/${id}/replies/`, data);
  },
};

export default ContactService;
