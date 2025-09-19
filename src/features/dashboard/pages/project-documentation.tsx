import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Users, Shield, Smartphone, Database, Zap } from "lucide-react"


export default function ProjectDocumentation() {
    const technicalSpecs = [
        {
            category: "Platform Type",
            details: "Progressive Web App (PWA) with offline-first architecture",
        },
        {
            category: "Supported Languages",
            details: "Kinyarwanda, English, French with automatic translation",
        },
        {
            category: "Device Compatibility",
            details: "Mobile-first design, works on smartphones, tablets, and desktop",
        },
        {
            category: "Offline Capability",
            details: "Core features cached locally, automatic sync when online",
        },
        {
            category: "Security",
            details: "OTP verification, moderated content, role-based access control",
        },
    ]

    const userRoles = [
        {
            role: "Residents",
            icon: Users,
            permissions: [
                "Register with full verification",
                "Submit posts and suggestions",
                "Report incidents with photos",
                "Access all community features",
                "Volunteer for opportunities",
                "Comment on approved posts",
            ],
            restrictions: [
                "Content requires moderation approval",
                "Cannot approve other users",
                "Cannot send emergency alerts",
            ],
        },
        {
            role: "Visitors",
            icon: Smartphone,
            permissions: [
                "View approved community news",
                "Access essential contacts",
                "View public events",
                "Limited interaction capabilities",
            ],
            restrictions: [
                "Cannot post content",
                "Cannot report incidents",
                "Cannot access suggestion box",
                "Must be sponsored by resident",
            ],
        },
        {
            role: "Moderators",
            icon: Shield,
            permissions: [
                "Approve resident registrations",
                "Review and approve posts",
                "Verify incident reports",
                "Send emergency alerts",
                "Manage community content",
                "Access moderation dashboard",
            ],
            restrictions: ["Cannot delete system data", "Must follow community guidelines", "Actions are logged and tracked"],
        },
    ]

    const workflows = [
        {
            title: "User Registration Workflow",
            steps: [
                "User provides personal details and National ID",
                "Phone number verification via OTP",
                "Village selection and profile completion",
                "Moderator reviews application",
                "Approval notification sent to user",
                "Full platform access granted",
            ],
        },
        {
            title: "Content Publishing Workflow",
            steps: [
                "Resident creates post with text/images",
                "Content submitted to moderation queue",
                "Moderator reviews for appropriateness",
                "Approved content appears in news feed",
                "Community members can view and comment",
                "Engagement metrics tracked",
            ],
        },
        {
            title: "Incident Reporting Workflow",
            steps: [
                "Resident reports incident with details",
                "Optional photo and location attachment",
                "Report sent to moderation queue",
                "Moderator verifies incident details",
                "Emergency alert sent if necessary",
                "Follow-up actions logged and tracked",
            ],
        },
    ]

    const dataManagement = [
        {
            aspect: "Data Storage",
            description: "Local caching for offline access, cloud sync for real-time updates",
        },
        {
            aspect: "Privacy Protection",
            description: "Personal data encrypted, anonymous suggestions supported",
        },
        {
            aspect: "Content Moderation",
            description: "All user-generated content reviewed before publication",
        },
        {
            aspect: "Backup & Recovery",
            description: "Regular automated backups, disaster recovery procedures",
        },
    ]

    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-balance">Technical Documentation</h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
                    Comprehensive guide to Smart Village platform architecture, workflows, and implementation details
                </p>
            </div>

            {/* Technical Specifications */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Technical Specifications
                    </CardTitle>
                    <CardDescription>Core platform capabilities and technical requirements</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {technicalSpecs.map((spec, index) => (
                            <div key={index} className="flex justify-between items-start p-3 border rounded-lg">
                                <div className="font-medium text-sm">{spec.category}</div>
                                <div className="text-sm text-muted-foreground text-right max-w-md">{spec.details}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* User Roles & Permissions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        User Roles & Permissions
                    </CardTitle>
                    <CardDescription>Detailed breakdown of user types and their access levels</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {userRoles.map((role, index) => {
                            const Icon = role.icon
                            return (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Icon className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">{role.role}</h3>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                Permissions
                                            </h4>
                                            <ul className="space-y-1">
                                                {role.permissions.map((permission, pIndex) => (
                                                    <li key={pIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                                        <div className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                                        {permission}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4 text-orange-600" />
                                                Restrictions
                                            </h4>
                                            <ul className="space-y-1">
                                                {role.restrictions.map((restriction, rIndex) => (
                                                    <li key={rIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                                        <div className="w-1 h-1 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                                                        {restriction}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* System Workflows */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        System Workflows
                    </CardTitle>
                    <CardDescription>Step-by-step processes for key platform operations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {workflows.map((workflow, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-4">{workflow.title}</h3>
                                <div className="space-y-3">
                                    {workflow.steps.map((step, stepIndex) => (
                                        <div key={stepIndex} className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                                                {stepIndex + 1}
                                            </div>
                                            <p className="text-sm text-muted-foreground pt-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Data Management & Security
                    </CardTitle>
                    <CardDescription>How user data is handled, stored, and protected</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {dataManagement.map((item, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                                <h4 className="font-semibold mb-2">{item.aspect}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Implementation Guidelines */}
            <Card>
                <CardHeader>
                    <CardTitle>Implementation Guidelines</CardTitle>
                    <CardDescription>Best practices for deploying Smart Village in your community</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg">
                            <h4 className="font-semibold mb-2">Phase 1: Community Preparation</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Identify and train community moderators</li>
                                <li>• Establish community guidelines and policies</li>
                                <li>• Plan resident onboarding and training sessions</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-secondary/5 rounded-lg">
                            <h4 className="font-semibold mb-2">Phase 2: Platform Deployment</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Set up technical infrastructure and hosting</li>
                                <li>• Configure multilingual support for local languages</li>
                                <li>• Test offline functionality and data sync</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-accent/5 rounded-lg">
                            <h4 className="font-semibold mb-2">Phase 3: Community Launch</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Begin resident registration and verification</li>
                                <li>• Start with essential features (news, contacts, events)</li>
                                <li>• Gradually introduce advanced features (volunteering, reporting)</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
