export type WhereClauseCondition = {
  column: string;
  operator?: string; // Default to '=' or can be 'ILIKE', etc.
  value: any;
  wildcard?: boolean; // To handle wildcard wrapping for LIKE queries
};
