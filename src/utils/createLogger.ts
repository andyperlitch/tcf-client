export function createLogger(name: string) {
  return {
    log: console.log.bind(console, `%c[${name}]`, "color: steelblue;"),
    error: console.error.bind(console, `%c[${name}]`, "color: crimson;"),
    warn: console.warn.bind(console, `%c[${name}]`, "color: orange;"),
    info: console.info.bind(console, `%c[${name}]`, "color: teal;"),
    debug: console.debug.bind(console, `%c[${name}]`, "color: purple;"),
    trace: console.trace.bind(console, `%c[${name}]`, "color: gray;"),
  };
}
