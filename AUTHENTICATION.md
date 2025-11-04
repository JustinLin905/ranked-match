# Passwordless Authentication Setup Guide

This guide explains how to set up and use the passwordless authentication system in RankedMatch.

## Overview

The application now uses **passwordless authentication** with magic links sent via email. Users don't need to remember passwords - they simply enter their email address and receive a secure link to sign in.

## Features

- ✅ Passwordless authentication using magic links
- ✅ Automatic user creation on first login
- ✅ Secure session management with 30-day expiration
- ✅ Protected API routes and pages
- ✅ Email-based login tokens with 24-hour expiration
- ✅ Beautiful email templates

## Setup Instructions

### 1. Run Database Migrations

First, apply the database migrations to add the new authentication tables:

```bash
npx prisma migrate dev --name add_passwordless_auth
```

This will:

- Remove the `password` field from the User model
- Make user profile fields optional (will be filled in after first login)
- Add a new `Session` model for managing user sessions

### 2. Configure Environment Variables

Copy the example environment file and fill in your email credentials:

```bash
cp .env.example .env
```

Edit `.env` and configure the following variables:

```bash
# Application URL (change to your production URL in production)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email Configuration
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"
```

#### Setting up Gmail SMTP:

1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification (enable it if not already enabled)
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Create a new app password for "Mail"
5. Copy the 16-character password and use it as `EMAIL_PASSWORD`

#### Using Other Email Providers:

For other email providers (e.g., SendGrid, Mailgun, AWS SES), update the SMTP configuration:

```bash
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="noreply@yourdomain.com"
```

### 3. Install Dependencies (if needed)

The required packages are already in `package.json`:

- `passwordless` - For passwordless authentication
- `emailjs` - For sending emails
- `uuid` - For generating unique tokens

If you need to reinstall:

```bash
npm install
```

### 4. Start the Application

Start your PostgreSQL database (via Docker or locally), then run:

```bash
npm run dev
```

## How It Works

### User Flow

1. **Request Login**: User enters their email on `/login`
2. **Email Sent**: System sends a magic link to the user's email
3. **Click Link**: User clicks the link in their email
4. **Verification**: System verifies the token at `/verify`
5. **Session Created**: User is authenticated and redirected to `/postings`

### Technical Flow

1. **POST /api/auth/request-login**

   - Creates or finds existing user
   - Generates a unique token
   - Sends magic link email

2. **POST /api/auth/verify-token**

   - Verifies the token is valid and not expired
   - Creates a session cookie
   - Returns user information

3. **GET /api/auth/session**

   - Checks current authentication status
   - Returns user data if authenticated

4. **POST /api/auth/logout**
   - Clears session cookie
   - Removes session from database

### Protected Routes

The following routes require authentication:

**Pages:**

- `/postings`
- `/matching`
- `/results`

**API Routes:**

- `/api/users`
- `/api/applications`
- `/api/tags`

Unauthenticated users are automatically redirected to `/login` for pages, or receive a 401 error for API calls.

## Database Schema

### User Model

```prisma
model User {
    email String @id @unique

    // Profile fields (optional until filled in)
    firstName String?
    lastName String?
    program String?
    tags Tag[]
    highlights String[] @default([])
    term Term?
    sequence Json?
    bio String?
    active_in_cycle Boolean @default(true)

    // Contact info
    instagram String?
    discord String?
    phone String?

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    // Authentication
    sessions Session[]
}
```

### Session Model

```prisma
model Session {
    id String @id @default(uuid())
    userId String
    user User @relation(fields: [userId], references: [email], onDelete: Cascade)
    token String @unique
    expiresAt DateTime
    createdAt DateTime @default(now())

    @@index([token])
    @@index([userId])
}
```

## API Endpoints

### Authentication Endpoints

#### Request Login

```http
POST /api/auth/request-login
Content-Type: application/json

{
  "email": "user@example.com"
}

Response: { "success": true, "message": "Magic link sent to your email" }
```

#### Verify Token

```http
POST /api/auth/verify-token
Content-Type: application/json

{
  "token": "uuid-token-here"
}

Response: { "success": true, "email": "user@example.com" }
```

#### Get Current Session

```http
GET /api/auth/session

Response: {
  "authenticated": true,
  "user": {
    "email": "user@example.com",
    "firstName": "John",
    // ... other user fields
  }
}
```

#### Logout

```http
POST /api/auth/logout

Response: { "success": true, "message": "Logged out successfully" }
```

## Security Features

- **Token Expiration**: Magic link tokens expire after 24 hours
- **Session Expiration**: User sessions expire after 30 days
- **HTTP-Only Cookies**: Session tokens stored in secure HTTP-only cookies
- **Automatic Cleanup**: Expired sessions are automatically removed
- **Secure Defaults**: Uses secure cookies in production

## Testing

### Manual Testing

1. Start the application
2. Navigate to `/login`
3. Enter your email address
4. Check your email for the magic link
5. Click the link to sign in
6. Verify you're redirected to `/postings`

### Testing with Local Email

For development, you can use tools like:

- **MailHog**: Local SMTP server for testing
- **Mailtrap**: Email testing service
- **Gmail**: Use a real Gmail account (easiest for quick testing)

## Troubleshooting

### Email not sending

1. Check your `.env` file has correct credentials
2. Verify your email provider allows SMTP access
3. Check console logs for error messages
4. Test SMTP connection separately

### Magic link not working

1. Check token hasn't expired (24 hours)
2. Verify `NEXT_PUBLIC_APP_URL` is correct
3. Check browser console for errors
4. Verify database is running

### Session not persisting

1. Check cookies are enabled in browser
2. Verify session cookie is being set
3. Check database for session records
4. Ensure `SESSION_COOKIE_NAME` matches in code and cookies

## Migration from Password-Based Auth

If you had existing users with passwords:

1. Run the migration (this will fail if password field is required)
2. Users will need to use the passwordless flow
3. Their accounts will be matched by email
4. First login will work even if user record already exists

## Production Deployment

Before deploying to production:

1. Update `NEXT_PUBLIC_APP_URL` to your production domain
2. Use a production email service (SendGrid, AWS SES, etc.)
3. Ensure `NODE_ENV=production` for secure cookies
4. Set up SSL/TLS for HTTPS
5. Configure proper database connection string

## Support

For issues or questions, please refer to:

- Prisma docs: https://www.prisma.io/docs
- EmailJS docs: https://www.emailjs.com/docs
- Next.js docs: https://nextjs.org/docs
