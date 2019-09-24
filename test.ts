const currentGame = new Game(
    teams.create(league.clevelandBrowns, true),
    teams.create(league.seattleSeahawks, false),
    20
);

controller.A.onEvent(ControllerButtonEvent.Pressed, () => ball.toss());