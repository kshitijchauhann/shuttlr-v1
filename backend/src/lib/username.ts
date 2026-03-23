/**
 * Generates a unique username from a display name.
 *
 * Strategy:
 * 1. Normalise the name → lowercase, only alphanumeric chars, spaces → underscores.
 * 2. Trim to a max of 15 chars so the final handle stays readable.
 * 3. Append a random 4-digit numeric suffix to reduce collision probability.
 *
 * Example: "Kshitij Chauhan" → "kshitij_chauhan_4821"
 */
export function generateUsername(name: string): string {
    const base = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, "")   // strip non-alphanumeric (except spaces)
        .replace(/\s+/g, "_")           // spaces → underscores
        .slice(0, 15)                   // keep it short
        .replace(/_+$/, "");            // remove trailing underscores after slice

    const suffix = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    return `${base}_${suffix}`;
}
