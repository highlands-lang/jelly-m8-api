import type { QuerySort } from "@/lib/types/types";
import { asc, desc } from "drizzle-orm";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";

interface SortQueryBuilderParams<T> extends QuerySort<T> {
	// biome-ignore lint/suspicious/noExplicitAny: <Needs fixing, complex type>
	table: PgTableWithColumns<any>;
}

export const constructSortQuery = <T>(params: SortQueryBuilderParams<T>) => {
	const { table, asc: ascCols, desc: descCols } = params;

	const sort = [];
	if (Array.isArray(ascCols)) {
		for (const k of ascCols) {
			// biome-ignore lint/suspicious/noExplicitAny: <Needs fixing, complex type>
			sort.push(asc(table[k as any]));
		}
	}
	if (Array.isArray(descCols)) {
		for (const k of descCols) {
			// biome-ignore lint/suspicious/noExplicitAny: <Needs fixing, complex type>
			sort.push(desc(table[k as any]));
		}
	}
	return sort;
};
