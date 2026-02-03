<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <title>Avengers: Doomsday</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-image: url("https://cdn.marvel.com/content/2x/avengersdoomsday_lob_mas_mob_02.jpg");
            background-size: cover;
            color: #0d713a;
            text-align: center;
            padding-top: 50px;
        }

        h1 {
            font-size: 2.5em;
            margin-bottom: 40px;
            text-shadow: 2px 2px 5px #000;
        }

        .countdown {
            font-size: 2em;
            background-color: #191f15a1;
            display: inline-block;
            padding: 30px 50px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(255,255,255,0.5);
        }

        .countdown span {
            display: inline-block;
            min-width: 80px;
        }
    </style>
</head>
<body>

<h1>Odpočet do Avengers: Doomsday</h1>

<div class="countdown">
<?php
$cil = strtotime("2026-12-18 00:00:00"); // datum a čas premiéry
$ted = time();
$zbyva = $cil - $ted;

if ($zbyva > 0) {
    $dny = floor($zbyva / 86400);
    $hodiny = floor(($zbyva % 86400) / 3600);
    $minuty = floor(($zbyva % 3600) / 60);
    $sekundy = $zbyva % 60;

    echo "<span>$dny dní</span> ";
    echo "<span>$hodiny hodin</span> ";
    echo "<span>$minuty minut</span> ";
    echo "<span>$sekundy sekund</span>";
} else {
    echo "Doomsday je zde";
}
?>
</div>

</body>
</html>