interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

export function calculateInternStats(interns: Intern[]) {
  return {
    total: interns.length,
    present: interns.filter((intern) => intern.isPresent).length,
    avg:
      interns.length > 0
        ? Math.round(
            interns.reduce((sum, intern) => sum + intern.score, 0) /
              interns.length
          )
        : 0,
  };
}