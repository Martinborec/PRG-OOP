<?php
// #1 ~ Průměr pole
$cisla = [2, 4, 5, 8, 6]; 
$soucet = 0;

for ($i = 0; $i < count($cisla); $i++) {
    $soucet += $cisla[$i];
}

$prumer = $soucet / count($cisla);
echo $prumer;

?>
