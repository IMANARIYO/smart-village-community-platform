# Smart Village Frontend

This is the **frontend application** for the Smart Village platform – a digital solution to connect residents, visitors, leaders, and services in a modern, community-driven environment.

## 🚀 Features (MVP Scope)
1. **Resident & Visitor Management**
   - Resident sign-up with phone OTP, village selection, and ID number
   - Visitor registration linked to residents
   - Approval workflow for moderators
   - Role-based access control

2. **Community News Feed**
   - Announcements, updates, and posts (text + images)
   - Residents can comment, moderators approve posts
   - Offline access via PWA caching

3. **Event Calendar**
   - View village meetings, workshops, and events

4. **Essential Contacts Directory**
   - Emergency numbers, leaders, health workers
   - Click-to-call on mobile
   - Offline availability

5. **Suggestion Box / Feedback**
   - Residents submit feedback, ideas, or complaints
   - Moderators review before publishing
   - Anonymous submissions supported

6. **Skill-Based Volunteering Board**
   - Residents showcase skills and volunteer
   - Moderators/admins post opportunities and match skills

7. **Incident Reporting & Alerts**
   - Report robbery, theft, suspicious activity
   - Attach descriptions, location, photos
   - Push alerts to all residents after moderation

8. **Multilingual Support**
   - Kinyarwanda, English, French
   - Optional translation for posts

9. **Emergency Alerts**
   - Urgent notifications (storms, health alerts, missing persons)
   - Push notifications + pinned posts

10. **Offline-First Support**
   - Cached news, events, contacts, and alerts
   - Sync when internet is available


## 🛠 Tech Stack
- **Frontend Framework**: React  
- **Styling**: Tailwind CSS (v4)  
- **State Management**: React Query / Zustand / Context API  
- **Forms & Validation**: React Hook Form + Zod  
- **Offline Support**: Progressive Web App (PWA) caching  
- **Version Control**: Git + GitHub  


## 📦 Setup & Installation
```bash
# Clone repository
### 1. Clone the Repository
```bash
git clone https://github.com/Solvit-Africa-Training-Center/Smart-Village-Frontend.git
cd Smart-Village-Frontend

# Install dependencies
npm install

# Run development server
npm run dev
