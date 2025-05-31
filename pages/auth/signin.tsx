import { signIn, getCsrfToken, getProviders } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SignIn({ csrfToken, providers }) {
  const router = useRouter();
  const { error } = router.query;

  const errorMessages: { [key: string]: string } = {
    CredentialsSignin: 'Invalid email or password. Please try again.',
    EmailSignin: 'Failed to send sign-in email. Please try again.',
    default: 'An error occurred. Please try again.',
  };

  const errorMessage = error && (errorMessages[error as string] || errorMessages.default);

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h1>Sign In</h1>
      {errorMessage && (
        <p style={{ color: 'red', padding: '10px', backgroundColor: '#ffebee', border: '1px solid #ef9a9a', borderRadius: '3px' }}>
          {errorMessage}
        </p>
      )}
      {providers &&
        Object.values(providers).map((provider: any) => {
          if (provider.name === 'Credentials') {
            return (
              <form method='post' action='/api/auth/callback/credentials' key={provider.name}>
                <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                <div>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='john.doe@example.com'
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '3px' }}
                  />
                </div>
                <div>
                  <label htmlFor='password'>Password</label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '3px' }}
                  />
                </div>
                <button type='submit' style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                  Sign in with Credentials
                </button>
              </form>
            );
          }
          // Example for other providers:
          // if (provider.id !== 'credentials') { // Render buttons for other providers
          //   return (
          //     <div key={provider.name} style={{ marginTop: '10px' }}>
          //       <button
          //         onClick={() => signIn(provider.id, { callbackUrl: router.query.callbackUrl as string || '/' })}
          //         style={{ width: '100%', padding: '10px', backgroundColor: '#eee', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
          //       >
          //         Sign in with {provider.name}
          //       </button>
          //     </div>
          //   );
          // }
          return null;
        })}
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        No account yet? <Link href='/auth/signup'>Sign Up</Link>
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  // It's good practice to not pass all provider details if not needed,
  // but for this generic sign-in page, it's fine.
  // Filter out credentials provider if you want to handle its form completely custom
  // and only show buttons for other providers.
  return {
    props: { csrfToken, providers },
  };
};
