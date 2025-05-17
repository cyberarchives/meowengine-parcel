/**
 * CustomLogs - A customizable logger for browser environments
 * Features:
 * - Colored log outputs based on log level
 * - Customizable app title
 * - Timestamp prefixing
 * - Multiple log levels (debug, info, warn, error, success)
 * - Log filtering by minimum level
 * - Group logging support
 * - Ability to disable logs
 */
export class CustomLogs {
  // Available log levels
  static LEVELS = {
    DEBUG: { name: "DEBUG", priority: 0, color: "#9B9B9B" },
    INFO: { name: "INFO", priority: 1, color: "#3498DB" },
    WARN: { name: "WARN", priority: 2, color: "#F39C12" },
    ERROR: { name: "ERROR", priority: 3, color: "#E74C3C" },
    SUCCESS: { name: "SUCCESS", priority: 4, color: "#2ECC71" },
    JOIN: { name: "JOIN", priority: 5, color: "#9B59B6" }, // Purple for joins
    LEAVE: { name: "LEAVE", priority: 5, color: "#34495E" },
    MEOW: { name: "MEOW", priority: 6, color: "#00ffaa" },
  };

  /**
   * Creates a new logger instance
   * @param {Object} options - Logger configuration options
   * @param {string} options.title - The log title that appears in brackets
   * @param {string} options.minLevel - Minimum log level to display (DEBUG, INFO, WARN, ERROR, SUCCESS)
   * @param {boolean} options.enabled - Whether logging is enabled
   * @param {boolean} options.showTimestamp - Whether to show timestamp in logs
   */
  constructor(options = {}) {
    this.title = options.title || "APP";
    this.minLevel = options.minLevel
      ? CustomLogs.LEVELS[options.minLevel]
      : CustomLogs.LEVELS.DEBUG;
    this.enabled = options.enabled !== undefined ? options.enabled : true;
    this.showTimestamp =
      options.showTimestamp !== undefined ? options.showTimestamp : true;
  }

  /**
   * Format the current time for the log
   * @returns {string} Formatted time string
   */
  _getTimestamp() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  /**
   * Create the log prefix with appropriate styling
   * @param {Object} level - The log level object
   * @returns {Array} Arguments array for console.log with styling
   */
  _formatLogPrefix(level) {
    const parts = [];
    let formatString = "";

    // Add timestamp if enabled
    if (this.showTimestamp) {
      formatString += "%c[%s]";
      parts.push("color: #888; font-weight: bold;", this._getTimestamp());
    }

    // Add title
    formatString += "%c[%s]";
    parts.push(`color: #444; font-weight: bold;`, this.title);

    // Add log level
    formatString += "%c[%s]:%c";
    parts.push(
      `color: ${level.color}; font-weight: bold;`,
      level.name,
      "color: inherit;"
    );

    return [formatString, ...parts];
  }

  /**
   * Internal logging method
   * @param {Object} level - The log level object
   * @param {Array} args - Arguments to log
   */
  _log(level, ...args) {
    // Skip if logging is disabled or below minimum level
    if (!this.enabled || level.priority < this.minLevel.priority) {
      return;
    }

    const logPrefix = this._formatLogPrefix(level);
    console.log(...logPrefix, ...args);
  }

  /**
   * Log a user join event with special formatting
   * @param {string} username - The user who joined
   * @param {Object} [details] - Optional details about the join event
   */
  join(username, details = {}) {
    const message = `${username} joined`;

    if (Object.keys(details).length > 0) {
      this._log(CustomLogs.LEVELS.JOIN, message, details);
    } else {
      this._log(CustomLogs.LEVELS.JOIN, message);
    }
  }

  /**
   * Log a user leave event with special formatting
   * @param {string} username - The user who left
   * @param {string} [reason] - Optional reason for leaving
   * @param {Object} [details] - Optional details about the leave event
   */
  leave(username, reason = "", details = {}) {
    let message = `${username} left`;
    if (reason) {
      message += ` (${reason})`;
    }

    if (Object.keys(details).length > 0) {
      this._log(CustomLogs.LEVELS.LEAVE, message, details);
    } else {
      this._log(CustomLogs.LEVELS.LEAVE, message);
    }
  }

  /**
   * Log a debug message
   * @param {...any} args - Items to log
   */
  debug(...args) {
    this._log(CustomLogs.LEVELS.DEBUG, ...args);
  }

  /**
   * Log an info message
   * @param {...any} args - Items to log
   */
  info(...args) {
    this._log(CustomLogs.LEVELS.INFO, ...args);
  }

  /**
   * Log a warning message
   * @param {...any} args - Items to log
   */
  warn(...args) {
    this._log(CustomLogs.LEVELS.WARN, ...args);
  }

  /**
   * Log an error message
   * @param {...any} args - Items to log
   */
  error(...args) {
    this._log(CustomLogs.LEVELS.ERROR, ...args);
  }

  /**
   * Log a success message
   * @param {...any} args - Items to log
   */
  success(...args) {
    this._log(CustomLogs.LEVELS.SUCCESS, ...args);
  }

  /**
   * Create a log group with the logger's styling
   * @param {string} groupName - Name of the group
   * @param {Object} level - Log level for the group
   * @param {Function} callback - Function to execute within the group
   */
  group(groupName, level = CustomLogs.LEVELS.INFO, callback) {
    if (!this.enabled || level.priority < this.minLevel.priority) {
      return;
    }

    const logPrefix = this._formatLogPrefix(level);
    console.groupCollapsed(...logPrefix, groupName);

    if (typeof callback === "function") {
      callback();
    }

    console.groupEnd();
  }

  /**
   * Set the minimum log level
   * @param {string} levelName - Level name (DEBUG, INFO, WARN, ERROR, SUCCESS)
   */
  setMinLevel(levelName) {
    if (CustomLogs.LEVELS[levelName]) {
      this.minLevel = CustomLogs.LEVELS[levelName];
    }
  }

  /**
   * Enable or disable logging
   * @param {boolean} enabled - Whether logging should be enabled
   */
  setEnabled(enabled) {
    this.enabled = !!enabled;
  }

  /**
   * Change the logger title
   * @param {string} title - New title for logs
   */
  setTitle(title) {
    this.title = title;
  }
}

// Export for use in modules
export default CustomLogs;
