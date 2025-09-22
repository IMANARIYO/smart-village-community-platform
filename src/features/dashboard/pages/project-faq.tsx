
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function ProjectFAQ() {
    const faqSections = [
        {
            title: "Resident & Visitor Management",
            badge: "User Management",
            questions: [
                {
                    q: "How do residents register in the system?",
                    a: "Residents register with full details including phone number verification via OTP, village selection, and their National ID Number.",
                },
                {
                    q: "How are visitors registered?",
                    a: "Visitors can only be registered by residents. Each visitor account is linked to the resident who added them.",
                },
                {
                    q: "What about approvals?",
                    a: "Moderators or village leaders approve resident registrations. Visitors are automatically linked to their resident sponsor.",
                },
                {
                    q: "Do residents and visitors have the same access?",
                    a: "No. Residents get full access, while visitors have limited access rights.",
                },
            ],
        },
        {
            title: "Community News Feed",
            badge: "Communication",
            questions: [
                {
                    q: "What kind of content can be shared?",
                    a: "Announcements and updates about the village. Posts can include both text and images.",
                },
                {
                    q: "Who can post and who approves?",
                    a: "Residents can submit posts, but moderators approve them before they appear in the feed to avoid inappropriate content.",
                },
                {
                    q: "Can residents interact with posts?",
                    a: "Yes, residents can view and comment once a post is approved.",
                },
                {
                    q: "Is the news feed available offline?",
                    a: "Yes, using PWA caching, residents can access the feed even without internet.",
                },
            ],
        },
        {
            title: "Event Calendar",
            badge: "Events",
            questions: [
                {
                    q: "What is the purpose of the event calendar?",
                    a: "It lists important meetings, workshops, and community events in the village.",
                },
            ],
        },
        {
            title: "Essential Contacts Directory",
            badge: "Emergency",
            questions: [
                {
                    q: "What does the directory include?",
                    a: "Emergency numbers, contacts for village leaders, and health workers.",
                },
                {
                    q: "How do residents use it?",
                    a: "On mobile, residents can use a click-to-call feature for instant dialing.",
                },
                {
                    q: "Can it be accessed offline?",
                    a: "Yes, the directory is cached and available without internet.",
                },
            ],
        },
        {
            title: "Suggestion Box / Feedback",
            badge: "Community Voice",
            questions: [
                {
                    q: "How can residents give feedback or complaints?",
                    a: "Through the built-in suggestion box, where they can submit ideas, feedback, or complaints.",
                },
                {
                    q: "Is feedback published directly?",
                    a: "No, moderators review submissions before making them visible.",
                },
                {
                    q: "Can suggestions be anonymous?",
                    a: "Yes, residents can submit without revealing their identity.",
                },
            ],
        },
        {
            title: "Skill-Based Volunteering Board",
            badge: "Community Building",
            questions: [
                {
                    q: "How does the volunteering feature work?",
                    a: "Residents can list their skills and volunteer for tasks. Moderators or admins can post opportunities and match skills with tasks.",
                },
                {
                    q: "Why is this feature important?",
                    a: "It encourages community participation and builds local support networks.",
                },
            ],
        },
        {
            title: "Incident Reporting & Alerts",
            badge: "Safety",
            questions: [
                {
                    q: "What incidents can be reported?",
                    a: "Robbery, theft, suspicious activity, and similar issues.",
                },
                {
                    q: "Who verifies the reports?",
                    a: "Moderators verify the reports before action is taken.",
                },
                {
                    q: "Can alerts be sent to residents?",
                    a: "Yes, once verified, moderators can push alerts to all residents.",
                },
                {
                    q: "Can residents attach details?",
                    a: "Yes, reports can include a description, location, and even photos.",
                },
            ],
        },
        {
            title: "Multilingual Support",
            badge: "Accessibility",
            questions: [
                {
                    q: "Which languages are supported?",
                    a: "Kinyarwanda, English, and French.",
                },
                {
                    q: "Is translation automatic?",
                    a: "Optional content translation is available for posts and announcements.",
                },
            ],
        },
        {
            title: "Emergency Alerts",
            badge: "Crisis Management",
            questions: [
                {
                    q: "What types of emergencies are covered?",
                    a: "Natural disasters (storms), missing persons, intruder alerts, and health emergencies.",
                },
                {
                    q: "How are alerts delivered?",
                    a: "Through push notifications and pinned posts at the top of the news feed.",
                },
            ],
        },
        {
            title: "Offline-First Support",
            badge: "Connectivity",
            questions: [
                {
                    q: "What happens if residents don't have internet?",
                    a: "Key features (news feed, events, contacts, and alerts) are cached for offline use.",
                },
                {
                    q: "How does it sync later?",
                    a: "Once internet is available, the app automatically syncs with the server.",
                },
            ],
        },
        {
            title: "How Different People Benefit",
            badge: "Stakeholder Benefits",
            questions: [
                {
                    q: "How do residents benefit from this platform?",
                    a: "Residents can raise problems directly to village leaders with full transparency and accountability. Once a problem is reported, leaders cannot claim they didn't know about it. Residents also benefit from community volunteering activities, stay informed through news posts, and have access to emergency contacts and alerts.",
                },
                {
                    q: "What benefits do village leaders get?",
                    a: "Village leaders gain a transparent system to track and manage community issues. They can monitor how problems are escalated and resolved, maintain evidence of their responsiveness, and communicate effectively with residents. The platform provides clear documentation of all community interactions and problem-solving efforts.",
                },
                {
                    q: "How do business owners benefit?",
                    a: "Business owners can promote their services through community posts (after moderation approval), participate in volunteering activities to build community relationships, and stay connected with local events and opportunities. They become more integrated into the village community.",
                },
                {
                    q: "What about accountability and evidence tracking?",
                    a: "The system creates a permanent record showing that citizen problems have reached the appropriate level of leadership. Every report, escalation, and response is documented, providing clear evidence of the problem-solving process and ensuring transparency in governance.",
                },
                {
                    q: "Can this system track people and their needs?",
                    a: "Yes, the platform can be expanded to track resident movements, understand what people want and need, monitor how long issues take to resolve, and provide insights into community patterns. This helps leaders make better decisions based on actual data about their village.",
                },
            ],
        },
        {
            title: "Problem Reporting & Accountability",
            badge: "Transparency",
            questions: [
                {
                    q: "How does problem reporting ensure accountability?",
                    a: "When residents report problems, the system creates a permanent record with timestamps. Village leaders receive notifications and must respond within set timeframes. This creates a transparent trail that prevents leaders from claiming ignorance about community issues.",
                },
                {
                    q: "What happens when problems are escalated?",
                    a: "The system tracks each escalation level with evidence. If a local leader doesn't respond, the problem automatically escalates to higher authorities. Every step is documented, showing exactly where the problem went and who was responsible for addressing it.",
                },
                {
                    q: "How do residents know their problems are being addressed?",
                    a: "Residents receive status updates on their reported problems. They can see when their issue was received, assigned, being worked on, or resolved. This transparency builds trust between residents and leaders.",
                },
                {
                    q: "What evidence is collected for problem tracking?",
                    a: "The system collects timestamps, photos, location data, response times, escalation paths, and resolution details. This comprehensive evidence trail ensures accountability and helps improve future problem-solving processes.",
                },
            ],
        },
    ]

    return (
        <div className="space-y-8 p-6">

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-balance">Frequently Asked Questions</h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
                    Understanding how the Smart Village platform benefits everyone - residents, leaders, and business owners -
                    while ensuring transparency and accountability
                </p>
            </div>


            <div className="space-y-6">
                {faqSections.map((section, sectionIndex) => (
                    <Card key={sectionIndex}>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <CardTitle className="text-xl">{section.title}</CardTitle>
                                <Badge variant="secondary">{section.badge}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {section.questions.map((faq, faqIndex) => (
                                    <AccordionItem key={faqIndex} value={`${sectionIndex}-${faqIndex}`}>
                                        <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle>Transparency & Accountability</CardTitle>
                    <CardDescription>Building trust through evidence-based community management</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        The Smart Village platform ensures that every community interaction is documented and tracked. This creates
                        a transparent system where residents can hold leaders accountable, leaders can demonstrate their
                        responsiveness, and everyone benefits from improved community governance.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">Evidence Tracking</Badge>
                        <Badge variant="outline">Problem Escalation</Badge>
                        <Badge variant="outline">Response Monitoring</Badge>
                        <Badge variant="outline">Community Transparency</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
