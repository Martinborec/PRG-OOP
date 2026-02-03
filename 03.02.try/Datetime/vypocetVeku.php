<?php

class Datetimecustom {
    private $birth;

    function __construct($birthDate) {
        $this->birth = $birthDate;
    }
    function getAge() {
        return date('Y') - date('Y', strtotime($this->birth));
    }
}



$osoba = new Datetimecustom('2000-05-15');
echo "Věk: " . $osoba->getAge() . " let\n";
