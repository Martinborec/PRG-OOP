<?php
///     #1 ~ Násobky      ///


$zaklad = 9; 
$max = 81;   

for ($i = $zaklad; $i <= $max; $i += $zaklad) {
    echo $i;
    if ($i + $zaklad <= $max) {
        echo ", ";
    }
}

?>