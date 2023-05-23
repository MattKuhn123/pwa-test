export class Breed {
  id: string;
  name: string;

  constructor(options: {
    id?: string;
    name?: string
  }) {
    this.id = options.id ?? "";
    this.name = options.name ?? "";
  }
}