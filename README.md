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

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```bash
# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Credentials (REQUIRED)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
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
6. **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret to your `.env.local` file

4. Start the development server:

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

## 🔧 Troubleshooting

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

## 📞 Contact

For any questions or suggestions, please open an issue in the GitHub repository.
