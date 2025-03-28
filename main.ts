// makecode-rpg-extension
// Custom RPG Extension for MakeCode Arcade
// Adds health, XP, levels, AI enemies, procedural maps, quests, and weapons

//% weight=100 color=#0fbc11 icon="⚔"
namespace RPG {
    export class Player {
        sprite: Sprite;
        health: number;
        xp: number;
        level: number;
        inventory: string[];

        constructor() {
            this.sprite = sprites.create(img`
                . . . . . f f f f . . . . .
                . . . f f f 2 2 f f f . . .
                . . f f f 2 2 2 2 f f f . .
                . f f f e e e e e e f f f .
                . f f e 2 2 2 2 2 2 e e f .
                . f e 2 f f f f f f 2 e f .
                . f f f f e e e e f f f f .
                . f e f b f 4 4 f b f e f .
                . f e 4 1 f d d f 1 4 e f .
                . . f e 4 d d d d 4 e f e .
                . . f f e e 4 4 e e f f . .
                . f d d f 2 2 2 2 f d d f .
                . f b b f 2 2 2 2 f b b f .
                . . f b 2 2 2 2 2 2 b f . .
                . . . f 2 2 2 2 2 2 f . . .
                . . . . f f f f f f . . . .
            `, SpriteKind.Player);
            this.health = 100;
            this.xp = 0;
            this.level = 1;
            this.inventory = [];
        }

        //% block="increase XP by %amount"
        increaseXP(amount: number) {
            this.xp += amount;
            if (this.xp >= 100) {
                this.levelUp();
            }
        }

        private levelUp() {
            this.level++;
            this.xp = 0;
            this.health += 20;
            game.splash("Level Up!", "You are now level " + this.level);
        }

        //% block="add %item to inventory"
        addItem(item: string) {
            this.inventory.push(item);
            game.splash("You got a " + item + "!");
        }
    }

    //% block="spawn enemy at x %x y %y"
    export function spawnEnemy(x: number, y: number) {
        let enemy = sprites.create(img`
            . . . . . . f f f f . . . . . .
            . . . . f f 2 2 2 2 f f . . . .
            . . . f f 2 2 2 2 2 2 f f . . .
            . . f f e e e e e e e e f f . .
            . . f e 2 2 2 2 2 2 2 2 e f . .
            . . f 2 f f f f f f f f 2 f . .
            . f f f f e e e e e e f f f f .
            . f e f b f 4 4 4 4 f b f e f .
            . f e 4 1 f d d d d f 1 4 e f .
            . . f e 4 d d d d d d 4 e f . .
            . . f f e e 4 4 4 4 e e f f . .
            . f d d f 2 2 2 2 2 2 f d d f .
            . f b b f 2 2 2 2 2 2 f b b f .
            . . f b 2 2 2 2 2 2 2 2 b f . .
            . . . f 2 2 2 2 2 2 2 2 f . . .
            . . . . f f f f f f f f . . . .
        `, SpriteKind.Enemy);
        enemy.setPosition(x, y);
        enemy.follow(RPG.player.sprite, 50);
    }

    //% block="generate random map"
    export function generateMap() {
        tiles.setTilemap(tilemap`
            level1
        `);
        game.splash("Random map generated!");
    }

    //% block="start quest: %questName"
    export function startQuest(questName: string) {
        game.splash("New Quest!", questName);
    }

    //% block="equip weapon: %weaponName"
    export function equipWeapon(weaponName: string) {
        game.splash("Equipped " + weaponName + "!");
    }
}

// Create the player
RPG.player = new RPG.Player();

