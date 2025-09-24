import api from "@/utils/api";

interface PaginatedApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  tagline: string;
  degree: string;
  university: string;
  bio: string;
  photo_url: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  twitter: string;
  location: string;
  skills: string[];
  certifications: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateTeamMemberRequest {
  name: string;
  role: string;
  tagline: string;
  degree: string;
  university: string;
  bio: string;
  photo_url: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  twitter: string;
  location: string;
  skills: string[];
  certifications: string[];
}

export interface UpdateTeamMemberRequest {
  name?: string;
  role?: string;
  tagline?: string;
  degree?: string;
  university?: string;
  bio?: string;
  photo_url?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  twitter?: string;
  location?: string;
  skills?: string[];
  certifications?: string[];
}

const TeamService = {
  listTeamMembers: async (
    page = 1,
    limit = 10
  ): Promise<PaginatedApiResponse<TeamMember>> => {
    const res = await api.get("/team/", {
      params: { page, limit },
    });
    return res.data;
  },

  getTeamMember: async (id: number): Promise<TeamMember> => {
    const res = await api.get(`/team/${id}/`);
    return res.data;
  },

  createTeamMember: async (
    data: CreateTeamMemberRequest
  ): Promise<TeamMember> => {
    const res = await api.post("/team/", data);
    return res.data;
  },

  updateTeamMember: async (
    id: number,
    data: UpdateTeamMemberRequest
  ): Promise<TeamMember> => {
    const res = await api.put(`/team/${id}/`, data);
    return res.data;
  },

  patchTeamMember: async (
    id: number,
    data: Partial<UpdateTeamMemberRequest>
  ): Promise<TeamMember> => {
    const res = await api.patch(`/team/${id}/`, data);
    return res.data;
  },

  deleteTeamMember: async (id: number): Promise<void> => {
    await api.delete(`/team/${id}/`);
  },
};

export default TeamService;
