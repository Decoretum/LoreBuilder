export default function OffhandText() {
    const m: Map<string, Array<string>> = new Map();

    var items = [
        ["Aegis of Dawn", "A radiant shield that protects its bearer from the forces of darkness.", "assets\\offhands\\aegis_of_dawn.png"],
        ["Grimoire of Embers", "An ancient spellbook containing forbidden fire magic.", "assets\\offhands\\grimoire_of_embers.png"],
        ["Frostguard Buckler", "A small shield covered in eternal frost that slows attacking enemies.", "assets\\offhands\\frostguard_buckler.png"],
        ["Tome of the Arcane", "A powerful tome that greatly amplifies the wielder's magical abilities.", "assets\\offhands\\tome_of_the_arcane.png"],
        ["Stormcaller Orb", "A mysterious orb crackling with the power of distant thunderstorms.", "assets\\offhands\\stormcaller_orb.png"],
        ["Dragonbone Shield", "A massive shield forged from the bones of an ancient dragon.", "assets\\offhands\\dragonbone_shield.png"],
        ["Shadow Codex", "A forbidden book containing rituals from the realm of shadows.", "assets\\offhands\\shadow_codex.png"],
        ["Moonlit Talisman", "A silver talisman that glows softly beneath the moonlight.", "assets\\offhands\\moonlit_talisman.png"],
        ["Runic Ward", "An enchanted ward covered in ancient runes that deflect magical attacks.", "assets\\offhands\\runic_ward.png"],
        ["Soulkeeper Lantern", "A mystical lantern said to contain the spirits of fallen warriors.", "assets\\offhands\\soulkeeper_lantern.png"],
        ["Mirror of Eternity", "A polished mirror capable of reflecting both spells and hostile enchantments.", "assets\\offhands\\mirror_of_eternity.png"],
        ["Infernal Grimoire", "A demonic spellbook that whispers secrets of forbidden sorcery.", "assets\\offhands\\infernal_grimoire.png"],
        ["Celestial Sigil", "A holy emblem blessed by celestial beings to ward away evil.", "assets\\offhands\\celestial_sigil.png"],
        ["Obsidian Ward", "A dark shield carved from volcanic obsidian and infused with ancient magic.", "assets\\offhands\\obsidian_ward.png"],
        ["Sage's Tome", "A weathered tome containing the accumulated knowledge of generations of mages.", "assets\\offhands\\sages_tome.png"],
        ["Void Crystal", "A strange crystal that seems to contain a fragment of the space between worlds.", "assets\\offhands\\void_crystal.png"],
        ["Lionheart Shield", "A noble shield emblazoned with a roaring lion that inspires courage.", "assets\\offhands\\lionheart_shield.png"],
        ["Witch's Grimoire", "A mysterious spellbook filled with curses, hexes, and alchemical rituals.", "assets\\offhands\\witchs_grimoire.png"],
        ["Phoenix Idol", "A sacred idol infused with the essence of a legendary phoenix.", "assets\\offhands\\phoenix_idol.png"],
        ["Eclipse Codex", "A forbidden codex that draws its power from the boundary between light and darkness.", "assets\\offhands\\eclipse_codex.png"]
    ];

    for (var i = 0; i <= items.length - 1; i++) {
        var uuid = crypto.randomUUID();
        m.set(uuid, items[i]);
    }

    return m;
}