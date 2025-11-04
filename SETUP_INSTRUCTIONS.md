# Quick Setup Checklist

## ✅ Completed
- [x] Updated Prisma schema for passwordless authentication
- [x] Created authentication API endpoints
- [x] Created authentication utility functions
- [x] Created middleware for protected routes
- [x] Updated login page for passwordless flow
- [x] Created email verification page
- [x] Protected existing API routes
- [x] Documented environment variables

## 🔧 Next Steps (You need to do these)

### 1. Run Database Migration
```bash
npx prisma migrate dev --name add_passwordless_auth
```

### 2. Update Your .env File
Copy the example and add your email credentials:
```bash
# If .env doesn't exist, copy from example
cp .env.example .env
```

Then edit `.env` and set:
```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-gmail-app-password"
EMAIL_FROM="your-email@gmail.com"
```

For Gmail App Password:
1. Visit: https://myaccount.google.com/apppasswords
2. Create new app password for "Mail"
3. Copy the 16-character password

### 3. Regenerate Prisma Client
```bash
npx prisma generate
```

### 4. Start Your Database
If using Docker:
```bash
docker-compose up -d
```

### 5. Start the Development Server
```bash
npm run dev
```

### 6. Test the Authentication Flow
1. Go to http://localhost:3000/login
2. Enter your email address
3. Check your email for the magic link
4. Click the link to sign in
5. You should be redirected to /postings

## 📝 Notes

- The register page still exists but needs updating (currently shows password fields)
- Users are automatically created on first login via email
- Sessions last 30 days
- Magic links expire after 24 hours
- All API routes now require authentication

## 🐛 If You Encounter Issues

1. **TypeScript errors in auth.ts**: Run `npx prisma generate` after the migration
2. **Email not sending**: Check your .env file and email provider settings
3. **Database errors**: Make sure PostgreSQL is running on localhost:5555
4. **Session not working**: Check browser cookies are enabled

## 📚 Full Documentation

See `AUTHENTICATION.md` for complete documentation.
