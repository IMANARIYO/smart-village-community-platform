import TeamCard from "./team-card"

import { Button } from "@/components/ui/button"
import {
    Mail,

    Code2,
    Smartphone,
    Monitor,
    Server,
    Database,
    Globe,
    ShoppingCart,
    Settings,
    Layers,
    Terminal,

    Cpu,
    FileCode2
} from "lucide-react"

const teamMembers = [

    {
        name: "IMANARIYO BAPTISTE",
        role: "Full Stack software engineer",
        tagline: "Building scalable web aplications &  both mobile & desktop applications solutions solutions",
        degree: "BSc in Computer & Software Engineering",
        university: "University of Rwanda - College of Science and Technology",
        bio: "IMANARIYO is a Full Stack Developer with over 3 years of experience building clean, scalable, and production-ready web and mobile applications using modern technologies. Passionate about delivering high-quality solutions, optimizing performance, and continuously learning to stay at the forefront of software development.",

        photoUrl: "/imgs/IMANARIYO BAPTISTE PASSPORT.jpg",
        email: "imanariyo@example.com",
        linkedin: "https://www.linkedin.com/in/imanariyobaptiste/",
        github: "https://github.com/IMANARIYO",
        website: "https://imanariyo-portfolio-web.vercel.app/",
        location: "Kigali, Rwanda",
        certifications: ["Full Stack Development", "TypeScript Expert", "React & Next.js Specialist"],

        skills: [
            { name: "Flutter", icon: <Smartphone className="w-4 h-4" /> },
            { name: "Dart", icon: <Code2 className="w-4 h-4" /> },
            { name: "Java", icon: <Cpu className="w-4 h-4" /> },
            { name: "Node.js", icon: <Server className="w-4 h-4" /> },
            { name: "TypeScript", icon: <FileCode2 className="w-4 h-4" /> },
            { name: "React", icon: <Code2 className="w-4 h-4" /> },
            { name: "Next.js", icon: <Layers className="w-4 h-4" /> },
            { name: "Flask", icon: <Terminal className="w-4 h-4" /> },
            { name: "Django", icon: <Database className="w-4 h-4" /> },
            { name: "Project Management", icon: <Settings className="w-4 h-4" /> },
            { name: "Mobile Apps", icon: <Smartphone className="w-4 h-4" /> },
            { name: "Desktop Apps", icon: <Monitor className="w-4 h-4" /> },
            { name: "Web Development", icon: <Globe className="w-4 h-4" /> },
            { name: "E-commerce", icon: <ShoppingCart className="w-4 h-4" /> }
        ]
    },
    {
        name: "Dr. Sarah Johnson",
        role: "Project Director & Community Development Specialist",
        degree: "PhD in Rural Development",

        university: "University of Agriculture & Technology",
        bio: "With over 15 years of experience in rural community development, Dr. Johnson leads our mission to bridge the digital divide in villages. She specializes in sustainable development practices and community engagement strategies.",
        photoUrl: "/smiling-professional-woman.png",
        email: "sarah.johnson@smartvillage.org",
        phone: "+1-555-0123",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        location: "Rural Development Hub, Kenya",
        certifications: ["PMP", "Rural Development Certified", "Digital Literacy Trainer"],
    },
    {
        name: "Michael Chen",
        role: "Lead Software Engineer",
        degree: "MS Computer Science",
        university: "Stanford University",
        bio: "Michael brings 10+ years of full-stack development experience to create robust, scalable solutions for rural communities. He's passionate about building technology that works reliably even with limited internet connectivity.",
        photoUrl: "/asian-male-software-engineer-smiling.jpg",
        email: "michael.chen@smartvillage.org",
        github: "https://github.com/michaelchen",
        linkedin: "https://linkedin.com/in/michaelchen-dev",
        website: "https://michaelchen.dev",
        location: "San Francisco, CA",
        certifications: ["AWS Solutions Architect", "Google Cloud Professional", "Scrum Master"],
    },
    {
        name: "Amara Okafor",
        role: "Community Engagement Manager",
        degree: "BA Social Work",
        university: "University of Lagos",
        bio: "Amara works directly with village leaders and residents to ensure our platform meets real community needs. Her background in social work and deep understanding of African rural communities drives our user-centered approach.",
        photoUrl: "/african-woman-community-worker-smiling.jpg",
        email: "amara.okafor@smartvillage.org",
        phone: "+234-801-234-5678",
        linkedin: "https://linkedin.com/in/amaraokafor",
        twitter: "https://twitter.com/amaraokafor",
        location: "Lagos, Nigeria",
        certifications: ["Community Development Professional", "Digital Inclusion Specialist"],
    },
    {
        name: "James Rodriguez",
        role: "UX/UI Designer",
        degree: "BFA Digital Design",
        university: "Art Institute of Chicago",
        bio: "James focuses on creating intuitive, accessible interfaces that work for users with varying levels of digital literacy. His designs prioritize simplicity and cultural sensitivity for diverse rural communities.",
        photoUrl: "/hispanic-male-designer-with-beard-smiling.jpg",
        email: "james.rodriguez@smartvillage.org",
        linkedin: "https://linkedin.com/in/jamesrodriguezux",
        website: "https://jamesrodriguez.design",
        twitter: "https://twitter.com/jamesuxdesign",
        location: "Mexico City, Mexico",
        certifications: ["Google UX Design Certificate", "Accessibility Specialist", "Design Thinking Certified"],
    },
    {
        name: "Dr. Priya Sharma",
        role: "Data Analyst & Research Coordinator",
        degree: "PhD Statistics",
        university: "Indian Institute of Technology",
        bio: "Dr. Sharma analyzes community data to help villages make informed decisions and track development progress. She ensures our platform provides meaningful insights while protecting user privacy and data security.",
        photoUrl: "/indian-woman-data-scientist-with-traditional-dress.jpg",
        email: "priya.sharma@smartvillage.org",
        linkedin: "https://linkedin.com/in/priyasharma-data",
        github: "https://github.com/priyasharma",
        location: "Bangalore, India",
        certifications: ["Certified Analytics Professional", "Data Privacy Officer", "R Programming Expert"],
    },
    {
        name: "David Kimani",
        role: "Field Operations Coordinator",
        degree: "Diploma in Information Technology",
        university: "Kenya Institute of Technology",
        bio: "David coordinates on-ground implementation and training programs across multiple villages. His technical background combined with grassroots experience ensures smooth platform deployment and user adoption.",
        photoUrl: "/kenyan-male-field-worker-with-laptop-smiling.jpg",
        email: "david.kimani@smartvillage.org",
        phone: "+254-712-345-678",
        linkedin: "https://linkedin.com/in/davidkimani",
        location: "Nairobi, Kenya",
        certifications: ["Digital Literacy Trainer", "Project Management", "Community Mobilization"],
    },
]

export default function MeetOurTeam() {
    return (
        <section id="ourTeam" className="space-y-8 w-full px-2 ">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-foreground">Meet Our Team</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Our diverse team combines technical expertise with deep community development experience. We're passionate
                    about empowering rural communities through innovative technology solutions that respect local cultures and
                    address real-world challenges.
                </p>
            </div>

            {/* Team Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-between items-center w-[98%]">
                {teamMembers.map((member, index) => (
                    <TeamCard key={index} {...member} />
                ))}
            </div>

            {/* Call to Action */}
            <div className="bg-primary/5 rounded-lg p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Join Our Mission</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We're always looking for passionate individuals who want to make a difference in rural communities. Whether
                    you're a developer, community organizer, or domain expert, we'd love to hear from you.
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
