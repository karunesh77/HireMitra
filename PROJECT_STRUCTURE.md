# HireMitra Project - Complete Structure & API Flow

## 📁 PROJECT FOLDER STRUCTURE

```
HireMitra/
├── backend/
│   ├── lambda.js                 # AWS Lambda handler
│   ├── server.js                 # Express server (dev)
│   ├── package.json
│   ├── .env                       # MongoDB URI, JWT secret, Email/Cloudinary keys
│   │
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   │
│   ├── models/                    # MongoDB schemas
│   │   ├── User.js               # firstName, lastName, email, password, userType (worker/employer)
│   │   ├── Job.js                # title, description, location, salary, category, employer
│   │   ├── Application.js        # jobId, workerId, status (pending/hired/rejected)
│   │   ├── Message.js            # senderId, receiverId, content, isRead, conversationId
│   │   ├── Conversation.js       # participantIds, unreadCount (Map), lastMessage, lastMessageAt
│   │   ├── Notification.js       # userId, type, title, body, read, link
│   │   └── Profile.js            # userId, skills, certifications, hourlyRate, rating
│   │
│   ├── controllers/               # Business logic
│   │   ├── authController.js     # register, login, sendOTP, resetPassword, verifyEmail
│   │   ├── jobController.js      # getJobs, createJob, updateJob, deleteJob, getRecommended
│   │   ├── applicationController.js # createApplication, getApplications, updateStatus
│   │   ├── messageController.js  # sendMessage, sendAIMessage, getMessages, getConversations
│   │   ├── notificationController.js # getNotifications, markRead, markAllRead, delete
│   │   ├── profileController.js  # getProfile, updateProfile, uploadPhoto
│   │   └── workerController.js   # getWorkers, getWorkerById
│   │
│   ├── routes/                    # API route handlers
│   │   ├── auth.js               # POST /register, /login, /forgot-password
│   │   ├── jobs.js               # GET/POST /jobs, /jobs/:id, /employer/me
│   │   ├── applications.js       # POST/GET /applications, /applications/:id/status
│   │   ├── messages.js           # POST/GET /messages, /conversations
│   │   ├── notifications.js      # GET/PATCH /notifications
│   │   ├── profile.js            # GET/PATCH /profile, /profile/photo
│   │   └── workers.js            # GET /workers, /workers/:id
│   │
│   └── middleware/
│       ├── auth.js               # JWT verification
│       └── errorHandler.js       # Global error handler
│
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .env.local                # NEXT_PUBLIC_API_URL, Cloudinary keys
│   │
│   ├── app/                      # Next.js App Router (file-based routing)
│   │   ├── page.tsx              # "/" - Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global Tailwind styles
│   │   │
│   │   ├── auth/
│   │   │   ├── login/page.tsx    # Login form → POST /api/auth/login
│   │   │   ├── register/
│   │   │   │   ├── page.tsx      # Choose worker or employer
│   │   │   │   ├── worker/page.tsx # Worker registration
│   │   │   │   └── employer/page.tsx # Employer registration
│   │   │   ├── forgot-password/page.tsx # OTP email & reset
│   │   │   └── verify-email/page.tsx # Email verification
│   │   │
│   │   ├── dashboard/
│   │   │   ├── worker/
│   │   │   │   ├── page.tsx      # Dashboard home (stats, recent apps, jobs)
│   │   │   │   ├── jobs/page.tsx # Browse all jobs (search, filter, pagination)
│   │   │   │   ├── jobs/[id]/page.tsx # Job details + Apply button
│   │   │   │   ├── applications/page.tsx # My applications (tabs: pending/hired/rejected)
│   │   │   │   ├── messages/page.tsx # Chat with employers (conversations list + chat)
│   │   │   │   ├── notifications/page.tsx # List of notifications
│   │   │   │   ├── profile/page.tsx # Edit profile (skills, rate, certifications)
│   │   │   │   ├── saved-jobs/page.tsx # Bookmarked jobs
│   │   │   │   └── settings/page.tsx # Settings
│   │   │   │
│   │   │   └── employer/
│   │   │       ├── page.tsx      # Dashboard home (stats, recent jobs, apps)
│   │   │       ├── jobs/page.tsx # My job postings
│   │   │       ├── jobs/create/page.tsx # Create new job
│   │   │       ├── jobs/[id]/edit/page.tsx # Edit job posting
│   │   │       ├── applications/page.tsx # All applications (grouped by job)
│   │   │       ├── workers/page.tsx # Browse workers (search, filter)
│   │   │       ├── workers/[id]/page.tsx # Worker profile + save button
│   │   │       ├── messages/page.tsx # Chat with workers
│   │   │       ├── notifications/page.tsx # Notifications
│   │   │       ├── profile/page.tsx # Company profile
│   │   │       ├── saved-workers/page.tsx # Favorite workers
│   │   │       └── settings/page.tsx # Settings
│   │   │
│   │   ├── jobs/page.tsx         # "/jobs" - Public job listings
│   │   ├── workers/page.tsx      # "/workers" - Public worker listings
│   │   ├── about/page.tsx        # "/about" - About HireMitra
│   │   ├── contact/page.tsx      # "/contact" - Contact form
│   │   ├── terms/page.tsx        # "/terms" - Terms & conditions
│   │   └── privacy/page.tsx      # "/privacy" - Privacy policy
│   │
│   ├── components/               # Reusable React components
│   │   ├── Navbar.tsx            # Header + navigation + notification bell
│   │   ├── Button.tsx            # Styled button (primary, outline, sizes)
│   │   ├── Input.tsx             # Text input field
│   │   ├── TextArea.tsx          # Multi-line text input
│   │   ├── Select.tsx            # Dropdown select
│   │   ├── JobCard.tsx           # Job card component
│   │   ├── WorkerCard.tsx        # Worker card component
│   │   ├── ApplicationCard.tsx   # Application card
│   │   ├── MessageCard.tsx       # Message card in chat
│   │   ├── Modal.tsx             # Reusable modal dialog
│   │   ├── Alert.tsx             # Alert/notification component
│   │   ├── LoadingSpinner.tsx    # Loading spinner
│   │   ├── Skeleton.tsx          # Skeleton loading placeholders
│   │   ├── Breadcrumbs.tsx       # Breadcrumb navigation
│   │   ├── Pagination.tsx        # Pagination controls
│   │   ├── Badge.tsx             # Status badge (sm, lg with dot)
│   │   ├── Card.tsx              # Reusable card container
│   │   ├── ProtectedRoute.tsx    # HOC for protected pages
│   │   └── ... (20+ total components)
│   │
│   ├── hooks/
│   │   ├── useAuth.ts            # Auth context hook (user, logout, isAuthenticated)
│   │   └── useDebounce.ts        # Debounce hook for search
│   │
│   ├── context/
│   │   ├── AuthContext.tsx       # User, token, login, logout, loading state
│   │   └── ToastContext.tsx      # Toast notifications (success, error, info)
│   │
│   ├── lib/
│   │   ├── api.ts                # Axios instance with interceptors
│   │   ├── tokenManager.ts       # Save/get JWT from localStorage
│   │   └── utils.ts              # Helper functions
│   │
│   └── public/                   # Static assets (images, icons)
│
└── .github/
    └── workflows/
        └── deploy.yml            # GitHub Actions CI/CD (Lint → Build → Deploy to Vercel + Lambda)
```

---

## 🔌 API ENDPOINTS REFERENCE

### **1. AUTHENTICATION** (`/api/auth`)

```
POST   /auth/register
       Body: { firstName, lastName, email, password, userType: 'worker'|'employer', phone }
       Response: { user, token }

POST   /auth/login
       Body: { email, password }
       Response: { user, token }

POST   /auth/forgot-password
       Body: { email }
       Response: { message: "OTP sent" }

POST   /auth/reset-password
       Body: { email, otp, newPassword }
       Response: { message: "Password reset" }

POST   /auth/verify-email
       Body: { email, otp }
       Response: { message: "Email verified" }
```

### **2. JOBS** (`/api/jobs`)

```
GET    /jobs
       Query: { search, category, location, limit, skip }
       Response: { jobs: [], total, pages }
       Called from: worker/jobs/page.tsx, jobs/page.tsx

POST   /jobs
       Body: { title, description, category, location, salary, benefits, jobType }
       Auth: Required (employer only)
       Called from: employer/jobs/create/page.tsx

GET    /jobs/:id
       Response: { job: {...} }
       Called from: worker/jobs/[id]/page.tsx

PATCH  /jobs/:id
       Body: { title, description, salary, ... }
       Auth: Required (owner only)
       Called from: employer/jobs/[id]/edit/page.tsx

DELETE /jobs/:id
       Auth: Required (owner only)
       Called from: employer/jobs/page.tsx

GET    /jobs/employer/me
       Auth: Required
       Response: { jobs: [] }
       Called from: employer/page.tsx (dashboard)

GET    /jobs/recommended
       Auth: Required
       Response: { jobs: [] }
       Called from: worker/page.tsx (dashboard)
```

### **3. APPLICATIONS** (`/api/applications`)

```
POST   /applications
       Body: { jobId, workerId, coverLetter, expectedSalary, availabilityDate }
       Auth: Required
       Called from: worker/jobs/[id]/page.tsx

GET    /applications/worker/me
       Query: { status, limit, skip }
       Auth: Required
       Response: { applications: [], total }
       Called from: worker/applications/page.tsx

GET    /applications/employer/me
       Query: { status, limit, skip }
       Auth: Required
       Response: { applications: [], total }
       Called from: employer/applications/page.tsx, employer/page.tsx

GET    /applications/:id
       Auth: Required
       Response: { application: {...} }

PATCH  /applications/:id/status
       Body: { status: 'pending'|'hired'|'rejected' }
       Auth: Required (employer only)
       Called from: employer/page.tsx (action buttons)

DELETE /applications/:id
       Auth: Required
       Called from: worker/applications/page.tsx
```

### **4. MESSAGES** (`/api/messages`)

```
POST   /messages
       Body: { conversationId, receiverId, content, messageType: 'text' }
       Auth: Required
       Called from: */messages/page.tsx (input send)

GET    /messages/:conversationId
       Query: { page, limit }
       Auth: Required
       Response: { messages: [], total, pages }
       Called from: */messages/page.tsx (select conversation)

POST   /messages/ai
       Body: { conversationId, content }
       Auth: Required
       Response: { userMessage, aiMessage }
       Called from: */messages/page.tsx (AI chat)

POST   /messages/conversations
       Body: { recipientId, conversationType: 'direct'|'ai-chat', subject }
       Auth: Required
       Called from: */messages/page.tsx (start new chat)

GET    /messages/conversations
       Query: { page, limit }
       Auth: Required
       Response: { conversations: [], total }
       Called from: */messages/page.tsx (load conversations list)

PATCH  /messages/conversations/:conversationId/read
       Auth: Required
       Called from: */messages/page.tsx (select conversation)

PATCH  /messages/conversations/:conversationId/archive
       Auth: Required
       Called from: */messages/page.tsx

PATCH  /messages/conversations/:conversationId/block
       Auth: Required
       Called from: */messages/page.tsx
```

### **5. NOTIFICATIONS** (`/api/notifications`)

```
GET    /notifications
       Query: { limit, skip }
       Auth: Required
       Response: { notifications: [], unreadCount }
       Called from: */notifications/page.tsx (load), Navbar.tsx (polling every 5s)

PATCH  /notifications/:id/read
       Auth: Required
       Called from: */notifications/page.tsx

PATCH  /notifications/read-all
       Auth: Required
       Called from: */notifications/page.tsx (mark all read button)

DELETE /notifications/:id
       Auth: Required
       Called from: */notifications/page.tsx
```

### **6. PROFILE** (`/api/profile`)

```
GET    /profile
       Auth: Required
       Response: { profile: {...} }
       Called from: */profile/page.tsx (load)

PATCH  /profile
       Body: { skills, hourlyRate, certifications, bio, location }
       Auth: Required
       Called from: */profile/page.tsx (form submit)

POST   /profile/photo
       Body: FormData with image file
       Auth: Required
       Called from: */profile/page.tsx (upload)

GET    /profile/:userId
       Response: { profile: {...} }
       Called from: employer/workers/[id]/page.tsx (view worker profile)
```

### **7. WORKERS** (`/api/workers`)

```
GET    /workers
       Query: { search, skills, location, limit, skip }
       Response: { workers: [], total }
       Called from: employer/workers/page.tsx, workers/page.tsx

GET    /workers/:id
       Response: { worker: {...} }
       Called from: employer/workers/[id]/page.tsx

POST   /workers/:id/save
       Auth: Required
       Called from: employer/workers/page.tsx (heart icon)

DELETE /workers/:id/save
       Auth: Required
       Called from: employer/workers/page.tsx
```

---

## 🔐 Authentication Flow

**Token stored in:** `localStorage.authToken` (JWT)

**Token payload:**
```json
{
  "userId": "mongo_id",
  "userType": "worker|employer",
  "email": "user@email.com",
  "iat": 1234567890
}
```

**All API requests include header:**
```
Authorization: Bearer {token_from_localStorage}
Content-Type: application/json
```

**Token expires:** 24 hours (set in backend)

---

## 📊 Data Flow Examples

### **Example 1: Apply for Job**
```
User clicks "Apply" on worker/jobs/[id]/page.tsx
    ↓
Modal opens with form
    ↓
User submits form (cover letter, salary, date)
    ↓
POST /api/applications { jobId, workerId, ... }
    ↓
Backend creates Application doc
    ↓
Backend calls createNotification() to notify employer
    ↓
Employer sees notification badge on Navbar
    ↓
Employer opens employer/applications/page.tsx
    ↓
GET /api/applications/employer/me
    ↓
See application, clicks Accept or Reject
    ↓
PATCH /api/applications/:id/status { status: 'hired' }
    ↓
Notification sent to worker
    ↓
Worker sees status change on worker/applications/page.tsx
```

### **Example 2: Send Message**
```
Employer opens employer/messages/page.tsx
    ↓
GET /api/messages/conversations (get list)
    ↓
Selects conversation with "John" (worker)
    ↓
GET /api/messages/:conversationId (get messages)
    ↓
PATCH /api/messages/conversations/:id/read (mark read)
    ↓
Types message "Can you start tomorrow?"
    ↓
POST /api/messages { conversationId, receiverId, content }
    ↓
Backend stores message
    ↓
Backend increments John's unreadCount in Conversation
    ↓
Backend calls createNotification()
    ↓
John's Navbar updates (notification badge shows 1)
    ↓
John opens worker/messages/page.tsx
    ↓
GET /api/messages/conversations (sees unread badge)
    ↓
Selects conversation, sees new message
    ↓
PATCH /api/messages/conversations/:id/read
    ↓
Notification marked as read
```

### **Example 3: Notification Polling**
```
Navbar component mounts (Navbar.tsx)
    ↓
useEffect hook runs
    ↓
setInterval(() => {
    GET /api/notifications?limit=1
    setUnreadCount(res.data.unreadCount)
}, 5000)  // Every 5 seconds
    ↓
Bell icon shows red badge with count
    ↓
User clicks bell
    ↓
Navigate to */notifications/page.tsx
    ↓
GET /api/notifications (full list)
    ↓
Show all notifications
    ↓
User clicks "View" link on notification
    ↓
PATCH /api/notifications/:id/read
    ↓
Notification marked read, background color changes
```

---

## 🚀 API Interceptor Setup (frontend/lib/api.ts)

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// REQUEST INTERCEPTOR - Add token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR - Handle 401 (expired token)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired
      localStorage.removeItem('authToken');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 🌐 Environment Setup

**Backend (.env):**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hiremitra
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=24h

EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password_from_gmail

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=https://hiremitra.vercel.app
AWS_LAMBDA_HANDLER=yes  # Set to 'yes' for Lambda deployment
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_CLOUDINARY_URL=cloudinary://...
```

---

## ✅ Summary

- **Total API Endpoints:** 25+
- **Models/Collections:** 7 (User, Job, Application, Message, Conversation, Notification, Profile)
- **Frontend Pages:** 40+
- **Components:** 20+
- **Authentication:** JWT tokens in localStorage
- **Real-time:** Polling (5s for notifications, on-demand for messages)
- **File Upload:** Cloudinary for images
- **Deployment:** GitHub Actions CI/CD → Vercel (frontend) + AWS Lambda (backend)

