import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const cors = {
  "Access-Control-Allow-Origin": Deno.env.get("SITE_URL") ?? "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("WAITLIST_FROM_EMAIL");
  const siteUrl = Deno.env.get("SITE_URL") ?? "https://zimflix.vercel.app";
  if (!apiKey || !from) return new Response(JSON.stringify({ error: "Email provider is not configured" }), { status: 503, headers: { ...cors, "Content-Type": "application/json" } });

  const expected = Deno.env.get("WAITLIST_WEBHOOK_SECRET");
  if (expected && req.headers.get("Authorization") !== `Bearer ${expected}`) return new Response("Unauthorized", { status: 401, headers: cors });

  let payload: any;
  try { payload = await req.json(); } catch { return new Response("Invalid JSON", { status: 400, headers: cors }); }
  const row = payload?.record ?? payload;
  const email = typeof row?.email === "string" ? row.email.trim().toLowerCase() : "";
  const name = typeof row?.name === "string" && row.name.trim() ? row.name.trim() : "there";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return new Response("Invalid email", { status: 400, headers: cors });

  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to: [email], subject: "You’re on the Zimflix waitlist 🇿🇼",
      html: `<div style="max-width:560px;margin:36px auto;background:#fff;border-radius:20px;overflow:hidden;font-family:Arial;color:#102015"><div style="padding:32px;background:#042c19;color:#fff;font-size:25px;font-weight:800">ZIM<span style="color:#75f044">FLIX</span><div style="height:4px;margin-top:24px;background:linear-gradient(90deg,#d71920 0 20%,#ffd21f 20% 40%,#319208 40% 60%,#fff 60% 80%,#000 80%)"></div></div><div style="padding:34px"><p style="color:#07843e;letter-spacing:2px;font-size:11px">YOU’RE ON THE LIST</p><h1>Welcome, ${escapeHtml(name)}.</h1><p style="line-height:1.7;color:#59665b">Thanks for joining the Zimflix waitlist. You’re now on the list to hear about launch news, early previews and what we’re building next.</p><p style="line-height:1.7;color:#59665b">We’re creating a new digital home for Zimbabwean entertainment, music, learning and creativity. We’re glad you’ll be part of the beginning.</p><a href="${siteUrl}" style="display:inline-block;padding:14px 20px;background:#75f044;color:#052514;text-decoration:none;border-radius:99px;font-weight:bold">Explore Zimflix</a><p style="color:#82978a;font-size:12px;margin-top:30px">Made with pride in Zimbabwe. 🇿🇼</p></div></div>`,
      text: `Welcome, ${name}. You’re on the Zimflix waitlist. We’ll email you launch news and previews. ${siteUrl}`,
    }),
  });
  const result = await response.json();
  if (!response.ok) return new Response(JSON.stringify({ error: result?.message ?? "Email send failed" }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ ok: true, id: result.id }), { headers: { ...cors, "Content-Type": "application/json" } });
});
