import Phaser from 'phaser';

export default class RoomCompleteScene extends Phaser.Scene {
    constructor() {
        super('RoomCompleteScene');
    }

    init(data) {
        this.level = data.level || 1;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Background
        this.add.rectangle(width / 2, height / 2, width, height, 0x050508);

        // Completion header
        const headerColor = this.level === 1 ? '#00ff88' : '#d4af37';
        this.add.text(width / 2, height / 2 - 140, '✦ ROOM COMPLETE ✦', {
            fontSize: '48px',
            fill: headerColor,
            fontFamily: 'monospace',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Level name
        let levelName = 'THE ANCIENT GATE';
        if (this.level === 2) levelName = 'THE ELEMENTAL FORGE';
        else if (this.level === 3) levelName = "THE GUARDIAN'S OATH";
        
        this.add.text(width / 2, height / 2 - 80, `Level ${this.level}: ${levelName}`, {
            fontSize: '22px',
            fill: '#888888',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Separator
        const sep = this.add.graphics();
        sep.lineStyle(1, 0x443355, 0.8);
        sep.moveTo(width / 2 - 300, height / 2 - 50);
        sep.lineTo(width / 2 + 300, height / 2 - 50);
        sep.strokePath();

        // Victory message
        let victoryMsg = 'Both seals awakened.\nThe Ancient Gate opens.';
        if (this.level === 2) victoryMsg = 'The Elemental Forge ignites.\nFlame or Frost prevails over Shadow.';
        else if (this.level === 3) victoryMsg = 'The Guardian accepts your oath.\nThe sanctuary opens.';
        
        this.add.text(width / 2, height / 2, victoryMsg, {
            fontSize: '18px',
            fill: '#cccccc',
            fontFamily: 'monospace',
            align: 'center',
            lineSpacing: 6
        }).setOrigin(0.5);

        // Determine if there is a next level (currently max is 3)
        const MAX_IMPLEMENTED_LEVEL = 3;
        const hasNextLevel = this.level < MAX_IMPLEMENTED_LEVEL;
        const buttonText = hasNextLevel ? '▶  NEXT ROOM' : '⌂  MAIN MENU';

        const returnButton = this.add.text(width / 2, height / 2 + 120, buttonText, {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: 'monospace',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Button background
        const btnBg = this.add.graphics();
        const drawBtn = (color) => {
            btnBg.clear();
            btnBg.fillStyle(color, 0.3);
            btnBg.fillRoundedRect(
                width / 2 - 140, height / 2 + 100,
                280, 50, 6
            );
            btnBg.lineStyle(1, 0x6633aa, 0.8);
            btnBg.strokeRoundedRect(
                width / 2 - 140, height / 2 + 100,
                280, 50, 6
            );
        };
        drawBtn(0x222233);

        returnButton.on('pointerover', () => {
            returnButton.setFill('#00ff88');
            drawBtn(0x332255);
        });

        returnButton.on('pointerout', () => {
            returnButton.setFill('#ffffff');
            drawBtn(0x222233);
        });

        returnButton.on('pointerdown', () => {
            if (hasNextLevel) {
                this.scene.start('GameScene', { level: this.level + 1 });
            } else {
                this.scene.start('MainMenuScene');
            }
        });

        // Fade in
        this.cameras.main.fadeIn(400, 0, 0, 0);
    }
}
