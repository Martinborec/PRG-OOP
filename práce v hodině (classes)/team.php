<?php

class Team {
    public string $name;
    public string $city;
    public int $maxPlayers;

    // zanoření objektu
    public array $players = [];

    public function __construct(string $name, string $city, int $maxPlayers) {
        $this->name = $name;
        $this->city = $city;
        $this->maxPlayers = $maxPlayers;
    }

    // metoda 
    public function addPlayer(Player $player): void {
        if (count($this->players) < $this->maxPlayers) {
            $this->players[] = $player;
        }
    }
}
