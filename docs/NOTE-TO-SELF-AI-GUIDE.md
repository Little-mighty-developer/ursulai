# Note to Self: AI Suggestions — Step-by-Step Guide

This guide walks you through adding AI-powered features to the Note to Self widget. You'll get:

- **Suggest** — AI suggests a pearl of wisdom when the note is empty
- **Polish** — AI rewrites the user's current note to be snappy & easy to digest

Both actions are **user-initiated only** (no automatic AI).

---

## Prerequisites

- Node.js and npm installed
- Ursulai project running locally
- A credit card (for API usage — free tiers exist)

---

## Step 1: Choose an AI Provider

For text generation, the most common options are:

| Provider               | Pros                             | Free Tier                  | Best for                |
| ---------------------- | -------------------------------- | -------------------------- | ----------------------- |
| **OpenAI** (GPT)       | Widely used, great docs          | $5 credit for new accounts | General use             |
| **Anthropic** (Claude) | Strong at following instructions | Limited free tier          | Nuanced prompts         |
| **Vercel AI SDK**      | Works with multiple providers    | Depends on provider        | If you want flexibility |

**Recommendation:** Start with **OpenAI** — it's the easiest to set up and has excellent documentation.

---

## Step 2: Get an API Key

### OpenAI

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Click your profile (top right) → **View API keys**
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`) — you won't see it again!

### Add to your project

1. Open `.env.local` in your project root
2. Add:

   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

3. **Never commit this file** — it should already be in `.gitignore`

---

## Step 3: Install the AI SDK

In your project root, run:

```bash
npm install openai
```

This adds the official OpenAI Node.js client.

---

## Step 4: Create the API Route

You'll add a new API route that runs **on the server** (so your API key stays secret).

**File to create:** `src/app/api/notes/ai/route.ts`

This route will:

- Accept `POST` requests with `{ action: "suggest" | "polish", content?: string }`
- Call OpenAI with a prompt
- Return the AI-generated text

**Why server-side?** API keys must never be exposed in browser JavaScript. The client calls your `/api/notes/ai` route; your server calls OpenAI.

---

## Step 5: Add the UI Buttons

In `src/components/NoteToSelf.tsx`, you'll add:

1. **"Suggest" button** — Shown when the note is empty (or user is editing). Calls AI to generate a pearl of wisdom.
2. **"Polish" button** — Shown when there's text. Calls AI to rewrite it to be snappy & digestible.

Place them near the textarea so they're visible when the user is writing. Use a subtle style (e.g. small link or icon) so they don't overwhelm the main Save action.

---

## Step 6: Wire Up the Client

1. Add state for loading (e.g. `isAiLoading`)
2. On button click: `fetch("/api/notes/ai", { method: "POST", body: JSON.stringify({ action, content }) })`
3. On success: put the returned text into the note field (user can edit before saving)
4. Show a loading state while the request is in flight

---

## Step 7: Add an "Edit" Option for Saved Notes

Right now, once a note is saved it's read-only. To let users polish an existing note:

- Add a small "Edit" or "Polish" link below the saved note
- When clicked, switch to edit mode (textarea) with the current note
- The Polish button can then be used

---

## Step 8: Test Locally

1. Run `npm run dev`
2. Go to the dashboard
3. In Note to Self:
   - Click **Suggest** when empty → you should get a short wisdom quote
   - Type something, click **Polish** → it should be rewritten
4. Check the browser Network tab if something fails

---

## Step 9: Handle Errors Gracefully

- If the API key is missing → show a friendly message
- If the request fails → show "Something went wrong. Try again."
- Consider rate limiting if you're worried about cost

---

## Quick Reference: File Changes

| File                            | Action                                               |
| ------------------------------- | ---------------------------------------------------- |
| `.env.local`                    | Add `OPENAI_API_KEY`                                 |
| `package.json`                  | Add `openai` dependency                              |
| `src/app/api/notes/ai/route.ts` | **Create** — server-side AI logic                    |
| `src/components/NoteToSelf.tsx` | Add Suggest/Polish buttons, loading state, Edit link |

---

## Cost Awareness

- OpenAI charges per token (roughly 4 chars per token)
- A "Suggest" or "Polish" call is typically 100–500 tokens ≈ $0.001–0.005 per call
- Free tier: $5 credit for new accounts
- Set usage limits in your OpenAI dashboard if you want a safety net

---

## Next Steps

Once you've completed these steps, you can:

- Tweak the prompts for different tones (more poetic, more direct, etc.)
- Add more actions (e.g. "Make it shorter", "Make it warmer")
- Switch to Vercel AI SDK if you want to support multiple providers
