import { ObjectId } from 'mongodb';

// This is a basic User model.
// The NextAuth MongoDB adapter will create and manage its own schema for users,
// accounts, sessions, and verification tokens.
// You can extend this model or create other models for your application's specific needs.

export interface User {
  _id?: ObjectId;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  // Add any other custom fields you need for your user model
  // e.g., roles, preferences, gameSpecificData, etc.
}
