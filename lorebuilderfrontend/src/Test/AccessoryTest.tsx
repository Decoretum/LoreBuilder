export default function AccessoryText() {
    const m : Map<string, Array<string>> = new Map();
    for (var i = 0; i < 5; i++) {
        m.set("Abada", ["this is awesome", "aa/hiasd.jpeg"]);
        m.set("Alakaba", ["a powerful artifact", "C:\asd\aaa"]);
        m.set("Akasha", ["Propriety tech", "F:\asd\ss.kpeg"]);
        m.set("Kinso", ["a powerful mace", "C:\asd\aaa"]);
        m.set("Mystrussy", ["Open-source tech", "C:\aa\mystrussy.jpeg"]);
    }

    return m;
}