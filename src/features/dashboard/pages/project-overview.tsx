import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


import { Users, MessageSquare, Phone, Lightbulb, HandHeart, AlertTriangle, Globe, Wifi } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProjectOverview() {
    const problems = [
        {
            title: "Fragmented Communication",
            description: "Residents lack a centralized way to receive verified village news, events, and alerts.",
        },
        {
            title: "Limited Transparency",
            description: "Feedback, complaints, or incident reporting often stay unresolved due to poor tracking.",
        },
        {
            title: "Emergency Unpreparedness",
            description: "No real-time way to alert communities about disasters, intruders, or missing people.",
        },
        {
            title: "Underutilized Local Talent",
            description: "Many residents have skills but no system to connect them with opportunities.",
        },
        {
            title: "Language Barriers",
            description: "Communities are multilingual (Kinyarwanda, English, French), but most digital tools are not.",
        },
        {
            title: "Connectivity Gaps",
            description: "Internet is unstable, yet information access is critical.",
        },
    ]

    const features = [
        {
            icon: Users,
            title: "Resident & Visitor Management",
            description: "Verified digital identities for community members",
        },
        {
            icon: MessageSquare,
            title: "News Feed & Events",
            description: "Centralized announcements and community updates",
        },
        {
            icon: AlertTriangle,
            title: "Emergency Alerts & Incident Reporting",
            description: "Real-time safety communication system",
        },
        {
            icon: Lightbulb,
            title: "Feedback & Suggestion Box",
            description: "Give residents a voice in community decisions",
        },
        { icon: HandHeart, title: "Skill Volunteering Board", description: "Connect local talent with village needs" },
        {
            icon: Phone,
            title: "Essential Contacts Directory",
            description: "Quick access to leaders and emergency services",
        },
        { icon: Globe, title: "Multilingual Support", description: "Accessible in Kinyarwanda, English, and French" },
        { icon: Wifi, title: "Offline-first Support", description: "Works even without stable internet connection" },
    ]

    const challenges = [
        {
            challenge: "Trust & Adoption",
            approach: "Build trust through leaders/moderators approving content and identities",
        },
        {
            challenge: "Digital Literacy",
            approach: "Keep UX simple, support local languages, and enable offline access",
        },
        {
            challenge: "Connectivity & Power Issues",
            approach: "Offline-first PWA, data sync when online",
        },
        {
            challenge: "Moderation & Verification",
            approach: "Approval workflows and moderator dashboards",
        },
        {
            challenge: "Scalability",
            approach: "Modular design, reusable for different communities",
        },
    ]

    const benefits = [
        "Community Engagement → Everyone has a voice, not just leaders",
        "Safety & Security → Faster response to incidents and emergencies",
        "Transparency & Accountability → Feedback and complaints are visible and tracked",
        "Empowerment → Residents showcase skills, volunteer, and contribute",
        "Digital Inclusion → Multilingual and offline-first ensures no one is left out",
    ]

    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-balance">Smart Village Platform</h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
                    Empowering rural communities through digital connectivity, transparency, and local engagement
                </p>
                <div className="flex justify-center gap-2">
                    <Badge variant="secondary">Community Management</Badge>
                    <Badge variant="secondary">Digital Inclusion</Badge>
                    <Badge variant="secondary">Offline-First</Badge>
                </div>
            </div>

            {/* The Problem */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-destructive">🌍 The Problem</CardTitle>
                    <CardDescription>
                        Rural and peri-urban communities face significant challenges in communication and organization
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        {problems.map((problem, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                                <h4 className="font-semibold mb-2">{problem.title}</h4>
                                <p className="text-sm text-muted-foreground">{problem.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* The Solution */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">✅ The Solution</CardTitle>
                    <CardDescription>Smart Village creates a digital community hub with comprehensive features</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon className="h-5 w-5 text-primary" />
                                        <h4 className="font-semibold">{feature.title}</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Challenges & Solutions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">🚧 Challenges to Overcome</CardTitle>
                    <CardDescription>How we address potential obstacles to successful implementation</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {challenges.map((item, index) => (
                            <div key={index} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-destructive mb-1">{item.challenge}</h4>
                                    <p className="text-sm">
                                        <strong>Approach:</strong> {item.approach}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Problem Tracking */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">🔍 Problem Tracking & Escalation</CardTitle>
                    <CardDescription>Every issue has a clear lifecycle from submission to resolution</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Incident Reports</h4>
                            <p className="text-sm">Residents report → Moderators verify → Alerts pushed → Follow-up logged</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Suggestions/Complaints</h4>
                            <p className="text-sm">
                                Residents submit → Moderators review → Published or escalated → Resolution tracked
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Registration Requests</h4>
                            <p className="text-sm">Residents sign up → Moderators approve → System logs and prevents duplicates</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Impact & Benefits */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">💡 What It Helps Achieve</CardTitle>
                    <CardDescription>The positive impact on community life and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <p className="text-sm">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Next Level */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">🌱 Uplift to the Next Level</CardTitle>
                    <CardDescription>Future expansion and integration possibilities</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Integration with Local Governance</h4>
                            <p className="text-sm text-muted-foreground">Reports and suggestions forwarded to government agencies</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Economic Empowerment</h4>
                            <p className="text-sm text-muted-foreground">
                                Add job boards, microfinance, and e-commerce for local products
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Smart Services</h4>
                            <p className="text-sm text-muted-foreground">
                                Digital IDs, health record linkage, and e-voting in the future
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Regional Expansion</h4>
                            <p className="text-sm text-muted-foreground">Replicate across districts and provinces</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="text-center space-y-4 p-6 bg-primary/5 rounded-lg">
                <h3 className="text-xl font-semibold">Ready to Transform Your Community?</h3>
                <p className="text-muted-foreground">
                    Join the Smart Village movement and empower your community through digital connectivity.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started Today
                </Button>
            </div>
        </div>
    )
}
