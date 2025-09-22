"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Phone, Mail, MapPin, Calendar, Shield } from "lucide-react";
import type { Leader, LeaderFormData } from "../leaderTypes";
import LeaderService from "../LeaderService";
import { useLocationSelector } from "../../../../homePages/hooks/useLocationSelector";
import { triggerRefresh } from "../utils/refreshTrigger";

interface LeaderDetailModalProps {
  leader: Leader | null;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  mode: "view" | "edit" | "create";
}

export function LeaderDetailModal({ 
  leader, 
  open, 
  onClose, 
  onUpdate, 
  mode 
}: LeaderDetailModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LeaderFormData>({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    national_id: 0,
    village_id: "",
    role: "Leader"
  });

  const {
    province, setProvince,
    district, setDistrict,
    sector, setSector,
    cell, setCell,
    village, setVillage,
    provinces, districts, sectors, cells, villages
  } = useLocationSelector();

  useEffect(() => {
    if (leader && mode !== "create") {
      setFormData({
        first_name: leader.person.first_name,
        last_name: leader.person.last_name,
        phone_number: leader.phone_number,
        email: leader.email || "",
        national_id: leader.person.national_id,
        village_id: leader.village?.village_id || "",
        role: leader.role
      });
      
      if (leader.village) {
        setProvince(leader.village.province);
        setDistrict(leader.village.district);
        setSector(leader.village.sector);
        setCell(leader.village.cell);
        setVillage(leader.village);
      }
    } else if (mode === "create") {
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        national_id: 0,
        village_id: "",
        role: "Leader"
      });
    }
  }, [leader, mode, setProvince, setDistrict, setSector, setCell, setVillage]);

  useEffect(() => {
    if (village) {
      setFormData(prev => ({ ...prev, village_id: village.village_id }));
    }
  }, [village]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "view") return;

    try {
      setLoading(true);
      
      if (mode === "edit" && leader) {
        await LeaderService.updateLeader(leader.user_id, {
          person: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            national_id: formData.national_id
          },
          phone_number: formData.phone_number,
          email: formData.email || null,
          role: formData.role,
          village_id: formData.village_id
        });
        toast.success("Leader updated successfully");
      } else if (mode === "create") {
        toast.info("Create functionality needs API endpoint");
      }
      
      triggerRefresh();
      onClose();
    } catch (error) {
      console.error("Error saving leader:", error);
      toast.error("Failed to save leader");
    } finally {
      setLoading(false);
    }
  };

  const isEditable = mode === "edit" || mode === "create";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Leader" : 
             mode === "edit" ? "Edit Leader" : "Leader Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Create a new village leader" :
             mode === "edit" ? "Update leader information" :
             "View leader details and information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                    disabled={!isEditable}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    disabled={!isEditable}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="national_id">National ID</Label>
                <Input
                  id="national_id"
                  type="number"
                  value={formData.national_id || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, national_id: parseInt(e.target.value) || 0 }))}
                  disabled={!isEditable}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                  disabled={!isEditable}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditable}
                />
              </div>
            </CardContent>
          </Card>

          {/* Leadership Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Leadership Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                  disabled={!isEditable}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Leader">Leader</SelectItem>
                    <SelectItem value="Deputy Leader">Deputy Leader</SelectItem>
                    <SelectItem value="Secretary">Secretary</SelectItem>
                    <SelectItem value="Treasurer">Treasurer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {leader && mode === "view" && (
                <div className="flex items-center gap-2">
                  <Label>Status:</Label>
                  <Badge variant={leader.is_active ? "default" : "secondary"}>
                    {leader.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Select value={province} onValueChange={setProvince} disabled={!isEditable}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((prov) => (
                        <SelectItem key={prov} value={prov}>
                          {prov}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select value={district} onValueChange={setDistrict} disabled={!isEditable || !province}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((dist) => (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select value={sector} onValueChange={setSector} disabled={!isEditable || !district}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sect) => (
                        <SelectItem key={sect} value={sect}>
                          {sect}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cell">Cell</Label>
                  <Select value={cell} onValueChange={setCell} disabled={!isEditable || !sector}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cell" />
                    </SelectTrigger>
                    <SelectContent>
                      {cells.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {cell && (
                <div className="space-y-2">
                  <Label htmlFor="village">Village</Label>
                  <Select 
                    value={village?.village_id || ""} 
                    onValueChange={(value) => {
                      const selectedVillage = villages.find(v => v.village_id === value);
                      setVillage(selectedVillage || null);
                    }}
                    disabled={!isEditable}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select village" />
                    </SelectTrigger>
                    <SelectContent>
                      {villages.map((v) => (
                        <SelectItem key={v.village_id} value={v.village_id}>
                          {v.village}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === "view" ? "Close" : "Cancel"}
            </Button>
            {isEditable && (
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : mode === "create" ? "Create Leader" : "Update Leader"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}