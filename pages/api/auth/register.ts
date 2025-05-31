import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb'; // Adjust path as necessary
import bcrypt from 'bcryptjs'; // We'll need to install this

// Response Data Structure
type Data = {
  message: string;
  userId?: string; // Optional: return userId on success
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Basic validation (add more as needed)
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // Use your default DB or specify one: client.db('yourDbName')
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds

    // Insert new user
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      // Add other fields like name, createdAt, etc.
      createdAt: new Date(),
    });

    if (result.insertedId) {
      res.status(201).json({ message: 'User registered successfully', userId: result.insertedId.toString() });
    } else {
      throw new Error('User registration failed.');
    }
  } catch (error: any) {
    console.error('Registration API error:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}
