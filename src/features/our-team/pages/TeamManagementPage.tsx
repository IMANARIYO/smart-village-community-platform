import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Plus, Users, Award, MapPin } from "lucide-react";
import { toast } from "sonner";
import TeamService, { type TeamMember } from "../service";
import { TeamTable } from "../components/TeamTable";
import { TeamMemberDialog } from "../components/TeamMemberDialog";
import { TeamMemberForm } from "../components/TeamMemberForm";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

export function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchTeamMembers = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await TeamService.listTeamMembers(page, limit);
      setTeamMembers(response.results);
      setPagination({
        page,
        limit,
        total: response.count,
      });
    } catch (error) {
      toast.error(extractErrorMessage(error, "Failed to fetch team members"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember(member);
    setShowDetailDialog(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setShowEditDialog(true);
  };

  const handleDeleteMember = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    
    try {
      await TeamService.deleteTeamMember(id);
      toast.success("Team member deleted successfully");
      fetchTeamMembers(pagination.page, pagination.limit);
    } catch (error) {
      toast.error(extractErrorMessage(error, "Failed to delete team member"));
    }
  };

  const handlePaginationChange = (page: number, limit: number) => {
    setPagination({ ...pagination, page, limit });
    fetchTeamMembers(page, limit);
  };

  const handleMemberCreated = () => {
    setShowCreateDialog(false);
    fetchTeamMembers(pagination.page, pagination.limit);
  };

  const handleMemberUpdated = () => {
    setShowEditDialog(false);
    fetchTeamMembers(pagination.page, pagination.limit);
  };

  const columns = [
    {
      key: "photo_url",
      header: "Photo",
      render: (member: TeamMember) => (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-sv-primary-light">
          {member.photo_url ? (
            <img 
              src={member.photo_url} 
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sv-primary font-medium">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (member: TeamMember) => (
        <div>
          <div className="font-medium">{member.name}</div>
          <div className="text-sm text-muted-foreground">{member.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (member: TeamMember) => (
        <Badge variant="outline" className="bg-sv-primary-light text-sv-primary">
          {member.role}
        </Badge>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (member: TeamMember) => (
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-sm">{member.location}</span>
        </div>
      ),
    },
    {
      key: "skills",
      header: "Skills",
      render: (member: TeamMember) => (
        <div className="flex flex-wrap gap-1">
          {member.skills.slice(0, 2).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {member.skills.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{member.skills.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (member: TeamMember) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewMember(member)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditMember(member)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeleteMember(member.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const stats = {
    total: teamMembers.length,
    roles: [...new Set(teamMembers.map(m => m.role))].length,
    locations: [...new Set(teamMembers.map(m => m.location))].length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-1">Manage your team members and their information</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-sv-primary hover:bg-sv-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sv-primary">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Roles</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sv-secondary">{stats.roles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sv-accent">{stats.locations}</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Table */}
      <TeamTable
        data={teamMembers}
        columns={columns}
        loading={loading}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />

      {/* Create Team Member Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
          </DialogHeader>
          <TeamMemberForm
            onSuccess={handleMemberCreated}
            onCancel={() => setShowCreateDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Team Member Dialog */}
      {selectedMember && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Team Member</DialogTitle>
            </DialogHeader>
            <TeamMemberForm
              member={selectedMember}
              onSuccess={handleMemberUpdated}
              onCancel={() => setShowEditDialog(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Team Member Detail Dialog */}
      {selectedMember && (
        <TeamMemberDialog
          member={selectedMember}
          open={showDetailDialog}
          onOpenChange={setShowDetailDialog}
        />
      )}
    </div>
  );
}