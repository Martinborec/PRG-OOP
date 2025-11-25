<?php
///     #1 ~ Násobky      ///


$zaklad = 7; 
$max = 30;   

for ($i = $zaklad; $i <= $max; $i += $zaklad) {
    echo $i;
    if ($i + $zaklad <= $max) {
        echo ", ";
    }
}

?>