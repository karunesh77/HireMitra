---
name: hiremitra-platform-builder
description: |
  Complete guide for building a production-ready job marketplace platform (like HireMitra) from scratch.
  Use this skill whenever the user wants to: build a job platform, create a hiring marketplace, develop a
  worker-employer matching app, or construct a gig economy platform. This skill covers all 7 steps: backend
  setup, database models, API routes, frontend pages, advanced features, UI improvements, and deployment.
  Works for any job/hiring/marketplace platform.
compatibility: Node.js, Next.js, Express, MongoDB, Vercel, Render
---

# HireMitra Platform Builder

A complete, production-ready guide for building a full-stack job marketplace platform where workers find jobs and employers hire talent.

## Overview

This skill guides you through building a complete platform in **7 steps**:

1. **Backend Setup** - Express.js server with MongoDB
2. **Database Models** - User, Job, Application schemas
3. **API Routes** - 25+ REST endpoints
4. **Frontend Pages** - Next.js with Tailwind CSS
5. **Advanced Features** - Job creation, dashboard, geolocation
6. **UI Polish** - Professional styling and animations
7. **Deployment** - Production deployment on Vercel & Render

---

## Quick Start

### Prerequisites
- Node.js 16+ installed
- MongoDB (local or Atlas)
- Vercel account (free)
- Render account (free)

### Technology Stack
- **Frontend**: Next.js 14, Tailwind CSS, Axios
- **Backend**: Express.js, MongoDB, Mongoose
- **Auth**: JWT tokens
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel (frontend), Render (backend)

---

## Step 1: Backend Folder Structure & Setup

### Create Project Structure

```bash
mkdir hiremitra-platform
cd hiremitra-platform
mkdir backend frontend

# Backend setup
cd backend
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken nodemon
mkdir config models routes controllers middleware utils
```

### Key Backend Files

**`backend/package.json`** - Update scripts:
```json
{
  "name": "hiremitra-backend",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**`backend/server.js`** - Main entry point:
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running', timestamp: new Date() });
});

// Routes will be added in Step 3

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

**`backend/.env`** - Environment variables:
```
MONGODB_URI=mongodb://localhost:27017/hiremitra-platform
PORT=5000
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Start Backend
```bash
npm run dev
```

---

## Step 2: Database Models

Create 3 Mongoose schemas: User, Job, Application.

**Key Models:**
- **User** - Workers and employers with skills, location, ratings
- **Job** - Job postings with location, skills required, salary
- **Application** - Worker applications with status tracking

---

## Step 3: API Routes

Create REST endpoints for:
- **Auth** - Register, Login, Get current user
- **Users** - Get profile, Update profile, Search workers
- **Jobs** - Create, List, Get detail, Nearby jobs, Update, Delete
- **Applications** - Submit, Get status, Accept, Reject, Rate

Total: 25+ API endpoints with full error handling and validation.

---

## Step 4: Frontend Setup

### Initialize Next.js

```bash
cd frontend
npx create-next-app@latest . --typescript=false --tailwind=true --app=true
npm install axios
```

### Core Features
- Authentication (register/login)
- Job listing with filters
- Job details page
- Apply to jobs
- User profile
- Job creation (employer)
- Dashboard (employer)

---

## Step 5: Advanced Features

- **Job Creation Page** - Geolocation-based job posting
- **Employer Dashboard** - Stats and job management
- **Nearby Jobs** - Find jobs by GPS location
- **Application Management** - Accept/reject workers
- **Rating System** - Rate workers and employers

---

## Step 6: UI Improvements

- Professional gradient backgrounds
- Smooth animations (fadeIn, slideIn, scaleIn)
- Toast notifications
- Modal dialogs
- Enhanced form components
- Responsive design
- Color-coded badges
- Hover effects

---

## Step 7: Deployment

### Backend to Render
1. Push code to GitHub
2. Create Render account
3. Create Web Service from GitHub
4. Add environment variables
5. Deploy

### Frontend to Vercel
1. Push code to GitHub
2. Create Vercel account
3. Import project
4. Set API URL environment variable
5. Deploy

### MongoDB Setup
- Local: Install and run MongoDB
- Cloud: Use MongoDB Atlas free tier

---

## Testing

### Worker Flow
1. Register as worker
2. Browse jobs with filters
3. View job details
4. Apply to jobs
5. Track applications
6. View profile with ratings

### Employer Flow
1. Register as employer
2. Post new jobs
3. View applications on jobs
4. Accept or reject workers
5. Manage dashboard
6. Track hiring metrics

### Geolocation Features
- Get current location
- Find jobs nearby
- Distance calculation
- Radius filtering

---

## Success Metrics

✅ Backend running at `http://localhost:5000/api/health`
✅ Frontend running at `http://localhost:3000`
✅ Register and login working
✅ Can create jobs (employer)
✅ Can apply to jobs (worker)
✅ Geolocation finding nearby jobs
✅ Dashboard showing stats
✅ Responsive design on mobile
✅ UI animations working
✅ Deployed to Vercel (frontend)
✅ Deployed to Render (backend)

---

## File Structure

```
hiremitra-platform/
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── app/
    │   ├── auth/
    │   ├── jobs/
    │   ├── profile/
    │   ├── dashboard/
    │   ├── layout.js
    │   ├── page.js
    │   └── globals.css
    ├── components/
    │   ├── Navbar.js
    │   ├── Footer.js
    │   ├── JobCard.js
    │   ├── Toast.js
    │   ├── Modal.js
    │   └── FormInput.js
    ├── lib/
    │   ├── api.js
    │   ├── auth.js
    │   └── storage.js
    ├── hooks/
    │   ├── useAuth.js
    │   └── useApi.js
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── next.config.js
    └── .env.local
```

---

## Rebranding Guide

To rename from "HireMitra" to your own platform name:

1. Update `package.json` in backend and frontend
2. Update `.env.local` app name
3. Update page metadata in `app/layout.js`
4. Update Navbar logo text
5. Update Footer branding
6. Update home page hero text
7. Update contact email
8. Update database name in `.env`
9. Update deployment environment variables

See `REBRANDING_GUIDE.md` for complete checklist.

---

## Troubleshooting

**API connection fails**
- Backend running on port 5000?
- Check `.env.local` for correct API URL
- Check browser console for errors

**Token expired**
- Auto-redirects to login
- Clear localStorage and re-login

**Geolocation not working**
- Check browser permissions
- Use HTTPS in production
- Manually enter coordinates as fallback

**MongoDB connection error**
- Is MongoDB running? (local)
- Check connection string (Atlas)
- Check IP whitelist (Atlas)

---

## Next Steps After Launch

1. Add messaging between workers and employers
2. Implement payment system
3. Add email notifications
4. Create mobile app
5. Add advanced search filters
6. Implement real-time updates
7. Set up analytics
8. Add security hardening

---

## Key Features Summary

**For Workers:**
- Create profile with skills and location
- Browse and filter available jobs
- Find jobs nearby (geolocation)
- Apply to jobs with custom messages
- Track application status
- View and manage profile
- See employer ratings

**For Employers:**
- Create company profile
- Post jobs with full details
- Specify required skills and location
- View applications on jobs
- Accept or reject applicants
- Manage job listings
- View worker profiles and ratings
- Track hiring metrics on dashboard

**For Platform:**
- JWT-based authentication
- MongoDB for data persistence
- RESTful API with 25+ endpoints
- Real-time notification system (Toast)
- Professional UI with animations
- Mobile-responsive design
- Production-ready deployment
- Geolocation-based job matching
- Rating and review system

---

## Support

For detailed code implementations, see the comprehensive guides included:
- `TESTING_GUIDE.md` - Complete end-to-end testing
- `UI_IMPROVEMENTS.md` - Design system and styling guide
- `API_ROUTES.md` - Full API documentation
- `REBRANDING_GUIDE.md` - Rename platform guide

All code is production-ready and follows best practices for:
- MVC architecture
- Error handling
- Input validation
- Security (password hashing, JWT)
- Responsive design
- Performance optimization
