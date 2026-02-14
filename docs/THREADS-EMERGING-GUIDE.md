# Threads Emerging & Look Back — AI Reflection Sessions

A step-by-step guide to implementing **Threads Emerging** and **Look Back**: optional AI reflection features that unlock after consistent journaling and provide non-directive, pattern-based insights from the user's own words and mood data.

---

## Overview

| What                 | Details                                                  |
| -------------------- | -------------------------------------------------------- |
| **Threads Emerging** | Thematic summary, emotional patterns, reflective prompts |
| **Look Back**        | AI summary of the last 7 days of journaling              |
| **Unlock condition** | 3+ unique journaling days within the last 7 days         |
| **Location**         | Linked to Journal Entries widget (dashboard)             |
| **Tone**             | Non-directive, observational, reflective                 |
| **Data sources**     | Journal entries + Mood entries (valence, arousal, notes) |

---

## Step 1: Create an Eligibility Check

Before anything else, you need to know: _Has this user unlocked the reflection feature?_

**Logic:**

- Query `JournalEntry` for the user
- Group by **date** (ignore time)
- Count **unique dates** in the last 7 days
- If count ≥ 3 → unlocked

**Where to put it:**

- Option A: New API route `GET /api/reflection/eligibility` that returns `{ eligible: boolean, uniqueDays: number }`
- Option B: Extend the journal API to include eligibility in the response
- Option C: A dedicated `GET /api/reflection` that returns eligibility + reflection content in one flow

**Recommendation:** Start with Option A — a simple eligibility endpoint. The widget can call it to decide whether to show the "Threads Emerging" entry point.

**SQL/Prisma hint:**

```ts
// Get distinct dates with journal entries in last 7 days
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const entries = await prisma.journalEntry.findMany({
  where: {
    userId: userEmail,
    date: { gte: sevenDaysAgo },
  },
  select: { date: true },
});

// Extract unique dates (normalize to YYYY-MM-DD)
const uniqueDates = new Set(
  entries.map((e) => e.date.toISOString().slice(0, 10)),
);
const uniqueDays = uniqueDates.size;
const eligible = uniqueDays >= 3;
```

---

## Step 2: Create the Reflection API Route

**File:** `src/app/api/reflection/route.ts`

**Responsibilities:**

1. Check authentication
2. Re-check eligibility (don’t trust the client)
3. Fetch journal entries from the last 7 days
4. Fetch mood entries from the same period
5. Build a prompt for the AI
6. Call OpenAI with strict guardrails
7. Return structured response

**Request:** `POST` (or `GET` if you prefer) — no body needed; user is from session.

**Response shape:**

```json
{
  "thematicSummary": "...",
  "emotionalPatterns": "...",
  "reflectivePrompts": ["...", "...", "..."],
  "disclaimer": "..."
}
```

---

## Step 3: Design the System Prompt (Guardrails)

This is the most important part. The prompt must enforce:

| Rule               | How to enforce                                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Non-directive      | "Mirror and summarise. Do not advise or prescribe."                                                                                     |
| No "should"        | "Never use the word 'should' or similar prescriptive language."                                                                         |
| No diagnosis       | "Do not diagnose, label conditions, or make medical claims."                                                                            |
| No crisis handling | "If content suggests crisis, recommend professional support. Do not attempt to counsel."                                                |
| Observational only | "Describe what you notice. Use phrases like 'You’ve written about...' or 'A theme that appears...'"                                     |
| Disclaimer         | Always include: "This is not clinical or professional advice. For mental health support, please reach out to a qualified professional." |

**Prompt structure:**

1. **System message:** Role + tone + guardrails + output format
2. **User message:** Journal excerpts + mood summary (anonymised, no PII)

**Output format:** Ask for JSON or a clear structure so you can parse `thematicSummary`, `emotionalPatterns`, `reflectivePrompts`, and `disclaimer`.

---

## Step 4: Prepare the Data for the AI

**Journal entries:**

- Last 7 days
- Include: `date`, `content`
- Format as: `[2025-02-10] "User's journal text..."`

**Mood entries:**

- Same 7-day window
- Include: `createdAt`, `valence`, `arousal`, `notes` (if present)
- Summarise: e.g. "Mood tended toward [low/high] valence, [calm/energised] arousal. Notes: ..."

Keep it concise. Token limits matter; you don’t need every word of every entry.

---

## Step 5: Add Crisis Detection (Optional but Recommended)

Before or after the main AI call, add a simple check:

- If journal content contains crisis-related keywords (e.g. self-harm, suicide, emergency), **do not** generate a reflection.
- Return a fixed response that includes support resources (e.g. crisis helpline, emergency services).
- Log for review if needed (respect privacy policies).

This can be a small keyword check or a separate, lightweight AI call. The goal is to avoid the reflection feature engaging with crisis content.

---

## Step 6: Update the Journal Entries Widget

**File:** `src/components/JournalEntriesWidget.tsx`

**Changes:**

1. Call `GET /api/reflection/eligibility` (or equivalent) on load
2. If `eligible`, show a "Threads Emerging" section or link
3. When the user clicks it, either:
   - Navigate to a dedicated `/reflection` page, or
   - Open a modal/drawer that fetches and displays the reflection

**UI ideas:**

- Small link: "🧵 Threads Emerging" below the journal count
- Or a card: "See what’s emerging from your entries"
- Keep it subtle — presence-first, not pushy

---

## Step 7: Create the Reflection UI

**Option A: Modal / drawer**

- Fetch reflection on click
- Show loading state
- Display: thematic summary, emotional patterns, prompts, disclaimer
- Simple, no new route

**Option B: Dedicated page**

- Route: `/reflection` or `/journal/reflection`
- Same fetch + display logic
- More space for layout and future expansion

**Recommendation:** Start with Option A (modal) for speed. You can move to a page later.

**Layout suggestion:**

```
┌─────────────────────────────────────────┐
│  🧵 Threads Emerging                     │
├─────────────────────────────────────────┤
│  What’s showing up                        │
│  [Thematic summary paragraph]             │
│                                           │
│  Emotional patterns                       │
│  [Pattern highlights]                     │
│                                           │
│  Prompts to sit with                     │
│  • [Prompt 1]                             │
│  • [Prompt 2]                             │
│  • [Prompt 3]                             │
│                                           │
│  ─────────────────────────────────────   │
│  ⚠️ This is not clinical or professional  │
│  advice. For mental health support...     │
└─────────────────────────────────────────┘
```

---

## Step 8: Handle Edge Cases

| Case                                        | Behaviour                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| User has 0–2 journal days                   | Don’t show "Threads Emerging"                                            |
| User has 3+ days but no mood data           | Still run reflection; mood section can say "No mood data in this period" |
| API key missing                             | Show: "Reflection is not available right now"                            |
| AI returns empty/invalid                    | Fallback message: "Nothing surfaced this time. Keep journaling."         |
| User in crisis (if you implement detection) | Show support resources, no reflection                                    |

---

## Step 9: Refine the 7-Day Window

**Clarification:** "3–4 days of journaling in a 7-day period"

- Use a **rolling 7-day window** (e.g. last 7 calendar days from today)
- Require **3 unique days** as the unlock threshold (matches "minimum 3 entries across separate days")
- You can later add a "4 days" tier for a richer reflection if you want

---

## Quick Reference: Files to Create/Edit

| File                                              | Action                                                            |
| ------------------------------------------------- | ----------------------------------------------------------------- |
| `src/app/api/reflection/eligibility/route.ts`     | **Create** — returns `{ eligible, uniqueDays }`                   |
| `src/app/api/reflection/route.ts`                 | **Create** — fetches data, calls AI, returns reflection           |
| `src/components/JournalEntriesWidget.tsx`         | **Edit** — add eligibility check + "Threads Emerging" entry point |
| `src/components/ReflectionModal.tsx` (or similar) | **Create** — modal/drawer to display reflection                   |
| `package.json`                                    | No new deps (reuse `openai`)                                      |

---

## Prompt Template (Starter)

Use this as a base and adjust to your voice:

```
You are a reflective companion for a journaling app. Your role is to mirror and summarise — never to diagnose, advise, or prescribe.

Given the user's journal entries and mood data from the past week, produce a JSON object with:
- thematicSummary: 2-4 sentences observing themes in their words. Use "You've written about...", "A thread that appears...". No "should" or prescriptive language.
- emotionalPatterns: 1-2 sentences on mood/emotional patterns if data exists. Observational only.
- reflectivePrompts: Array of 2-3 open-ended prompts for the user to sit with. Questions, not advice.
- disclaimer: "This is not clinical or professional advice. For mental health support, please reach out to a qualified professional or crisis service."

If journal content suggests crisis or emergency, respond only with crisisSupport: true and do not generate reflection content. We will show support resources instead.

Never use: should, must, need to, you ought to, I recommend, you should try.
```

---

## Cost Awareness

- Each reflection uses more tokens than Note to Self (journal text + mood + long response)
- Estimate: ~500–1500 tokens per reflection
- With `gpt-4o-mini`, roughly $0.002–0.006 per session
- Consider caching: e.g. one reflection per day, or per "session"

---

## Next Steps After Implementation

1. Test with real journal content (yours or synthetic)
2. Review AI outputs for tone and guardrail adherence
3. Add analytics (e.g. how often reflection is used) if useful
4. Iterate on prompts based on user feedback
5. Consider a "4 days" tier for a deeper reflection variant
