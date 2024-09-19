export class WorkOrder {
  id: string;
  wonum: string;
  description: string;
  assetnum: string;
  location: string;

  constructor(
    id: string,
    wonum: string,
    description: string,
    assetnum: string,
    location: string
  ) {
    this.id = id;
    this.wonum = wonum;
    this.description = description;
    this.assetnum = assetnum;
    this.location = location;
  }

  static fromJson(json: any): WorkOrder {
    return new WorkOrder(
      json.id,
      json.wonum,
      json.description,
      json.assetnum,
      json.location
    );
  }
}
