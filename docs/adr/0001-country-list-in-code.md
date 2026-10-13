# 0001 · The country list lives in code

## Context

parseAddress has to refuse an address whose country does not exist.
That needs the ISO 3166-1 list, and the list has to come from somewhere.

## Options

1. A dependency: maintained by someone else, but every upgrade is a
   supply-chain change to review.
2. A lookup service: always current, but parsing would need the network.
3. A table in code, generated once from the CLDR data that ships with Node.

## Decision

Option 3. src/countries.ts holds 249 entries, and a test pins the count.

## Consequences

- No new dependency and no network call.
- When ISO 3166 changes, someone regenerates the table on purpose.
