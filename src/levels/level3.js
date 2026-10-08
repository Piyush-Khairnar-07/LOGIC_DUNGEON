/**
 * Level 3 — The Guardian's Oath
 *
 * 3-variable puzzle: (P → Q) ∧ ¬R
 *
 * Layout:
 *   P = Sacred Key Rune
 *   Q = Guardian Bell Rune
 *   R = Shadow Curse Rune
 */

export const level3Data = {
    width: 1200,
    height: 900,

    intro: {
        levelNumber: 3,
        title: "THE GUARDIAN'S OATH",
        story: "An ancient oath binds the Guardian:\nWhenever the Sacred Key is awakened,\nthe Guardian Bell must also be awakened.\nThe Shadow Curse must remain dormant.",
        objective: "Fulfill the Guardian's Oath."
    },

    playerSpawn: { x: 500, y: 650 },

    exitArea: { x: 1050, y: 740, width: 80, height: 80 },

    enemies: [
        { x: 300, y: 300 },
        { x: 800, y: 300 }
    ],

    bulbs: [
        { variable: 'P', name: 'Sacred Key Rune', x: 250, y: 450, initialValue: false },
        { variable: 'Q', name: 'Guardian Bell Rune', x: 600, y: 200, initialValue: false },
        { variable: 'R', name: 'Shadow Curse Rune', x: 750, y: 450, initialValue: false }
    ],

    submitAltar: { x: 500, y: 780 },

    gate: { x: 1000, y: 740, width: 50, height: 100 },

    puzzleId: 'oath_guardian_03',

    walls: [
        // Top wall
        { x: 0, y: 0, width: 1200, height: 30 },
        // Bottom wall
        { x: 0, y: 870, width: 1200, height: 30 },
        // Left wall
        { x: 0, y: 0, width: 30, height: 900 },
        // Right wall
        { x: 1170, y: 0, width: 30, height: 900 },

        // Divider creating corridor to gate
        { x: 900, y: 0, width: 30, height: 600 },
        // Lower divider with gap for gate
        { x: 900, y: 700, width: 30, height: 200 },

        // Obstacles (pillars for the sanctuary)
        { x: 200, y: 250, width: 60, height: 60 },
        { x: 800, y: 250, width: 60, height: 60 },
        { x: 200, y: 600, width: 60, height: 60 },
        { x: 800, y: 600, width: 60, height: 60 }
    ]
};
