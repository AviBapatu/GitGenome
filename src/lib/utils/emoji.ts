/**
 * Emoji mapping for creatures and archetypes
 */

const CREATURE_EMOJI_MAP: Record<string, string> = {
  "Owl": "🦉",
  "Raccoon": "🦝",
  "Gremlin": "👹",
  "Beaver": "🦫"
};

const ARCHETYPE_EMOJI_MAP: Record<string, string> = {
  "Night Owl": "🦉",
  "Framework Collector": "🦝",
  "Chaos Builder": "👹",
  "Builder Beaver": "🦫"
};

export function getArchetypeEmoji(archetyplName: string): string {
  return ARCHETYPE_EMOJI_MAP[archetyplName] || "🧬";
}

export function getCreatureEmoji(creature: string): string {
  return CREATURE_EMOJI_MAP[creature] || "🧬";
}
