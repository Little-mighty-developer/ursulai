/** Calendar-day difference (UTC date parts). */
export function utcDaysBetween(earlier: Date, later: Date): number {
  const a = Date.UTC(
    earlier.getUTCFullYear(),
    earlier.getUTCMonth(),
    earlier.getUTCDate(),
  );
  const b = Date.UTC(
    later.getUTCFullYear(),
    later.getUTCMonth(),
    later.getUTCDate(),
  );
  return Math.round((b - a) / 86400000);
}

export function parseISODateOnly(iso: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) throw new Error("Invalid date (use YYYY-MM-DD)");
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  return new Date(Date.UTC(y, mo, d, 12, 0, 0));
}

export function formatISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function utcDateStamp(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

/** True if the calendar day (UTC) is not after today (UTC). */
export function isIsoDateOnOrBeforeToday(iso: string): boolean {
  const d = parseISODateOnly(iso);
  return utcDateStamp(d) <= utcDateStamp(new Date());
}

/** True if the calendar day (UTC) is strictly before today (UTC). */
export function isIsoDateStrictlyInThePast(iso: string): boolean {
  const d = parseISODateOnly(iso);
  return utcDateStamp(d) < utcDateStamp(new Date());
}

/** ~Maximum period starts in 12 months for typical cycle lengths. */
export const CYCLE_BACKFILL_MAX_STARTS = 14;

export const CYCLE_BACKFILL_LOOKBACK_MONTHS = 12;

function isIsoDateOnOrAfterRollingCutoff(iso: string, months: number): boolean {
  const d = parseISODateOnly(iso);
  const now = new Date();
  const cutoff = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth() - months,
      now.getUTCDate(),
    ),
  );
  return utcDateStamp(d) >= utcDateStamp(cutoff);
}

/** Past-only: strictly before today and not older than `months` (UTC calendar). */
export function isIsoDateWithinRollingMonths(
  iso: string,
  months: number,
): boolean {
  return (
    isIsoDateStrictlyInThePast(iso) &&
    isIsoDateOnOrAfterRollingCutoff(iso, months)
  );
}

const ISO_DATE_LINE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Split pasted backfill text into valid ISO dates and junk tokens.
 * Accepts newlines, commas, or semicolons between dates.
 */
export function parseBulkCycleDateLines(raw: string): {
  ok: string[];
  bad: string[];
} {
  const tokens = raw
    .split(/[\n,;/]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const ok: string[] = [];
  const bad: string[] = [];
  const seen = new Set<string>();
  for (const t of tokens) {
    if (!ISO_DATE_LINE.test(t)) {
      bad.push(t);
      continue;
    }
    try {
      parseISODateOnly(t);
    } catch {
      bad.push(t);
      continue;
    }
    if (seen.has(t)) continue;
    seen.add(t);
    ok.push(t);
  }
  return { ok, bad };
}

/** Friendly calendar phrase from `YYYY-MM-DD` (UTC date parts), e.g. "May 8th". */
export function formatDateWarm(iso: string): string {
  let d: Date;
  try {
    d = parseISODateOnly(iso);
  } catch {
    return iso;
  }
  const month = d.toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const day = d.getUTCDate();
  const ord =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  return `${month} ${day}${ord}`;
}

export type CyclePhaseKey =
  | "menstrual"
  | "follicular"
  | "ovulation"
  | "luteal"
  | "unknown";

export type CyclePhaseInfo = {
  key: CyclePhaseKey;
  label: string;
  seasonHint: string;
};

/** Approximate phases using a ~14-day luteal model (common rule-of-thumb, not medical). */
export function getCyclePhase(
  cycleDay: number,
  cycleLength: number,
): CyclePhaseInfo {
  if (cycleDay < 1 || cycleLength < 18) {
    return {
      key: "unknown",
      label: "Getting oriented",
      seasonHint:
        "Wild Power names four inner seasons; this app only sketches them from dates. Log a few bleeds and your rhythm can feel less abstract — the hints deepen as the map learns you.",
    };
  }

  const L = Math.max(18, Math.min(45, cycleLength));
  const ovulationPeak = Math.max(8, L - 14);
  const mEnd = Math.min(5, Math.floor(L * 0.22));

  if (cycleDay <= mEnd) {
    return {
      key: "menstrual",
      label: "❄️ Inner winter",
      seasonHint:
        "Winter is the descent, not to be misinterpreted as failure: less output, more contact with what is underneath the to-do list. The world’s volume can feel too high; lying fallow is how the ground refertilises. If you can, protect the cave: smaller circles, fewer performances, permission to not know the answer yet. It will all be there when you reemrge from self care. & much needed hibernation.",
    };
  }
  if (cycleDay < ovulationPeak - 1) {
    return {
      key: "follicular",
      label: "🌸 Inner spring",
      seasonHint:
        "Spring is emergence after the dark: ideas start to land, voice and focus return, there is a forward lean. You're ready to 'leave the 'comfort cave' and step into growing light. Plans and ‘what if …’ energy is in the air; listen to it with gentle curiosity rather than judgement. It is a good window to seed what you will not have bandwidth to invent in high summer. Treating yourself with care now ensures you have the 'solidity and fortitude' needed for the high-intensity inner summer but make sure to keep your 'inner critic' at bay. ",
    };
  }
  if (cycleDay <= ovulationPeak + 1) {
    return {
      key: "ovulation",
      label: "☀️ Inner summer",
      seasonHint:
        "Summer is outward radiance: being seen, felt, and heard can come more easily; connection, pleasure, and creative heat often peak. A 'time of fullness and expression ... boundless life-force moving through you toward the world. Enjoy your sensuality, initiate difficult conversations when the opportunity is right as you are less likely to feel triggered or defensive at this time, cultivate a healthy ego & ride it without assuming or planning for it to last all month.",
    };
  }
  return {
    key: "luteal",
    label: "🍂 Inner autumn",
    seasonHint:
      "Autumn is the strip-back: what is true, what is noise, what you have been carrying for everyone else. A sharper inner ‘no’, dreams and moods that carry messages, and the need to tell the truth before you snap. Meet the inner commentator with curiosity, not shame. She often points at a boundary that needed saying weeks ago. ♥️ She's contains powerful magic capable of setting you free.",
  };
}

export function averageCycleLengthFromStarts(
  startsDesc: Date[],
  fallback: number,
): number {
  if (startsDesc.length < 2) return clampCycleLength(fallback);
  const gaps: number[] = [];
  for (let i = 0; i < startsDesc.length - 1; i++) {
    const older = startsDesc[i + 1];
    const newer = startsDesc[i];
    gaps.push(utcDaysBetween(older, newer));
  }
  const recent = gaps.slice(0, 6).filter((g) => g >= 18 && g <= 45);
  if (recent.length === 0) return clampCycleLength(fallback);
  const avg = recent.reduce((s, g) => s + g, 0) / recent.length;
  return Math.round(avg);
}

export function clampCycleLength(n: number): number {
  if (!Number.isFinite(n)) return 28;
  return Math.min(45, Math.max(21, Math.round(n)));
}

export function currentCycleDay(lastPeriodStart: Date, today: Date): number {
  const d = utcDaysBetween(lastPeriodStart, today);
  return d + 1;
}

export function addDaysUTC(d: Date, days: number): Date {
  const x = new Date(d.getTime());
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}
