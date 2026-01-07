<?php
// #3 ~ Najdi spolužáka

$spoluzaci = [
    [ 
        'jmeno' => "Jan Doležal",
        'pohlavi' => 'muz',
        'prumer' => 5
    ],
    [ 
        'jmeno' => "Anna Brávůrská",
        'pohlavi' => 'zena',
        'prumer' => 3
    ],
    [ 
        'jmeno' => "Radek Pálka",
        'pohlavi' => 'muz',
        'prumer' => 1
    ],
    [ 
        'jmeno' => "Marie Jasná",
        'pohlavi' => 'zena',
        'prumer' => 2
    ],
];

function hledatSpoluzaka($pohlavi, $prumernaZnamka) {
    global $spoluzaci;

    foreach ($spoluzaci as $zak) { 
        if ($zak['pohlavi'] == $pohlavi && $zak['prumer'] == $prumernaZnamka) {
            return $zak; // nalezen
        }
    }
    return false; // nenalezen
}

$nalezen = hledatSpoluzaka('muz', 1);

if ($nalezen) {
    echo "Našli jsme podle vašich kritérií:<br>";
    print_r($nalezen);
} else {
    echo "Nebyl nalezen žádný záznam!";
}


?>
