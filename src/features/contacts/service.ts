import api from "@/utils/api";

interface PaginatedApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type InquiryType = "general";
export type ContactStatus = "new";

export interface ContactReply {
  id: number;
  reply_message: string;
  replied_by: string;
  replied_by_username: string;
  replied_at: string;
}

export interface Contact {
  id: number;
  replies: ContactReply[];
  name: string;
  email: string;
  phone: string;
  organization: string;
  inquiry_type: InquiryType;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
  organization: string;
  inquiry_type: InquiryType;
  message: string;
  status?: ContactStatus;
}

export interface UpdateContactRequest {
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  inquiry_type?: InquiryType;
  message?: string;
  status?: ContactStatus;
}

export interface ContactReplyRequest {
  reply_message: string;
}

const ContactService = {
  listContacts: async (page = 1, limit = 10): Promise<PaginatedApiResponse<Contact>> => {
    const res = await api.get("/contact/", {
      params: { page, limit },
    });
    return res.data;
  },

  getContact: async (id: number): Promise<Contact> => {
    const res = await api.get(`/contact/${id}/`);
    return res.data;
  },

  createContact: async (data: CreateContactRequest): Promise<Contact> => {
    const res = await api.post("/contact/", data);
    return res.data;
  },

  updateContact: async (id: number, data: UpdateContactRequest): Promise<Contact> => {
    const res = await api.put(`/contact/${id}/`, data);
    return res.data;
  },

  patchContact: async (id: number, data: Partial<UpdateContactRequest>): Promise<Contact> => {
    const res = await api.patch(`/contact/${id}/`, data);
    return res.data;
  },

  deleteContact: async (id: number): Promise<void> => {
    await api.delete(`/contact/${id}/`);
  },

  addReply: async (id: number, data: ContactReplyRequest): Promise<Contact> => {
    const res = await api.post(`/contact/${id}/replies/`, data);
    return res.data;
  },
};

export default ContactService;
