import { WorkOrder } from "./workorder";
import { Locations } from "./location"; // Make sure to import Location class

export class Asset {
  id: string;
  assetnum: string;
  description: string;
  location: Locations;
  workorder: WorkOrder[];

  constructor(
    id: string,
    assetnum: string,
    description: string,
    location: Locations,
    workorder: WorkOrder[]
  ) {
    this.id = id;
    this.assetnum = assetnum;
    this.description = description;
    this.location = location;
    this.workorder = workorder;
  }

  static fromJson(json: any): Asset {
    return new Asset(
      json.id,
      json.assetnum,
      json.description,
      Locations.fromJson(json.location), // Use Location's fromJson method here
      json.workorder.map((wo: any) => WorkOrder.fromJson(wo)) // assuming WorkOrder has a fromJson method
    );
  }
}
