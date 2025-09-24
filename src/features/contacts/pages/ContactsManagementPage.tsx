import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import ContactService, { type Contact } from "../service";
import { ContactsTable } from "../components/ContactsTable";
import { ContactDetailDialog } from "../components/ContactDetailDialog";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

export function ContactsManagementPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchContacts = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await ContactService.listContacts(page, limit);
      setContacts(response.results);
      setPagination({
        page,
        limit,
        total: response.count,
      });
    } catch (error) {
      toast.error(extractErrorMessage(error, "Failed to fetch contacts"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDetailDialog(true);
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await ContactService.deleteContact(id);
      toast.success("Contact deleted successfully");
      fetchContacts(pagination.page, pagination.limit);
    } catch (error) {
      toast.error(extractErrorMessage(error, "Failed to delete contact"));
    }
  };

  const handlePaginationChange = (page: number, limit: number) => {
    setPagination({ ...pagination, page, limit });
    fetchContacts(page, limit);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
    };
    return variants[status as keyof typeof variants] || variants.new;
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (contact: Contact) => contact.name,
    },
    {
      key: "email",
      header: "Email",
      render: (contact: Contact) => contact.email,
    },
    {
      key: "phone",
      header: "Phone",
      render: (contact: Contact) => contact.phone,
    },
    {
      key: "inquiry_type",
      header: "Type",
      render: (contact: Contact) => (
        <Badge variant="outline">{contact.inquiry_type}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (contact: Contact) => (
        <Badge className={getStatusBadge(contact.status)}>
          {contact.status}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "Created",
      render: (contact: Contact) => new Date(contact.created_at).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      render: (contact: Contact) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewContact(contact)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeleteContact(contact.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === "new").length,
    withReplies: contacts.filter(c => c.replies.length > 0).length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Management</h1>
          <p className="text-gray-600 mt-1">Manage customer inquiries and messages</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <Plus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Replies</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.withReplies}</div>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Table */}
      <ContactsTable
        data={contacts}
        columns={columns}
        loading={loading}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />

      {/* Contact Detail Dialog */}
      {selectedContact && (
        <ContactDetailDialog
          contact={selectedContact}
          open={showDetailDialog}
          onOpenChange={setShowDetailDialog}
          onContactUpdated={() => fetchContacts(pagination.page, pagination.limit)}
        />
      )}
    </div>
  );
}