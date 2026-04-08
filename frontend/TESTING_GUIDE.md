# HireMitra - Complete Testing Guide

This guide walks you through the entire application workflow to test all features end-to-end.

---

## **🚀 PREREQUISITE: START SERVERS**

### Start Backend
```bash
cd backend
npm run dev
```

You should see: `🚀 Server running on http://localhost:5000`

### Start Frontend
```bash
cd frontend
npm run dev
```

You should see: `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`

---

## **📋 TEST PLAN**

### **FLOW 1: Worker Registration & Job Hunting**

#### Step 1: Register as Worker
1. Open http://localhost:3000
2. Click **"Register"** button
3. Select **"Worker"** account type
4. Fill in form:
   - Name: "John Plumber"
   - Email: "john@test.com"
   - Phone: "5551234567"
   - Password: "password123"
   - Skills: Select **"plumbing"** and **"electrical"**
5. Click **"Register"**
6. ✅ Should redirect to `/jobs` page

#### Step 2: View Jobs
1. Should be on **Jobs** page already
2. See list of available jobs
3. Try filters:
   - Search by city
   - Search by skill
   - Filter by salary range
4. Click **"View Job"** on any job card

#### Step 3: Apply to Job
1. You're on job detail page
2. Fill in optional message (e.g., "I'm very interested!")
3. Click **"Apply Now"**
4. ✅ Should see "Application submitted successfully!"

#### Step 4: View Your Applications
1. Click **"Applications"** in navbar
2. Should see your submitted applications
3. Check status: **"Pending"**, **"Accepted"**, **"Rejected"**

#### Step 5: View Your Profile
1. Click **"Profile"** in navbar
2. View your information
3. Click **"Edit"** to update profile
4. Change something (e.g., bio, hourly rate)
5. Click **"Save"**
6. ✅ Profile should update

#### Step 6: Find Nearby Jobs
1. Go to `/jobs/nearby`
2. Allow location access in browser
3. Should show jobs near your location with distance
4. Try adjusting radius and skill filters
5. ✅ Jobs list should update based on location

---

### **FLOW 2: Employer Job Posting & Hiring**

#### Step 1: Register as Employer
1. Open http://localhost:3000 (logout if needed)
2. Click **"Register"**
3. Select **"Employer"** account type
4. Fill in form:
   - Name: "Jane Smith"
   - Email: "jane@company.com"
   - Phone: "5559876543"
   - Password: "password123"
   - Company Name: "ABC Plumbing Co"
5. Click **"Register"**
6. ✅ Should redirect to `/dashboard`

#### Step 2: Post a Job
1. Click **"Post New Job"** button
2. Fill in job form:
   - **Job Details:**
     - Title: "Emergency Pipe Burst Repair"
     - Description: "Need experienced plumber to fix burst pipe in commercial building. Must be available ASAP."
     - Payment Type: "Hourly Rate"
     - Salary: "75"

   - **Location:**
     - Click **"📍 Use Current Location"** OR manually enter:
       - City: "New York"
       - State: "NY"
       - Latitude: 40.7128
       - Longitude: -74.0060

   - **Requirements:**
     - Select Skills: **"plumbing"**
     - Years of Experience: 2

   - **Job Details:**
     - Duration: "One-Time"
     - Start Date: (tomorrow's date)
     - Positions: 1
     - Check **"Mark as Urgent"** if desired

3. Click **"Post Job"**
4. ✅ Should redirect to job detail page
5. ✅ Job should now appear in job listings

#### Step 3: View Employer Dashboard
1. Click **"Dashboard"** in navbar (or go directly to `/dashboard`)
2. Should see:
   - Stats: Total Jobs, Active Jobs, Applications, Accepted
   - List of your posted jobs
   - Action buttons to view and manage each job

#### Step 4: View Applications
1. On dashboard, find your posted job
2. Click **"View Applications"** button
3. Should see list of workers who applied
4. For each application see:
   - Worker name, skills, ratings
   - Application message
   - Action buttons

#### Step 5: Accept/Reject Applications
1. On applications list, click on an application
2. See full application details
3. Click **"Accept"** or **"Reject"**
4. If accepting, enter:
   - Accepted Rate: (e.g., 70)
   - Start Date
   - End Date
5. ✅ Application status should change

#### Step 6: Edit Job
1. On dashboard, click **"View"** on a job
2. Job detail page should have **"Edit"** button
3. Can modify: title, description, salary, status
4. ✅ Changes should save

---

### **FLOW 3: Login & Session Management**

#### Step 1: Logout
1. Click **"Logout"** in navbar
2. ✅ Should redirect to home page
3. Auth links should show **"Login"** and **"Register"** again

#### Step 2: Login
1. Click **"Login"**
2. Enter credentials:
   - Email: "john@test.com" (or your worker email)
   - Password: "password123"
3. Click **"Login"**
4. ✅ Should redirect to `/jobs` page
5. Navbar should show your name and **"Logout"** button

#### Step 3: Test Token Expiration (Optional)
1. In browser DevTools → Application → LocalStorage
2. Check that `token` and `user` are stored
3. Manually delete token
4. Try to access `/applications` or `/profile`
5. ✅ Should redirect to `/auth/login`

---

## **🧪 FEATURE VERIFICATION CHECKLIST**

### **Authentication**
- [ ] Worker registration works
- [ ] Employer registration works
- [ ] Login works
- [ ] Logout works
- [ ] Protected pages redirect to login when not authenticated
- [ ] Token stored in localStorage
- [ ] User info stored in localStorage

### **Jobs**
- [ ] Can view all jobs
- [ ] Can filter by city
- [ ] Can filter by skill
- [ ] Can filter by salary range
- [ ] Can view job details
- [ ] Can see employer info on job detail
- [ ] Job cards show distance for nearby jobs
- [ ] Urgent badge shows on urgent jobs
- [ ] Pagination works

### **Job Posting (Employer Only)**
- [ ] Can access job creation page (employer only)
- [ ] Can fill in all job fields
- [ ] Can get current location via geolocation
- [ ] Can manually enter coordinates
- [ ] Can select required skills
- [ ] Form validation works
- [ ] Job created successfully
- [ ] Posted job appears in listings

### **Applications**
- [ ] Worker can apply to jobs
- [ ] Worker can see their applications
- [ ] Employer can see applications on their jobs
- [ ] Employer can accept applications
- [ ] Employer can reject applications
- [ ] Worker can withdraw applications
- [ ] Status changes reflect correctly
- [ ] Application counts update on job

### **User Profile**
- [ ] Can view own profile
- [ ] Can edit profile
- [ ] Changes save correctly
- [ ] Worker skills display
- [ ] Employer company info displays
- [ ] Rating displays
- [ ] Account type shows correctly

### **Nearby Jobs**
- [ ] Page requests location permission
- [ ] Shows current location coordinates
- [ ] Lists jobs within radius
- [ ] Shows distance on each job
- [ ] Can change radius filter
- [ ] Can filter by skill
- [ ] Can refresh location

### **Dashboard (Employer)**
- [ ] Shows correct stats
- [ ] Lists all posted jobs
- [ ] Shows job status badges
- [ ] Shows application counts
- [ ] Can navigate to job details
- [ ] Can view applications

### **UI/UX**
- [ ] Navbar responsive on mobile
- [ ] Mobile menu works
- [ ] All forms are user-friendly
- [ ] Error messages display
- [ ] Success messages display
- [ ] Loading states show
- [ ] Cards and layouts look good
- [ ] Colors and styling consistent

---

## **🔧 TROUBLESHOOTING**

### API Errors
**Problem:** "Failed to fetch"
- **Solution:** Make sure backend is running on port 5000
- Check console for exact error message

### Token Issues
**Problem:** "Invalid token" or redirects to login
- **Solution:** Clear localStorage and login again
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`

### Geolocation Not Working
**Problem:** Location not getting
- **Solution:**
  - Check browser permission for location
  - Use HTTPS (required for geolocation on some sites)
  - Manually enter coordinates instead

### Form Validation Issues
**Problem:** "Cannot submit form"
- **Solution:** Check all required fields (*) are filled
- Ensure phone is 10 digits
- Ensure location has both city and state

### Styling Issues
**Problem:** Tailwind styles not loading
- **Solution:** Restart dev server
- Run `npm install` again
- Clear browser cache

---

## **📊 EXPECTED TEST DATA RESULTS**

After running through all tests, you should have:

**Database:**
- 2+ Users (1 worker, 1 employer)
- 1+ Jobs (posted by employer)
- 1+ Applications (submitted by worker)

**LocalStorage:**
- `token` - JWT token
- `user` - User object with name, email, userType

**Network Requests:**
- POST `/auth/register` ✅
- POST `/auth/login` ✅
- GET `/jobs` ✅
- GET `/jobs/:id` ✅
- POST `/jobs` ✅
- POST `/applications` ✅
- GET `/applications/worker` ✅
- GET `/jobs/nearby` ✅
- GET `/users/:id` ✅
- PUT `/users/:id` ✅

---

## **🎯 SUCCESS CRITERIA**

Your application is working correctly if:

✅ Can register as worker or employer
✅ Can login and logout
✅ Can view jobs and filter them
✅ Worker can apply to jobs
✅ Employer can post jobs
✅ Employer can see applications
✅ Can view nearby jobs based on location
✅ Can update profile
✅ All pages are responsive
✅ No console errors

---

## **📝 NOTES**

- Each test creates real data in MongoDB
- You can delete jobs/applications via API if needed
- Token expires in 30 days (set in backend)
- Geolocation requires HTTPS in production (HTTP is ok for localhost)
- Email must be unique per user
- Phone must be 10 digits

---

## **Next: Step 6 - UI Improvements**

After testing confirms everything works, we'll:
1. Improve visual design
2. Add more animations
3. Optimize mobile experience
4. Add error boundaries
