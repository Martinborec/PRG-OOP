<?php
// #2 ~ Zobrazení trojúhelníku (špičkou dolů)

$znakPixelu = '#';
$vyska = 4;

for ($radky = 0; $radky < $vyska; $radky++) {
    // Na každém dalším řádku je méně znaků
    $kolikZnakuNaRadek = $vyska - $radky;

    for ($linka = 0; $linka < $kolikZnakuNaRadek; $linka++) {
        echo $znakPixelu . " ";
    }

    echo "<br>";
}
?>
