import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    return <p>Loading session...</p>;
  }

  if (session) {
    return (
      <div style={{ padding: '10px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
        <p>
          Signed in as <strong>{session.user?.email || session.user?.name}</strong>
        </p>
        <button onClick={() => signOut({ callbackUrl: '/' })} style={{ marginRight: '10px', padding: '8px 12px', cursor: 'pointer' }}>
          Sign Out
        </button>
        {/* Add other authenticated user links here, e.g., profile */}
      </div>
    );
  }

  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
      <p>You are not signed in.</p>
      <Link href='/auth/signin' style={{ marginRight: '10px', color: '#0070f3' }}>
        Sign In
      </Link>
      <Link href='/auth/signup' style={{ color: '#0070f3' }}>
        Sign Up
      </Link>
    </div>
  );
}
