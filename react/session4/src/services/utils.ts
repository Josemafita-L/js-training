function buildCacheKey(id: number): string {
  return `intern-${id}`;
}

function isValidScore(score: number): boolean {
  return score >= 0 && score <= 100;
}

export {};