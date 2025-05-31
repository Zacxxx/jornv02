import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // Basic client-side validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (password.length < 6) { // Example: enforce minimum password length
        setError('Password must be at least 6 characters long.');
        return;
    }

    try {
      // This is a common pattern for custom credential sign-up.
      // You would typically have a separate API endpoint for registration.
      // NextAuth's Credentials provider is primarily for sign-in.
      // For sign-up, you'd call your own API endpoint here.
      const res = await fetch('/api/auth/register', { // We will create this API endpoint later
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.message || 'Registration successful! Please sign in.');
        // Optionally, redirect to sign-in page or auto-sign-in
        // For now, just show a message.
        // signIn('credentials', { email, password, callbackUrl: '/' });
      } else {
        const data = await res.json();
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '3px' }}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '3px' }}
          />
        </div>
        <button type='submit' style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Sign Up</button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Already have an account? <Link href='/auth/signin'>Sign In</Link>
      </p>
    </div>
  );
}
