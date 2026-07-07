# How to Post on Danny.com

This is your personal reference for writing and publishing on your local-first blog. No database, no CMS — just files in git.

---

## Quick Start (30 seconds)

```bash
cd ~/adventure-blog
cp content/posts/hello-world.mdx content/posts/my-new-post.mdx
# edit my-new-post.mdx
# add cover image to public/images/
npm run dev # view at http://localhost:3000/blog/my-new-post
```

When happy:
```bash
git add .
git commit -m "new post: my new post"
git push # Vercel auto-deploys
```

---

## 1. Where posts live

```
~/adventure-blog/
├── content/
│   └── posts/               # <-- all your posts go here
│       ├── hello-world.mdx  # template (draft)
│       └── shanghai.mdx     # your post → /blog/shanghai
├── public/
│   └── images/              # <-- all your images go here
│       ├── portrait.jpg     # your portrait (already there)
│       ├── shanghai-cover.jpg
│       └── shanghai-01.jpg
```

**Rule:** Filename = URL. `shanghai.mdx` → `danny.com/blog/shanghai`. Use lowercase, hyphens, no spaces.

---

## 2. Post frontmatter (the top block)

Every post starts with a `---` block. Copy this template:

```mdx
---
title: "Your title here"
date: "2026-07-07"
excerpt: "One sentence hook. Shows on homepage cards and Google."
coverImage: "/images/shanghai-cover.jpg"
location: "Shanghai"          # optional, shows as pill
tags: ["lore", "languages"]   # optional, shows on cards
published: true               # true = live, false = draft (hidden)
---
```

**Field breakdown:**

| Field | Required | What it does | Example |
|-------|----------|--------------|---------|
| `title` | yes | Post title, h1, SEO title | `"Lore maxing Shanghai"` |
| `date` | yes | Sort order + display. YYYY-MM-DD | `"2026-07-07"` |
| `excerpt` | yes | 1-2 sentences. Card preview + meta description | `"How I prepped for Shanghai by going too deep"` |
| `coverImage` | yes | Card image + top hero. Local path or https URL | `"/images/cover.jpg"` or `"https://..."` |
| `location` | no | Small orange pill on card + post header | `"Palo Alto"` / `"Shanghai"` |
| `tags` | no | Array, shows as little pills. Keep to 2-3 | `["lore", "thoughts"]` |
| `published` | no, default true | `false` = draft, won't build or show in lists | `false` while writing |

**Your current tags:** I set them to `Lore, Languages, Adventures, Thoughts` to match your 3 things. Use whatever you want — they’re just strings.

---

## 3. Writing the body (Markdown + MDX)

Below frontmatter, write normal markdown. You already know this, but quick ref:

```md
## Heading 2

### Heading 3

Regular paragraph. **Bold**, *italic*, `inline code`.

> Blockquote for a thought that hits different.

- Bullet list
- Another

1. Numbered
2. List

[Link text](https://example.com)

![Alt text](/images/photo.jpg)  # basic image, but use components below for better style
```

### Special components you have (MDX only)

Because this is MDX, you can use React components *inside* markdown.

**A) InlinePhoto — for one big image**

```mdx
<InlinePhoto
  src="/images/shanghai-01.jpg"
  alt="Street in Shanghai at night"
  caption="First night, jetlagged, everything glowing"
  wide  # optional, makes it bleed wider than text for drama
/>
```

Props:
- `src` — `/images/...` (local) or `https://...` (remote)
- `alt` — required for accessibility
- `caption` — small mono text below, optional
- `wide` — boolean, no value needed. Makes photo wider than text column.

**B) PhotoGallery — masonry grid**

```mdx
<PhotoGallery photos={[
  {
    src: "/images/shanghai-01.jpg",
    alt: "Temple",
    caption: "Found this at 6am before crowds",
    location: "Shanghai"  # optional, shows as 📍 pill
  },
  {
    src: "/images/shanghai-02.jpg",
    alt: "Noodles",
    caption: "Best noodles, no English menu"
  },
  {
    src: "/images/shanghai-03.jpg",
    alt: "Alley"
    // caption and location are optional
  }
]} />
```

Grid is automatic: 1 col mobile, 2 tablet, 3 desktop. Images are lazy-loaded and optimized by Next.js.

---

## 4. Images — local workflow (recommended)

**You said keep it local — this is how:**

1. **Add to folder:**
   ```bash
   # drag/drop or cp
   cp ~/Downloads/my-photo.jpg ~/adventure-blog/public/images/my-photo.jpg
   ```

2. **Reference in post:**
   ```mdx
   coverImage: "/images/my-photo.jpg"  # in frontmatter
   <InlinePhoto src="/images/my-photo.jpg" ... />  # in body
   ```

3. **Rules:**
   - Keep under ~2-3MB each if possible. Phone photos are often 5-8MB — compress with Preview → Tools → Adjust Size → ~2000px wide is plenty for web.
   - Use `.jpg` for photos, `.png` for screenshots.
   - Don’t commit RAW or 20MB files — git gets slow.
   - `public/images/portrait.jpg` already exists (your photo) — you can reuse it.

**Remote alternative (if you want):**
```mdx
coverImage: "https://images.unsplash.com/photo-..."
```
Already allowed in `next.config.ts` for `images.unsplash.com`. No need to download.

---

## 5. Drafts vs Published

- **Draft:** `published: false` in frontmatter → hidden from homepage, `/blog`, and build. You can still preview directly at `http://localhost:3000/blog/your-slug` in dev mode? No — with current setup, drafts are fully hidden. To preview a draft, temporarily set `published: true` and run dev server.
- **Published:** `published: true` or omit field → shows up everywhere, included in `npm run build`.

**Workflow I recommend:**
1. Create file with `published: false`
2. Write + add images, `npm run dev` to check homepage says “No posts yet” (expected)
3. When ready, flip to `true`, refresh, see card appear
4. Commit + push

---

## 6. Preview locally

```bash
export PATH="$HOME/.local/node/bin:$PATH"
cd ~/adventure-blog
npm run dev
# open http://localhost:3000
# /blog shows all published posts
# /blog/your-slug shows post
```

Dev server auto-reloads on save. Check `/tmp/dev.log` if something breaks:
```bash
tail -f /tmp/dev.log
```

Production check (what Vercel will build):
```bash
npm run build
npm start # http://localhost:3000 production preview
```

Build must pass with no errors before deploy.

---

## 7. Deploy

You’re on Vercel setup:

```bash
git add content/posts/my-new-post.mdx public/images/my-new-photo.jpg
git commit -m "post: shanghai prep"
git push origin main
# Vercel auto-deploys in ~1 min
```

If you haven’t pushed to GitHub yet:
```bash
cd ~/adventure-blog
gh repo create danny.com --public --source=. --push
# then connect repo in vercel.com → New Project
```

---

## 8. Your personalized setup

- **Site name:** Danny.com
- **Author:** Daniel Sanchez
- **Based:** Palo Alto
- **Email:** danielsanchezdiaz17@gmail.com (in About + Footer)
- **Portrait:** `public/images/portrait.jpg` (from `~/Downloads/pic of me.jpg`)
- **What you care about:** Lore maxing, Languages, Keeping brain active — already wired into About page and homepage copy
- **No newsletter, no social proof, no Instagram/Twitter** — removed per your request

If you want to change tagline, hero, or About copy, edit:
- `app/layout.tsx` → SEO title/description
- `app/page.tsx` → hero headline + intro
- `app/about/page.tsx` → about page
- `components/Footer.tsx` → footer description + location

---

## 9. Troubleshooting

**Post not showing?**
- Check `published: true`?
- Filename ends in `.mdx`? Must be in `content/posts/`
- Date valid? `YYYY-MM-DD`
- Restart dev server: `lsof -ti:3000 | xargs kill -9 && npm run dev`

**Image broken (404)?**
- File actually in `public/images/`? `ls public/images/`
- Reference starts with `/images/` not `public/images/`? Correct is `/images/photo.jpg`
- Case sensitive: `Photo.jpg` ≠ `photo.jpg`

**Build fails on Vercel?**
- Run `npm run build` locally first, fix errors
- Check image URLs — remote must be allowed in `next.config.ts` `remotePatterns`

**Want to delete hello-world template?**
```bash
rm content/posts/hello-world.mdx
```

---

## 10. Ideas for your first real posts (based on what you told me)

- **Lore maxing:** What are you deep in right now? Write the “explain like I’m 5 but also 500” version.
- **Languages:** A word/concept that doesn’t translate well, and why it stuck with you.
- **Shanghai prep:** What are you researching before you go? Not a travel guide, your *prep* process.
- **I’m all over the place:** Lean into it — a post that’s 3 small thoughts that don’t connect, and that’s the point.

Write like you’re texting a friend who wants the long version.

—

*Last updated: 2026-07-07 for Danny.com local setup. No DB, just MDX + images in git.*
