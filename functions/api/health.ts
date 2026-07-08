export async function onRequestGet() {
  return new Response(JSON.stringify({ status: "ok", message: "Cloudflare Pages Functions are working perfectly!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  });
}
