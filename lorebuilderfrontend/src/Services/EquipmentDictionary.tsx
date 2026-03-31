export default function EquipmentDictionary() {
    var hm : Map<string, string> = new Map<string, string>([
        ["Helmet", "headGear"],
        ["Footwear", "footGear"],
        ["Left Armwear", "leftArmGear"],
        ["Right Armwear", "rightArmGear"],
        ["Backwear", "backGear"],
        ["Chestwear", "chestGear"],
        ["Legwear", "leggingGear"],
        ["Accessory", "accessories"],
        // weaponMainHand: [""],
        // weaponOffHand: [""]
    ])

    return hm;
}