/**
 * A customizable football game for MakeCode Arcade
 * Choose your favorite teams and play!
 */
//% weight=100 color="#003399" icon="\uf091"
namespace football {
    export class Game {
        public clock: GameClock;

        protected teamWithPossession: Team;
        protected playerWithPossession: Sprite;
        public lineOfScrimmage: number;
        protected indicator: scene.Renderable;
        protected scoreboard: scene.Renderable;
        protected lineOfScrimmageIndicator: scene.Renderable;

        constructor(
            protected teamA: Team,
            protected teamB: Team,
            quarterLength: number = 20
        ) {
            this.lineOfScrimmage = 80;
            this.resetPlayers();
            this.teamWithPossession = this.teamA;
            this.clock = new GameClock(quarterLength);

            this.indicator = ui.player.createIndicator(this);
            this.scoreboard = ui.scoreboard.create(this, teamA, teamB);
            this.lineOfScrimmageIndicator = ui.field.createLineOfScrimmage(this);

            field.initialize();
            player.initializeEvents();
            ball.initializeEvents();

            // initialize recolored a button prompt
            game.setDialogCursor(img`
                . . . 5 5 5 5 5 . . .
                . 5 5 6 6 6 6 6 5 5 .
                . 5 6 6 1 1 1 6 6 5 .
                5 6 6 1 6 6 6 1 6 6 5
                5 6 6 1 6 6 6 1 6 6 5
                5 6 6 1 1 1 1 1 6 6 5
                5 5 6 1 6 6 6 1 6 5 5
                a 5 5 1 6 6 6 1 5 5 a
                a 5 5 6 5 5 5 6 5 5 a
                . a 5 5 5 5 5 5 5 a .
                . . a a a a a a a . .
            `);
        }

        get playerWhoHasBall() {
            return this.playerWithPossession;
        }

        set playerWhoHasBall(s: Sprite) {
            this.playerWithPossession = s;
        }

        resetPlayers() {
            this.teamA.resetPlayerPositions(this.lineOfScrimmage);
            this.teamB.resetPlayerPositions(this.lineOfScrimmage);
        }

        get offense() {
            return this.teamWithPossession;
        }

        get defense() {
            return this.teamA === this.teamWithPossession ? this.teamB : this.teamA;
        }

        turnOver() {
            this.teamWithPossession = this.defense;
        }
    }

    let currentGame: Game;

    /**
     * Play a game of football against the AI!
     * @param playerTeam the team the player will play as, eg league.clevelandBrowns
     * @param aiTeam the team the player will play against, eg league.pittsburghSteelers
     * @param quarterLength the length of a quarter, eg 20
     */
    //% blockId=createGame block="play as %playerTeam against %aiTeam || quarter length %quarterLength seconds"
    //% weight=100
    export function createGame(playerTeam: TeamData, aiTeam: TeamData, quarterLength = 20) {
        currentGame = new Game(
            teams.create(playerTeam, true),
            teams.create(aiTeam, false),
            quarterLength
        );
    }

    export function activeGame() {
        return currentGame;
    }
}