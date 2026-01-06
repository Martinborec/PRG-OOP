<?php
echo("Výběr našich aut");
class Car {
    public $brand;
    public $distance;
    public $seat;

    public function __construct($brand, $distance, $seat,){
        $this->brand = $brand;

        // podmínky najetosti
        if ($distance < 1) {
            $distance = 0;
            $this->status = "Auto je úplně nové";
        } else {
            $this->status = "Auto má najeto $distance km";
        }

        $this->distance = $distance;
        $this->seat = $seat;
    }

    public function identifikuj() {
        echo '<div class="box">';
        echo '<strong>Značka:</strong> ' . $this->brand . '<br>';
        echo '<strong>Najeto:</strong> ' . $this->distance . ' km<br>';
        echo '<strong>Počet míst:</strong> ' . $this->seat . '<br>';
        echo  ("$this->status ");
        echo '</div>';
    }
}

// Testování objektů

echo '<div class="container">';

$Ferrari = new Car("Ferrari", 0, 5);
$Ferrari->identifikuj();

$Skoda = new Car("Škoda", 96000, 5);
$Skoda->identifikuj();

$Toyota = new Car("Toyota", 0, 7);
$Toyota->identifikuj();

echo '</div>';

?>


<style>
.box {
    border: 1px solid #333;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 8px;
    background-color: #f2f2f2;
    width: 300px;
}
.box strong {
    color: #0056b3;
}

.container {
    display: flex;
    justify-content: space-between;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 100px;
}

</style>
