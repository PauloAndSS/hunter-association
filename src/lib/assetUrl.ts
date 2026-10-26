/** Resolves a public-folder asset path against Vite's configured base (needed for GitHub Pages project sites). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
}
