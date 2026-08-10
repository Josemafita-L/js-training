/*
Task 2.1 Comment

The caller only depends on the ReportGenerator interface and the
createReportGenerator() factory function. It does not need to know about
CSVReportGenerator, JSONReportGenerator, or HTMLReportGenerator.

Without the factory, the caller would have to create the correct class using
multiple if/else or switch statements. If there were five report formats,
the caller would become more complex and harder to maintain.
*/

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    if (data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]).join(",");

    const rows = data.map((row) =>
      Object.values(row).join(",")
    );

    return [headers, ...rows].join("\n");
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    return JSON.stringify(data, null, 2);
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
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
  { name: "Alice", score: 91, department: "Backend" },
  { name: "Bob", score: 84, department: "Frontend" },
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

/*
Task 2.2 Comment

The send() call is identical for every notification type because every
class implements the Notifier interface. The caller depends only on the
interface and not on the concrete implementation.

Without the interface, the loop would need to know which concrete class
to create and would likely contain if/else or switch statements.
*/


interface Notifier {
  send(recipient: string, message: string): void;
}

class EmailNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Email] To: ${recipient} — ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[SMS] To: ${recipient} — ${message}`);
  }
}

class PushNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Push] To: ${recipient} — ${message}`);
  }
}
class SlackNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Slack] To: ${recipient} — ${message}`);
  }
}

function createNotifier(channel: string): Notifier {
  switch (channel.toLowerCase()) {
    case "email":
      return new EmailNotifier();

    case "sms":
      return new SMSNotifier();

    case "push":
      return new PushNotifier();

    case "slack":
      return new SlackNotifier();

    default:
      throw new Error(
        `createNotifier: unknown channel '${channel}'`
      );
  }
}

const channels = ["email", "sms", "push", "slack"];

for (const channel of channels) {
  const notifier = createNotifier(channel);

  notifier.send(
    "user@example.com",
    "Your order has been confirmed."
  );
}

/*
Task 2.3 Comment

To support SlackNotifier, I only changed two existing parts:
1. Added one new case to the createNotifier() factory.
2. Added "slack" to the channels array.

The rest of the application remained unchanged. This shows that the
Factory pattern makes the system easy to extend with new implementations
while minimizing changes to existing code.
*/