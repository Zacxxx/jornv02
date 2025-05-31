import Link from 'next/link';
// SessionProvider import removed
import AuthStatus from '../components/AuthStatus'; // Adjusted path

export default function HomePage() {
  return (
    // SessionProvider wrapping removed
    <> {/* Use Fragment or a div if needed */}
      <AuthStatus />
      <div>
        <h1>Welcome to Next.js!</h1>
        <p>This is a placeholder page.</p>
        <Link href="/game">Go to Game (placeholder)</Link>
      </div>
    </>
  );
}
