export default function AccessoryText() {
    const m : Map<string, Array<string>> = new Map();
    var items = [
        ["Abada the All-powerful", "this is awesome", "aa/hiasd.jpeg"],
        ["Alakaba, Mystic in the dark", "a powerful artifact", "C:\asd\aaa"],
        ["Akasha, technology for the Witted", "Propriety tech", "F:\asd\ss.kpeg"],
        ["Kinso, Mace of the Unsullied", "a powerful mace", "C:\asd\aaa"],
        ["Mystrussy, an Open-Source Madness", "Open-source tech", "C:\aa\mystrussy.jpeg"]
    ]
    for (var i = 0; i < 5; i++) {
        var uuid = crypto.randomUUID();
        m.set(uuid, items[i]);
    }

    return m;
}