export default function WeaponText() {
    const m : Map<string, Array<string>> = new Map();
    var items = [
        ["Frostmourne", "A cursed blade that drains the life of its victims.", "assets\\weapons\\frostmourne.png"],
        ["Emberfang", "A flaming sword capable of igniting the battlefield.", "assets\\weapons\\emberfang.png"],
        ["Stormbreaker", "A colossal axe that commands the fury of storms.", "assets\\weapons\\stormbreaker.png"],
        ["Whisperwind Bow", "A silent bow favored by elite rangers.", "assets\\weapons\\whisperwind.png"],
        ["Celestial Spear", "A spear said to have descended from the heavens.", "assets\\weapons\\celestial_spear.png"],
        ["Void Reaver", "A blade forged from the darkness between worlds.", "assets\\weapons\\void_reaver.png"],
        ["Dragon's Breath", "A cannon capable of unleashing explosive infernos.", "assets\\weapons\\dragons_breath.png"],
        ["Soulbinder Staff", "A mystical staff that amplifies arcane abilities.", "assets\\weapons\\soulbinder.png"],
        ["Moonshadow Dagger", "A lightweight dagger that disappears beneath moonlight.", "assets\\weapons\\moonshadow.png"],
        ["Titanbreaker Hammer", "A massive hammer designed to shatter colossal foes.", "assets\\weapons\\titanbreaker.png"],
        ["Echo Blade", "Each strike leaves behind a spectral echo.", "assets\\weapons\\echo_blade.png"],
        ["Sunfire Chakram", "A spinning weapon radiating intense heat.", "assets\\weapons\\sunfire_chakram.png"],
        ["Leviathan Harpoon", "A harpoon crafted for hunting sea monsters.", "assets\\weapons\\leviathan_harpoon.png"],
        ["Nightfall Scythe", "A scythe feared by those who walk in darkness.", "assets\\weapons\\nightfall_scythe.png"],
        ["Runebreaker", "A sword capable of dispelling magical enchantments.", "assets\\weapons\\runebreaker.png"],
        ["Phoenix Talon", "A claw-shaped weapon that burns brighter after every battle.", "assets\\weapons\\phoenix_talon.png"],
        ["Ironwood Crossbow", "A sturdy crossbow built from enchanted timber.", "assets\\weapons\\ironwood_crossbow.png"],
        ["Crystal Edge", "A razor-sharp blade carved from enchanted crystal.", "assets\\weapons\\crystal_edge.png"],
        ["Tempest Glaive", "A glaive that dances with the wind.", "assets\\weapons\\tempest_glaive.png"],
        ["Oblivion Cannon", "A devastating siege weapon with unparalleled destructive power.", "assets\\weapons\\oblivion_cannon.png"]
    ];
    for (var i = 0; i <= items.length - 1; i++) {
        var uuid = crypto.randomUUID();
        m.set(uuid, items[i]);
    }

    return m;
}