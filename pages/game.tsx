import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

export default function GamePage() {
  const { data: session, status } = useSession(); // Client-side session access

  if (status === 'loading') {
    return <p>Loading game...</p>;
  }

  // This check is mostly for client-side rendering after initial SSR protection
  if (!session) {
    // This should ideally not be reached if getServerSideProps redirects,
    // but it's a good fallback or for components that might be rendered conditionally.
    return (
      <div>
        <p>Access Denied. You need to be signed in to play the game.</p>
        <Link href="/auth/signin">Sign In</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Game Area</h1>
      <p>Welcome, {session.user?.name || session.user?.email}!</p>
      <p>Your game content would be here.</p>
      {/*
        Here you would integrate your actual game client.
        For example, if your game is a Canvas-based game, you might initialize it here.
        Ensure that any API calls made by the game client to your backend
        also verify the user's session if they are for protected resources.
      */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #eee' }}>
        <h2>Session Details (Client-side):</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}

// Server-side protection for the /game route
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    // If no session, redirect to sign-in page
    return {
      redirect: {
        destination: '/auth/signin?callbackUrl=/game', // Redirect back to /game after sign in
        permanent: false,
      },
    };
  }

  // If session exists, pass it as a prop to the page
  // This can be useful if you need session data during server-side rendering
  return {
    props: { session },
  };
};
