export function createLogger(name: string) {
  return {
    log: console.log.bind(console, `[${name}]`),
    error: console.error.bind(console, `[${name}]`),
    warn: console.warn.bind(console, `[${name}]`),
    info: console.info.bind(console, `[${name}]`),
    debug: console.debug.bind(console, `[${name}]`),
    trace: console.trace.bind(console, `[${name}]`),
  };
}
