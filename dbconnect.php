<?php


$servername = "localhost";
$username = "snyper";
$password = "adamH123#";

function smrConnect() {
    GLOBAL $servername, $username, $password;

    return mysqli_connect($servername, $username, $password);
}
