# RepoChat — chat with any GitHub repo from your terminal

A short note to introduce **RepoChat**, my submission to the GitHub Copilot CLI Challenge. RepoChat turns the official Copilot CLI into a *project-wide* code-intelligence tool — index a repo once, then ask questions about cross-module logic, architecture, or refactor candidates without ever leaving the terminal.

Rather than retyping the whole pitch, here's the walkthrough video I made for the challenge:

<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/dpO9aJRUdyI"
    title="RepoChat — GitHub Copilot CLI Challenge submission"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
</div>

## The short version

- **Repo-wide intelligence.** RepoChat breaks the "active file" barrier — it indexes the whole project so the Copilot CLI can answer questions about cross-module logic, not just the file you're staring at.
- **Intelligent code translation.** Convert a Python service into Node.js middleware (or anything else) without losing project context.
- **Zero-trust security.** No API keys, no third-party LLM dashboards. Auth piggybacks on `gh auth`, so credentials never leave the trusted GitHub ecosystem.

## Try it

If you already have the GitHub Copilot CLI installed:

```bash
pip install git+https://github.com/mahupreti/repochat.git
```

If not, there's a Dockerfile and step-by-step setup in the [repository](https://github.com/mahupreti/repochat). The full write-up — including the design rationale behind treating Copilot CLI as a secure intelligence API — is in the video above.

## The takeaway

Treating the Copilot CLI as a *secure, high-utility intelligence API* let me focus 100% of the build on retrieval logic — the "answering" part was already handled by the best code-focused model in the world. That's the pattern I'm calling **Modular AI**, and RepoChat is my first cut at what that looks like in practice.

---

Solo submission — Mahesh Upreti.
