export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace('/media/', '');
  const qiniuUrl = `http://tgxdilfkh.hd-bkt.clouddn.com/${path}`;

  const response = await fetch(qiniuUrl, {
    headers: { 'Range': context.request.headers.get('Range') || '' }
  });

  const headers = new Headers(response.headers);
  headers.set('Content-Disposition', 'inline');
  headers.set('Cache-Control', 'public, max-age=2592000');
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(response.body, {
    status: response.status,
    headers
  });
}
