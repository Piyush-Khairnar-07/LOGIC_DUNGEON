const fs = require('fs');

function makeSym(leftHalf, center) {
    return leftHalf + center + leftHalf.split('').reverse().join('');
}

const keyOn = [
    makeSym(".....fffff", "f"),
    makeSym("...fffbbbb", "b"),
    makeSym("..ffboiyiy", "i"),
    makeSym(".fbbibbbbb", "b"),
    makeSym(".fbibbaaay", "y"),
    makeSym("fbiybawwww", "y"),
    makeSym("fbibbawwwy", "y"),
    makeSym("fbibbaaaww", "w"),
    makeSym("fbiybbaaaa", "w"),
    makeSym("fbibbbbbbb", "w"),
    makeSym("fbiybbbbbb", "w"),
    makeSym("fbibbbbbbb", "w"),
    makeSym("fbiybbbbbb", "w"), // with tooth? wait, if it's symmetric, both sides get a tooth. Let's make it asymmetric manually if needed.
    makeSym("fbibbbbbbb", "w"),
    makeSym("fbiybbbbbb", "w"),
    makeSym("fbibbbbbbb", "w"),
    makeSym(".fbibbbbbb", "b"),
    makeSym(".fbbibbbbb", "b"),
    makeSym("..ffboiyiy", "i"),
    makeSym("...fffbbbb", "b"),
    makeSym(".....fffff", "f")
];

const keyOff = [
    makeSym(".....fffff", "f"),
    makeSym("...fffbbbb", "b"),
    makeSym("..ffbodgdg", "d"),
    makeSym(".fbbgbbbbb", "b"),
    makeSym(".fbgbbaadd", "d"),
    makeSym("fbdgbadddd", "g"),
    makeSym("fbbgbadddg", "g"),
    makeSym("fbbgbaaadd", "d"),
    makeSym("fbdgbbaaaa", "d"),
    makeSym("fbbgbbbbbb", "d"),
    makeSym("fbdgbbbbbb", "d"),
    makeSym("fbbgbbbbbb", "d"),
    makeSym("fbdgbbbbbb", "d"),
    makeSym("fbbgbbbbbb", "d"),
    makeSym("fbdgbbbbbb", "d"),
    makeSym("fbbgbbbbbb", "d"),
    makeSym(".fbbgbbbbb", "b"),
    makeSym(".fbbgbbbbb", "b"),
    makeSym("..ffbodgdg", "d"),
    makeSym("...fffbbbb", "b"),
    makeSym(".....fffff", "f")
];

const bellOn = [
    makeSym(".....fffff", "f"),
    makeSym("...fffbbbb", "b"),
    makeSym("..ffboiyiy", "i"),
    makeSym(".fbbibbbbb", "b"),
    makeSym(".fbibbbbaw", "w"),
    makeSym("fbiybbbaaw", "w"),
    makeSym("fbibbbbaaw", "w"),
    makeSym("fbibbaaaaw", "w"),
    makeSym("fbiybaawww", "w"),
    makeSym("fbibbawwww", "w"),
    makeSym("fbiybwwwww", "w"),
    makeSym("fbibbwwwww", "y"),
    makeSym("fbiybwwyyy", "y"),
    makeSym("fbibbbbbbw", "y"),
    makeSym("fbiybbbbbb", "y"),
    makeSym("fbibbbbbbb", "b"),
    makeSym(".fbibbbbbb", "b"),
    makeSym(".fbbibbbbb", "b"),
    makeSym("..ffboiyiy", "i"),
    makeSym("...fffbbbb", "b"),
    makeSym(".....fffff", "f")
];

const bellOff = [
    makeSym(".....fffff", "f"),
    makeSym("...fffbbbb", "b"),
    makeSym("..ffbodgdg", "d"),
    makeSym(".fbbgbbbbb", "b"),
    makeSym(".fbgbbbbad", "g"),
    makeSym("fbdgbbbaad", "g"),
    makeSym("fbbgbbbaad", "g"),
    makeSym("fbbgbaaaad", "g"),
    makeSym("fbdgbaaddd", "d"),
    makeSym("fbbgbadddd", "d"),
    makeSym("fbdgbddddd", "d"),
    makeSym("fbbgbddddd", "g"),
    makeSym("fbdgbddggg", "g"),
    makeSym("fbbgbbbbbb", "d"),
    makeSym("fbdgbbbbbb", "g"),
    makeSym("fbbgbbbbbb", "b"),
    makeSym(".fbbgbbbbb", "b"),
    makeSym(".fbbgbbbbb", "b"),
    makeSym("..ffbodgdg", "d"),
    makeSym("...fffbbbb", "b"),
    makeSym(".....fffff", "f")
];

const eyeOn = [
    makeSym(".....fffff", "f"),
    makeSym("...fffbbbb", "b"),
    makeSym("..ffbovpvo", "p"),
    makeSym(".fbvbbbbbb", "b"),
    makeSym(".fbpbcsccc", "s"), // c=crack
    makeSym("fbvbbbbbbb", "b"),
    makeSym("fbpbbbdddd", "d"),
    makeSym("fbpbbdpppv", "v"),
    makeSym("fbvbdpvvww", "w"),
    makeSym("fbpbvpvwrr", "r"),
    makeSym("fbvbvvwrrr", "r"),
    makeSym("fbpbvpvwrr", "r"),
    makeSym("fbvbdpvvww", "w"),
    makeSym("fbpbbdpppv", "v"),
    makeSym("fbvbbbdddd", "d"),
    makeSym("fbpbbbbbbb", "b"),
    makeSym(".fbpbscscs", "c"),
    makeSym(".fbvbbbbbb", "b"),
    makeSym("..ffbovpvo", "p"),
    makeSym("...fffbbbb", "b"),
    makeSym(".....fffff", "f")
];

const eyeOff = [
    makeSym(".....fffff", "f"),
    makeSym("...fffbbbb", "b"),
    makeSym("..ffbododo", "d"),
    makeSym(".fbdbbbbbb", "b"),
    makeSym(".fbobcsccc", "s"), 
    makeSym("fbdbbbbbbb", "b"),
    makeSym("fbobbbbbbb", "b"),
    makeSym("fbobbbdddd", "d"),
    makeSym("fbdbbddppp", "p"),
    makeSym("fbobbddppr", "r"),
    makeSym("fbdbbddppp", "p"),
    makeSym("fbobbbdddd", "d"),
    makeSym("fbdbbbbbbb", "b"),
    makeSym("fbobbbbbbb", "b"),
    makeSym("fbdbbbbbbb", "b"),
    makeSym("fbobbbbbbb", "b"),
    makeSym(".fbobscscs", "c"),
    makeSym(".fbdbbbbbb", "b"),
    makeSym("..ffbododo", "d"),
    makeSym("...fffbbbb", "b"),
    makeSym(".....fffff", "f")
];

const out = `
        const sacredKeyPalette = {
            'x': 0x111111, 'f': 0x3a3a3a, 'd': 0x5a4a2a, 'g': 0xa98929, 'y': 0xffcc00, 'w': 0xffffff, 'i': 0xffeaa, 'a': 0xe8e8d8, 'b': 0x222222, 'o': 0x1a1a1a
        };
        const sacredKeyOn = [\n${keyOn.map(s => '            "' + s + '"').join(',\n')}\n        ];
        const sacredKeyOff = [\n${keyOff.map(s => '            "' + s + '"').join(',\n')}\n        ];

        const bellPalette = {
            'x': 0x111111, 'f': 0x333333, 'd': 0x4a3a2a, 'g': 0x997733, 'y': 0xeeaa22, 'w': 0xffdd77, 'i': 0xffcc44, 'a': 0xdcbbaa, 'b': 0x181818, 'o': 0x111111
        };
        const bellOn = [\n${bellOn.map(s => '            "' + s + '"').join(',\n')}\n        ];
        const bellOff = [\n${bellOff.map(s => '            "' + s + '"').join(',\n')}\n        ];

        const shadowCursePalette = {
            'x': 0x080808, 'f': 0x1c1c1c, 'b': 0x0f0f0f, 'c': 0x2a2a2a, 's': 0x000000, 'o': 0x200030, 'd': 0x330055, 'p': 0x6600aa, 'v': 0x9933ff, 'w': 0xffffff, 'r': 0xff0000
        };
        const shadowCurseOn = [\n${eyeOn.map(s => '            "' + s + '"').join(',\n')}\n        ];
        const shadowCurseOff = [\n${eyeOff.map(s => '            "' + s + '"').join(',\n')}\n        ];
`;

fs.writeFileSync('arrays.txt', out);
