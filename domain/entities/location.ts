export class Locations {
  id: string;
  location: string;
  description: string;

  constructor(id: string, location: string, description: string) {
    this.id = id;
    this.location = location;
    this.description = description;
  }

  static fromJson(json: any): Locations {
    return new Locations(json.id, json.location, json.description);
  }
}
