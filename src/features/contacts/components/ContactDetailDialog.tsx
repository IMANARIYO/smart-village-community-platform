import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, User, Mail, Phone, Building } from "lucide-react";
import { toast } from "sonner";
import ContactService, { type Contact, type ContactReplyRequest } from "../service";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

interface ContactDetailDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactUpdated: () => void;
}

export function ContactDetailDialog({
  contact,
  open,
  onOpenChange,
  onContactUpdated,
}: ContactDetailDialogProps) {
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddReply = async () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setLoading(true);
    try {
      const replyData: ContactReplyRequest = {
        reply_message: replyMessage,
      };
      await ContactService.addReply(contact.id, replyData);
      toast.success("Reply added successfully");
      setReplyMessage("");
      onContactUpdated();
      onOpenChange(false);
    } catch (error) {
      toast.error(extractErrorMessage(error, "Failed to add reply"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
    };
    return variants[status as keyof typeof variants] || variants.new;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Contact Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{contact.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span>{contact.organization}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant="outline">{contact.inquiry_type}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge className={getStatusBadge(contact.status)}>
                    {contact.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Created: {new Date(contact.created_at).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            {/* Original Message */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Original Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
              </CardContent>
            </Card>
          </div>

          {/* Replies Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Replies ({contact.replies.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contact.replies.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No replies yet</p>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {contact.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="border rounded-lg p-3 bg-muted/50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-sm">
                            {reply.replied_by_username}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(reply.replied_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">
                          {reply.reply_message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Add Reply */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Reply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="reply">Reply Message</Label>
                  <Textarea
                    id="reply"
                    placeholder="Type your reply here..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleAddReply}
                    disabled={loading || !replyMessage.trim()}
                  >
                    {loading ? "Sending..." : "Send Reply"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}