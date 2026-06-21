export async function onRequest(context) {
  const path = context.params.path;
  const reqUrl = new URL(context.request.url);
  const filePath = Array.isArray(path) ? path.join('/') : path;
  const qiniuUrl = `http://tgxdilfkh.hd-bkt.clouddn.com/${filePath}${reqUrl.search}`;

  const rangeHeader = context.request.headers.get('Range');
  const fetchOptions = rangeHeader ? { headers: { Range: rangeHeader } } : {};

  const response = await fetch(qiniuUrl, fetchOptions);

  const headers = new Headers(response.headers);
  headers.set('Content-Disposition', 'inline');
  headers.set('Cache-Control', 'public, max-age=2592000');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Accept-Ranges', 'bytes');

  const ext = filePath.split('.').pop().toLowerCase();
  const mimeMap = {
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  };
  if (mimeMap[ext]) headers.set('Content-Type', mimeMap[ext]);

  return new Response(response.body, { status: response.status, headers });
}
