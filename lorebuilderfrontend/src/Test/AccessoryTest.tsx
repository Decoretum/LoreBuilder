export default function AccessoryText() {
    const m : Map<string, Array<string>> = new Map();
    var items = [
        ["Abada the All-powerful", "this is awesome", ""],
        ["Alakaba, Mystic in the dark", "a powerful artifact", ""],
        ["Akasha, technology for the Witted", "Propriety tech", ""],
        ["Kinso, Mace of the Unsullied", "a powerful mace", ""],
        ["Mystrussy, an Open-Source Madness", "Open-source tech", ""]
    ]
    for (var i = 0; i < 5; i++) {
        var uuid = crypto.randomUUID();
        m.set(uuid, items[i]);
    }

    return m;
}