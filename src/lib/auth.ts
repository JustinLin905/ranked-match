import { PrismaClient } from "../../generated/prisma";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { SMTPClient, Message } from "emailjs";

const prisma = new PrismaClient();

// Session token cookie name
export const SESSION_COOKIE_NAME = "ranked_match_session";

// Token expiration time (24 hours)
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

// Session expiration time (30 days)
const SESSION_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000;

/**
 * Generate a unique token for passwordless login
 */
export function generateToken(): string {
	return uuidv4();
}

/**
 * Send magic link email to user
 */
export async function sendMagicLinkEmail(
	email: string,
	token: string,
	redirectPath?: string
): Promise<void> {
	const client = new SMTPClient({
		user: process.env.EMAIL_USER,
		password: process.env.EMAIL_PASSWORD,
		host: process.env.EMAIL_HOST || "smtp.gmail.com",
		ssl: true,
	});

	let magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;
	if (redirectPath) {
		magicLink += `&redirect=${encodeURIComponent(redirectPath)}`;
	}

	const message = new Message({
		text: `Click the link below to sign in to RankedMatch:\n\n${magicLink}\n\nThis link will expire in 24 hours.\n\nIf you didn't request this link, you can safely ignore this email.`,
		from: process.env.EMAIL_FROM || process.env.EMAIL_USER || "",
		to: email,
		subject: "Sign in to RankedMatch",
		attachment: [
			{
				data: `<html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Sign in to RankedMatch</h2>
              <p>Click the button below to sign in to your account:</p>
              <a href="${magicLink}" 
                 style="display: inline-block; padding: 12px 24px; margin: 20px 0; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Sign In
              </a>
              <p style="color: #666; font-size: 14px;">
                Or copy and paste this link into your browser:<br/>
                <a href="${magicLink}" style="color: #2563eb;">${magicLink}</a>
              </p>
              <p style="color: #666; font-size: 14px;">
                This link will expire in 24 hours.
              </p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #999; font-size: 12px;">
                If you didn't request this link, you can safely ignore this email.
              </p>
            </div>
          </body>
        </html>`,
				alternative: true,
			},
		],
	});

	await client.sendAsync(message);
}

/**
 * Create or update login token for user
 */
export async function createLoginToken(email: string): Promise<string> {
	const token = generateToken();
	const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_TIME);

	// Clean up any expired sessions for this user
	await prisma.session.deleteMany({
		where: {
			userId: email,
			expiresAt: {
				lt: new Date(),
			},
		},
	});

	// Create new session with token (this will be validated and updated on verification)
	await prisma.session.create({
		data: {
			userId: email,
			token,
			expiresAt,
		},
	});

	return token;
}

/**
 * Verify token and create session
 */
export async function verifyToken(
	token: string
): Promise<{ success: boolean; email?: string; error?: string }> {
	const session = await prisma.session.findUnique({
		where: { token },
		include: { user: true },
	});

	if (!session) {
		return { success: false, error: "Invalid or expired token" };
	}

	if (session.expiresAt < new Date()) {
		// Clean up expired session
		await prisma.session.delete({
			where: { id: session.id },
		});
		return { success: false, error: "Token has expired" };
	}

	// Update session with new expiration (30 days from now)
	const newExpiresAt = new Date(Date.now() + SESSION_EXPIRATION_TIME);
	await prisma.session.update({
		where: { id: session.id },
		data: { expiresAt: newExpiresAt },
	});

	return { success: true, email: session.userId };
}

/**
 * Get current user from session cookie
 */
export async function getCurrentUser(): Promise<string | null> {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

	if (!sessionToken) {
		return null;
	}

	const session = await prisma.session.findUnique({
		where: { token: sessionToken },
	});

	if (!session || session.expiresAt < new Date()) {
		return null;
	}

	return session.userId;
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: SESSION_EXPIRATION_TIME / 1000, // Convert to seconds
		path: "/",
	});
}

/**
 * Clear session cookie and delete session from database
 */
export async function clearSession(): Promise<void> {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

	if (sessionToken) {
		// Delete session from database
		await prisma.session.deleteMany({
			where: { token: sessionToken },
		});
	}

	// Clear cookie
	cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Check if user exists, create if not
 */
export async function getOrCreateUser(email: string): Promise<void> {
	const existingUser = await prisma.user.findUnique({
		where: { email },
	});

	if (!existingUser) {
		await prisma.user.create({
			data: {
				email,
			},
		});
	}
}
