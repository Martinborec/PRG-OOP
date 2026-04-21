<?php

include_once("vendor/autoload.php");

$whoops = new \Whoops\Run;
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
$whoops->register();


throw new Exception("a");

throw new Exception("b");



?>