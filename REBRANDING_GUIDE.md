# Rebranding Guide: Blue-Collar → HireMitra

Complete checklist for rebranding the entire application from "Blue-Collar" to "HireMitra".

---

## **BACKEND FILES TO UPDATE**

### 1. `backend/package.json`
```diff
- "name": "blue-collar-backend",
- "description": "Backend for Blue-Collar Job Platform",
+ "name": "hiremitra-backend",
+ "description": "Backend for HireMitra Job Platform",
```

### 2. `backend/README.md`
```diff
- # Blue-Collar Backend
+ # HireMitra Backend

- Backend server for the Blue-Collar Job Platform.
+ Backend server for the HireMitra Job Platform.
```

### 3. `backend/API_ROUTES.md`
```diff
- # Blue-Collar Job Platform - API Routes
+ # HireMitra Job Platform - API Routes
```

### 4. Database Configuration (if using)
```diff
MONGODB_URI=mongodb://localhost:27017/hiremitra-platform
```

---

## **FRONTEND FILES TO UPDATE**

### 1. `frontend/package.json`
```diff
- "name": "blue-collar-frontend",
+ "name": "hiremitra-frontend",
```

### 2. `frontend/.env.local`
```diff
- NEXT_PUBLIC_APP_NAME=Blue-Collar Job Platform
+ NEXT_PUBLIC_APP_NAME=HireMitra Job Platform
```

### 3. `frontend/app/layout.js`
```diff
- title: 'Blue-Collar Job Platform',
- description: 'Find jobs and hire skilled workers',
+ title: 'HireMitra - Find Jobs & Hire Workers',
+ description: 'HireMitra connects skilled workers with employers. Find local jobs or hire talented professionals.',
```

### 4. `frontend/components/Navbar.js`
```diff
- <span className="text-2xl font-bold text-blue-600">
-   💼 Blue-Collar
- </span>
+ <span className="text-2xl font-bold text-blue-600">
+   💼 HireMitra
+ </span>
```

### 5. `frontend/components/Footer.js`
```diff
- <h3 className="text-lg font-bold mb-4">Blue-Collar Platform</h3>
- <p className="text-gray-400">
-   Connecting skilled workers with employers in their area.
- </p>
+ <h3 className="text-lg font-bold mb-4">HireMitra</h3>
+ <p className="text-gray-400">
+   Connecting skilled workers with employers across India.
+ </p>
```

```diff
- <p>&copy; {currentYear} Blue-Collar Job Platform. All rights reserved.</p>
+ <p>&copy; {currentYear} HireMitra. All rights reserved.</p>
```

### 6. `frontend/app/page.js` (Home Page)
```diff
- <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
-   Find Skilled Workers.<br />Hire Locally.
- </h1>
- <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
-   Connect with talented plumbers, electricians, and other skilled professionals in your area. Fast. Reliable. Local.
- </p>
+ <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
+   Find Skilled Workers.<br />Hire Quality Professionals.
+ </h1>
+ <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
+   Connect with talented plumbers, electricians, and skilled professionals near you. Fast. Reliable. Verified.
+ </p>
```

### 7. `frontend/README.md`
```diff
- # Blue-Collar Frontend
+ # HireMitra Frontend

- Frontend for the Blue-Collar Job Platform built with Next.js and Tailwind CSS.
+ Frontend for the HireMitra Job Platform built with Next.js and Tailwind CSS.
```

### 8. `frontend/TESTING_GUIDE.md`
```diff
- # Blue-Collar Platform - Complete Testing Guide
+ # HireMitra - Complete Testing Guide
```

### 9. `frontend/UI_IMPROVEMENTS.md`
```diff
- # UI Improvements & Styling Guide
+ # HireMitra - UI Improvements & Styling Guide
```

### 10. `frontend/app/auth/login/page.js`
```diff
- export const metadata = {
-   title: 'Login - Blue-Collar Job Platform',
- };
+ export const metadata = {
+   title: 'Login - HireMitra',
+ };
```

### 11. `frontend/app/auth/register/page.js`
```diff
- export const metadata = {
-   title: 'Register - Blue-Collar Job Platform',
- };
+ export const metadata = {
+   title: 'Register - HireMitra',
+ };
```

---

## **CONFIGURATION FILES**

### 1. `backend/.env.example`
```diff
- # MongoDB Connection
- MONGODB_URI=mongodb://localhost:27017/blue-collar-platform
+ # MongoDB Connection
+ MONGODB_URI=mongodb://localhost:27017/hiremitra-platform
```

### 2. Root folder name (Optional)
```bash
# If you want to rename the root folder
mv blue-collar-platform hiremitra-platform
```

---

## **OPTIONAL: BRANDING UPDATES**

### Logo & Assets
- Update favicon in `frontend/public/favicon.ico`
- Update logo in any image files
- Update company email: `support@hiremitra.com`
- Update contact info

### Social Media & Links
- Update footer links
- Update contact email addresses
- Update website URLs

### Colors (Optional)
If you want to change the color scheme, edit:
- `frontend/tailwind.config.js`
- `frontend/app/globals.css`

---

## **DATABASE MIGRATION (If Already Deployed)**

If you have a live database, you may need to:
1. Backup existing data
2. Create new database with HireMitra name
3. Migrate data if needed

```bash
# MongoDB example
mongodump --uri "mongodb://localhost:27017/blue-collar-platform"
mongorestore --uri "mongodb://localhost:27017/hiremitra-platform" dump/
```

---

## **GIT COMMIT MESSAGE**

```bash
git add .
git commit -m "refactor: Rebrand Blue-Collar to HireMitra

- Update all app names and branding
- Change metadata and titles
- Update footer and navbar branding
- Change database names
- Update documentation"
```

---

## **TESTING AFTER REBRANDING**

After making changes, test:
- [ ] Home page displays correctly
- [ ] Navbar shows correct name
- [ ] Footer shows correct branding
- [ ] Page titles in browser tabs are correct
- [ ] Meta descriptions are correct
- [ ] All links work
- [ ] Forms submit correctly
- [ ] No console errors

---

## **SEARCH & REPLACE QUICK REFERENCE**

Use find & replace in your code editor:

| Find | Replace |
|------|---------|
| `Blue-Collar` | `HireMitra` |
| `blue-collar` | `hiremitra` |
| `BLUE-COLLAR` | `HIREMITRA` |
| `blue_collar` | `hiremitra` |
| `blueColl` | `hireMitra` |

---

## **FILE COUNT TO UPDATE**

**Backend:** ~4 files
**Frontend:** ~11 files
**Config:** ~2 files

**Total: ~17 files**

---

## **ESTIMATED TIME**

- Manual updates: 15-20 minutes
- Testing: 10-15 minutes
- **Total: ~30 minutes**

---

## **AFTER REBRANDING**

1. Test all features again
2. Update any documentation
3. Update email signatures
4. Update social media profiles
5. Update website metadata for SEO
6. Deploy updated version

---

## **REVERTING (If Needed)**

All changes are easy to revert by replacing:
- `HireMitra` → `Blue-Collar`
- `hiremitra` → `blue-collar`

Keep a backup of original files for reference.
