import { Asset } from "../entities/asset";
import { IRepositories } from "./irepository";

export interface AssetRepository extends IRepositories<Asset> {}
