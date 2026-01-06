<?php
/************************************
 *  STŘEDOVĚKÁ RPG – OOP DEMO (PHP)
 ************************************/

class Entity {
    public $name;
    private $health;
    private $damage;

    // GETTER – správné zapouzdření
    public function getHP() {
        return $this->health;
    }

    public function printHP() {
        return "<div class='hp'>❤️ HP: {$this->health}</div>";
    }

    public function heal($amount){
        if ($amount >= 0) {
            $this->health += $amount;
        }
    }

    function __construct($name) {
        $this->name   = $name;
        $this->health = 100;
        $this->damage = rand(5, 20);
    }

    public function isAlive() {
        return $this->health > 0;
    }

    public function attack(Entity $target) {
        $damage = $this->damage;
        echo "<div class='log attack'>{$this->name} útočí na {$target->name} <strong>-$damage HP</strong></div>";
        $target->health -= $damage;
    }

    public function printInfo() {
        echo "<div class='entity'>
                <h2>{$this->name}</h2>
                {$this->printHP()}
                <div class='dmg'>⚔️ DMG: {$this->damage}</div>
              </div>";
    }
}
?>

<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<title>Středověký souboj</title>

<style>
/* ===== ZÁKLAD ===== */
body {
    background: #2e1f14;
    font-family: Georgia, serif;
    padding: 20px;
}

.game {
    max-width: 900px;
    margin: auto;
    background: #f3e5ab;
    border: 10px solid #6b4f1d;
    box-shadow: 0 0 40px black;
    padding: 20px;
}

h1, h2, h3 {
    text-align: center;
}

.entities {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

/* ===== ENTITY ===== */
.entity {
    width: 45%;
    background: #e8d8a8;
    border: 3px solid #6b4f1d;
    padding: 15px;
    text-align: center;
}

.hp {
    font-size: 18px;
    margin: 5px 0;
}

.dmg {
    font-weight: bold;
}

/* ===== ROUND ===== */
.round {
    background: #fff3cd;
    border: 2px dashed #6b4f1d;
    margin: 15px 0;
    padding: 10px;
    animation: fadeIn 0.6s ease-out;
}

.log {
    margin: 6px 0;
    animation: fadeIn 0.4s ease-out;
}

/* ===== HP STATUS ===== */
.hp-status {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 10px;
    background: #e6d3a3;
    border: 2px solid #6b4f1d;
    animation: glow 0.6s;
}

/* ===== VÝSLEDEK ===== */
.win {
    text-align: center;
    font-size: 42px;
    color: darkgreen;
    animation: scaleIn 1s ease-out;
}

.lose {
    text-align: center;
    font-size: 42px;
    color: darkred;
    animation: scaleIn 1s ease-out;
}

/* ===== ANIMACE ===== */
.attack {
    animation: shake 0.4s;
}

.heal {
    animation: glow 1s;
}

@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    50% { transform: translateX(6px); }
    75% { transform: translateX(-6px); }
    100% { transform: translateX(0); }
}

@keyframes glow {
    0% { box-shadow: 0 0 5px green; }
    50% { box-shadow: 0 0 20px lime; }
    100% { box-shadow: 0 0 5px green; }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
}
</style>
</head>

<body>

<div class="game">
<h1>⚔️ Středověký souboj ⚔️</h1>

<div class="entities">
<?php
$player = new Entity("Hráč");
$enemy  = new Entity("Nepřítel");

$player->printInfo();
$enemy->printInfo();
?>
</div>

<?php
$round = 1;
while ($player->isAlive() && $enemy->isAlive()) {
    echo "<div class='round'><h3>ROUND $round</h3>";

    if (rand(1,10) == 10) {
        $player->heal(5);
        echo "<div class='log heal'>🍀 Hráč měl štěstí a léčí se +5 HP</div>";
    }

    $player->attack($enemy);
    $enemy->attack($player);

    // 🔽 AKTUÁLNÍ HP PO KOLE
    echo "<div class='hp-status'>
            <strong>Hráč:</strong> {$player->getHP()} HP
            <strong>Nepřítel:</strong> {$enemy->getHP()} HP
          </div>";

    echo "</div>";
    $round++;
}

if ($player->isAlive()) {
    echo "<div class='win'>🏆 VYHRÁL JSI 🏆</div>";
} else {
    echo "<div class='lose'>☠️ PROHRÁL JSI ☠️</div>";
}
?>
</div>

</body>
</html>
