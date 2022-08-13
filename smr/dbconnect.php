<?php


$servername = "localhost";
$username = "snyper";
$password = "adamH123#";

function connect() {
    GLOBAL $servername, $username, $password;

    return mysqli_connect($servername, $username, $password, 'smr_market');
}
