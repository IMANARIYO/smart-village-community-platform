import { useState, useEffect } from "react";
import TeamCard from "../components/team-card";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import TeamService, { type TeamMember } from "../service";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { toast } from "sonner";



export default function MeetOurTeam() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                setLoading(true);
                const response = await TeamService.listTeamMembers(1, 50);
                if (response.success && response.data) {
                    setTeamMembers(response.data);
                } else {
                    setError("Failed to load team members");
                }
            } catch (err) {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                toast.error("Failed to load team members");
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMembers();
    }, []);

    const transformTeamMember = (member: TeamMember) => ({
        name: member.name,
        role: member.role,
        tagline: member.tagline,
        degree: member.degree,
        university: member.university,
        bio: member.bio,
        photoUrl: member.photo_url,
        email: member.email,
        phone: member.phone,
        linkedin: member.linkedin,
        github: member.github,
        website: member.website,
        twitter: member.twitter,
        location: member.location,
        skills: member.skills?.map(skill => ({ name: skill })) || [],
        certifications: member.certifications || []
    });

    return (
        <section id="ourTeam" className="space-y-8 w-full px-2">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold" style={{ color: "var(--sv-primary-normal)" }}>
                    Meet Our Team
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Our diverse team combines technical expertise with deep community development experience. We're passionate
                    about empowering rural communities through innovative technology solutions that respect local cultures and
                    address real-world challenges.
                </p>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--sv-primary-normal)" }} />
                    <span className="ml-2 text-muted-foreground">Loading team members...</span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-12">
                    <div className="bg-destructive/15 text-destructive p-4 rounded-lg max-w-md mx-auto">
                        <p>{error}</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            )}

            {/* Team Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-between items-center w-[98%]">
                    {teamMembers.map((member) => (
                        <TeamCard key={member.id} {...transformTeamMember(member)} />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && teamMembers.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No team members found.</p>
                </div>
            )}

            {/* Call to Action */}
            <div className="rounded-lg p-8 text-center space-y-4" style={{ backgroundColor: "var(--sv-primary-light)" }}>
                <h2 className="text-2xl font-bold" style={{ color: "var(--sv-primary-normal)" }}>
                    Join Our Mission
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We're always looking for passionate individuals who want to make a difference in rural communities. Whether
                    you're a developer, community organizer, or domain expert, we'd love to hear from you.
                    u.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                        <Mail className="w-4 h-4 mr-2" />
                        careers@smartvillage.org
                    </Button>
                    <Button variant="outline" size="lg">
                        View Open Positions
                    </Button>
                </div>
            </div>
        </section>
    )
}
