/*
Pattern Recognition Audit

File reviewed: intern-service.ts

1. Is there any object that is created more than once but should be shared?
   → Possible Singleton? No — Reason:
   The file mainly contains stateless service methods and does not repeatedly
   create an object that should be shared.

2. Is there any conditional block (if/else or switch) that creates different objects
   based on a type or string value?
   → Possible Factory? No — Reason:
   The file does not create different implementations based on a type or string.

3. If a pattern applies: what would the refactored structure look like in one sentence?
   → Not applicable for this file.

4. If no pattern applies: what is missing that would make the pattern unnecessary complexity here?
   → The file has no repeated shared object creation or polymorphic object creation,
     so introducing Singleton or Factory would add unnecessary complexity.
*/

/*
Task 3.1 Comment

The three report generators are different objects, but they all write to the
same Logger Singleton. Without the Singleton pattern, I would need to create
one Logger object and pass it into every report generator through a constructor
or method parameter so that they all shared the same logger.
*/


class Logger {
  private static instance: Logger | null = null;

  private logs: string[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string): void {
    const entry = `[${new Date().toISOString()}] ${message}`;

    this.logs.push(entry);

    console.log(entry);
  }

  public getLogs(): string[] {
    return [...this.logs];
  }
}


interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `CSVReportGenerator: generated report with ${data.length} rows`
    );

    if (data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]).join(",");

    const rows = data.map((row) => Object.values(row).join(","));

    return [headers, ...rows].join("\n");
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `JSONReportGenerator: generated report with ${data.length} rows`
    );

    return JSON.stringify(data, null, 2);
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `HTMLReportGenerator: generated report with ${data.length} rows`
    );

    if (data.length === 0) {
      return "<table></table>";
    }

    const headers =
      "<tr>" +
      Object.keys(data[0])
        .map((header) => `<th>${header}</th>`)
        .join("") +
      "</tr>";

    const rows = data
      .map(
        (row) =>
          "<tr>" +
          Object.values(row)
            .map((value) => `<td>${value}</td>`)
            .join("") +
          "</tr>"
      )
      .join("");

    return `<table>${headers}${rows}</table>`;
  }
}

function createReportGenerator(format: string): ReportGenerator {
  switch (format.toLowerCase()) {
    case "csv":
      return new CSVReportGenerator();

    case "json":
      return new JSONReportGenerator();

    case "html":
      return new HTMLReportGenerator();

    default:
      throw new Error(
        `createReportGenerator: unknown format '${format}', expected one of: csv, json, html`
      );
  }
}


const data = [
  {
    name: "Alice",
    score: 91,
    department: "Backend",
  },
  {
    name: "Bob",
    score: 84,
    department: "Frontend",
  },
];

const csv = createReportGenerator("csv");
const json = createReportGenerator("json");
const html = createReportGenerator("html");

console.log("\n===== CSV =====");
console.log(csv.generate(data));

console.log("\n===== JSON =====");
console.log(json.generate(data));

console.log("\n===== HTML =====");
console.log(html.generate(data));

console.log("\n===== Logger Output =====");
console.log(Logger.getInstance().getLogs());


/*
=========================================
Section 4 - Explore
=========================================

Explore 1 - Thread Safety and Singleton

In a multi-threaded environment, two threads could call getInstance() at the
same time when the instance is still null. Both threads might create separate
instances before either one assigns the instance, breaking the Singleton pattern.

Double-checked locking is a technique used to prevent this race condition by
checking the instance before and after acquiring a lock.

This problem generally does not apply to Node.js because JavaScript executes on
a single-threaded event loop. Only one piece of JavaScript code runs at a time,
so two threads cannot normally execute getInstance() simultaneously.


Explore 2 - Factory Function vs Factory Class

A Factory class can provide the same object creation logic as a factory
function, but it can also store configuration, dependencies, or internal state.

A factory function is a good choice when object creation is simple.

A Factory class is a better choice when object creation becomes more complex,
needs configuration, or should be extended in larger applications.


Explore 3 - Null Object Pattern

Instead of throwing an error for an unknown notification type, the factory
could return a NoOpNotifier that implements the Notifier interface but performs
no action.

A NoOpNotifier is useful when notifications are optional and the application
should continue even if a notification type is unavailable.

Throwing an error is safer when an unknown notification type indicates a bug
or invalid configuration because it immediately exposes the problem.


Explore 4 - Module Singleton vs Class Singleton

A module-level Singleton uses Node.js module caching to provide one shared
instance across the application.

A class-based Singleton provides better encapsulation, lazy initialization,
and supports object-oriented features such as methods, inheritance, and
interfaces.

Module-level state is simpler for small utilities, while a class-based
Singleton is more appropriate for larger object-oriented applications.
*/