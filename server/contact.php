<?php

include "dbconnect.php";

$name = getPost('name');
$email = getPost('email');
$reason = (int) getPost('reason');
$message = getPost('message');
$ip = $_SERVER['REMOTE_ADDR'];

$conn = connect();

$sql = "SELECT `name` FROM Contact WHERE ip = ? AND contact_date > now() - INTERVAL 1 HOUR";
$query = $conn->prepare($sql);
$query->bind_param('s', $ip);
$query->execute();
$result = $query->get_result();
$query->close();

if ($result->num_rows == 0) {
    $sql = "INSERT INTO Contact (`name`, email, reason, message, ip) VALUES (?, ?, ?, ?, ?)";
    $query = $conn->prepare($sql);
    $query->bind_param('ssiss', $name, $email, $reason, $message, $ip);
    $query->execute();
}

redirect('../products.html');
