<?php

class Player {
    public string $name;
    public int $number;
    public string $position;

    public function __construct(string $name, int $number, string $position) {
        $this->name = $name;
        $this->number = $number;
        $this->position = $position;
    }

    // metoda 
    public function introduce(): string {
        return "Jmenuji se {$this->name}, hraji na pozici {$this->position}.";
    }
}
