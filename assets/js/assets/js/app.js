/* =========================================================
   MKM Manga Pro — static port: content rendering
   Theme ki asli CSS (mkm.css) + asli main.js reuse hota hai.
   Ye file sirf data.js ka content pages me render karti hai.
   ========================================================= */
(function () {
  "use strict";
  var S = null;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var uri = function (svg) { return "data:image/svg+xml;utf8," + encodeURIComponent(svg.replace(/\s{2,}/g, " ")); };

  /* ---------- placeholders (asli images aane tak) ---------- */
  function coverSvg(t) {
    var a = (t.art && t.art.a) || "#9053ff", b = (t.art && t.art.b) || "#1a0b2e";
    var label = (t.art && t.art.label) || t.title.slice(0, 2).toUpperCase();
    return uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs>' +
      '<rect width="400" height="600" fill="url(#g)"/>' +
      '<g fill="#fff" opacity=".1"><circle cx="70" cy="100" r="130"/><circle cx="350" cy="520" r="160"/></g>' +
      '<g stroke="#fff" stroke-opacity=".14" stroke-width="2"><path d="M0 470 L400 370"/><path d="M0 505 L400 405"/></g>' +
      '<text x="200" y="295" text-anchor="middle" font-family="system-ui,sans-serif" font-size="120" font-weight="800" fill="#fff" fill-opacity=".92">' + esc(label) + '</text>' +
      '<text x="200" y="352" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#fff" fill-opacity=".7">' + esc(t.title) + '</text></svg>');
  }
  function cover(t) { return t.cover || coverSvg(t); }
  function pagePh(t, num, i, total) {
    var a = (t.art && t.art.a) || "#9053ff";
    return uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">' +
      '<rect width="800" height="1200" fill="#f2efe7"/>' +
      '<rect x="36" y="36" width="728" height="1128" fill="none" stroke="#191919" stroke-width="3"/>' +
      '<g fill="none" stroke="#191919" stroke-width="3"><rect x="66" y="66" width="324" height="306"/><rect x="410" y="66" width="324" height="306"/>' +
      '<rect x="66" y="392" width="668" height="330"/><rect x="66" y="742" width="324" height="392"/><rect x="410" y="742" width="324" height="392"/></g>' +
      '<g fill="' + a + '" fill-opacity=".13"><rect x="66" y="66" width="324" height="306"/><rect x="66" y="742" width="324" height="392"/></g>' +
      '<text x="400" y="585" text-anchor="middle" font-family="system-ui,sans-serif" font-size="44" font-weight="800" fill="#191919">' + esc(t.title) + '</text>' +
      '<text x="400" y="640" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" fill="#555">Chapter ' + num + ' — page ' + i + ' / ' + total + '</text>' +
      '<g><ellipse cx="560" cy="190" rx="160" ry="70" fill="#fff" stroke="#191919" stroke-width="3"/>' +
      '<text x="560" y="182" text-anchor="middle" font-family="system-ui,sans-serif" font-size="24" fill="#191919">' + esc((t.voices && t.voices[(i - 1) % t.voices.length]) || "") + '</text>' +
      '<text x="560" y="216" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" fill="#777">' + esc(t.title) + '</text></g>' +
      '<text x="400" y="688" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#888">asli image: assets/manga/' + esc(t.id) + '/ch-' + pad(num) + '/' + pad(i) + '.jpg</text></svg>');
  }
  /* asli pages aane tak: cover art se B&W manga page (inline SVG panels + bubble) */
  function pageInline(t, c, i, total) {
    var cv = cover(t);
    var crops = [[0,0,600,450],[0,450,600,450],[0,150,600,600],[150,0,450,675],[0,0,450,675],[150,225,450,675]];
    var lay = (i % 2) ? [[40,90,720,430],[40,540,350,330],[410,540,350,330],[40,890,720,250]]
                      : [[40,90,350,500],[410,90,350,500],[40,610,720,300],[40,930,720,210]];
    var panels = lay.map(function (r, k) {
      var cr = crops[(i + k) % crops.length];
      var filt = (i === 1 && k === 0) ? "" : ' style="filter:grayscale(1) contrast(1.08)"';
      return '<svg x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" viewBox="' + cr.join(" ") + '" preserveAspectRatio="xMidYMid slice">' +
        '<image href="' + cv + '" width="600" height="900"' + filt + '/></svg>' +
        '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" fill="none" stroke="#111" stroke-width="4"/>';
    }).join("");
    var v = (t.voices && t.voices[(i - 1) % t.voices.length]) || "";
    var half = Math.ceil(v.length / 2);
    var l1 = v.slice(0, half), l2 = v.slice(half);
    var bubble = '<g><ellipse cx="545" cy="255" rx="195" ry="95" fill="#fff" stroke="#111" stroke-width="4"/>' +
      '<path d="M505 335 L485 390 L548 340 Z" fill="#fff" stroke="#111" stroke-width="4"/>' +
      '<text x="545" y="' + (l2 ? 245 : 265) + '" text-anchor="middle" font-family="system-ui,sans-serif" font-size="30" font-weight="700" fill="#111">' + esc(l1) + '</text>' +
      (l2 ? '<text x="545" y="288" text-anchor="middle" font-family="system-ui,sans-serif" font-size="30" font-weight="700" fill="#111">' + esc(l2) + '</text>' : "") +
      "</g>";
    return '<svg class="mkm-page" viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(t.title) + ' page ' + i + '">' +
      '<rect width="800" height="1200" fill="#fdfdf8"/>' +
      '<text x="40" y="58" font-family="system-ui,sans-serif" font-size="30" font-weight="800" fill="#111">' + esc(t.title) + " — 第" + esc(c.num) + "話 " + esc(c.title) + "</text>" +
      panels + bubble +
      '<text x="760" y="1170" text-anchor="end" font-family="system-ui,sans-serif" font-size="22" fill="#666">' + i + " / " + total + "</text>" +
      "</svg>";
  }
  function imgTag(p, lazy) {
    if (p.inline) return p.inline;
    return '<img src="' + p.real + '" alt="Page ' + p.i + '" ' + (lazy ? 'loading="lazy" ' : "") +
      'onerror="this.onerror=null;this.src=\'' + p.ph + '\'">';
  }
  function pad(n) { return String(n).padStart(3, "0"); }
  /* chapter pages: `images: [urls]` ho to wo, warna `dir` + 001.jpg … */
  function pageList(t, c) {
    var out = [];
    if (c.images && c.images.length) {
      c.images.forEach(function (u, i) {
        out.push({ real: u, ph: pagePh(t, c.num, i + 1, c.images.length), i: i + 1, inline: null });
      });
    } else if (c.dir) {
      var n = c.pages || 0;
      for (var i = 1; i <= n; i++) out.push({ real: c.dir + pad(i) + ".jpg", ph: pagePh(t, c.num, i, n), i: i, inline: null });
    } else {
      var m = c.pages || 0;
      for (var j = 1; j <= m; j++) out.push({ real: null, ph: pagePh(t, c.num, j, m), i: j, inline: pageInline(t, c, j, m) });
    }
    return out;
  }
  function bg(t) {
    var a = (t.art && t.art.a) || "#9053ff";
    return uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 700">' +
      '<rect width="1600" height="700" fill="#0a0a12"/>' +
      '<circle cx="1180" cy="330" r="420" fill="' + a + '" opacity=".28"/>' +
      '<circle cx="1420" cy="180" r="220" fill="#12d4e7" opacity=".18"/>' +
      '<circle cx="900" cy="560" r="180" fill="#fff" opacity=".05"/></svg>');
  }

  /* ---------- data helpers ---------- */
  function find(id) { return S.titles.filter(function (t) { return t.id === id; })[0]; }
  function chs(t) { return (t.chapters || []).slice().sort(function (a, b) { return b.num - a.num; }); }
  function chOf(t, num) { return chs(t).filter(function (c) { return c.num === Number(num); })[0] || chs(t)[0]; }
  function latestCh(t) { return chs(t)[0]; }
  function firstCh(t) { return chs(t).slice(-1)[0]; }
  function views(n) { return n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? Math.round(n / 1e3) + "K" : String(n || 0); }
  function date(s) { var d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  function genres() {
    var set = {};
    S.titles.forEach(function (t) { (t.genres || []).forEach(function (g) { set[g] = 1; }); });
    return Object.keys(set).sort();
  }
  function allChapters() {
    var out = [];
    S.titles.forEach(function (t) { chs(t).forEach(function (c) { out.push({ t: t, c: c }); }); });
    return out.sort(function (a, b) { return b.c.date.localeCompare(a.c.date); });
  }
  function history() { try { return JSON.parse(localStorage.getItem("mkm-read")) || []; } catch (e) { return []; } }
  function remember(id, ch) {
    var h = history().filter(function (x) { return x.id !== id; });
    h.unshift({ id: id, ch: ch, at: Date.now() });
    try { localStorage.setItem("mkm-read", JSON.stringify(h.slice(0, 20))); } catch (e) {}
  }
  function resume(id) { return history().filter(function (x) { return x.id === id; })[0]; }

  /* ---------- ADS (assets/ads.json = control panel) ---------- */
  var ADS = null;
  function loadContent() {
    return fetch("assets/content.json")
      .then(function (r) { if (!r.ok) throw new Error("content.json"); return r.json(); })
      .then(function (j) { S = j; window.SITE = j; });
  }
  function loadStyle() {
    var map = { accent: "--mkm-accent", accent2: "--mkm-accent-2", bg: "--mkm-bg", surface: "--mkm-surface",
      surface2: "--mkm-surface-2", border: "--mkm-border", radius: "--mkm-radius", container: "--mkm-container", font: "--mkm-font" };
    return fetch("assets/style.json").then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      if (!j) return;
      Object.keys(map).forEach(function (k) { if (j[k]) document.documentElement.style.setProperty(map[k], j[k]); });
    }).catch(function () {});
  }
  function loadAds() {
    return fetch("assets/ads.json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { ADS = j; })
      .catch(function () { ADS = null; });
  }
  function adHTML(slot) {
    if (!ADS || !ADS.enabled) return "";
    var s = ADS.slots && ADS.slots[slot];
    if (!s || !s.on || !s.code) return "";
    return '<div class="mkm-ad mkm-ad-' + slot + '"><span class="mkm-ad-label">Advertisement</span>' + s.code + "</div>";
  }
  function paintAds() {
    $$("[data-ad]").forEach(function (el) {
      var html = adHTML(el.getAttribute("data-ad"));
      if (html) { el.outerHTML = html; } else { el.remove(); }
    });
  }

  /* ---------- SEO: title, meta, canonical, OG, JSON-LD ---------- */
  var DOMAIN = "https://onepiecemanga.mkm.fan";
  function meta(name, content, prop) {
    var el = document.querySelector('meta[' + (prop ? 'property' : 'name') + '="' + name + '"]');
    if (!el) { el = document.createElement("meta"); prop ? el.setAttribute("property", name) : el.setAttribute("name", name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  }
  function baseKw() {
    return "onepiecemanga, onepiecemanga.mkm.fan, manga online, read manga free, manga japani online, 漫画 無料, 日本語マンガ, マンガ 無料連載, new manga chapters daily, original japanese manga";
  }
  function seo(title, desc, kw, path, ogType, ogImage, ld) {
    document.title = title;
    meta("description", desc);
    meta("keywords", kw);
    meta("og:title", title, 1); meta("og:description", desc, 1);
    meta("og:type", ogType || "website", 1); meta("og:url", DOMAIN + path, 1);
    meta("og:site_name", S.name, 1); meta("og:locale", "ja_JP", 1);
    if (ogImage) meta("og:image", DOMAIN + "/" + ogImage, 1);
    meta("twitter:card", "summary_large_image"); meta("twitter:title", title); meta("twitter:description", desc);
    var cl = document.querySelector('link[rel="canonical"]');
    if (!cl) { cl = document.createElement("link"); cl.rel = "canonical"; document.head.appendChild(cl); }
    cl.href = DOMAIN + path;
    var old = document.getElementById("mkm-ld"); if (old) old.remove();
    if (ld) { var sc = document.createElement("script"); sc.type = "application/ld+json"; sc.id = "mkm-ld"; sc.textContent = JSON.stringify(ld); document.head.appendChild(sc); }
  }
  function crumbs(t, c) {
    var items = [{ name: "Home", url: DOMAIN + "/" }, { name: "Manga", url: DOMAIN + "/search.html" }];
    if (t) items.push({ name: t.title, url: DOMAIN + "/manga.html?id=" + t.id });
    if (t && c) items.push({ name: "Chapter " + c.num, url: DOMAIN + "/read.html?id=" + t.id + "&ch=" + c.num });
    return { "@type": "BreadcrumbList", "itemListElement": items.map(function (x, i) {
      return { "@type": "ListItem", position: i + 1, name: x.name, item: x.url }; }) };
  }

  /* ---------- shared chrome ---------- */
  function chrome() {
    $$("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
    $$(".mkm-footer-about").forEach(function (n) { n.textContent = S.tagline; });
    var soc = $(".mkm-social");
    if (soc) soc.innerHTML = S.social.map(function (s) {
      return '<a href="' + esc(s.url) + '" rel="noopener">' + esc(s.label) + "</a>";
    }).join("");
  }

  /* ---------- shared sidebar (genres + latest updates) ---------- */
  function sidebar() {
    var el = $(".mkm-sidebar");
    if (!el) return;
    el.innerHTML =
      '<div class="mkm-widget"><h3 class="mkm-widget-title">Genres</h3><div class="mkm-genre-list">' +
      genres().map(function (g) { return '<a href="search.html?s=' + encodeURIComponent(g) + '">' + esc(g) + "</a>"; }).join("") +
      '</div></div>' +
      '<div class="mkm-widget"><h3 class="mkm-widget-title">Latest Updates</h3><ul class="mkm-latest-list">' +
      allChapters().slice(0, 6).map(function (x) {
        return '<li><img src="' + cover(x.t) + '" onerror="this.onerror=null;this.src=\'' + coverSvg(x.t) + '\'" alt="" loading="lazy" width="44" height="58">' +
          '<div><p class="t"><a href="manga.html?id=' + esc(x.t.id) + '">' + esc(x.t.title) + "</a></p>" +
          '<span class="c">Ch. ' + esc(x.c.num) + " · " + esc(date(x.c.date)) + "</span></div></li>";
      }).join("") + "</ul></div>" +
      '<div data-ad="sidebar"></div>';
  }

  /* ---------- card (template-parts/card.php jaisa) ---------- */
  function card(t) {
    var g = (t.genres || []).slice(0, 3);
    var lc = latestCh(t);
    return '<article class="mkm-card"><a href="manga.html?id=' + esc(t.id) + '" aria-label="' + esc(t.title) + '">' +
      '<div class="mkm-card-cover"><img src="' + cover(t) + '" onerror="this.onerror=null;this.src=\'' + coverSvg(t) + '\'" alt="' + esc(t.title) + ' cover" loading="lazy" width="300" height="400">' +
      (lc ? '<span class="mkm-card-chapter">Ch. ' + esc(lc.num) + "</span>" : "") + "</div></a>" +
      '<div class="mkm-card-body"><h3 class="mkm-card-title"><a href="manga.html?id=' + esc(t.id) + '">' + esc(t.title) + "</a></h3>" +
      '<div class="mkm-card-genres">' + g.map(function (x) { return '<a class="mkm-genre" href="search.html?s=' + encodeURIComponent(x) + '">' + esc(x) + "</a>"; }).join("") + "</div>" +
      '<div class="mkm-card-meta"><span>' + esc(t.status || "Ongoing") + '</span><a class="mkm-card-link" href="read.html?id=' + esc(t.id) + "&ch=" + (lc ? lc.num : 1) + '">Read →</a></div></div></article>';
  }
  /* related posts: shared genre */
  function related(t) {
    var rel = S.titles.filter(function (x) {
      return x.id !== t.id && (x.genres || []).some(function (g) { return (t.genres || []).indexOf(g) > -1; });
    }).slice(0, 4);
    if (!rel.length) return "";
    return '<div class="mkm-section" style="margin-top:26px"><div class="mkm-section-head">' +
      '<div><h2 class="mkm-title">Related Manga / 関連作品</h2><p class="mkm-subtitle">Because you read ' + esc(t.title) + '</p></div></div>' +
      '<div class="mkm-grid">' + rel.map(card).join("") + "</div></div>";
  }

  /* ================= HOME ================= */
  function home() {
    var slider = $("#hero-slider");
    if (slider) {
      slider.innerHTML = S.slides.map(function (s, i) {
        var t = find(s.titleId) || S.titles[0];
        return '<section class="mkm-hero mkm-hero-slide' + (i ? "" : "") + '" style="--mkm-hero-bg:url(&quot;' + bg(t) + '&quot;)">' +
          '<div class="mkm-container mkm-hero-inner">' +
          '<div class="mkm-hero-cover"><img src="' + cover(t) + '" onerror="this.onerror=null;this.src=\'' + coverSvg(t) + '\'" alt="' + esc(t.title) + ' cover"' + (i ? ' loading="lazy"' : "") + '></div>' +
          '<div class="mkm-hero-content">' +
          (s.badge ? '<span class="mkm-badge">' + esc(s.badge) + "</span>" : "") +
          "<h1>" + esc(s.title) + "</h1><p>" + esc(s.text) + "</p>" +
          '<div class="mkm-hero-actions">' +
          (s.btn1 ? '<a class="mkm-btn" href="' + esc(s.btn1.href) + '">' + esc(s.btn1.label) + "</a>" : "") +
          (s.btn2 ? '<a class="mkm-btn mkm-btn-ghost" href="' + esc(s.btn2.href) + '">' + esc(s.btn2.label) + "</a>" : "") +
          "</div>" +
          (s.stats ? '<div class="mkm-stats">' + s.stats.map(function (x) {
            return '<div class="mkm-stat"><span class="mkm-stat-num">' + esc(x.num) + '</span><span class="mkm-stat-label">' + esc(x.label) + "</span></div>";
          }).join("") + "</div>" : "") +
          "</div></div></section>";
      }).join("") +
      (S.slides.length > 1 ? '<div class="mkm-slider-controls" hidden><button type="button" class="mkm-slider-prev" aria-label="Previous slide">&#8592;</button><button type="button" class="mkm-slider-next" aria-label="Next slide">&#8594;</button></div>' : "");
      $$(".mkm-hero-slide", slider).forEach(function (sl, i) { sl.hidden = i !== 0; });
    }

    var f = S.feature, ft = find(f.mangaId), fc = ft ? chOf(ft, f.chapterNum) : null;
    var feat = $("#feature");
    if (feat && ft) {
      feat.innerHTML = '<div class="mkm-container"><div class="mkm-layout mkm-feature-layout">' +
        '<article class="mkm-feature-card"><h2>About ' + esc(ft.title) + '</h2>' +
        '<div class="mkm-entry-content"><p>' + esc(ft.description) + "</p></div>" +
        '<div class="mkm-feature-genres">' + ft.genres.map(function (g) { return '<a class="mkm-genre" href="search.html?s=' + encodeURIComponent(g) + '">' + esc(g) + "</a>"; }).join("") + "</div>" +
        '<dl class="mkm-feature-meta">' +
        ["Status:" + ft.status, "Type:" + ft.type, "Author:" + ft.author, "Artist:" + ft.artist].map(function (kv) {
          var p = kv.split(":");
          return "<div><dt>" + esc(p[0]) + "</dt><dd>" + esc(p.slice(1).join(":")) + "</dd></div>";
        }).join("") + "</dl></article>" +
        '<div class="mkm-sidebar"></div></div></div>';
    }

    var grid = $("#latest-grid");
    if (grid) {
      grid.innerHTML = allChapters().map(function (x) { return x.t; })
        .filter(function (t, i, arr) { return arr.indexOf(t) === i; })
        .slice(0, 8).map(card).join("");
    }

    var hr = $("#home-reader");
    if (hr && ft && fc) {
      var plist = pageList(ft, fc);
      var n = Math.min(f.previewPages || 3, plist.length);
      var imgs = plist.slice(0, n).map(function (p, k) { return imgTag(p, k > 1); });
      hr.innerHTML = '<section class="mkm-container mkm-home-reader" id="reader" aria-label="Chapter reader">' +
        '<div class="mkm-home-reader-title"><span>Now reading</span><h2>Chapter ' + esc(fc.num) + ": " + esc(fc.title) + "</h2><p>" + esc(ft.title) + "</p></div>" +
        '<div class="mkm-reader-images">' + imgs.join("") + "</div>" +
        '<p class="mkm-home-reader-link"><a href="read.html?id=' + esc(ft.id) + "&ch=" + esc(fc.num) + '">Open chapter →</a></p></section>';
    }
    sidebar();
    paintAds();
    seo(S.name + " — 日本語マンガ無料連載 | Read Free Japanese Manga Online",
      S.tagline + " " + S.about.slice(0, 140),
      baseKw() + ", " + genres().join(", "),
      "/", "website", null,
      { "@context": "https://schema.org", "@graph": [
        { "@type": "WebSite", name: S.name, url: DOMAIN + "/", inLanguage: ["ja", "en"],
          potentialAction: { "@type": "SearchAction", target: DOMAIN + "/search.html?s={query}", "query-input": "required name=query" } },
        { "@type": "ItemList", numberOfItems: S.titles.length,
          itemListElement: S.titles.slice(0, 20).map(function (t, i) {
            return { "@type": "ListItem", position: i + 1, url: DOMAIN + "/manga.html?id=" + t.id, name: t.title }; }) }
      ] });
  }
  function manga(id) {
    var t = find(id);
    var box = $("#detail");
    if (!box) return;
    if (!t) { box.innerHTML = '<div class="mkm-container mkm-page"><p class="mkm-empty">Manga nahi mila. <a href="index.html">Home</a></p></div>'; return; }
    document.title = t.title + " — " + S.name;
    seo(t.title + " (" + (t.alt || "") + ") — 全話無料連載 | " + S.name,
      t.description.slice(0, 155),
      t.title + ", " + (t.alt || "") + ", " + t.genres.join(", ") + ", " + t.author + ", manga online free, 漫画 無料, " + baseKw(),
      "/manga.html?id=" + t.id, "book", t.cover,
      { "@context": "https://schema.org", "@graph": [
        { "@type": "ComicSeries", name: t.title, alternateName: t.alt || "", url: DOMAIN + "/manga.html?id=" + t.id,
          inLanguage: "ja", image: DOMAIN + "/" + (t.cover || ""), author: { "@type": "Person", name: t.author },
          illustrator: { "@type": "Person", name: t.artist }, genre: (t.genres || []).join(", "),
          aggregateRating: { "@type": "AggregateRating", ratingValue: t.rating, ratingCount: t.views },
          numberOfPages: (t.chapters || []).length },
        crumbs(t, null)
      ] });
    var r = resume(t.id);
    var lc = latestCh(t), fc = firstCh(t);
    box.innerHTML = '<div class="mkm-container mkm-page">' +
      '<nav class="mkm-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a> <span>/</span> <a href="search.html?s=">Manga</a> <span>/</span> <span>' + esc(t.title) + "</span></nav>" +
      '<div class="mkm-layout"><div>' +
      '<div class="mkm-single">' +
      '<div class="mkm-cover"><img src="' + cover(t) + '" onerror="this.onerror=null;this.src=\'' + coverSvg(t) + '\'" alt="' + esc(t.title) + ' cover" width="280" height="420"></div>' +
      '<div class="mkm-info"><h1>' + esc(t.title) + '</h1><p class="alt">' + esc(t.alt || "") + "</p>" +
      '<div class="mkm-meta">' +
      '<span class="mkm-meta-item"><b>Status:</b> ' + esc(t.status) + "</span>" +
      '<span class="mkm-meta-item"><b>Type:</b> ' + esc(t.type) + "</span>" +
      '<span class="mkm-meta-item"><b>Author:</b> ' + esc(t.author) + "</span>" +
      '<span class="mkm-meta-item"><b>Artist:</b> ' + esc(t.artist) + "</span>" +
      '<span class="mkm-meta-item"><b>Year:</b> ' + esc(t.year) + "</span>" +
      '<span class="mkm-meta-item"><b>Rating:</b> ★ ' + esc(t.rating) + "</span>" +
      '<span class="mkm-meta-item"><b>Views:</b> ' + views(t.views) + "</span></div>" +
      '<div class="mkm-card-genres">' + t.genres.map(function (g) { return '<a class="mkm-genre" href="search.html?s=' + encodeURIComponent(g) + '">' + esc(g) + "</a>"; }).join("") + "</div>" +
      '<div class="mkm-hero-actions" style="margin-top:16px">' +
      (r ? '<a class="mkm-btn" href="read.html?id=' + esc(t.id) + "&ch=" + esc(r.ch) + '">Continue Ch. ' + esc(r.ch) + "</a>" : "") +
      '<a class="mkm-btn' + (r ? " mkm-btn-ghost" : "") + '" href="read.html?id=' + esc(t.id) + "&ch=" + (fc ? fc.num : 1) + '">Read first chapter</a>' +
      '<a class="mkm-btn mkm-btn-ghost" href="read.html?id=' + esc(t.id) + "&ch=" + (lc ? lc.num : 1) + '">Latest Ch. ' + (lc ? esc(lc.num) : "") + "</a></div>" +
      '<div class="mkm-description"><h3>Synopsis</h3><p>' + esc(t.description) + "</p></div>" +
      "</div></div>" +
      '<div class="mkm-chapter-list" style="margin-top:20px"><div class="mkm-chapter-list-head"><h3>Chapters</h3><span>' + chs(t).length + " chapters</span></div><ul>" +
      chs(t).map(function (c) {
        return '<li' + (r && r.ch === c.num ? ' class="is-current"' : "") + '><a href="read.html?id=' + esc(t.id) + "&ch=" + esc(c.num) + '"><span class="num">Ch. ' + esc(c.num) + '</span><span>' + esc(c.title) + '</span><span class="date">' + esc(date(c.date)) + ' · ' + esc(c.pages || (c.images || []).length) + "p</span></a></li>";
      }).join("") + "</ul></div>" +
      related(t) +
      "</div><div class=\"mkm-sidebar\"></div></div></div>";
    sidebar();
    paintAds();
  }

  /* ================= READER ================= */
  function reader(id, num) {
    var t = find(id);
    var stage = $("#reader-stage");
    if (!stage) return;
    if (!t) { stage.innerHTML = '<p class="mkm-empty">Manga nahi mila.</p>'; return; }
    var list = chs(t), c = chOf(t, num), idx = list.indexOf(c);
    document.title = t.title + " Ch. " + c.num + " — " + S.name;
    seo(t.title + " 第" + c.num + "話 「" + c.title + "」 を読む | " + S.name,
      t.title + " 第" + c.num + "話 " + c.title + " — read online free at onepiecemanga.mkm.fan. " + t.description.slice(0, 90),
      t.title + " 第" + c.num + "話, " + t.title + " read online, manga chapter japanese, " + baseKw(),
      "/read.html?id=" + t.id + "&ch=" + c.num, "article", t.cover,
      { "@context": "https://schema.org", "@graph": [
        { "@type": "WebPage", name: t.title + " Chapter " + c.num, inLanguage: "ja", isPartOf: { "@type": "ComicSeries", name: t.title, url: DOMAIN + "/manga.html?id=" + t.id } },
        crumbs(t, c)
      ] });
    remember(t.id, c.num);

    $("#r-title").innerHTML = 'Chapter ' + esc(c.num) + ": " + esc(c.title) +
      ' <span style="color:var(--mkm-muted);font-size:.85rem">· <a href="manga.html?id=' + esc(t.id) + '">' + esc(t.title) + "</a></span>";
    $("#all-ch").href = "manga.html?id=" + encodeURIComponent(t.id);

    var sel = $("#ch-select");
    sel.innerHTML = list.map(function (x) {
      return '<option value="' + esc(x.num) + '"' + (x.num === c.num ? " selected" : "") + ">Chapter " + esc(x.num) + " — " + esc(x.title) + "</option>";
    }).join("");
    sel.onchange = function () { location.href = "read.html?id=" + t.id + "&ch=" + sel.value; };

    var imgsEl = $("#reader-images");
    var mode = localStorage.getItem("mkm-mode") || "strip";
    var width = localStorage.getItem("mkm-width") || "";
    var cur = 0, pages = pageList(t, c);
    function paint() {
      var wrap = $("#reader-wrap");
      wrap.className = "mkm-reader" + (mode === "strip" && width ? " " + width : "");
      imgsEl.classList.toggle("is-paged", mode === "paged");
      if (mode === "strip") {
        var every = (ADS && ADS.enabled && ADS.slots.reader_inline.on) ? (Number(ADS.slots.reader_inline.every) || 5) : 0;
        imgsEl.innerHTML = pages.map(function (p, i) {
          var h = imgTag(p, i > 1);
          if (every && (i + 1) % every === 0 && i + 1 < pages.length) h += adHTML("reader_inline");
          return h;
        }).join("");
      } else {
        imgsEl.innerHTML = imgTag(pages[cur], false);
      }
      $("#p-count").textContent = "Page " + (mode === "paged" ? cur + 1 : 1) + " / " + pages.length;
      $("#mode-btn").textContent = mode === "strip" ? "Switch: paged" : "Switch: long strip";
      $("#pg-prev").hidden = mode !== "paged";
      $("#pg-next").hidden = mode !== "paged";
      $("#width-btn").hidden = mode !== "strip";
      $("#width-btn").textContent = "Width: " + (width || "normal");
      var pb = $("#ch-prev"); pb.disabled = idx >= list.length - 1;
      var nb = $("#ch-next"); nb.disabled = idx <= 0;
    }
    paint();

    $("#mode-btn").onclick = function () {
      mode = mode === "strip" ? "paged" : "strip";
      localStorage.setItem("mkm-mode", mode); cur = 0; paint();
    };
    $("#width-btn").onclick = function () {
      width = width === "" ? "narrow" : width === "narrow" ? "wide" : "";
      localStorage.setItem("mkm-width", width); paint();
    };
    $("#pg-prev").onclick = function () { if (cur > 0) { cur--; paint(); } };
    $("#pg-next").onclick = function () { if (cur < c.pages - 1) { cur++; paint(); } };
    $("#ch-prev").onclick = function () { if (idx < list.length - 1) location.href = "read.html?id=" + t.id + "&ch=" + list[idx + 1].num; };
    $("#ch-next").onclick = function () { if (idx > 0) location.href = "read.html?id=" + t.id + "&ch=" + list[idx - 1].num; };
    document.addEventListener("keydown", function (e) {
      if (mode !== "paged") return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); $("#pg-next").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $("#pg-prev").click(); }
    });

    /* progress bar */
    var bar = $("#prog-bar");
    function prog() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", prog, { passive: true }); prog();

    sidebar();
    paintAds();
  }

  /* ================= SEARCH ================= */
  function search(q) {
    var box = $("#results");
    if (!box) return;
    var term = (q || "").trim().toLowerCase();
    $("#q-label").textContent = term ? 'Search results for “' + q + '”' : "Browse all manga";
    seo((term ? q + " — 検索結果 | " : "Browse All Manga / 作品一覧 | ") + S.name,
      "Search and browse " + S.titles.length + " original Japanese manga series with free online chapters. 全作品一覧・検索。",
      (term ? q + ", " : "") + "manga list, browse manga, manga genres, 作品一覧, " + baseKw(),
      "/search.html" + (term ? "?s=" + encodeURIComponent(q) : ""), "website", null,
      { "@context": "https://schema.org", "@type": "CollectionPage", name: S.name + " browse", inLanguage: "ja" });
    var hits = S.titles.filter(function (t) {
      if (!term) return true;
      return (t.title + " " + (t.alt || "") + " " + t.author + " " + t.genres.join(" ") + " " + t.description).toLowerCase().indexOf(term) > -1;
    });
    box.innerHTML = hits.length
      ? '<div class="mkm-search-results">' + hits.map(function (t) {
          var lc = latestCh(t);
          return '<article class="mkm-search-result"><span class="mkm-search-type">' + esc(t.type) + " · " + esc(t.status) + "</span>" +
            "<h2><a href=\"manga.html?id=" + esc(t.id) + '">' + esc(t.title) + "</a></h2>" +
            '<div class="mkm-card-genres">' + t.genres.map(function (g) { return '<a class="mkm-genre" href="search.html?s=' + encodeURIComponent(g) + '">' + esc(g) + "</a>"; }).join("") + "</div>" +
            '<p class="mkm-search-excerpt">' + esc(t.description.slice(0, 160)) + "…</p>" +
            '<p class="mkm-card-meta"><span>' + (lc ? "Latest: Ch. " + esc(lc.num) + " · " + esc(date(lc.date)) : "") + '</span><a class="mkm-card-link" href="manga.html?id=' + esc(t.id) + '">Open →</a></p></article>';
        }).join("") + "</div>"
      : '<p class="mkm-empty">Koi result nahi mila “' + esc(q) + '” ke liye.</p>';
    sidebar();
    paintAds();
  }

  /* ---------- boot ---------- */
  Promise.all([loadContent(), loadAds(), loadStyle()]).then(function () {
    var css = document.createElement("style");
    css.textContent = ".mkm-reader-images>svg.mkm-page{width:100%;height:auto;margin:0 auto 10px;border-radius:6px;background:#fdfdf8;display:block}" +
      ".mkm-reader-images.is-paged>svg.mkm-page{width:auto;max-width:100%;max-height:80vh}" +
      ".mkm-home-reader .mkm-reader-images>svg.mkm-page{margin:0 auto;border-radius:0}" +
      ".mkm-home-reader .mkm-reader-images>svg.mkm-page:first-child{border-radius:8px 8px 0 0}";
    document.head.appendChild(css);
    chrome();
    var p = document.body.dataset.page;
    var q = new URLSearchParams(location.search);
    if (p === "home") home();
    else if (p === "manga") manga(q.get("id"));
    else if (p === "read") reader(q.get("id"), q.get("ch") || 1);
    else if (p === "search") search(q.get("s") || "");
  }).catch(function (e) {
    var m = document.querySelector(".mkm-main");
    if (m) m.innerHTML = '<div class="mkm-container mkm-page"><p class="mkm-empty">Content load nahi hua: ' +
      (e && e.message ? e.message : "") + " — assets/content.json mojood hai ya nahi dekhein.</p></div>";
  });
})();
