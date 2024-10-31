export const dynamic = 'force-dynamic';

// A faulty API route to test Sentry's error monitoring
export function GET() {
  // throw new Error('Sentry Example API Route Error');
  return Response.json(
    { data: 'Test Sentry Error' },
    {
      status: 400,
    },
  );
}
