# HireMitra Frontend

Frontend for the HireMitra Job Platform built with Next.js and Tailwind CSS.

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create or update `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Login & Register
│   ├── jobs/              # Job listing & details
│   ├── applications/      # Applications management
│   ├── profile/           # User profile
│   └── layout.js          # Root layout
├── components/            # Reusable React components
├── lib/                   # Utilities (API, Auth, Storage)
├── hooks/                 # Custom React hooks
└── public/               # Static files
```

---

## Key Files

### Pages
- `app/page.js` - Home page
- `app/auth/login/page.js` - Login page
- `app/auth/register/page.js` - Register page
- `app/jobs/page.js` - Jobs listing
- `app/jobs/[id]/page.js` - Job details
- `app/applications/page.js` - My applications
- `app/profile/page.js` - User profile

### Components
- `Navbar.js` - Navigation bar
- `Footer.js` - Footer
- `JobCard.js` - Job card component
- `AuthForm.js` - Login/Register form
- `LoadingSpinner.js` - Loading indicator

### Utilities
- `lib/api.js` - Axios API client with auth
- `lib/auth.js` - Authentication helpers
- `lib/storage.js` - LocalStorage utilities
- `hooks/useAuth.js` - Auth state hook
- `hooks/useApi.js` - API call hook

---

## Features Implemented

✅ **Authentication**
- Register (worker/employer)
- Login with JWT
- Token management in localStorage
- Protected routes

✅ **Job Management**
- List all jobs with filters
- View job details
- Apply to jobs
- See application status

✅ **User Profiles**
- View/Edit profile
- Worker skills
- Employer company info
- Rating display

✅ **Navigation**
- Responsive navbar
- Mobile menu
- Auth-aware navigation

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

---

## Technologies

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hooks** - State management

---

## Common Issues

### API Connection Failed
- Ensure backend is running on `http://localhost:5000`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Check browser console for errors

### Token Expired
- User is automatically redirected to login
- Clear localStorage and login again

### Styles Not Loading
- Run `npm install tailwindcss postcss autoprefixer`
- Restart dev server

---

## Next Steps

1. Customize colors in `tailwind.config.js`
2. Add more pages/features as needed
3. Improve error handling
4. Add form validation
5. Optimize images
