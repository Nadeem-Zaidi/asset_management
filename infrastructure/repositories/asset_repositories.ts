import { Asset } from "../../domain/entities/asset";
import { IAssetRepository } from "../../domain/irepositories/iasset";
import { Pagination } from "../../types/pagination";
import { Database } from "../database/database";

export class AssetRepositories implements IAssetRepository {
  db: Database;
  constructor(db: Database) {
    this.db = db;
  }
  async getAll(pagination: Pagination): Promise<Asset[]> {
    const { whereClause, sortKey, sortOrder, params, pageSize, offset } =
      pagination;
    const fetchQuery = `SELECT json_build_object(
                                'id', a.id,
                                'assetnum',a.assetnum,
                                'description', a.description,
                                'location', l.location,
                                'workorders', COALESCE(
                                    json_agg(
                                        json_build_object(
                                            'id', wo.id,
                                            'wonum', wo.wonum,
                                            'description', wo.description
                                        )
                                    ) FILTER (WHERE wo.id IS NOT NULL),
                                    '[]'
                                )
                            ) AS assets
                        FROM "asset" a
                        LEFT JOIN locations l ON a."locationId" = l.id
                        LEFT JOIN workorder wo ON wo."assetId" = a.id
                        ${whereClause}
                        GROUP BY a.id,l.location
                        ORDER BY p.${sortKey} ${sortOrder}
                        LIMIT $${params.length + 1} 
                        OFFSET $${params.length + 2}
                        `;
    const fetchParams = [...params, pageSize, offset];
    const results = await this.db.query(fetchQuery, fetchParams);
    const assets: Asset[] = results.rows.map((row: any) =>
      Asset.fromJson(row.assets)
    );
    return assets;
  }
  getById(id: string): Promise<Asset | null> {
    throw new Error("Method not implemented.");
  }
}
