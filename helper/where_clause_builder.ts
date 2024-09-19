import { WhereClauseCondition } from "../types/where_clause_condition";

export function buildWhereClause(
  conditions: WhereClauseCondition[],
  withAlias?: string
) {
  const whereConditions: string[] = [];
  const params: any[] = [];

  conditions.forEach(({ column, operator = "=", value, wildcard }) => {
    if (value !== undefined && value !== null) {
      // Handle wildcard for LIKE/ILIKE queries
      const paramValue = wildcard ? `%${value}%` : value;

      // Handle IN clause if value is an array
      if (Array.isArray(value)) {
        const placeholders = value
          .map((_, index) => `$${params.length + index + 1}`)
          .join(", ");
        whereConditions.push(`${column} IN (${placeholders})`);
        params.push(...value);
      } else {
        whereConditions.push(`${column} ${operator} $${params.length + 1}`);
        params.push(paramValue);
      }
    }
  });

  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

  return { whereClause, params };
}
