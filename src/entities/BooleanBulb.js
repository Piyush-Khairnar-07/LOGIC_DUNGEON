import Phaser from 'phaser';
import { createPixelTexture } from '../utils/PixelArt.js';
import { SoundSynth } from '../utils/SoundSynth.js';

export default class BooleanBulb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, variable, initialValue = false, customName = null) {
        const onKey = 'bulbOn_' + variable;
        const offKey = 'bulbOff_' + variable;

        let sealName;
        let palette;
        let dataOn, dataOff;

        const sunPalette = {
            'x': 0x221100, 'b': 0x442200, 'g': 0xff8800, 'y': 0xffdd00, 'w': 0xffffff, 'd': 0x331100
        };
        const moonPalette = {
            'x': 0x000011, 'b': 0x111122, 'g': 0x8800ff, 'y': 0xcc44ff, 'w': 0xffccff, 'd': 0x0a0a11
        };
        const flamePalette = {
            'x': 0x000000, 'd': 0x440000, 'r': 0x881111, 'o': 0xff5500, 'y': 0xffaa00, 'w': 0xffffff, 'b': 0x220000, 'c': 0x442200, 'g': 0xaa3300
        };
        const frostPalette = {
            'x': 0x111118, 'd': 0x2a2a35, 'm': 0x4a4a5a, 's': 0x6a6a7a, 'g': 0x0055aa, 'b': 0x00aaff, 'c': 0x00ffff, 'p': 0xccffff, 'w': 0xffffff, 'q': 0x112233, 'r': 0x224455
        };
        const shadowPalette = {
            'x': 0x080808, 'd': 0x1a0a2a, 'r': 0x2a1040, 'p': 0x6600aa, 'v': 0x9933ff, 'w': 0xddaaff, 'b': 0x0f0f18, 'g': 0x440066, 'c': 0x220033
        };

        const sunOn = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbbgbbbbxx.",
            ".xbgbbyyybbgbx.",
            "xxbbyywwwyybbxx",
            "xbbgywwwwwygbbx",
            "xbbgywwwwwygbbx",
            "xbgyywwwwwyygbx",
            "xbbgywwwwwygbbx",
            "xbbgywwwwwygbbx",
            "xxbbyywwwyybbxx",
            ".xbgbbyyybbgbx.",
            ".xxbbbbgbbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];
        const sunOff = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbbdbbbbxx.",
            ".xbdbbxxxbbdbx.",
            "xxbbxxdbdxxbbxx",
            "xbbxddddddxbbbx",
            "xbbxddddddxbbbx",
            "xbdxxdddddxxdbx",
            "xbbxddddddxbbbx",
            "xbbxddddddxbbbx",
            "xxbbxxdbdxxbbxx",
            ".xbdbbxxxbbdbx.",
            ".xxbbbbdbbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];

        const moonOn = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbyyybbbxx.",
            ".xbbbwygyybbbx.",
            "xxbbwygbbbbbbxx",
            "xbbwybbbbbbbbbx",
            "xbbygbbbbbbbbbx",
            "xbbygbbbbbbbbbx",
            "xbbygbbbbbbbbbx",
            "xbbwybbbbbbbbbx",
            "xxbbwygbbbbbbxx",
            ".xbbbwygyybbbx.",
            ".xxbbbyyybbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];
        const moonOff = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbxxxbbbxx.",
            ".xbbbxddxxbbbx.",
            "xxbbxdbbbbbbbxx",
            "xbbxdbbbbbbbbbx",
            "xbbxdbbbbbbbbbx",
            "xbbxdbbbbbbbbbx",
            "xbbxdbbbbbbbbbx",
            "xbbxdbbbbbbbbbx",
            "xxbbxdbbbbbbbxx",
            ".xbbbxddxxbbbx.",
            ".xxbbbxxxbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];

        const flameOn = [
            "....ddddddd....",
            "..ddrrrrrrrdd..",
            ".drrggoogggrrd.",
            ".drggoyoyoggrd.",
            "drggoyywyooggrd",
            "drggoywwwyoogrd",
            "drgoyywwwyyogrd",
            "drgoyyyyyyyogrd",
            "drggooyyyooggrd",
            "drgggooooogggrd",
            ".drrgggggggrrd.",
            ".drrrrrrrrrrrd.",
            "..ddrrrrrrrdd..",
            "....ddddddd....",
            "..............."
        ];
        const flameOff = [
            "....ddddddd....",
            "..ddbbbbbbbdd..",
            ".dbbbbcccbbbbd.",
            ".dbbbcbcbcbbbd.",
            "dbbbcbcbcbcbbbd",
            "dbbbcbbbcbcbbbd",
            "dbbbcbbbcbcbbbd",
            "dbbbcbbbcbcbbbd",
            "dbbbbccbcbcbbbd",
            "dbbbbbcccbbbbbd",
            ".dbbbbbbbbbbbd.",
            ".dbbbbbbbbbbbd.",
            "..ddbbbbbbbdd..",
            "....ddddddd....",
            "..............."
        ];

        const frostOn = [
            "xxxxxxxxxxxxxxx",
            "xssssxssssxsssx",
            "xmmmmxmmmmxmmmx",
            "xddddxddddxdddx",
            "xssxxgggggggxxs",
            "xmmxxgbbbbbgxxm",
            "xddxxgbccpbgxxd",
            "xssxxgbcwwbgxxs",
            "xmmxxgbccpbgxxm",
            "xddxxgbbbbbgxxd",
            "xssxxgggggggxxs",
            "xmmddxmmddxmmdx",
            "xddddxddddxdddx",
            "xxxxxxxxxxxxxxx",
            "..............."
        ];
        const frostOff = [
            "xxxxxxxxxxxxxxx",
            "xssssxssssxsssx",
            "xmmmmxmmmmxmmmx",
            "xddddxddddxdddx",
            "xssxxqqqqqqqxxs",
            "xmmxxqrrrrrqxxm",
            "xddxxqrrqrrqxxd",
            "xssxxqrqrqrqxxs",
            "xmmxxqrrqrrqxxm",
            "xddxxqrrrrrqxxd",
            "xssxxqqqqqqqxxs",
            "xmmddxmmddxmmdx",
            "xddddxddddxdddx",
            "xxxxxxxxxxxxxxx",
            "..............."
        ];

        const shadowOn = [
            "...xxxxxxxxx...",
            "..xxrrrrrrrxx..",
            ".xxrrrgggrrrrx.",
            ".xrrggpppggrxr.",
            "xxrggpvvvppgrxx",
            "xrrgpvwwwvpgrrx",
            "xrrgpvwwwvpgrrx",
            "xrrppvwwwvpprrx",
            "xrrgpvwwwvpgrrx",
            "xrrgpvvvvvpgrrx",
            "xxrggpppppgrxx.",
            ".xrrggggggrrxr.",
            ".xxrrrrrrrrrrx.",
            "..xxrrrrrrrxx..",
            "...xxxxxxxxx..."
        ];
        const shadowOff = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbbcbbbbxx.",
            ".xbbccbbbccbbx.",
            "xxbbcbbbbbcbbxx",
            "xbbcbbbbbbbcbbx",
            "xbbcbbbbbbbcbbx",
            "xbbbbbbbbbbbbxb",
            "xbbcbbbbbbbcbbx",
            "xbbcbbbbbbbcbbx",
            "xxbbcbbbbbcbbxx",
            ".xbbccbbbccbbx.",
            ".xxbbbbcbbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];

        const sacredKeyPalette = {
            'x': 0x221100, 'b': 0x442200, 'g': 0xcc9900, 'y': 0xffcc00, 'w': 0xffffff, 'd': 0x332200, 'k': 0xffaa00, 'p': 0x111100
        };
        const sacredKeyOn = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbyyybbbxx.",
            ".xbbbyywywbbbx.",
            "xxbbyywwwyybbxx",
            "xbbbyywywyybbbx",
            "xbbbbyywybbbbbx",
            "xbbbbyywyyybbbx",
            "xbbbbyywybbbbbx",
            "xbbbbyywyyybbbx",
            "xxbbbbywybbbbxx",
            ".xbbbbyyybbbbx.",
            ".xxbbbbbbbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];
        const sacredKeyOff = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbdddbbbxx.",
            ".xbbbddwdwbbbx.",
            "xxbbddwwwddbbxx",
            "xbbbddwdwddbbbx",
            "xbbbbddwdbbbbbx",
            "xbbbbddwdddbbbx",
            "xbbbbddwdbbbbbx",
            "xbbbbddwdddbbbx",
            "xxbbbbdwdbbbbxx",
            ".xbbbbdddbbbbx.",
            ".xxbbbbbbbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];

        const bellPalette = {
            'x': 0x111111, 'b': 0x2b2211, 'g': 0x886622, 'y': 0xddaa44, 'w': 0xffdd88, 'd': 0x221a11, 'p': 0x050505
        };
        const bellOn = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbyyybbbxx.",
            ".xbbbbbybbbbbx.",
            "xxbbbyyyyybbbxx",
            "xbbbyywwwyybbbx",
            "xbbbyywwwyybbbx",
            "xbbyyywwwyyybbx",
            "xbbyyyyyyyyybbx",
            "xbbbbbywybbbbbx",
            "xxbbbbbybbbbbxx",
            ".xbbbbbbbbbbbx.",
            ".xxbbbbbbbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];
        const bellOff = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbdddbbbxx.",
            ".xbbbbbdbbbbbx.",
            "xxbbbdddddbbbxx",
            "xbbbddwwwddbbbx",
            "xbbbddwwwddbbbx",
            "xbbddwwwdddbbbx",
            "xbbdddddddddbbx",
            "xbbbbbdwdbbbbbx",
            "xxbbbbbdbbbbbxx",
            ".xbbbbbbbbbbbx.",
            ".xxbbbbbbbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];

        const shadowCursePalette = {
            'x': 0x080808, 'b': 0x1a1a1a, 'd': 0x2a1040, 'p': 0x6600aa, 'v': 0x9933ff, 'w': 0xffffff, 'r': 0xff0000, 'g': 0x330044
        };
        const shadowCurseOn = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbbbbbbbxx.",
            ".xbbbdpppdbbbx.",
            "xxbbpvvvvvpbbxx",
            "xbbpvvwwwvvpbbx",
            "xbpvvwwrwwvvpbx",
            "xbpvvwrrrwwvpbx",
            "xbpvvwwrwwvvpbx",
            "xbbpvvwwwvvpbbx",
            "xxbbpvvvvvpbbxx",
            ".xbbbdpppdbbbx.",
            ".xxbbbbbbbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];
        
        const shadowCurseOff = [
            "...xxxxxxxxx...",
            "..xxbbbbbbbxx..",
            ".xxbbbbbbbbbxx.",
            ".xbbbdddddbbbx.",
            "xxbbdddddddbbxx",
            "xbbddpdddpddbbx",
            "xbbdpppppppdbbx",
            "xbbdppprpppdbbx",
            "xbbdpppppppdbbx",
            "xbbddpdddpddbbx",
            "xxbbdddddddbbxx",
            ".xbbbdddddbbbx.",
            ".xxbbbbbbbbbxx.",
            "..xxbbbbbbbxx..",
            "...xxxxxxxxx..."
        ];

        // runeType tracks which special particle/animation type this bulb is.
        // It CANNOT be set on 'this' here because super() has not been called yet.
        // It is assigned to this._isFlame / this._isFrost / this._isShadow after super().
        let runeType = null; // 'flame' | 'frost' | 'shadow' | null

        if (customName && customName.includes('Sacred Key')) {
            sealName = customName;
            palette = sacredKeyPalette;
            dataOn = sacredKeyOn;
            dataOff = sacredKeyOff;
            runeType = 'sacredKey';
        } else if (customName && customName.includes('Guardian Bell')) {
            sealName = customName;
            palette = bellPalette;
            dataOn = bellOn;
            dataOff = bellOff;
            runeType = 'bell';
        } else if (customName && customName.includes('Flame Rune')) {
            sealName = customName;
            palette = flamePalette;
            dataOn = flameOn;
            dataOff = flameOff;
            runeType = 'flame';
        } else if (customName && customName.includes('Frost Rune')) {
            sealName = customName;
            palette = frostPalette;
            dataOn = frostOn;
            dataOff = frostOff;
            runeType = 'frost';
        } else if (customName && customName.includes('Shadow Curse')) {
            sealName = customName;
            palette = shadowCursePalette;
            dataOn = shadowCurseOn;
            dataOff = shadowCurseOff;
            runeType = 'shadowCurse';
        } else if (customName && customName.includes('Shadow')) {
            sealName = customName;
            palette = shadowPalette;
            dataOn = shadowOn;
            dataOff = shadowOff;
            runeType = 'shadow';
        } else if (customName && (customName.includes('Guardian Key') || customName.includes('Ancient Key'))) {
            sealName = customName;
            palette = sunPalette;
            dataOn = sunOn;
            dataOff = sunOff;
        } else if (customName && (customName.includes('Sacred Bell') || customName.includes('Crystal Heart'))) {
            sealName = customName;
            palette = moonPalette;
            dataOn = moonOn;
            dataOff = moonOff;
        } else if (customName && customName.includes('Thunder')) {
            sealName = customName;
            palette = flamePalette; // reuse warm tones
            dataOn = flameOn;
            dataOff = flameOff;
            runeType = 'flame'; // similar fire particles
        } else if (customName && customName.includes('Moon Seal')) {
            sealName = customName;
            palette = moonPalette;
            dataOn = moonOn;
            dataOff = moonOff;
        } else if (variable === 'P') {
            sealName = customName || 'Sun Seal';
            palette = sunPalette;
            dataOn = sunOn;
            dataOff = sunOff;
        } else if (variable === 'Q') {
            sealName = customName || 'Moon Seal';
            palette = moonPalette;
            dataOn = moonOn;
            dataOff = moonOff;
        } else {
            sealName = customName || variable;
            palette = sunPalette;
            dataOn = sunOn;
            dataOff = sunOff;
        }

        createPixelTexture(scene, onKey, palette, dataOn, 4);
        createPixelTexture(scene, offKey, palette, dataOff, 4);

        const textureKey = initialValue ? onKey : offKey;
        super(scene, x, y, textureKey);

        // NOW we can safely access 'this' — super() has been called.
        // Assign rune-type flags from the local variable determined above.
        this._isFlame  = (runeType === 'flame');
        this._isFrost  = (runeType === 'frost');
        this._isShadow = (runeType === 'shadow');
        this._isSacredKey = (runeType === 'sacredKey');
        this._isBell   = (runeType === 'bell');
        this._isShadowCurse = (runeType === 'shadowCurse');

        scene.add.existing(this);
        scene.physics.add.existing(this, true); // static body

        // Internal state
        this._variable = variable;
        this._value = initialValue;
        this._onKey = onKey;
        this._offKey = offKey;

        // Label above the seal
        this.label = scene.add.text(x, y - 40, `${sealName} (${variable})`, {
            fontSize: '14px',
            fill: '#ffffff',
            fontFamily: 'monospace',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Particles
        if (!scene.textures.exists('particle_pixel_1')) {
            const g = scene.make.graphics({x:0,y:0,add:false});
            g.fillStyle(0xffffff, 1);
            g.fillRect(0,0,2,2);
            g.generateTexture('particle_pixel_1', 2, 2);
        }

        if (this._isFlame) {
            this._particles = scene.add.particles(x, y + 5, 'particle_pixel_1', {
                lifespan: 800,
                speedY: { min: -10, max: -30 },
                speedX: { min: -10, max: 10 },
                scale: { start: 1.5, end: 0 },
                tint: [0xffaa00, 0xff0000, 0xff5500],
                blendMode: 'ADD',
                frequency: 150,
                emitting: false
            });
        } else if (this._isFrost) {
            this._particles = scene.add.particles(x, y, 'particle_pixel_1', {
                lifespan: 1000,
                speed: { min: 5, max: 20 },
                angle: { min: 0, max: 360 },
                scale: { start: 1, end: 0 },
                tint: [0x00ffff, 0xffffff, 0xaaddff],
                blendMode: 'ADD',
                frequency: 200,
                emitting: false
            });
        } else if (this._isShadow) {
            this._particles = scene.add.particles(x, y, 'particle_pixel_1', {
                lifespan: 900,
                speed: { min: 3, max: 15 },
                angle: { min: 0, max: 360 },
                scale: { start: 1.2, end: 0 },
                tint: [0x9933ff, 0x6600aa, 0xddaaff],
                blendMode: 'ADD',
                frequency: 180,
                emitting: false
            });
        } else if (this._isSacredKey) {
            this._particles = scene.add.particles(x, y, 'particle_pixel_1', {
                lifespan: 1200,
                speedY: { min: -10, max: -20 },
                speedX: { min: -5, max: 5 },
                scale: { start: 1, end: 0 },
                tint: [0xffcc00, 0xffaa00, 0xffffff],
                blendMode: 'ADD',
                frequency: 250,
                emitting: false
            });
        } else if (this._isBell) {
            this._particles = scene.add.particles(x, y, 'particle_pixel_1', {
                lifespan: 800,
                speed: { min: 2, max: 8 },
                angle: { min: 0, max: 360 },
                scale: { start: 1.5, end: 0 },
                tint: [0xddaa44, 0xffdd88],
                blendMode: 'ADD',
                frequency: 400,
                emitting: false
            });
        } else if (this._isShadowCurse) {
            this._particles = scene.add.particles(x, y, 'particle_pixel_1', {
                lifespan: 1000,
                speed: { min: 5, max: 20 },
                angle: { min: 0, max: 360 },
                scale: { start: 1.5, end: 0 },
                tint: [0xff0000, 0x9933ff, 0x6600aa],
                blendMode: 'ADD',
                frequency: 150,
                emitting: false
            });
        }

        // Sync visual to initial state
        this._updateVisual();
    }

    // ── Public API ───────────────────────────────────────

    /** @returns {string} The variable name of this bulb. */
    getVariable() {
        return this._variable;
    }

    /** @returns {boolean} The current Boolean state. */
    getState() {
        return this._value;
    }

    /** @param {boolean} val */
    setState(val) {
        this._value = Boolean(val);
        this._updateVisual();
    }

    /** Toggle current state. */
    toggle() {
        this._value = !this._value;
        this._updateVisual();
        
        if (this._isFlame) SoundSynth.interact('flame');
        else if (this._isFrost) SoundSynth.interact('frost');
        else if (this._isShadow) SoundSynth.interact('shadow');
        else if (this._isSacredKey) SoundSynth.interact('sacredKey');
        else if (this._isBell) SoundSynth.interact('bell');
        else if (this._isShadowCurse) SoundSynth.interact('shadowCurse');
        else if (this._variable === 'P') SoundSynth.interact('sun');
        else if (this._variable === 'Q') SoundSynth.interact('moon');
        else SoundSynth.interact();
    }

    // ── Private ──────────────────────────────────────────

    _updateVisual() {
        this.setTexture(this._value ? this._onKey : this._offKey);
        this.label.setFill(this._value ? '#ffffff' : '#888888');
        
        this.scene.tweens.killTweensOf(this);
        if (this._particles) this._particles.stop();

        // Magical pulsing effect when ON
        if (this._value) {
            this.scene.tweens.add({
                targets: this,
                scaleX: 1.08,
                scaleY: 1.08,
                duration: this._isFlame ? 800 : (this._isFrost ? 1200 : 1000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            if (this._particles) {
                this._particles.start();
            }
        } else {
            // OFF subtle shimmer/flicker
            this.setScale(1);
            if (this._isFlame || this._isFrost || this._isShadow) {
                this.scene.tweens.add({
                    targets: this,
                    alpha: { min: 0.8, max: 1 },
                    duration: this._isFlame ? 300 : (this._isShadow ? 2000 : 1500),
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        }
    }
}
