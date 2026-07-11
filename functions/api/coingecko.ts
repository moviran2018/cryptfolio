export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetPath = url.searchParams.get("path") || "";
  const search = url.search.replace(/[?&]path=[^&]*/, "");

  const targetUrl = `https://api.coingecko.com/api/v3${targetPath}${search ? "?" + search.replace(/^&/, "") : ""}`;

  const response = await fetch(targetUrl, {
    headers: { Accept: "application/json" },
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
      "cache-control": "public, max-age=30",
    },
  });
}
