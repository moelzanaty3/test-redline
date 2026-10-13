## Errors are returned, not logged

This service is a library: the code that calls it decides what to log and where.

- `local/no-console` — No `console.*` calls in `src/`. Throw an `Error` with a message that says what was wrong, and let the caller log it.

## Exports are named

Callers import from this library by name. A default export can be imported under any name, so a search for it misses callers.

- `local/no-default-export` — No `export default` in `src/`. Export the function or type by name.
