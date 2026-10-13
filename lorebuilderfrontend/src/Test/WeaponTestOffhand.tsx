export default function OffhandText() {
    const m: Map<string, Array<string>> = new Map();

    var items = [
        ["Aegis of Dawn", "A radiant shield that protects its bearer from the forces of darkness.", ""],
        ["Grimoire of Embers", "An ancient spellbook containing forbidden fire magic.", ""],
        ["Frostguard Buckler", "A small shield covered in eternal frost that slows attacking enemies.", ""],
        ["Tome of the Arcane", "A powerful tome that greatly amplifies the wielder's magical abilities.", ""],
        ["Stormcaller Orb", "A mysterious orb crackling with the power of distant thunderstorms.", ""],
        ["Dragonbone Shield", "A massive shield forged from the bones of an ancient dragon.", ""],
        ["Shadow Codex", "A forbidden book containing rituals from the realm of shadows.", ""],
        ["Moonlit Talisman", "A silver talisman that glows softly beneath the moonlight.", ""],
        ["Runic Ward", "An enchanted ward covered in ancient runes that deflect magical attacks.", ""],
        ["Soulkeeper Lantern", "A mystical lantern said to contain the spirits of fallen warriors.", ""],
        ["Mirror of Eternity", "A polished mirror capable of reflecting both spells and hostile enchantments.", ""],
        ["Infernal Grimoire", "A demonic spellbook that whispers secrets of forbidden sorcery.", ""],
        ["Celestial Sigil", "A holy emblem blessed by celestial beings to ward away evil.", ""],
        ["Obsidian Ward", "A dark shield carved from volcanic obsidian and infused with ancient magic.", ""],
        ["Sage's Tome", "A weathered tome containing the accumulated knowledge of generations of mages.", ""],
        ["Void Crystal", "A strange crystal that seems to contain a fragment of the space between worlds.", ""],
        ["Lionheart Shield", "A noble shield emblazoned with a roaring lion that inspires courage.", ""],
        ["Witch's Grimoire", "A mysterious spellbook filled with curses, hexes, and alchemical rituals.", ""],
        ["Phoenix Idol", "A sacred idol infused with the essence of a legendary phoenix.", ""],
        ["Eclipse Codex", "A forbidden codex that draws its power from the boundary between light and darkness.", ""]
    ];

    for (var i = 0; i <= items.length - 1; i++) {
        var uuid = crypto.randomUUID();
        m.set(uuid, items[i]);
    }

    return m;
}