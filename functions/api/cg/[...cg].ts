export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetPath = url.pathname.replace("/api/cg", "");
  const targetUrl = `https://api.coingecko.com/api/v3${targetPath}${url.search}`;

  const response = await fetch(targetUrl, {
    headers: { Accept: "application/json" },
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
      "access-control-allow-origin": "*",
      "cache-control": "public, max-age=30",
    },
  });
}
