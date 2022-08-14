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
        if (!$conn) $code = 3;
        else {
            $sql = "SELECT user_id FROM Session WHERE id = ?";
            $query = $conn->prepare($sql);
            $query->bind_param('s', $session);
            $query->execute();
            $result = $query->get_result();
            $query->close();

            if (mysqli_num_rows($result) == 0) {
                $code = 3;
            }
            else {
                $id = (int) $result->fetch_assoc()['user_id'];
                $sql = "UPDATE User SET `name` = ?, pronouns = ?, whatsapp = ?, profile_url = ? WHERE id = ?";
                $query = $conn->prepare($sql);
                $query->bind_param('sisss', $name, $pronouns, $whatsapp, $file, $id);
                $query->execute();
            }
        }
    }

    redirect("profile.html?code=$code");
}