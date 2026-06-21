export async function onRequest(context) {
  const path = context.params.path;
  const reqUrl = new URL(context.request.url);
  const qiniuUrl = `http://tgxdilfkh.hd-bkt.clouddn.com/${Array.isArray(path) ? path.join('/') : path}${reqUrl.search}`;

  const rangeHeader = context.request.headers.get('Range');
  const fetchOptions = rangeHeader ? { headers: { Range: rangeHeader } } : {};

  const response = await fetch(qiniuUrl, fetchOptions);

  const headers = new Headers(response.headers);
  headers.set('Content-Disposition', 'inline');
  headers.set('Cache-Control', 'public, max-age=2592000');
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(response.body, {
    status: response.status,
    headers
  });
}
