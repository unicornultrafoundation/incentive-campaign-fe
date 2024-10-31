import { SERVER_ENDPOINTS } from '@/config/api';
import { getBackendAPI } from '@/services/api';
import { setAuthCookies } from '@/services/cookies';
import { Credentials } from '@/types/entities';

export async function POST(request: Request) {
  const backendAPI = getBackendAPI();
  try {
    const params = await request.json();
    const credentials = (await backendAPI.post(
      SERVER_ENDPOINTS.CONNECT,
      params,
    )) as Credentials;
    setAuthCookies(credentials.data);

    return Response.json(
      { data: credentials, message: 'Connect wallet successfully' },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
