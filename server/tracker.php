<?php

include 'dbconnect.php';

/**
 * 0: Unknown
 * 1: Primary Poster QR Code
 * 2: Secondary Poster QR Code
 * 3: Homepage
 */
$method = (int) $_GET['method'];

/**
 * 0: Unknown
 * 1: Sunway Monash Residence
 * 2: Nadayu28
 */
$place = (int) $_GET['place'];

$ip = $_SERVER['REMOTE_ADDR'];

$conn = connect();
$sql = 'INSERT INTO Tracker (method, place, tracker_ip, device) VALUES (?, ?, ?, ?)';
$query = $conn->prepare($sql);
$query->bind_param('iiss', $method, $place, $ip, $_SERVER['HTTP_USER_AGENT']);
$query->execute();
$query->close();