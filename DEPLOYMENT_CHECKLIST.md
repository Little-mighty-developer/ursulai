# 🚀 Netlify Deployment Checklist

## Pre-Deployment Checks ✅

### 1. Code Quality

- [x] No TypeScript errors
- [x] No ESLint errors
- [x] All build errors resolved

### 2. Environment Variables (Set in Netlify Dashboard)

Go to **Site configuration** > **Environment variables** and add:

- [ ] `NEXTAUTH_URL` = `https://your-site-name.netlify.app` ⚠️ **CRITICAL: Use your actual Netlify URL**
- [ ] `NEXTAUTH_SECRET` = (your secret - same as local)
- [ ] `GOOGLE_CLIENT_ID` = (your Google OAuth client ID)
- [ ] `GOOGLE_CLIENT_SECRET` = (your Google OAuth client secret)
- [ ] `DATABASE_URL` = (your production database connection string) ⚠️ **Must be a production database, not localhost**

### 3. Google OAuth Configuration

In [Google Cloud Console](https://console.cloud.google.com/):

- [ ] Add authorized redirect URI: `https://your-site-name.netlify.app/api/auth/callback/google`
- [ ] Verify OAuth consent screen is configured
- [ ] Ensure Google Identity API is enabled

### 4. Database Setup

- [ ] Set up a production PostgreSQL database (Supabase, Neon, Railway, etc.)
- [ ] Run migrations on production database:
  ```bash
  # Set DATABASE_URL to production URL
  export DATABASE_URL="your-production-database-url"
  npx prisma migrate deploy
  ```
- [ ] Verify database connection works

### 5. Build Configuration

- [x] `netlify.toml` is configured correctly
- [x] `@netlify/plugin-nextjs` is installed (v5.15.3)
- [x] Build command: `npm run build`
- [x] Publish directory: `.next`

### 6. Dependencies

- [ ] All dependencies are in `package.json`
- [ ] `package-lock.json` is committed
- [ ] No missing peer dependencies

## Post-Deployment Checks

### 1. Build Success

- [ ] Netlify build completes successfully
- [ ] No build errors in Netlify logs
- [ ] Site is live and accessible

### 2. Functionality Testing

- [ ] Homepage redirects to `/login`
- [ ] Login page loads correctly
- [ ] Google OAuth sign-in works
- [ ] Redirect to dashboard after login works
- [ ] Dashboard loads for authenticated users
- [ ] API routes work (check browser console for errors)

### 3. Error Handling

- [ ] Unrecognized URLs redirect to `/login`
- [ ] Error pages display correctly
- [ ] No console errors in browser

## Common Issues & Solutions

### Issue: "Page not found" on Netlify

**Solution:** Ensure `netlify.toml` has the correct configuration and `@netlify/plugin-nextjs` is installed.

### Issue: OAuth redirect error

**Solution:**

- Verify `NEXTAUTH_URL` matches your Netlify domain exactly
- Check Google OAuth redirect URI includes your Netlify URL
- Ensure redirect URI uses `https://` not `http://`

### Issue: Database connection errors

**Solution:**

- Verify `DATABASE_URL` is set in Netlify environment variables
- Ensure database allows connections from Netlify IPs
- Check database URL format: `postgresql://user:password@host:port/database`

### Issue: Build fails with Prisma errors

**Solution:**

- Prisma Client is auto-generated during build
- If issues persist, add `prisma generate` to build command in `netlify.toml`:
  ```toml
  [build]
    command = "npx prisma generate && npm run build"
  ```

## Quick Deploy Commands

```bash
# 1. Commit all changes
git add .
git commit -m "Prepare for Netlify deployment"
git push

# 2. Netlify will auto-deploy from GitHub
# Or manually trigger in Netlify dashboard

# 3. After deployment, verify:
# - Check Netlify build logs
# - Test the live site
# - Verify environment variables are set
```

## Notes

- The `netlify.toml` file is already configured
- Prisma migrations should be run manually on production database before first deployment
- Environment variables must be set in Netlify dashboard (not in code)
- Always use `https://` for production URLs
