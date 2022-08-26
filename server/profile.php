<?php

// Todo: remove in production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'dbconnect.php';

$session = $_GET['session'];

$name = getPost('name');
$pronouns = (int) getPost('pronouns');
$whatsapp = getPost('whatsapp');
$image = uploadFile('pic', '../img/profile/');
if (!is_string($image)) $image = 'default.jpeg';

saveProfile($session, $name, $pronouns, $whatsapp, $image);

/**
 * 0: success
 * 1: Invalid name
 * 2: Invalid whatsapp
 * 3: Database connection error
 * @param string $session
 * @param string $name
 * @param int $pronouns
 * @param string $whatsapp
 * @param string $file
 * @return void
 */
function saveProfile(string $session, string $name, int $pronouns, string $whatsapp, string $file) {

    $code = 0;

    if (strlen($name) < 2) {
        $code = 1;
    }

    if (preg_match('/^\+[0-9]{5,15}$/', $whatsapp) == 0) {
        $code = 2;
    }

    if ($code == 0) {
        $conn = connect();
        if (!$conn) {
            $code = 3;
        }
        else {
            $sql = "UPDATE User SET `name` = ?, pronouns = ?, whatsapp = ?, profile_url = ? WHERE user_id = 
                                                                              (SELECT user_id FROM Session WHERE session_id = ?)";
            $query = $conn->prepare($sql);
            $query->bind_param('sisss', $name, $pronouns, $whatsapp, $file, $session);
            $query->execute();
            $query->close();
        }
    }

    redirect("profile.html?code=$code");
}