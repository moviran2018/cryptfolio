const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace("/api/coingecko", "");
  const target = `${COINGECKO_BASE}${path}${url.search}`;

  const response = await fetch(target, {
    headers: {
      "Accept": "application/json",
    },
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
