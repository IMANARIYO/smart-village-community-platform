import type React from "react";
import {
  Users,
  Newspaper,
  Calendar,
  Phone,
  Lightbulb,
  Handshake,
  AlertTriangle,
  Globe,
  Bell,
  DownloadCloud,
  Info,
  HelpCircle,
  FileText,
} from "lucide-react";

export interface SidebarLink {
  label: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Project Overview",
    path: "/overview",
    icon: Info,
  },
  {
    label: "FAQ",
    path: "/faq",
    icon: HelpCircle,
  },
  {
    label: "Documentation",
    path: "/docs",
    icon: FileText,
  },
  {
    label: "Resident & Visitor Management",
    path: "/residents",
    icon: Users,
  },
  {
    label: "Community News Feed",
    path: "/news",
    icon: Newspaper,
  },
  {
    label: "Event Calendar",
    path: "/events",
    icon: Calendar,
  },
  {
    label: "Essential Contacts",
    path: "/contacts",
    icon: Phone,
  },
  {
    label: "Suggestion Box / Feedback",
    path: "/suggestions",
    icon: Lightbulb,
  },
  {
    label: "Skill-Based Volunteering",
    path: "/volunteering",
    icon: Handshake,
  },
  {
    label: "Incident Reporting & Alerts",
    path: "/incidents",
    icon: AlertTriangle,
  },
  {
    label: "Multilingual Support",
    path: "/languages",
    icon: Globe,
  },
  {
    label: "Emergency Alerts",
    path: "/emergency",
    icon: Bell,
  },
  {
    label: "Offline-First Support",
    path: "/offline",
    icon: DownloadCloud,
  },
];
