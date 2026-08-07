export interface ISessionLogger {
  record(id: number): void;

  isPresent(id: number): boolean;

  getCount(): number;

  getAttendeeIds(): readonly number[];
}

export class SessionLogger implements ISessionLogger {
  #attendees = new Set<number>();

  record(id: number): void {
    this.#attendees.add(id);
  }

  isPresent(id: number): boolean {
    return this.#attendees.has(id);
  }

  getCount(): number {
    return this.#attendees.size;
  }

  getAttendeeIds(): readonly number[] {
    return [...this.#attendees];
  }
}