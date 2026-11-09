/* =========================================================
   MKM CMS OAuth Worker (Cloudflare Workers — free tier)
   ---------------------------------------------------------
   Decap CMS (/admin) ko GitHub login dene ke liye chhota sa
   OAuth provider. Ye file Cloudflare Worker me paste karni hai.

   Worker ke Settings → Variables me 3 env variables banayein:
     GH_CLIENT_ID      = GitHub OAuth App ka Client ID
     GH_CLIENT_SECRET  = GitHub OAuth App ka Client Secret
     CMS_URL           = https://onepiecemanga.mkm.fan/admin/

   GitHub OAuth App banate waqt:
     Homepage URL            : https://onepiecemanga.mkm.fan/
     Authorization callback  : https://WORKER-URL/callback
   ========================================================= */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    /* 1) CMS user ko GitHub login pe bhejo */
    if (url.pathname === "/auth") {
      const state = url.searchParams.get("state") || crypto.randomUUID();
      const g = new URL("https://github.com/login/oauth/authorize");
      g.searchParams.set("client_id", env.GH_CLIENT_ID);
      g.searchParams.set("redirect_uri", url.origin + "/callback");
      g.searchParams.set("scope", "repo");
      g.searchParams.set("state", state);
      return Response.redirect(g.toString(), 302);
    }

    /* 2) GitHub se token lo aur CMS ko wapas bhejo */
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state") || "";
      if (!code) return new Response("code missing", { status: 400 });
      const r = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: env.GH_CLIENT_ID,
          client_secret: env.GH_CLIENT_SECRET,
          code,
        }),
      });
      const j = await r.json();
      if (!j.access_token) return new Response("token failed: " + JSON.stringify(j), { status: 400 });
      const cms = (env.CMS_URL || "").replace(/\/?$/, "/");
      return Response.redirect(cms + "#access_token=" + j.access_token +
        "&token_type=bearer&state=" + encodeURIComponent(state), 302);
    }

    return new Response("MKM CMS OAuth worker — /auth aur /callback active hain.", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
};
