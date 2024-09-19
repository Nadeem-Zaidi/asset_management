import { Asset } from "../../domain/entities/asset";
import { IAssetRepository } from "../../domain/irepositories/iasset";
import { getDatabaseInstance } from "../../infrastructure/database/database_connector";
import { AssetRepositories } from "../../infrastructure/repositories/asset_repositories";
import { Pagination } from "../../types/pagination";

export class AssetService {
  assetRepository: IAssetRepository;

  constructor() {
    this.assetRepository = new AssetRepositories(getDatabaseInstance());
  }

  async getAll(pagination: Pagination): Promise<Asset[]> {
    const assets: Asset[] = await this.assetRepository.getAll(pagination);
    return assets;
  }
}
