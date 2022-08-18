<?php

// Todo: remove in production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'dbconnect.php';

if (!isset($_GET['session']))
    exit('false, no cookie');
$sessId = $_GET['session'];

$conn = connect();
if (!$conn) exit('false, database error');
$sql = "SELECT * FROM Session INNER JOIN User ON Session.user_id = User.user_id WHERE session_id = ?";
$query = $conn->prepare($sql);
$query->bind_param('si', $sessId);
$query->execute();
$result = $query->get_result();
$query->close();

if (mysqli_num_rows($result) == 0) {
    exit('false, session '.$sessId.' not found');
}

$user = mysqli_fetch_assoc($result);
$json = json_encode($user);
exit($json);