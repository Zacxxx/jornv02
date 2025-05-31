import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// Import the MongoDB adapter and client promise (we will create this file in a later step)
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb'; // Adjust path as needed

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign-in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g., domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john.doe@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // This is where you'd typically connect to your database to verify credentials
        // For now, we'll return a dummy user if email and password are provided.
        // IMPORTANT: Replace this with actual database validation.
        if (credentials && credentials.email && credentials.password) {
          // const user = await User.findOne({ email: credentials.email }); // Example DB lookup
          // if (user && bcrypt.compareSync(credentials.password, user.password)) {
          //   return { id: user.id, name: user.name, email: user.email };
          // }

          // Dummy user for now
          if (credentials.email === 'test@example.com' && credentials.password === 'password') {
            return { id: '1', name: 'Test User', email: 'test@example.com' };
          }
        }
        // If you return null, then an error will be displayed advising the user to check their details.
        return null;

        // You can also Reject this callback with an Error or send a URL to redirect to.
        // throw new Error('Invalid credentials');
      },
    }),
    // ...add more providers here if needed (e.g., Google, GitHub)
  ],
  // When using a database adapter, NextAuth handles session management automatically.
  adapter: MongoDBAdapter(clientPromise),

  session: {
    // Choose how you want to save the user session.
    // The default is 'jwt' (JSON Web Tokens), which is good for stateless authentication.
    // If you use a database adapter, this can often be left as 'jwt' or set to 'database'.
    strategy: 'jwt',
  },

  // Callbacks are asynchronous functions you can use to control what happens when an action is performed.
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user id to the token right after signin
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  // Configure your JWT secret
  // It's important to set a NEXTAUTH_SECRET environment variable for production.
  // You can generate a secret using: openssl rand -base64 32
  secret: process.env.NEXTAUTH_SECRET || 'supersecretstring_for_development_only', // Replace with env var in production

  pages: {
    signIn: '/auth/signin', // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
});
