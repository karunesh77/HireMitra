# HireMitra Job Platform - API Routes

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 AUTHENTICATION

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123",
  "userType": "worker" or "employer",
  "skills": ["plumbing", "electrical"] // for workers
  "companyName": "ABC Company" // for employers
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "user": { ... }
}
```

---

## 👥 USERS

### Get User Profile
```
GET /users/:id

Response:
{
  "success": true,
  "user": { ... }
}
```

### Update User Profile
```
PUT /users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "About me",
  "skills": ["plumbing"],
  "hourlyRate": 50,
  "location": {
    "address": "123 Main St",
    "city": "NYC",
    "state": "NY",
    "zipCode": "10001",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

### Search Workers
```
GET /users/search/workers?skills=plumbing&city=NYC&page=1&limit=20

Query Parameters:
- skills: string or array
- city: string
- state: string
- page: number
- limit: number

Response:
{
  "success": true,
  "pagination": { ... },
  "workers": [ ... ]
}
```

### Get Worker Rating
```
GET /users/:id/rating

Response:
{
  "success": true,
  "rating": {
    "average": 4.5,
    "count": 10
  },
  "name": "John Doe"
}
```

### Update User Rating
```
PATCH /users/:id/rating
Authorization: Bearer {token}
Content-Type: application/json

{
  "score": 5
}

Response:
{
  "success": true,
  "message": "Rating updated successfully",
  "rating": { ... }
}
```

---

## 💼 JOBS

### Create Job
```
POST /jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Emergency Plumbing",
  "description": "Need a plumber for burst pipe",
  "requiredSkills": ["plumbing"],
  "paymentType": "hourly",
  "salary": 75,
  "startDate": "2026-04-08",
  "duration": "one-time",
  "positions": 1,
  "yearsOfExperience": 2,
  "isUrgent": true,
  "location": {
    "address": "123 Main St",
    "city": "NYC",
    "state": "NY",
    "zipCode": "10001",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}

Response:
{
  "success": true,
  "message": "Job posted successfully",
  "job": { ... }
}
```

### List All Jobs
```
GET /jobs?skills=plumbing&city=NYC&minSalary=50&maxSalary=100&page=1&limit=20

Query Parameters:
- skills: string or array
- city: string
- state: string
- minSalary: number
- maxSalary: number
- page: number
- limit: number
- sortBy: field name (default: createdAt)

Response:
{
  "success": true,
  "pagination": { ... },
  "jobs": [ ... ]
}
```

### Find Nearby Jobs
```
GET /jobs/nearby?latitude=40.7128&longitude=-74.0060&radiusKm=25&skills=plumbing

Query Parameters:
- latitude: number (required)
- longitude: number (required)
- radiusKm: number (default: 25)
- skills: string or array
- page: number
- limit: number

Response:
{
  "success": true,
  "pagination": { ... },
  "jobs": [ { ...job, distance: "5.2 km" }, ... ]
}
```

### Get Single Job
```
GET /jobs/:id

Response:
{
  "success": true,
  "job": { ... }
}
```

### Update Job
```
PUT /jobs/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "salary": 85,
  "status": "closed"
}

Response:
{
  "success": true,
  "message": "Job updated successfully",
  "job": { ... }
}
```

### Delete Job
```
DELETE /jobs/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Job deleted successfully"
}
```

### Get Employer's Jobs
```
GET /jobs/employer/:employerId

Response:
{
  "success": true,
  "jobs": [ ... ]
}
```

---

## 📝 APPLICATIONS

### Submit Application
```
POST /applications
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobId": "job_id_here",
  "message": "I'm interested in this job",
  "quotedRate": 75
}

Response:
{
  "success": true,
  "message": "Application submitted successfully",
  "application": { ... }
}
```

### Get Applications for a Job (Employer)
```
GET /applications/job/:jobId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "count": 5,
  "applications": [ ... ]
}
```

### Get Worker's Applications
```
GET /applications/worker
Authorization: Bearer {token}

Response:
{
  "success": true,
  "count": 3,
  "applications": [ ... ]
}
```

### Get Single Application
```
GET /applications/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "application": { ... }
}
```

### Accept Application
```
PATCH /applications/:id/accept
Authorization: Bearer {token}
Content-Type: application/json

{
  "acceptedRate": 75,
  "startDate": "2026-04-08",
  "endDate": "2026-04-08"
}

Response:
{
  "success": true,
  "message": "Application accepted",
  "application": { ... }
}
```

### Reject Application
```
PATCH /applications/:id/reject
Authorization: Bearer {token}
Content-Type: application/json

{
  "notes": "Found another candidate"
}

Response:
{
  "success": true,
  "message": "Application rejected",
  "application": { ... }
}
```

### Withdraw Application
```
PATCH /applications/:id/withdraw
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Application withdrawn",
  "application": { ... }
}
```

### Rate Application
```
PATCH /applications/:id/rate
Authorization: Bearer {token}
Content-Type: application/json

{
  "score": 5,
  "review": "Great work!",
  "ratedBy": "employer" or "worker"
}

Response:
{
  "success": true,
  "message": "Rating submitted",
  "application": { ... }
}
```

---

## 🧪 Testing with Postman/Curl

### Example: Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@test.com",
    "phone": "1234567890",
    "password": "password123",
    "userType": "worker"
  }'
```

### Example: Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "password123"
  }'
```

### Example: Create Job (with token)
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Plumbing Job",
    ...
  }'
```

---

## 📌 Important Notes

- All protected routes require `Authorization: Bearer {token}` header
- Tokens expire in 30 days
- Phone numbers must be 10 digits
- Passwords must be at least 6 characters
- Workers can only apply to "open" jobs
- Employers can only modify their own jobs
