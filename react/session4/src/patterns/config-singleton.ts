/*
If ConfigManager.get() returns an empty string for a missing key instead of
throwing an error, it becomes a silent failure. The application continues
running with invalid or missing configuration, making bugs harder to detect.
Throwing an error follows the Fail Fast principle because it immediately
reveals the problem and prevents the application from continuing with
incorrect data.
*/

class ConfigManager {
  // Stores the single ConfigManager instance
  private static instance: ConfigManager | null = null;

  // Stores configuration values
  private config: Record<string, string> = {};

  // Private constructor
  private constructor() {
    this.config["env"] = "development";
    this.config["version"] = "1.0.0";
    this.config["appName"] = "Intern Dashboard";
  }

  // Returns the single ConfigManager instance
  public static getInstance(): ConfigManager {
    if (ConfigManager.instance === null) {
      ConfigManager.instance = new ConfigManager();
    }

    return ConfigManager.instance;
  }

  // Stores a configuration value
  public set(key: string, value: string): void {
    this.config[key] = value;
  }

  // Returns a configuration value
  public get(key: string): string {
    if (!(key in this.config)) {
      throw new Error(`Configuration key '${key}' does not exist.`);
    }

    return this.config[key];
  }
}

// --------------------
// Task 1.2 Test
// --------------------

const config = ConfigManager.getInstance();

config.set("apiUrl", "http://localhost:3001");

const sameConfig = ConfigManager.getInstance();

console.log("API URL:", sameConfig.get("apiUrl"));
console.log("Environment:", sameConfig.get("env"));
console.log("Version:", sameConfig.get("version"));
console.log("App Name:", sameConfig.get("appName"));
console.log("Are both objects the same?", config === sameConfig);

// Uncomment this line to test the Fail Fast behavior
// console.log(config.get("database"));