import { NextFunction, Request, Response } from "express";
import { AssetService } from "../../application/services/asset_service";
import { IAssetRepository } from "../../domain/irepositories/iasset";
import { getDatabaseInstance } from "../../infrastructure/database/database_connector";
import { AssetRepositories } from "../../infrastructure/repositories/asset_repositories";
import { WhereClauseCondition } from "../../types/where_clause_condition";
import { buildWhereClause } from "../../helper/where_clause_builder";
import { Pagination } from "../../types/pagination";

export class AssetController {
  assetService: AssetService;

  constructor(assetService: AssetService) {
    this.assetService = assetService;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const db = getDatabaseInstance();
    let {
      page = "1",
      pagesize = "10",
      sortKey = "name",
      sortOrder = "asc",
      id,
      assetnum,
      description,
    }: {
      page?: string;
      pagesize?: string;
      sortKey?: string;
      sortOrder?: string;
      id?: string;
      assetnum?: string;
      description?: string;
    } = req.query;

    let pageNumber = parseInt(page, 10);
    let pageSize = parseInt(pagesize, 10);
    pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
    pageSize = isNaN(pageSize) || pageSize < 1 ? 10 : pageSize;

    const offset = (pageNumber - 1) * pageSize;

    sortOrder = sortOrder === "asc" || sortOrder === "desc" ? sortOrder : "asc";

    const conditions: WhereClauseCondition[] = [
      { column: "a.id", value: id },
      {
        column: "a.assetname",
        operator: "ILIKE",
        value: assetnum,
        wildcard: true,
      },
      {
        column: "a.description",
        operator: "ILIKE",
        value: description,
        wildcard: true,
      },
    ];

    const { whereClause, params } = buildWhereClause(conditions);

    const pagination: Pagination = {
      whereClause,
      sortKey,
      sortOrder,
      params,
      pageSize,
      offset,
    };

    try {
      const result = await this.assetService.getAll(pagination);

      const totalQuery = `SELECT COUNT(*) FROM "Categories" ${whereClause};`;
      const totalResult = await db.query(totalQuery, params);
      const totalAssets = parseInt(totalResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalAssets / pageSize);
      const hasMore = pageNumber < totalPages;
      const nextPage = hasMore ? pageNumber + 1 : null;

      return res.status(200).json({
        data: result,
        meta: {
          totalAssets,
          totalPages,
          currentPage: pageNumber,
          hasMore,
          nextPage,
        },
      });
    } catch (error) {
      console.error("Error fetching assets:", error);
      next(error);
    }
  }
}
