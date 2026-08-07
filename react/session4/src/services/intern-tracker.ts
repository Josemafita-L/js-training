export interface Intern {
  id: number;
  name: string;
  score: number;
}

class InternTracker {
  // Private fields
  #interns: Intern[] = [];
  #apiUrl: string = "/api/interns";
  #lastFetchedAt: Date = new Date(0);
  #localCache: Map<number, Intern> = new Map();

  // Public method
  async loadAll(): Promise<void> {
    const response = await fetch(this.#apiUrl);
    this.#interns = await response.json();

    this.#lastFetchedAt = new Date();

    this.#interns.forEach((intern) => {
      this.#updateCache(intern);
    });
  }

  // Public method
  getAll(): readonly Intern[] {
    return this.#interns;
  }

  // Public method
  getById(id: number): Intern | undefined {
    return this.#localCache.get(id);
  }
  updateScore(internId: number, score: number): void {
  // Validate score
  if (score < 0 || score > 100) {
    throw new RangeError("Score must be between 0 and 100");
  }

  // Find the intern
  const intern = this.#interns.find(
    (intern) => intern.id === internId
  );

  if (!intern) {
    throw new Error("Intern not found");
  }

  // Update score
  intern.score = score;

  // Update cache
  this.#updateCache(intern);
}

  // Private helper
  #buildUrl(id: number): string {
    return `${this.#apiUrl}/${id}`;
  }

  // Private helper
  #updateCache(intern: Intern): void {
    this.#localCache.set(intern.id, intern);
  }
}

export type { Intern };
export { InternTracker };