/* =========================================================
   CONTENT — yahan apna manga/chapters ka data rakhein
   ---------------------------------------------------------
   Naya title add karne ka tareeqa:
     1. titles[] me naya object paste karein
     2. cover: "assets/covers/slug.jpg"   (asli image ho to)
        warna `art` chhor dein — gradient placeholder ban jayega
     3. chapter images: assets/manga/<slug>/ch-001/001.jpg ...
        `dir` me folder ka path, `pages` me ginti likhein.
        Image missing ho to khud placeholder page dikhega.
   NOTE: sirf wo content daalein jo aapka apna, licensed, ya
   public-domain / Creative-Commons ho.
   ========================================================= */

window.SITE = {
  name: "MKM Static",
  tagline: "Your daily source for the latest manga chapters.",
  about: "MKM Static is a demo library built on the MKM Manga Pro look. Yahan sirf original / licensed / public-domain titles rakhein.",
  social: [
    { label: "Telegram", url: "#" },
    { label: "Discord", url: "#" },
    { label: "X", url: "#" }
  ],
  cta: { label: "Start Reading", url: "#latest" },

  /* homepage hero slider */
  slides: [
    {
      titleId: "neon-ronin",
      badge: "Featured",
      title: "Your next story starts here",
      text: "Dive into a world of unforgettable tales. Explore. Read. Get hooked. New chapters, every day.",
      btn1: { label: "Start Reading", href: "read.html?id=neon-ronin&ch=5" },
      btn2: { label: "Explore Manga", href: "manga.html?id=neon-ronin" },
      stats: [
        { num: "6", label: "Manga" },
        { num: "18", label: "Chapters" },
        { num: "128K+", label: "Readers" }
      ]
    },
    {
      titleId: "desert-fox",
      badge: "Trending",
      title: "Desert Fox — the courier saga",
      text: "Cholistan ki ret ke neeche dafan ek purani sadak, aur ek courier jo kabhi pakda nahi gaya.",
      btn1: { label: "Read Chapter 21", href: "read.html?id=desert-fox&ch=21" }
    }
  ],

  /* homepage "About" feature card */
  feature: { mangaId: "crimson-blade", chapterId: "crimson-blade", chapterNum: 12, previewPages: 3 },

  titles: [
    {
      id: "crimson-blade",
      title: "Crimson Blade",
      alt: "紅の刃",
      author: "Ayaan Rehman", artist: "Ayaan Rehman",
      status: "Ongoing", type: "Manga", year: 2024,
      genres: ["Action", "Fantasy", "Adventure"],
      rating: 4.8, views: 1284300,
      description: "Ek chhote se gaon ka lohara jab apni banayi talwar ko khoon se range dekhta hai, to use pata chalta hai ke ye blade sirf hathiyar nahi — ek qaid hai. Ab har raat wo apne andar ke saaye se larta hai.",
      art: { a: "#9053ff", b: "#2b0d4a", label: "CB" },
      chapters: [
        { num: 12, title: "The Forge Remembers", date: "2026-11-05", pages: 6, dir: "assets/manga/crimson-blade/ch-012/" },
        { num: 11, title: "Blood on the Anvil", date: "2026-10-28", pages: 6, dir: "assets/manga/crimson-blade/ch-011/" },
        { num: 10, title: "The Quiet Village", date: "2026-10-21", pages: 6, dir: "assets/manga/crimson-blade/ch-010/" }
      ]
    },
    {
      id: "starlight-academy",
      title: "Starlight Academy",
      alt: "スターライト学園",
      author: "Hina Malik", artist: "Studio Noor",
      status: "Ongoing", type: "Manhwa", year: 2025,
      genres: ["School", "Romance", "Slice of Life"],
      rating: 4.5, views: 842100,
      description: "Sheher ke sabse purane school ki chhat pe ek telescope hai, aur us telescope ke peeche ek raaz. Do ajnabi, ek hi raat, aur sitaron ka ek naksha jo kisi ne 40 saal pehle chhupa diya tha.",
      art: { a: "#12d4e7", b: "#062a3a", label: "SA" },
      chapters: [
        { num: 8, title: "The Roof Key", date: "2026-11-07", pages: 6, dir: "assets/manga/starlight-academy/ch-008/" },
        { num: 7, title: "Forty Years Late", date: "2026-10-31", pages: 6, dir: "assets/manga/starlight-academy/ch-007/" }
      ]
    },
    {
      id: "desert-fox",
      title: "Desert Fox",
      alt: "صحرائی لومڑی",
      author: "Bilal Qureshi", artist: "Bilal Qureshi",
      status: "Ongoing", type: "Manga", year: 2023,
      genres: ["Action", "Drama", "Historical"],
      rating: 4.9, views: 2104800,
      description: "Cholistan ke ret ke teelon ke neeche dafan ek purani sadak, aur us sadak pe chalne wala ek courier jo kabhi pakda nahi gaya. 1947 ki sardiyon ki kahani, jahan har parcel ke andar kisi ki zindagi hoti thi.",
      art: { a: "#ffb347", b: "#4a2b06", label: "DF" },
      chapters: [
        { num: 21, title: "The Last Courier", date: "2026-11-03", pages: 6, dir: "assets/manga/desert-fox/ch-021/" },
        { num: 20, title: "Sand and Cipher", date: "2026-10-24", pages: 6, dir: "assets/manga/desert-fox/ch-020/" },
        { num: 19, title: "A Train to Nowhere", date: "2026-10-15", pages: 6, dir: "assets/manga/desert-fox/ch-019/" }
      ]
    },
    {
      id: "neon-ronin",
      title: "Neon Ronin",
      alt: "ネオン浪人",
      author: "Zain Abbas", artist: "Kira Labs",
      status: "Ongoing", type: "Manhua", year: 2026,
      genres: ["Sci-Fi", "Action", "Cyberpunk"],
      rating: 4.6, views: 596700,
      description: "2089, Karachi. Sheher ke neeche basne wale data-bazaaron me ek bekas samurai apni yaadein bechta hai — kyunki yaad rakhna ab sabse mehnga jurm hai.",
      art: { a: "#12d4e7", b: "#101c3a", label: "NR" },
      chapters: [
        { num: 5, title: "Memory Market", date: "2026-11-08", pages: 6, dir: "assets/manga/neon-ronin/ch-005/" },
        { num: 4, title: "Ghost Signal", date: "2026-11-01", pages: 6, dir: "assets/manga/neon-ronin/ch-004/" }
      ]
    },
    {
      id: "moonlit-bakery",
      title: "The Moonlit Bakery",
      alt: "月明かりのパン屋",
      author: "Sana Iqbal", artist: "Sana Iqbal",
      status: "Completed", type: "Manga", year: 2022,
      genres: ["Slice of Life", "Comedy", "Supernatural"],
      rating: 4.4, views: 388200,
      description: "Raat 2 baje khulne wali ek bakery, jahan bread khareedne wale sab insaan nahi hote. Aur baker ko is se koi masla nahi — bas payment chandi ke sikkon me chahiye.",
      art: { a: "#7ce3a8", b: "#0c2e21", label: "MB" },
      chapters: [
        { num: 30, title: "Last Order (Final)", date: "2026-09-12", pages: 6, dir: "assets/manga/moonlit-bakery/ch-030/" },
        { num: 29, title: "The Silver Coin", date: "2026-09-05", pages: 6, dir: "assets/manga/moonlit-bakery/ch-029/" }
      ]
    },
    {
      id: "silent-cartographer",
      title: "The Silent Cartographer",
      alt: "خامش نقشہ نگار",
      author: "Omar Farooq", artist: "Omar Farooq",
      status: "Ongoing", type: "Manga", year: 2025,
      genres: ["Mystery", "Adventure", "Drama"],
      rating: 4.7, views: 701950,
      description: "Ek goonga naqsha-nigaar jo un jagahon ke naqshe banata hai jo maujood nahi hotin — aur log un naqshon pe chal kar wahan pahunch jate hain.",
      art: { a: "#ff8a3d", b: "#3a1a08", label: "SC" },
      chapters: [
        { num: 9, title: "A Map of Elsewhere", date: "2026-11-06", pages: 6, dir: "assets/manga/silent-cartographer/ch-009/" },
        { num: 8, title: "Ink and Silence", date: "2026-10-27", pages: 6, dir: "assets/manga/silent-cartographer/ch-008/" }
      ]
    }
  ]
};
