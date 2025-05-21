export class ConsoleFilter {
  constructor(filterPatterns = []) {
    this.filterPatterns = filterPatterns;
    this.originalMethods = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug
    };
    
    this.active = false;
  }
  
  // Add patterns to filter
  addFilter(pattern) {
    if (pattern instanceof RegExp) {
      this.filterPatterns.push(pattern);
    } else {
      this.filterPatterns.push(new RegExp(pattern, 'i'));
    }
    
    // Reapply filters if already active
    if (this.active) {
      this.enable();
    }
    
    return this;
  }
  
  // Remove a pattern from filters
  removeFilter(pattern) {
    const patternStr = pattern instanceof RegExp ? pattern.toString() : pattern;
    this.filterPatterns = this.filterPatterns.filter(p => p.toString() !== patternStr);
    
    // Reapply filters if already active
    if (this.active) {
      this.enable();
    }
    
    return this;
  }
  
  // Clear all filters
  clearFilters() {
    this.filterPatterns = [];
    
    // Reapply filters if already active
    if (this.active) {
      this.enable();
    }
    
    return this;
  }
  
  // Check if a message should be filtered
  shouldFilter(args) {
    if (this.filterPatterns.length === 0) return false;
    
    return args.some(arg => {
      const stringArg = String(arg);
      return this.filterPatterns.some(pattern => stringArg.match(pattern));
    });
  }
  
  // Enable the console filter
  enable() {
    // Store original methods if not already stored
    this.originalMethods = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug
    };
    
    // Override console methods
    console.log = (...args) => {
      if (!this.shouldFilter(args)) {
        this.originalMethods.log.apply(console, args);
      }
    };
    
    console.error = (...args) => {
      if (!this.shouldFilter(args)) {
        this.originalMethods.error.apply(console, args);
      }
    };
    
    console.warn = (...args) => {
      if (!this.shouldFilter(args)) {
        this.originalMethods.warn.apply(console, args);
      }
    };
    
    console.info = (...args) => {
      if (!this.shouldFilter(args)) {
        this.originalMethods.info.apply(console, args);
      }
    };
    
    console.debug = (...args) => {
      if (!this.shouldFilter(args)) {
        this.originalMethods.debug.apply(console, args);
      }
    };
    
    this.active = true;
    return this;
  }
  
  // Disable the console filter
  disable() {
    // Restore original console methods
    Object.keys(this.originalMethods).forEach(method => {
      console[method] = this.originalMethods[method];
    });
    
    this.active = false;
    return this;
  }
  
  // Toggle the filter on/off
  toggle() {
    return this.active ? this.disable() : this.enable();
  }
}

export default ConsoleFilter;