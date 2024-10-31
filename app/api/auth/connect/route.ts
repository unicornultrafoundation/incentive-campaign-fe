import { SERVER_ENDPOINTS } from '@/config/api';
import { getBackendAPI } from '@/services/api';
import { setAuthCookies } from '@/services/cookies';
import { Credentials } from '@/types/entities';

export async function POST(request: Request) {
  const backendAPI = getBackendAPI();
  try {
    const params = await request.json();
    const response = (await backendAPI.post(
      SERVER_ENDPOINTS.CONNECT,
      params,
    )) as {
      success: boolean;
      data?: Credentials;
      message: string;
      statusCode?: number;
    };

    if (response.success && response.data) {
      setAuthCookies(response.data);
      return Response.json(
        { data: response.data, message: 'Connect wallet successfully' },
        {
          status: 200,
        },
      );
    } else {
      return Response.json(
        { error: response.message },
        { status: response.statusCode },
      );
    }
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
