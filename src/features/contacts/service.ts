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
  id: string;
  name: string;
  phone: string;
  organization: string;
  inquiry_type: InquiryType;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

export interface ContactReplyRequest {
  message: string;
}

export interface ContactServiceType {
  listContacts: () => Promise<ContactResponse[]>;
  getContact: (id: string) => Promise<ContactResponse>;
  createContact: (data: ContactRequest) => Promise<ContactResponse>;
  updateContact: (
    id: string,
    data: Partial<ContactRequest>
  ) => Promise<ContactResponse>;
  patchContact: (
    id: string,
    data: Partial<ContactRequest>
  ) => Promise<ContactResponse>;
  deleteContact: (id: string) => Promise<void>;
  addReply: (id: string, data: ContactReplyRequest) => Promise<void>;
}

const ContactService: ContactServiceType = {
  listContacts: async () => {
    const res = await api.get("/contact/");
    return res.data;
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
