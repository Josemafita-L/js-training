import { useState } from "react";
import type { Intern } from "../types/intern";

export function useInternRepository() {
  const [interns, setInterns] = useState<Intern[]>([]);

  const add = (intern: Intern): void => {
    setInterns(prev => [...prev, intern]);
  };

  const remove = (id: number): void => {
  setInterns(prev => {
    const internExists = prev.some(
      intern => intern.id === id
    );

    if (!internExists) {
      throw new Error(
        `removeIntern: no intern found with id=${id}`
      );
    }

    return prev.filter(
      intern => intern.id !== id
    );
  });
};
// Fail Fast change:
//
// Before:
// remove() silently ignored missing intern IDs.
//
// After:
// remove() throws immediately when the requested intern
// does not exist.
//
// Impact:
// Callers no longer need to guess whether the removal succeeded.

  const update = (intern: Intern): void => {
    setInterns(prev =>
      prev.map(i => (i.id === intern.id ? intern : i))
    );
  };

  return {
    interns,
    add,
    remove,
    update,
  };
}