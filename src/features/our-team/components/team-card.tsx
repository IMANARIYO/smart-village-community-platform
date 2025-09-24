/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Mail, Phone, Linkedin, Github, Globe, Twitter, MapPin,
    GraduationCap, User, Zap, Quote, ChevronDown, ChevronUp,
    Info, Code, Trophy
} from "lucide-react"
import { useState } from "react"

interface Skill {
    name: string
    icon?: React.ReactNode
}

interface TeamCardProps {
    name: string
    role: string
    tagline?: string
    degree?: string
    university?: string
    bio: string
    photoUrl?: string
    email?: string
    phone?: string
    linkedin?: string
    github?: string
    website?: string
    twitter?: string
    location?: string
    skills?: Skill[] | string[] | string
    certifications?: string[] | string
}

export default function TeamCard({
    name,
    role,
    tagline,
    degree,
    university,
    bio,
    skills,
    photoUrl,
    email,
    phone,
    linkedin,
    github,
    website,
    twitter,
    location,
    certifications,
}: TeamCardProps) {
    const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'connect'>('about')
    const [isExpanded, setIsExpanded] = useState(false)

    // Utility function to parse array-like data
    const parseArrayData = (data: string[] | string | undefined): string[] => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (typeof data === 'string') {
            // Handle comma-separated strings
            return data.split(',').map(item => item.trim()).filter(item => item.length > 0);
        }
        return [];
    };

    // Parse skills and certifications
    const parsedSkills: Skill[] = (() => {
        if (!skills) return [];
        if (Array.isArray(skills)) {
            return skills.map(skill => 
                typeof skill === 'string' ? { name: skill } : skill
            );
        }
        if (typeof skills === 'string') {
            return parseArrayData(skills).map(skill => ({ name: skill }));
        }
        return [];
    })();
    const parsedCertifications: string[] = parseArrayData(certifications);

    const createEmailUrl = (email: string, name: string, role: string) => {
        const subject = encodeURIComponent(`Hello ${name} - Smart Village Platform Inquiry`);
        const body = encodeURIComponent(
            `Hello ${name},\n\n` +
            `I hope this message finds you well. I came across your profile on the Smart Village Platform and was impressed by your work as ${role}.\n\n` +
            `I would like to connect with you regarding:\n` +
            `- [Please specify your inquiry here]\n\n` +
            `Best regards,\n` +
            `[Your name]\n\n` +
            `---\n` +
            `This message was sent via Smart Village Platform`
        );
        return `mailto:${email}?subject=${subject}&body=${body}`;
    };

    const contactLinks = [
        { 
            url: email ? createEmailUrl(email, name, role) : undefined, 
            label: "Email", 
            icon: Mail,
            description: email
        },
        { 
            url: phone ? `tel:${phone}` : undefined, 
            label: "Call", 
            icon: Phone,
            description: phone
        },
        { 
            url: linkedin, 
            label: "LinkedIn", 
            icon: Linkedin,
            description: linkedin?.replace('https://', '')
        },
        { 
            url: github, 
            label: "GitHub", 
            icon: Github,
            description: github?.replace('https://', '')
        },
        { 
            url: website, 
            label: "Website", 
            icon: Globe,
            description: website?.replace('https://', '')
        },
        { 
            url: twitter, 
            label: "Twitter", 
            icon: Twitter,
            description: twitter?.replace('https://', '')
        },
    ].filter((link) => link.url)

    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()

    const tabs = [
        { id: 'about', label: 'About', icon: Info },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'connect', label: 'Connect', icon: Globe },
    ]

    return (
        <Card className="h-[480px] sm:h-[520px] w-full max-w-sm mx-auto hover:shadow-xl transition-all duration-300 border rounded-xl overflow-hidden group flex flex-col" style={{ backgroundColor: "var(--sv-primary-light)", borderColor: "var(--sv-primary-normal)" }}>
            {/* Compact Header */}
            <CardHeader className="py-3 sm:py-4 px-3 sm:px-4 flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--sv-primary-light) 0%, var(--sv-primary-normal) 100%)" }}>
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Avatar */}
                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 shadow-lg border-2 border-white group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                        <AvatarImage src={photoUrl || "/placeholder.svg"} alt={name} />
                        <AvatarFallback className="text-sm sm:text-lg font-bold text-white" style={{ backgroundColor: "var(--sv-primary-normal)" }}>
                            {getInitials(name)}
                        </AvatarFallback>
                    </Avatar>

                    {/* Basic Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-lg font-bold text-white truncate">{name}</h3>
                        <p className="text-xs sm:text-sm font-semibold text-white/90 leading-tight">{role}</p>
                        {location && (
                            <div className="flex items-center gap-1 text-xs text-white/70 mt-1">
                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{location}</span>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats */}
                    <div className="text-center flex-shrink-0">
                        <div className="text-lg sm:text-xl font-bold text-white">
                            {parsedSkills?.length || 0}
                        </div>
                        <div className="text-xs text-white/70">Skills</div>
                    </div>
                </div>

                {/* Tagline - Expandable */}
                {tagline && (
                    <div className="mt-2 sm:mt-3 border-t border-white/20 pt-2 sm:pt-3">
                        <div className="flex items-start gap-2">
                            <Quote className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                            <p className={`text-xs italic text-white/80 transition-all duration-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-2 sm:line-clamp-3'
                                }`}>
                                {tagline}
                            </p>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-white hover:text-white/80 transition-colors flex-shrink-0"
                            >
                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                        </div>
                    </div>
                )}
            </CardHeader>

            {/* Tab Navigation */}
            <div className="flex border-b flex-shrink-0" style={{ borderColor: "var(--sv-primary-light)", backgroundColor: "var(--sv-secondary-light)" }}>
                {tabs.map((tab) => {
                    const IconComponent = tab.icon
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs font-medium transition-all duration-200 ${
                                isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                            }`}
                            style={isActive ? { backgroundColor: "var(--sv-primary-normal)" } : { backgroundColor: "transparent" }}
                        >
                            <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline sm:inline text-xs">{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {/* Tab Content */}
            <CardContent className="flex-1 p-3 sm:p-4 overflow-y-auto bg-white">
                {activeTab === 'about' && (
                    <div className="space-y-4 h-full">
                        {/* Education */}
                        {(degree || university) && (
                            <div className="rounded-lg p-2 sm:p-3" style={{ backgroundColor: "var(--sv-secondary-light)" }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <GraduationCap className="w-4 h-4" style={{ color: "var(--sv-primary-normal)" }} />
                                    <h4 className="text-xs sm:text-sm font-semibold" style={{ color: "var(--sv-primary-normal)" }}>Education</h4>
                                </div>
                                <div className="text-xs space-y-1">
                                    {degree && <p className="font-medium text-foreground">{degree}</p>}
                                    {university && <p className="text-muted-foreground">{university}</p>}
                                </div>
                            </div>
                        )}

                        {/* Bio */}
                        <div className="rounded-lg p-2 sm:p-3" style={{ backgroundColor: "var(--sv-secondary-light)" }}>
                            <div className="flex items-center gap-2 mb-2">
                                <User className="w-4 h-4" style={{ color: "var(--sv-primary-normal)" }} />
                                <h4 className="text-xs sm:text-sm font-semibold" style={{ color: "var(--sv-primary-normal)" }}>About</h4>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{bio}</p>
                        </div>

                        {/* Certifications */}
                        {parsedCertifications && parsedCertifications.length > 0 && (
                            <div className="rounded-lg p-2 sm:p-3" style={{ backgroundColor: "var(--sv-accent-light)" }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <Trophy className="w-4 h-4" style={{ color: "var(--sv-accent-normal)" }} />
                                    <h4 className="text-xs sm:text-sm font-semibold" style={{ color: "var(--sv-accent-normal)" }}>Certifications</h4>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {parsedCertifications.map((cert, index) => (
                                        <Badge
                                            key={index}
                                            className="text-xs px-2 py-1 rounded-full text-white"
                                            style={{ backgroundColor: "var(--sv-accent-normal)" }}
                                        >
                                            {cert}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-4 h-full">
                        {parsedSkills && parsedSkills.length > 0 ? (
                            <>
                                <div className="flex items-center gap-2 mb-3">
                                    <Zap className="w-4 h-4" style={{ color: "var(--sv-primary-normal)" }} />
                                    <h4 className="text-xs sm:text-sm font-semibold" style={{ color: "var(--sv-primary-normal)" }}>Technical Skills</h4>
                                    <Badge className="text-xs text-white" style={{ backgroundColor: "var(--sv-primary-normal)" }}>
                                        {parsedSkills.length}
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {parsedSkills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 rounded-lg transition-colors group/skill hover:shadow-sm"
                                            style={{ backgroundColor: "var(--sv-secondary-light)" }}
                                        >
                                            <Code className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: "var(--sv-primary-normal)" }} />
                                            <span className="text-xs font-medium truncate text-foreground">
                                                {typeof skill === 'string' ? skill : skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <div className="text-center">
                                    <Code className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-xs">No skills listed</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'connect' && (
                    <div className="space-y-4 h-full">
                        {contactLinks.length > 0 ? (
                            <>
                                <div className="flex items-center gap-2 mb-3">
                                    <Globe className="w-4 h-4" style={{ color: "var(--sv-primary-normal)" }} />
                                    <h4 className="text-xs sm:text-sm font-semibold" style={{ color: "var(--sv-primary-normal)" }}>Get in Touch</h4>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {contactLinks.map((link, index) => {
                                        const IconComponent = link.icon
                                        return (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="sm"
                                                asChild
                                                className="w-full justify-start gap-2 sm:gap-3 transition-all duration-200 h-auto py-2 sm:py-3 text-xs hover:text-white"
                                                style={{ 
                                                    borderColor: "var(--sv-primary-normal)",
                                                    '--hover-bg': "var(--sv-primary-normal)"
                                                } as React.CSSProperties & { '--hover-bg': string }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = "var(--sv-primary-normal)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "transparent";
                                                }}
                                            >
                                                <a
                                                    href={link.url}
                                                    target={
                                                        link.label !== "Email" && link.label !== "Call"
                                                            ? "_blank"
                                                            : undefined
                                                    }
                                                    rel={
                                                        link.label !== "Email" && link.label !== "Call"
                                                            ? "noopener noreferrer"
                                                            : undefined
                                                    }
                                                    className="flex items-center gap-2 sm:gap-3 w-full"
                                                >
                                                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                                    <div className="text-left flex-1 min-w-0">
                                                        <div className="text-xs font-medium">{link.label}</div>
                                                        <div className="text-xs text-muted-foreground truncate">
                                                            {link.description}
                                                        </div>
                                                    </div>
                                                </a>
                                            </Button>
                                        )
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <div className="text-center">
                                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-xs">No contact info available</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}