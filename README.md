# Ursul.ai

Ursul.ai is an intelligent journaling application that helps you capture and analyze your thoughts through voice notes and handwritten journal entries. Over time, it learns from your entries to provide personalized insights and answers to your questions.

## 🌟 Features

- **Voice Notes**: Record your thoughts and reflections through voice messages
- **Handwritten Notes**: Upload images of your handwritten journal entries
- **AI-Powered Analysis**: Get personalized insights and answers to your questions based on your journal history
- **Privacy-Focused**: Your journal entries are processed securely and privately

## 🚀 Project Phases & Roadmap

### Phase 1: Core App Development

- Set up Next.js app with TypeScript, Tailwind, and GitHub
- Implement authentication (NextAuth, Google)
- Build core pages: Login, Dashboard, Journal, Calendar, Weather, Mood Tracker
- Set up PostgreSQL with Prisma for data models (Engagement, MoodEntry, etc.)
- Implement API routes for engagement and mood tracking

### Phase 2: Local Dockerization

- Write a `Dockerfile` for the Next.js app
- Write a `docker-compose.yml` to run app + PostgreSQL locally
- Test local development and database migrations in Docker

### Phase 3: Kubernetes Basics

- Write Kubernetes manifests for:
  - App Deployment & Service
  - PostgreSQL Deployment & Service
  - PersistentVolumeClaim for DB data
  - ConfigMap/Secret for environment variables
- Deploy locally with Minikube or Kind

### Phase 4: Advanced Kubernetes

- Add Ingress for custom domains/paths
- Set up resource limits, liveness/readiness probes
- Use Kubernetes Secrets for sensitive data
- Add auto-scaling (HPA)
- Add monitoring/logging (Prometheus, Grafana, etc.)

### Phase 5: CI/CD & Cloud Deployment

- Set up GitHub Actions for automated builds/tests
- Build and push Docker images to a registry
- Deploy to a managed Kubernetes service (GKE, EKS, etc.)
- Automate database migrations in CI/CD

### Phase 6: Premium Features & Analytics

- Build mood analytics dashboard (charts, trends)
- Add premium features (weekly/monthly reports, reminders, etc.)
- Add payment integration (Stripe, etc.)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A modern web browser

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ursulai.git
cd ursulai
```

1. Install dependencies:

```bash
npm install
# or
yarn install
```

1. Set up the database:

The application requires PostgreSQL. You have a few options:

**Option A: Local PostgreSQL**

```bash
# Install PostgreSQL (if not already installed)
# macOS: brew install postgresql@14
# Then start PostgreSQL: brew services start postgresql@14

# Create the database
createdb ursulai
```

**Option B: Use a hosted database service**

- [Supabase](https://supabase.com/) (free tier available)
- [Neon](https://neon.tech/) (free tier available)
- [Railway](https://railway.app/) (free tier available)

1. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```bash
# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Credentials (REQUIRED)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database Configuration (REQUIRED)
# For local PostgreSQL:
DATABASE_URL=postgresql://postgres:password@localhost:5432/ursulai
# Or use your hosted database connection string
```

**To generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

**To get Google OAuth credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity API)
4. Go to "Credentials" > "Create Credentials" > "OAuth client ID"
5. Application type: **Web application**
6. **Authorized redirect URIs** (⚠️ **CRITICAL - must match exactly**):
   - Click **+ ADD URI**
   - Enter exactly: `http://localhost:3000/api/auth/callback/google`
   - ⚠️ **Important:**
     - Use `http://` (not `https://`) for local development
     - Use `localhost` (not `127.0.0.1`)
     - No trailing slash
     - Exact path: `/api/auth/callback/google`
7. Click **CREATE** and copy the Client ID and Client Secret to your `.env.local` file

8. Run database migrations:

**Important:** Prisma CLI reads from `.env` file, while Next.js reads from `.env.local`. You have two options:

**Option A: Create a `.env` file (Recommended)**

```bash
# Copy DATABASE_URL from .env.local to .env
# Or create .env with just:
echo "DATABASE_URL=postgresql://postgres:password@localhost:5432/ursulai" > .env
```

**Option B: Use dotenv-cli (Alternative)**

```bash
npm install --save-dev dotenv-cli
# Then use: dotenv -e .env.local -- npx prisma migrate dev
```

Then run:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to set up the database schema
npx prisma migrate dev
```

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## 🛠️ Tech Stack

- Frontend: React.js
- Backend: Node.js/Express
- Database: PostgreSQL
- AI/ML: TensorFlow.js
- Authentication: NextAuth.js
- Storage: AWS S3 (for voice notes and images)

## 📝 Project Structure

```
ursulai/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Next.js pages
│   ├── styles/        # CSS/SCSS files
│   ├── utils/         # Utility functions
│   └── api/           # API routes
├── public/            # Static files
└── prisma/           # Database schema and migrations
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their invaluable tools and libraries
- Teddy bear images in the gratitude widget:
  [Stuffed-animal icons created by Blackonion02 - Flaticon](https://www.flaticon.com/free-icons/stuffed-animal)

## 🔧 Troubleshooting

### Function Timeout / Function Crashed Error on Netlify

If you see "This function has crashed" or function timeout errors on Netlify:

1. **Connection Pooling (Critical for Serverless):**
   - Netlify functions have a 10-second timeout on the free tier
   - Database connections can timeout if not using a connection pooler
   - **Solution:** Use a connection pooler URL in your `DATABASE_URL`

   For PostgreSQL providers:
   - **Supabase:** Use the connection pooler URL (port 6543) instead of direct connection
   - **Neon:** Use the pooled connection string (includes `?pgbouncer=true`)
   - **Railway/Render:** Use PgBouncer or connection pooler if available

   Example pooled URL format:

   ```
   postgresql://user:password@host:6543/database?pgbouncer=true&connection_limit=1
   ```

2. **Check Netlify Function Logs:**
   - Go to Netlify Dashboard → Your Site → Functions → View logs
   - Look for specific error messages (database connection, missing env vars, etc.)

3. **Environment Variables:**
   - Ensure all required variables are set in Netlify:
     - `DATABASE_URL` (use pooled connection!)
     - `NEXTAUTH_URL` (your Netlify site URL)
     - `NEXTAUTH_SECRET`
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`

4. **Upgrade Netlify Plan (if needed):**
   - Free tier: 10-second function timeout
   - Pro tier: 26-second function timeout
   - If functions consistently timeout, consider upgrading

5. **Optimize Database Queries:**
   - Ensure queries are indexed
   - Use `take`/`limit` to restrict result sets
   - Avoid N+1 queries

### OAuthSignin Error

If you encounter an `OAuthSignin` error when trying to sign in with Google:

1. **Check your environment variables:**
   - Ensure `.env.local` exists in the root directory
   - Verify all required variables are set:
     - `NEXTAUTH_URL` (should be `http://localhost:3000` for local development)
     - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`

2. **Verify Google OAuth configuration:**
   - In Google Cloud Console, check that the redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
   - Ensure the OAuth consent screen is configured
   - Make sure the Google+ API (or Google Identity API) is enabled

3. **Restart your development server** after making changes to `.env.local`

4. **Check the browser console** for more detailed error messages

### DATABASE_URL Error

If you encounter `Environment variable not found: DATABASE_URL`:

1. **Add DATABASE_URL to your `.env.local` file:**

   ```bash
   # For local PostgreSQL
   DATABASE_URL=postgresql://postgres:password@localhost:5432/ursulai

   # Replace with your actual:
   # - Username (default is usually 'postgres')
   # - Password (your PostgreSQL password)
   # - Port (default is 5432)
   # - Database name (ursulai or your preferred name)
   ```

2. **Set up PostgreSQL:**
   - **macOS:** `brew install postgresql@14 && brew services start postgresql@14`
   - **Linux:** `sudo apt-get install postgresql postgresql-contrib` (Ubuntu/Debian)
   - **Windows:** Download from [postgresql.org](https://www.postgresql.org/download/windows/)

3. **Create the database:**

   ```bash
   # Connect to PostgreSQL
   psql postgres

   # Create database
   CREATE DATABASE ursulai;

   # Exit
   \q
   ```

4. **Run migrations:**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Alternative: Use a hosted database:**
   - [Supabase](https://supabase.com/) - Free tier available
   - [Neon](https://neon.tech/) - Free tier available
   - [Railway](https://railway.app/) - Free tier available
   - Copy the connection string they provide to your `DATABASE_URL`

6. **Restart your development server** after adding `DATABASE_URL`

### Invalid Character in Header Content Error

If you encounter `TypeError: Invalid character in header content ["Location"]`:

1. **Check your `.env.local` file for invalid characters:**
   - Open `.env.local` and ensure `NEXTAUTH_URL` has no trailing spaces or newlines
   - It should be exactly: `NEXTAUTH_URL=http://localhost:3000` (no quotes, no trailing spaces)
   - Make sure there are no hidden characters or line breaks

2. **Verify the format:**

   ```bash
   # ✅ Correct
   NEXTAUTH_URL=http://localhost:3000

   # ❌ Wrong (has quotes)
   NEXTAUTH_URL="http://localhost:3000"

   # ❌ Wrong (has trailing space)
   NEXTAUTH_URL=http://localhost:3000

   # ❌ Wrong (has newline)
   NEXTAUTH_URL=http://localhost:3000\n
   ```

3. **Recreate the `.env.local` file** if needed:
   - Delete the existing `.env.local`
   - Create a new one with clean values (no extra spaces or characters)
   - Restart your development server

### Redirect URI Mismatch Error (Error 400: redirect_uri_mismatch)

If you encounter `Error 400: redirect_uri_mismatch` when trying to sign in with Google:

This error means the redirect URI in your Google Cloud Console doesn't match what NextAuth is sending. **The redirect URI must match exactly.**

**Step-by-step fix:**

1. **Go to Google Cloud Console:**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project

2. **Navigate to OAuth credentials:**
   - Go to **APIs & Services** > **Credentials**
   - Find your OAuth 2.0 Client ID (the one you're using for this app)
   - Click on it to edit

3. **Add the correct Authorized redirect URI:**
   - In the **Authorized redirect URIs** section, click **+ ADD URI**
   - Add exactly this URI (copy it exactly, no trailing slashes):

     ```
     http://localhost:3000/api/auth/callback/google
     ```

   - **Important:**
     - Use `http://` (not `https://`) for local development
     - Use `localhost` (not `127.0.0.1`)
     - No trailing slash
     - Exact path: `/api/auth/callback/google`

4. **Save the changes:**
   - Click **SAVE** at the bottom
   - Wait a few seconds for changes to propagate

5. **Verify your `.env.local` file:**
   - Make sure `NEXTAUTH_URL=http://localhost:3000` (no trailing slash)
   - Restart your development server

6. **Try signing in again**

**Common mistakes:**

- ❌ `http://localhost:3000/api/auth/callback/google/` (trailing slash)
- ❌ `https://localhost:3000/api/auth/callback/google` (using https)
- ❌ `http://127.0.0.1:3000/api/auth/callback/google` (using IP instead of localhost)
- ❌ `http://localhost:3000/api/auth/callback` (missing `/google`)

**For production:**
When deploying, you'll need to add your production URL:

```
https://yourdomain.com/api/auth/callback/google
```

## 🚀 Deployment

### Deploying to Netlify

1. **Install the Netlify Next.js plugin:**

   ```bash
   npm install --save-dev @netlify/plugin-nextjs
   ```

2. **Set up environment variables in Netlify:**
   - Go to your Netlify site dashboard
   - Navigate to **Site configuration** > **Environment variables**
   - Add all the variables from your `.env.local`:
     - `NEXTAUTH_URL` (should be your Netlify domain, e.g., `https://your-site.netlify.app`)
     - `NEXTAUTH_SECRET`
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`
     - `DATABASE_URL` (your production database URL)

3. **Update Google OAuth redirect URI:**
   - In Google Cloud Console, add your Netlify URL to authorized redirect URIs:
     - `https://your-site.netlify.app/api/auth/callback/google`

4. **Deploy:**
   - Connect your GitHub repository to Netlify
   - Netlify will automatically detect the `netlify.toml` configuration
   - The build will run automatically on push

**Note:** The `netlify.toml` file is already configured in this repository. Make sure to:

- Set `NEXTAUTH_URL` to your actual Netlify domain
- Update Google OAuth settings with your production callback URL
- Use a production database (not localhost)

## 📞 Contact

For any questions or suggestions, please open an issue in the GitHub repository.
