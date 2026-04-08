# HireMitra Backend

Backend server for the HireMitra Job Platform.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create .env file
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

### 3. Set up MongoDB
- **Local**: Install MongoDB and run `mongod` in terminal
- **Cloud**: Use MongoDB Atlas (free tier available)
  - Create cluster at https://www.mongodb.com/cloud/atlas
  - Get connection string
  - Add it to `.env` as `MONGODB_URI`

### 4. Run Backend
```bash
npm run dev
```

This starts the server on `http://localhost:5000` with auto-reload.

### 5. Test Health Check
```bash
curl http://localhost:5000/api/health
```

You should see: `{"message":"Backend is running","timestamp":"..."}`

---

## Folder Structure

- `config/` - Database and app configuration
- `models/` - MongoDB schemas (User, Job, Application)
- `controllers/` - Business logic
- `routes/` - API endpoints
- `middleware/` - Auth, error handling
- `utils/` - Helpers and validators

---

## Next Steps
- Step 2: Create Database Models
- Step 3: Build API Routes
