import type { QuerySort } from "@/lib/types/types";
import { asc, desc } from "drizzle-orm";
import { PgTableWithColumns } from "drizzle-orm/pg-core";

interface SortQueryBuilderParams<T> extends QuerySort<T> {
  table: PgTableWithColumns<any>;
}

export const constructSortQuery = <T>(params: SortQueryBuilderParams<T>) => {
  const { table, asc: ascCols, desc: descCols } = params;

  const sort = [];
  if (Array.isArray(ascCols)) {
    for (const k of ascCols) {
      sort.push(asc(table[k as any]));
    }
  }
  if (Array.isArray(descCols)) {
    for (const k of descCols) {
      sort.push(desc(table[k as any]));
    }
  }
  return sort;
};
