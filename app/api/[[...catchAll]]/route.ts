import {
  handleRouteAuthentication,
  parseRequestParams,
  translateApiMessages,
} from '@/actions';
import { getBackendAPI } from '@/services/api';

export async function GET(request: Request) {
  const backendAPI = getBackendAPI();
  await handleRouteAuthentication(request, backendAPI);
  const { url, pathname } = await parseRequestParams(request);

  try {
    const data = await backendAPI.get(url);
    return Response.json(
      {
        data: data.data,
        message: await translateApiMessages(pathname, 'success'),
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    console.log(url, e?.data);

    return Response.json(
      {
        ...(e?.data || {}),
        error: e?.data?.message,
        message: await translateApiMessages(pathname, 'error'),
        status: e?.status,
      },
      { status: e?.status },
    );
  }
}

export async function POST(request: Request) {
  const backendAPI = getBackendAPI();
  await handleRouteAuthentication(request, backendAPI);
  const { url, params, pathname } = await parseRequestParams(request);

  try {
    const data = await backendAPI.post(url, params);

    return Response.json(
      {
        data: data.data,
        message: await translateApiMessages(pathname, 'success'),
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    console.log(url, e?.data);

    return Response.json(
      {
        ...(e?.data || {}),
        error: e?.data?.message,
        message: await translateApiMessages(pathname, 'error'),
        status: e?.status,
      },
      { status: e?.status },
    );
  }
}

export async function PUT(request: Request) {
  const backendAPI = getBackendAPI();
  await handleRouteAuthentication(request, backendAPI);
  const { url, params, pathname } = await parseRequestParams(request);

  try {
    const data = await backendAPI.put(url, params);
    return Response.json(
      { data: data, message: await translateApiMessages(pathname, 'success') },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    console.error(url, e?.data);

    return Response.json(
      {
        ...(e?.data || {}),
        error: e?.data?.message,
        message: await translateApiMessages(pathname, 'error'),
        status: e?.status,
      },
      { status: e?.status },
    );
  }
}
