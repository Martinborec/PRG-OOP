<?php

include 'player.php';
include 'team.php';

// vytvoření týmu
$team = new Team("FC EDUCAnet", "Brno", 3);

// vytvoření hráčů
$player1 = new Player("Martin Pavlík", 1, "Brankář");
$player2 = new Player("Adrian Staněk", 4, "Obránce");
$player3 = new Player("Maxim Veličko", 24, "Utočník");

// hráči nastupují do týmu
$team->addPlayer($player1);
$team->addPlayer($player2);
$team->addPlayer($player3);

// výpis
echo "Tým: {$team->name} ({$team->city})<br>";
echo "Hráči:<br>";

foreach ($team->players as $player) {
    echo $player->introduce() . "<br>";
}
