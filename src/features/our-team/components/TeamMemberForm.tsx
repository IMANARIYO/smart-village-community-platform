import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";
import TeamService, { type TeamMember, type CreateTeamMemberRequest } from "../service";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

const teamMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role is required"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  degree: z.string().min(2, "Degree is required"),
  university: z.string().min(2, "University is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  photo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  email: z.string().email("Must be a valid email"),
  phone: z.string().min(10, "Phone number is required"),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required"),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamMemberFormProps {
  member?: TeamMember;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TeamMemberForm({ member, onSuccess, onCancel }: TeamMemberFormProps) {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>(member?.skills || []);
  const [certifications, setCertifications] = useState<string[]>(member?.certifications || []);
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const form = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: member?.name || "",
      role: member?.role || "",
      tagline: member?.tagline || "",
      degree: member?.degree || "",
      university: member?.university || "",
      bio: member?.bio || "",
      photo_url: member?.photo_url || "",
      email: member?.email || "",
      phone: member?.phone || "",
      linkedin: member?.linkedin || "",
      github: member?.github || "",
      website: member?.website || "",
      twitter: member?.twitter || "",
      location: member?.location || "",
    },
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addCertification = () => {
    if (newCertification.trim() && !certifications.includes(newCertification.trim())) {
      setCertifications([...certifications, newCertification.trim()]);
      setNewCertification("");
    }
  };

  const removeCertification = (certToRemove: string) => {
    setCertifications(certifications.filter(cert => cert !== certToRemove));
  };

  const onSubmit = async (data: TeamMemberFormData) => {
    setLoading(true);
    try {
      const payload: CreateTeamMemberRequest = {
        name: data.name,
        role: data.role,
        tagline: data.tagline,
        degree: data.degree,
        university: data.university,
        bio: data.bio,
        photo_url: data.photo_url || "",
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin || "",
        github: data.github || "",
        website: data.website || "",
        twitter: data.twitter || "",
        location: data.location,
        skills,
        certifications,
      };

      if (member) {
        await TeamService.updateTeamMember(member.id, payload);
        toast.success("Team member updated successfully");
      } else {
        await TeamService.createTeamMember(payload);
        toast.success("Team member created successfully");
      }
      
      onSuccess();
    } catch (error) {
      toast.error(extractErrorMessage(error, `Failed to ${member ? 'update' : 'create'} team member`));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" {...form.register("role")} />
              {form.formState.errors.role && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.role.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" {...form.register("tagline")} />
              {form.formState.errors.tagline && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.tagline.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...form.register("phone")} />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} />
              {form.formState.errors.location && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.location.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Education & Professional */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Education & Professional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" {...form.register("degree")} />
              {form.formState.errors.degree && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.degree.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="university">University</Label>
              <Input id="university" {...form.register("university")} />
              {form.formState.errors.university && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.university.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={4} {...form.register("bio")} />
              {form.formState.errors.bio && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.bio.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="photo_url">Photo URL</Label>
              <Input id="photo_url" {...form.register("photo_url")} />
              {form.formState.errors.photo_url && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.photo_url.message}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" {...form.register("linkedin")} />
          </div>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input id="github" {...form.register("github")} />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" {...form.register("website")} />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" {...form.register("twitter")} />
          </div>
        </CardContent>
      </Card>

      {/* Skills & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} className="bg-sv-primary hover:bg-sv-primary-dark">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a certification"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
              />
              <Button type="button" onClick={addCertification} className="bg-sv-secondary hover:bg-sv-secondary-dark">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {cert}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeCertification(cert)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="bg-sv-primary hover:bg-sv-primary-dark">
          {loading ? "Saving..." : member ? "Update Member" : "Create Member"}
        </Button>
      </div>
    </form>
  );
}