export default function AccessoryText() {
    const m : Map<string, Array<string>> = new Map();
    var items = [
        ["Abada", "this is awesome", "aa/hiasd.jpeg"],
        ["Alakaba", "a powerful artifact", "C:\asd\aaa"],
        ["Akasha", "Propriety tech", "F:\asd\ss.kpeg"],
        ["Kinso", "a powerful mace", "C:\asd\aaa"],
        ["Mystrussy", "Open-source tech", "C:\aa\mystrussy.jpeg"]
    ]
    for (var i = 0; i < 5; i++) {
        var uuid = crypto.randomUUID();
        m.set(uuid, items[i]);
    }

    return m;
}