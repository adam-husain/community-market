<?php

include "dbconnect.php";

$name = getPost('name');
$email = getPost('email');
$reason = (int) getPost('reason');
$message = getPost('message');
$ip = $_SERVER['REMOTE_ADDR'];

$conn = connect();
$sql = "INSERT INTO Contact (`name`, email, reason, message, ip) VALUES (?, ?, ?, ?, ?)";
$query = $conn->prepare($sql);
$query->bind_param('ssiss', $name, $email, $reason, $message, $ip);
$query->execute();

redirect('../products.html');
