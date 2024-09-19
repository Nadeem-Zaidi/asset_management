import { Asset } from "../entities/asset";
import { IRepositories } from "./irepository";

export interface IAssetRepository extends IRepositories<Asset> {}
