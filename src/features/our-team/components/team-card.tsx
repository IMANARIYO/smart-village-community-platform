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
    skills?: Skill[]
    certifications?: string[]
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

    const contactLinks = [
        { url: email ? `mailto:${email}` : undefined, label: "Email", icon: Mail },
        { url: phone ? `tel:${phone}` : undefined, label: "Call", icon: Phone },
        { url: linkedin, label: "LinkedIn", icon: Linkedin },
        { url: github, label: "GitHub", icon: Github },
        { url: website, label: "Website", icon: Globe },
        { url: twitter, label: "Twitter", icon: Twitter },
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
        <Card className="h-[480px] w-full hover:shadow-xl transition-all duration-300 border border-muted/20 rounded-xl overflow-hidden group flex flex-col bg-primary-light">
            {/* Compact Header */}
            <CardHeader className="bg-gradient-to-br from-primary-light/5 to-primary-darker/10 py-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="w-20 h-20 shadow-lg border-2 border-white group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                        <AvatarImage src={photoUrl || "/placeholder.svg"} alt={name} />
                        <AvatarFallback className="text-lg font-bold bg-primary/20 text-primary">
                            {getInitials(name)}
                        </AvatarFallback>
                    </Avatar>

                    {/* Basic Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground truncate">{name}</h3>
                        <p className="text-primary font-semibold text-sm  w-[80%]">{role}</p>
                        {location && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate">{location}</span>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats */}
                    <div className="text-center flex-shrink-0">
                        <div className="text-lg font-bold text-primary">
                            {skills?.length || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Skills</div>
                    </div>
                </div>

                {/* Tagline - Expandable */}
                {tagline && (
                    <div className="mt-3 border-t border-white/20 pt-3">
                        <div className="flex items-start gap-2">
                            <Quote className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                            <p className={`text-xs italic text-muted-foreground transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'
                                }`}>
                                {tagline}
                            </p>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                            >
                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                        </div>
                    </div>
                )}
            </CardHeader>

            {/* Tab Navigation */}
            <div className="flex border-b border-muted/20 bg-muted/5 flex-shrink-0">
                {tabs.map((tab) => {
                    const IconComponent = tab.icon
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-all duration-200 ${activeTab === tab.id
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                                }`}
                        >
                            <IconComponent className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {/* Tab Content */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
                {activeTab === 'about' && (
                    <div className="space-y-4 h-full">
                        {/* Education */}
                        {(degree || university) && (
                            <div className="bg-muted/10 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <GraduationCap className="w-4 h-4 text-primary" />
                                    <h4 className="text-sm font-semibold">Education</h4>
                                </div>
                                <div className="text-xs space-y-1">
                                    {degree && <p className="font-medium">{degree}</p>}
                                    {university && <p className="text-muted-foreground">{university}</p>}
                                </div>
                            </div>
                        )}

                        {/* Bio */}
                        <div className="bg-muted/10 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <User className="w-4 h-4 text-primary" />
                                <h4 className="text-sm font-semibold">About</h4>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{bio}</p>
                        </div>

                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <div className="bg-secondary/10 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <Trophy className="w-4 h-4 text-primary" />
                                    <h4 className="text-sm font-semibold">Certifications</h4>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {certifications.map((cert, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="text-xs px-2 py-1 rounded-full"
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
                        {skills && skills.length > 0 ? (
                            <>
                                <div className="flex items-center gap-2 mb-3">
                                    <Zap className="w-4 h-4 text-primary" />
                                    <h4 className="text-sm font-semibold">Technical Skills</h4>
                                    <Badge variant="outline" className="text-xs">
                                        {skills.length}
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {skills.map((skill, index) => {
                                        const IconComponent = skill.icon
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-2 rounded-lg bg-muted/10 hover:bg-primary/10 transition-colors group/skill"
                                            >
                                                {IconComponent && (
                                                    <span className="text-primary group-hover/skill:scale-110 transition-transform">
                                                        {IconComponent}
                                                    </span>
                                                )}
                                                <span className="text-xs font-medium truncate">{skill.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <div className="text-center">
                                    <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
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
                                    <Globe className="w-4 h-4 text-primary" />
                                    <h4 className="text-sm font-semibold">Get in Touch</h4>
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
                                                className="w-full justify-start gap-3 hover:bg-primary hover:text-primary-foreground transition-all duration-200 h-auto py-3"
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
                                                    className="flex items-center gap-3 w-full"
                                                >
                                                    <IconComponent className="w-4 h-4 flex-shrink-0" />
                                                    <div className="text-left">
                                                        <div className="text-xs font-medium">{link.label}</div>
                                                        <div className="text-xs text-muted-foreground truncate">
                                                            {link.url?.replace('mailto:', '').replace('tel:', '').replace('https://', '')}
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
                                    <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
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