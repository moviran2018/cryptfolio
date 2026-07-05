const COINGECKO = "https://api.coingecko.com/api/v3";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.searchParams.get("path");
  if (!path) return new Response("Missing path", { status: 400 });

  url.searchParams.delete("path");
  const target = `${COINGECKO}/${path}${url.search}`;

  const res = await fetch(target, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "User-Agent": "CryptFolio/1.0 cloudflare-pages",
    },
  });
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=30",
    },
  });
}
