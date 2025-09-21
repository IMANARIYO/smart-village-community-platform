"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, X } from "lucide-react";
import type { Participation, UpdateParticipationRequest, ParticipationStatus } from "../types";

const updateSchema = z.object({
  notes: z.string().min(1, "Notes are required"),
});

type UpdateFormData = z.infer<typeof updateSchema>;

interface ParticipationDetailProps {
  participation: Participation;
  onUpdate?: (data: UpdateParticipationRequest) => void;
  onStatusChange?: (participationId: string, status: ParticipationStatus) => void;
  loading?: boolean;
  canEdit?: boolean;
  canApprove?: boolean;
}

const getStatusColor = (status: ParticipationStatus) => {
  switch (status) {
    case "APPROVED": return "bg-green-100 text-green-800";
    case "PENDING": return "bg-yellow-100 text-yellow-800";
    case "REJECTED": return "bg-red-100 text-red-800";
    case "CANCELLED": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export function ParticipationDetail({
  participation,
  onUpdate,
  onStatusChange,
  loading = false,
  canEdit = false,
  canApprove = false,
}: ParticipationDetailProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      notes: participation.notes || "",
    },
  });

  const handleUpdate = (data: UpdateFormData) => {
    if (onUpdate) {
      onUpdate({ notes: data.notes });
      setIsEditing(false);
    }
  };

  const handleStatusChange = (status: ParticipationStatus) => {
    if (onStatusChange) {
      onStatusChange(participation.participation_id, status);
    }
  };

  return (
    <div className="space-y-6">
      {/* Participation Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Participation Details
            <Badge className={getStatusColor(participation.status)}>
              {participation.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Volunteer</label>
              <p className="font-medium">
                {participation.user.person.first_name} {participation.user.person.last_name}
              </p>
              <p className="text-sm text-gray-500">{participation.user.phone_number}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Event</label>
              <p className="font-medium">{participation.event.title}</p>
              <p className="text-sm text-gray-500">{participation.event.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Joined At</label>
              <p>{new Date(participation.joined_at).toLocaleString()}</p>
            </div>
            {participation.approved_at && (
              <div>
                <label className="text-sm font-medium text-gray-500">Approved At</label>
                <p>{new Date(participation.approved_at).toLocaleString()}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Notes
            {canEdit && !isEditing && (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Add notes about this participation..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" size="sm" disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <p className="text-gray-700">
              {participation.notes || "No notes provided"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Admin Actions */}
      {canApprove && participation.status === "PENDING" && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                onClick={() => handleStatusChange("APPROVED")}
                disabled={loading}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleStatusChange("REJECTED")}
                disabled={loading}
              >
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}