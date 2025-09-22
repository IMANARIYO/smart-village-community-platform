import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  IncidentReportForm as IncidentFormData,
  IncidentCategory,
  IncidentSeverity,
} from "@/features/incidents/types";
import { AlertTriangle, MapPin } from "lucide-react";

interface IncidentReportFormProps {
  onSubmit: (data: IncidentFormData) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const INCIDENT_CATEGORIES: { value: IncidentCategory; label: string }[] = [
  { value: "theft", label: "Theft" },
  { value: "suspicious-activity", label: "Suspicious Activity" },
  { value: "missing-person", label: "Missing Person" },
  { value: "accident", label: "Accident" },
  { value: "vandalism", label: "Vandalism" },
  { value: "other", label: "Other" },
];

const SEVERITY_LEVELS: {
  value: IncidentSeverity;
  label: string;
  color: string;
}[] = [
  { value: "low", label: "Low", color: "text-green-600" },
  { value: "medium", label: "Medium", color: "text-yellow-600" },
  { value: "high", label: "High", color: "text-orange-600" },
  { value: "critical", label: "Critical", color: "text-red-600" },
];

export default function IncidentReportForm({
  onSubmit,
  isOpen,
  onOpenChange,
}: IncidentReportFormProps) {
  // In a real app, this would come from authentication context
  const currentUser = {
    name: "Jean Mukamana", // This would be from auth context
    email: "jean.mukamana@example.com",
    phone: "+250789123456",
  };

  const [formData, setFormData] = useState<IncidentFormData>({
    title: "",
    description: "",
    category: "other",
    severity: "medium",
    location: "",
    reporter: currentUser.name,
    contactInfo: currentUser.phone,
    isAnonymous: false,
    incidentDate: new Date().toISOString().split("T")[0], // Today's date as default
    incidentTime: new Date().toTimeString().slice(0, 5), // Current time as default
  });

  const [errors, setErrors] = useState<Partial<IncidentFormData>>({});

  const handleInputChange = (
    field: keyof IncidentFormData,
    value: string | boolean | File
  ) => {
    setFormData((prev: IncidentFormData) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: Partial<IncidentFormData>) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange("photo", file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<IncidentFormData> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "other",
        severity: "medium",
        location: "",
        reporter: currentUser.name,
        contactInfo: currentUser.phone,
        isAnonymous: false,
        incidentDate: new Date().toISOString().split("T")[0],
        incidentTime: new Date().toTimeString().slice(0, 5),
      });
      setErrors({});
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg mx-auto">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Report an Incident
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            Help keep your community safe
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              What happened? *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("title", e.target.value)
              }
              placeholder="Brief description of the incident"
              className={`text-sm ${errors.title ? "border-red-500" : ""}`}
            />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Details *
            </Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange("description", e.target.value)
              }
              placeholder="Describe what you saw, when it happened..."
              rows={3}
              className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category and Severity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label
                htmlFor="category"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Type *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value: string) =>
                  handleInputChange("category", value as IncidentCategory)
                }
              >
                <SelectTrigger className="text-sm h-9">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {INCIDENT_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="severity"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Severity *
              </Label>
              <Select
                value={formData.severity}
                onValueChange={(value: string) =>
                  handleInputChange("severity", value as IncidentSeverity)
                }
              >
                <SelectTrigger className="text-sm h-9">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {SEVERITY_LEVELS.map((severity) => (
                    <SelectItem key={severity.value} value={severity.value}>
                      <span className={severity.color}>{severity.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label
              htmlFor="location"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
            >
              <MapPin className="h-3 w-3" />
              Where? *
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("location", e.target.value)
              }
              placeholder="e.g., Near school, Community center..."
              className={`text-sm ${errors.location ? "border-red-500" : ""}`}
            />
            {errors.location && (
              <p className="text-xs text-red-600 mt-1">{errors.location}</p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label
                htmlFor="incidentDate"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Date *
              </Label>
              <Input
                id="incidentDate"
                type="date"
                value={formData.incidentDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("incidentDate", e.target.value)
                }
                className="text-sm"
              />
            </div>

            <div>
              <Label
                htmlFor="incidentTime"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Time *
              </Label>
              <Input
                id="incidentTime"
                type="time"
                value={formData.incidentTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("incidentTime", e.target.value)
                }
                className="text-sm"
              />
            </div>
          </div>

          {/* Anonymous Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAnonymous"
              checked={formData.isAnonymous}
              onCheckedChange={(checked: boolean) =>
                handleInputChange("isAnonymous", checked)
              }
            />
            <Label
              htmlFor="isAnonymous"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Report anonymously
            </Label>
          </div>

          {/* Photo Upload */}
          <div>
            <Label
              htmlFor="photo"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Photo (Optional)
            </Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm"
            />
            {formData.photo && (
              <p className="text-xs text-green-600 mt-1">
                Selected: {formData.photo.name}
              </p>
            )}
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 text-sm py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-sm py-2 font-semibold text-white"
            >
              Submit Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
