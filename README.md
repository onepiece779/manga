# MKM Static — MKM Manga Pro ka static port

Ye site **MKM Manga Pro v2.4.6** (© Kashi Ahmer, **GPLv2**) WordPress theme ke design ka
static (bina PHP/database) port hai:

- `assets/css/mkm.css`  → theme ki **asli** `style.css` (unchanged, license header intact)
- `assets/js/mkm-theme-main.js` → theme ka **asla** `main.js` (menu, slider, back-to-top)
- `assets/css/site.css` + `assets/js/app.js` → static reader ke liye chhoti additional layer
- Content sirf `assets/js/data.js` me hai — koi database nahi

> ⚠️ Sirf wo manga publish karein jo **aapka apna**, **licensed**, ya **public-domain /
> Creative Commons** ho. Commercial manga ke scans GitHub Pages aur domain dono ke liye
> DMCA takedown ka sabab bante hain.

---

## Local preview
```bash
cd mkm-static
python3 -m http.server 8000
# browser: http://localhost:8000
```

## GitHub Pages pe deploy
1. GitHub pe naya **public** repo banayein (e.g. `manga-site`)
2. Is folder ka sara content repo ke root me push karein:
   ```bash
   cd mkm-static
   git init && git add . && git commit -m "site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages → Source: GitHub Actions**
   (`.github/workflows/deploy.yml` already mojood hai — push hote hi build+deploy ho jayega)
   *Ya* Source: **Deploy from a branch → main / (root)** chunein aur workflow file delete kar dein.
4. 1–2 minute me site live: `https://USERNAME.github.io/REPO/`

## Custom domain (mkm.fan free subdomain ya apni domain)
mkm.fan ke DNS panel (`/user`) me:

| Type | Host | Value |
|---|---|---|
| A | `@` / `naam` | `185.199.108.153` |
| A | `@` / `naam` | `185.199.109.153` |
| A | `@` / `naam` | `185.199.110.153` |
| A | `@` / `naam` | `185.199.111.153` |
| CNAME | `www.naam` | `USERNAME.github.io` |

Phir repo → Settings → Pages → **Custom domain** = `naam.mkm.fan` → Save →
DNS check green hone pe **Enforce HTTPS** tick karein.
Repo ke root me `CNAME` file bhi bana sakte hain (content: `naam.mkm.fan`) —
`CNAME.example` dekhein.

## Content add / update karna
Sab kuch `assets/js/data.js` me:

```js
{
  id: "mera-manga",
  title: "Mera Manga",
  author: "…", artist: "…", status: "Ongoing", type: "Manga", year: 2026,
  genres: ["Action"], rating: 4.5, views: 1000,
  description: "…",
  cover: "assets/covers/mera-manga.jpg",        // optional; na ho to gradient placeholder
  chapters: [
    { num: 1, title: "Pehla Chapter", date: "2026-11-09", pages: 12,
      dir: "assets/manga/mera-manga/ch-001/" }  // 001.jpg … 012.jpg
  ]
}
```

Chapter images ka naming: `001.jpg`, `002.jpg`, … (3-digit).
Image missing ho to reader khud placeholder page dikha deta hai, site kabhi nahi tootti.

### Images via URL (bina upload ke)
Dono jagah poori URLs chal sakti hain:

```js
cover: "https://cdn.example.com/covers/mera-manga.jpg",   // cover: koi bhi URL
chapters: [
  { num: 1, title: "…", date: "2026-11-09",
    dir: "https://cdn.example.com/mera-manga/ch-001/" },  // dir: remote folder prefix
  { num: 2, title: "…", date: "2026-11-10",
    images: [                                            // ya ek-ek page ki URL list
      "https://cdn.example.com/p1.jpg",
      "https://cdn.example.com/p2.jpg"
    ] }
]
```

- `dir` + `pages` → `dir/001.jpg`, `dir/002.jpg` … khud ban jate hain
- `images: [...]` → har page ki apni URL (kisi bhi order/count me)
- Remote image load na ho to placeholder page dikhta hai (site nahi tootti)
- CORS ki zaroorat nahi — `<img>` tag hai, fetch nahi

**Images ka size:** GitHub Pages pe site ~1 GB tak theek rehti hai. Manga ki images bhaari
hon to unhe **Cloudflare R2** (free 10 GB) ya kisi CDN pe rakhein aur `cover` / page paths
wohan ke URLs dein (`dir: "https://cdn.example.com/mera-manga/ch-001/"`).

## Ads (theme jaisa slot system)
Control file: **`assets/ads.json`** — yahi aapka "ads panel" hai.

- `"enabled": false` → poori site se ads hat jate hain
- Har slot: `"on": true` + `"code": "<ins class='adsbygoogle'…></ins><script>…</script>"`
- Slots: `header`, `home`, `listing` (browse/detail pages), `sidebar`,
  `reader_inline` (reader me har `"every": 5` pages baad), `footer`
- Styling theme ki asli `.mkm-ad` classes use karti hai (dashed border + "Advertisement" label)

**ads.txt:** root me `ads.txt` mojood hai — GitHub Pages usay `https://aapki-domain/ads.txt`
pe serve karta hai. Apni AdSense pub-id wali line rakhein, example line replace/delete karein.

Decap CMS (Option B) lagne ke baad `ads.json` bhi panel se edit hoga — code widget ke saath.

## Pages
- `index.html` — hero slider, About/feature card + sidebar, latest grid, home reader preview
- `manga.html?id=…` — title detail + chapter list
- `read.html?id=…&ch=…` — reader (long strip / paged mode, width toggle, progress bar, keyboard)
- `search.html?s=…` — search / browse

## Theme credit
Design: **MKM Manga Pro** by Kashi Ahmer — https://mkm.fan/ — GPLv2.
Static port me theme ki asli CSS/JS files unchanged shamil hain.
