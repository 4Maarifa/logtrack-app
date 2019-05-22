
/**
 * class EquipmentModel
 * The model of an equipment.
 *
 * name: string | Commercial name of the equipment
 * type: string | Generalist type of the product
 * subType: string | Less generalist type of the product
 * photoUrl: string | Photo of the equipment
 * creator: string | User id that created the equipment. Null if default equipment
 * brand: string | Brand of the product
 * 
 * Example for a cargo trailer :
 * name: 3-Achs-ULTRALIGHT-Schiebeplanen-Plateausattelanhänger
 * type: trailer
 * subType: curtainsider trailer
 * photoUrl: http://...
 * creator: null
 * brand: Schwarzmueller
 */
class EquipmentModel {
    constructor(name, type, subType, parts, photoUrl, creator, brand) {
        this.name = name;
        this.type = type;
        this.subType = subType;
        this.parts = parts;
        this.photoUrl = photoUrl;
        this.creator = creator;
        this.brand = brand;
    }
}

export default EquipmentModel;
