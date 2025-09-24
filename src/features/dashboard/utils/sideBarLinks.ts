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
  MessageSquare,
} from "lucide-react";

export interface SidebarLink {
  label: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Project Overview",
    path: "/dashboard/overview",
    icon: Info,
  },
  {
    label: "FAQ",
    path: "/dashboard/faq",
    icon: HelpCircle,
  },
  {
    label: "Documentation",
    path: "/dashboard/docs",
    icon: FileText,
  },
  {
    label: "Resident & Visitor Management",
    path: "/dashboard/residents",
    icon: Users,
  },
  {
    label: "Community News Feed",
    path: "/dashboard/news",
    icon: Newspaper,
  },
  {
    label: "Event Calendar",
    path: "/dashboard/events",
    icon: Calendar,
  },
  {
    label: "Essential Contacts",
    path: "/dashboard/contacts",
    icon: Phone,
  },
  {
    label: "Suggestion Box / Feedback",
    path: "/dashboard/suggestions",
    icon: Lightbulb,
  },
  {
    label: "Skill-Based Volunteering",
    path: "/dashboard/volunteering",
    icon: Handshake,
  },
  {
    label: "Incident Reporting & Alerts",
    path: "/dashboard/incidents",
    icon: AlertTriangle,
  },
  {
    label: "Multilingual Support",
    path: "/dashboard/languages",
    icon: Globe,
  },
  {
    label: "Emergency Alerts",
    path: "/dashboard/emergency",
    icon: Bell,
  },
  {
    label: "Offline-First Support",
    path: "/dashboard/offline",
    icon: DownloadCloud,
  },
];

// Individual navigation link
export interface NavigationItem {
  type?: "item"; // optional type hint
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

// Group of navigation items
export interface NavigationGroup {
  type: "group";
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavigationItem[];
}

// Union type for flexibility
export type SidebarEntry = NavigationItem | NavigationGroup;

// Sidebar configuration
export const sidebarEntries: SidebarEntry[] = [
  // Individual items
  {
    type: "item",
    name: "Project Overview",
    href: "/dashboard/overview",
    icon: Info,
  },
  { type: "item", name: "FAQ", href: "/dashboard/faq", icon: HelpCircle },
  {
    type: "item",
    name: "event and the anounvce mane  page",
    href: "/dashboard/events",
    icon: HelpCircle,
  },
  {
    type: "item",
    name: "Documentation",
    href: "/dashboard/docs",
    icon: FileText,
  },
  {
    type: "item",
    name: "test",
    href: "/dashboard/test",
    icon: FileText,
  },
  {
    type: "item",
    name: "leaders village leaders",
    href: "/dashboard/leaders",
    icon: FileText,
  },

  // Grouped items
  {
    type: "group",
    name: "Community Management",
    icon: Users,
    items: [
      {
        name: "Residents & Visitors",
        href: "/dashboard/residents",
        icon: Users,
      },
      { name: "Community News Feed", href: "/dashboard/news", icon: Newspaper },
      {
        name: "Event Calendar",
        href: "/dashboard/eventsCalendar",
        icon: Calendar,
      },
      { name: "Essential Contacts", href: "/dashboard/contacts", icon: Phone },
    ],
  },

  {
    type: "group",
    name: "admin system managemmen",
    icon: Users,
    items: [
      {
        name: "Village Leaders management",
        href: "/dashboard/leaders",
        icon: Users,
      },
      {
        name: "contact us meassege management",
        href: "/dashboard/contactus",
        icon: MessageSquare,
      },

      {
        name: "team  management",
        href: "/dashboard/our-team",
        icon: Users,
      },
    ],
  },

  {
    type: "group",
    name: "Engagement & Volunteering",
    icon: Handshake,
    items: [
      {
        name: "Suggestion Box / Feedback",
        href: "/dashboard/suggestions",
        icon: Lightbulb,
      },
      {
        name: "Skill-Based Volunteering",
        href: "/dashboard/volunteering",
        icon: Handshake,
      },
    ],
  },
  {
    type: "group",
    name: "Safety & Alerts",
    icon: AlertTriangle,
    items: [
      {
        name: "Incident Reporting & Alerts",
        href: "/dashboard/incidents",
        icon: AlertTriangle,
      },
      { name: "Emergency Alerts", href: "/dashboard/emergency", icon: Bell },
    ],
  },
  {
    type: "group",
    name: "Accessibility & Offline",
    icon: Globe,
    items: [
      {
        name: "Multilingual Support",
        href: "/dashboard/languages",
        icon: Globe,
      },
      {
        name: "Offline-First Support",
        href: "/dashboard/offline",
        icon: DownloadCloud,
      },
    ],
  },
];
