
/**
 * class Brand
 * This class represents an equipment brand
 * 
 * id: string
 * name: string | The name of the brand
 * logoUrl: string | The logo of the brand
 */
class Brand {
  constructor(id, name, logoUrl) {
    this.id = id;
    this.name = name;
    this.logoUrl = logoUrl;
  }
}

export default Brand;
