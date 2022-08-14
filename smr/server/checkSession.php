<?php

// Todo: remove in production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'dbconnect.php';

if (!isset($_COOKIE['session']))
    exit('false');
$sessId = $_COOKIE['session'];

$conn = connect();
if (!$conn) exit('false');
$sql = "SELECT * FROM Session WHERE id = ?";
$query = $conn->prepare($sql);
$query->bind_param('s', $sessId);
$query->execute();
$result = $query->get_result();
$query->close();

if (mysqli_num_rows($result) == 0) {
    exit('false');
}

$id = (int) mysqli_fetch_assoc($result)['id'];
$sql = "SELECT * FROM User WHERE id = ?";
$query = $conn->prepare($sql);
$query->bind_param('i', $id);
$query->execute();
$result = $query->get_result();

if (!$result || mysqli_num_rows($result) == 0) exit('false');
$user = mysqli_fetch_assoc($result);
$json = json_encode($user);
exit($json);