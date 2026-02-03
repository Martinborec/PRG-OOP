<?php

class Fighter {
    public string $name;
    public int $hp = 100;
    public int $damage;

    public function __construct(string $name, int $damage) {
        $this->name = $name;
        $this->damage = $damage;
    }
}

class Fight {
    public static function boj(Fighter $f1, Fighter $f2) {

      while()
        }
    }
}

// vytvoření bojovníků
$fighter1 = new Fighter("Pavlas", 15);
$fighter2 = new Fighter("Max", 20);

// volání statické funkce
Fight::boj($fighter1, $fighter2);
