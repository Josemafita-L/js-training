/*
If the constructor were public, anyone could create multiple Logger objects
using new Logger(). That would break the Singleton pattern because different
parts of the application could use different Logger instances with separate
log histories. I would detect the problem by creating multiple Logger objects
and observing that they are different instances with different logs.
*/

class Logger {
  // Stores the single Logger instance
  private static instance: Logger | null = null;

  // Stores log entries
  private logs: string[] = [];

  // Private constructor prevents direct object creation
  private constructor() {}

  // Returns the single Logger instance
  public static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  // Stores and prints a log message with timestamp
  public log(message: string): void {
    const entry = `[${new Date().toISOString()}] ${message}`;

    this.logs.push(entry);

    console.log(entry);
  }

  // Returns a copy of the logs
  public getLogs(): string[] {
    return [...this.logs];
  }
}

// --------------------
// Task 1.1 Test
// --------------------

const a = Logger.getInstance();
const b = Logger.getInstance();

a.log("system started");
b.log("request received");

console.log("Are both objects the same?", a === b);
console.log("Number of logs:", a.getLogs().length);
console.log("All logs:", a.getLogs());

/*
Why does the second test get the wrong result?

The Logger is a Singleton, so both tests use the same Logger instance.
The logs created in the first test remain in memory and affect the second
test. This breaks test isolation because one test changes the state used
by another.

In a real test suite, I would add a clearLogs() or reset() method so that
each test starts with a fresh Logger state.
*/

// --------------------
// Task 1.3
// --------------------

function testLoggerStartsEmpty() {
  const logger = Logger.getInstance();

  logger.log("left over from a previous operation");

  const fresh = Logger.getInstance();

  console.log("Logs should be empty:", fresh.getLogs());
}

function testLoggerCountsCorrectly() {
  const logger = Logger.getInstance();

  logger.log("entry one");

  console.log("Expected 1 log, got:", logger.getLogs().length);
}

testLoggerStartsEmpty();
testLoggerCountsCorrectly();