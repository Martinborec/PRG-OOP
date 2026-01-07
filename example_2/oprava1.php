<?php
// #1 ~ Maximum v poli
$cisla = [2, 4, 5, 8, 6];
$nejvetsi = 0; // čísla jsou nad nulou

for ($index = 0; $index < count($cisla); $index++) { 
    $aktualniPrvek = $cisla[$index];
    if ($aktualniPrvek > $nejvetsi) {
        $nejvetsi = $aktualniPrvek;
    }
}

echo $nejvetsi;

?>
