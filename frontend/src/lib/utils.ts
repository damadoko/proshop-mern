import { pipe, split, map, last, fromPairs } from "lodash/fp";

// ?qty=1&test=2
export const parseSearch = pipe(
  split("?"),
  last,
  split("&"),
  map(split("=")),
  fromPairs
);
