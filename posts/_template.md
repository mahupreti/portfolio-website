# Post Title

> Note: the title comes from `manifest.json` and is rendered automatically on the site. The H1 above is stripped on render so it doesn't appear twice — but keep it in the file so this `.md` still reads well on GitHub or in any other markdown viewer.

A strong opening paragraph. Two or three sentences that set up what this post is about and why someone should keep reading. Treat it like a lede.

## A section heading

Body paragraphs use plain markdown. Use **bold** for emphasis you want even a skimmer to catch, *italic* for softer stress, and `inline code` for filenames, flags, and short identifiers.

Links look like this: [text of the link](https://example.com).

### A subsection heading

- A bullet
- Another bullet — keep them tight; one idea per line
- A third bullet

1. Numbered steps
2. When order matters
3. Like a runbook

## Code blocks

Fence them with three backticks and a language hint for syntax highlighting:

```bash
# Bash
aws sts get-caller-identity --query Account --output text
```

```python
def deploy(region: str) -> bool:
    return True
```

```yaml
# YAML
services:
  api:
    image: registry/api:latest
    ports:
      - "8080:80"
```

```terraform
resource "aws_s3_bucket" "logs" {
  bucket = "mahesh-prod-logs"
}
```

Inline `code` works mid-sentence too.

## Blockquote

> Use blockquotes for a pull quote, a definition, or a short aside.
> Keep them short — one or two sentences max.

## Tables

| Column A | Column B | Column C |
|----------|----------|----------|
| Row 1    | Value    | Note     |
| Row 2    | Value    | Note     |

## Images

Drop images under `images/` at the repo root, then reference them with a path relative to the site root (the path is resolved from `blog.html`, not from this `.md` file):

```
![Alt text describing the image](images/diagram.png)
```

## Horizontal rule

Use `---` on its own line to break a long post into clear sections.

---

## When you've finished writing

1. Save this file as `posts/<your-slug>.md` (lowercase, hyphens, no spaces).
2. Add an entry at the **top** of the `posts` array in `posts/manifest.json`:

```json
{
  "slug": "your-slug",
  "title": "Your Post Title",
  "date": "YYYY-MM-DD",
  "excerpt": "One-liner shown on the blog index and homepage.",
  "tags": ["aws", "terraform"],
  "readingTime": "5 min read"
}
```

3. Commit and push — Cloudflare Pages picks up the new post automatically. The post lives at `blog.html#your-slug`.

That's the whole loop.
