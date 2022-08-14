<?php

// Todo: remove in production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'dbconnect.php';

$action = $_GET['action'];

// Login
$login_username = getPost('login-username');
$login_password = getPost('login-password');
$login_remember = getPost('login-remember');

// Register
$register_username = getPost('register-username');
$register_password = getPost('register-password');
$register_name = getPost('register-name');
$register_pronouns = getPost('register-pronouns');
$register_whatsapp = getPost('register-whatsapp');
$register_pic = uploadFile('register-pic', '../img/profile/');

if ($action == 'login') {
    if (!$login_username || !$login_password) {
        redirect('accounts.html');
    } else {
        if ($login_remember !== false) $login_remember = true;
        login($login_username, $login_password, $login_remember);
    }
} else if ($action == 'register') {
    if (!$register_username
        || !$register_password
        || !$register_name
        || !$register_pronouns
        || !$register_whatsapp) {
        redirect('accounts.html');
    }
    if (!is_string($register_pic)) {
        $register_pic = 'default.jpeg';
    }
    register($register_username, $register_password, $register_name, (int)$register_pronouns, $register_whatsapp, $register_pic);
} else {
    redirect('accounts.html');
}

/**
 * 0: Success
 * 1: Cannot find user
 * 2: Database connection error
 * @param string $username
 * @param string $password
 * @param bool $remember
 * @return void
 */
function login(string $username, string $password, bool $remember)
{
    $conn = connect();
    $code = 0;
    $id = -1;
    if (!$conn) {
        $code = 2;
    }

    $hash = hash('sha256', $password);
    $sql = "SELECT ID FROM User WHERE username = ? AND `password` = ?";
    $query = $conn->prepare($sql);
    $query->bind_param('ss', $username, $hash);
    $query->execute();
    $result = $query->get_result();
    $query->close();

    if (!$result) {
        $code = 2;
    } else if (mysqli_num_rows($result) == 0) {
        $code = 1;
    } else {
        $user = mysqli_fetch_assoc($result);
        $id = (int)$user['id'];
    }

    if ($code == 0) {
        $sessId = $hash('sha256', $id . time());
        $sql = "INSERT INTO Session (id, user_id) VALUES ($sessId, $id)";
        $query = $conn->prepare($sql);
        $query->execute();
        if (!$query->get_result()) {
            $code = 2;
        } else {
            setcookie('session', $sessId, time() + (86400 * 1000), "/");
        }
    }

    $conn->close();
    redirect("accounts.html?action=login&code=$code");
}


/**
 * 0: Success
 * 1: Username is invalid
 * 2: Password is invalid
 * 3: Whatsapp is invalid
 * 4: Username is taken
 * 5: Database connection error
 * @param string $username
 * @param string $password
 * @param string $name
 * @param int $pronouns
 * @param string $whatsapp
 * @param string $pic
 * @return void
 */
function register(string $username, string $password, string $name, int $pronouns, string $whatsapp, string $pic)
{
    $code = 0;
    if (!preg_match('^(?=.{5,20}$)[a-z0-9]+(?:[._][a-z0-9]+)*[._]?$', $username)) {
        $code = 1;
    }

    if (strlen($password) < 6) {
        $code = 2;
    }

    if (!preg_match('^\+(?:[0-9]●?){6,14}[0-9]$', $whatsapp)) {
        $code = 3;
    }

    if ($code != 0) {
        redirect("accounts.html?action=register&code=$code");
        return;
    }

    $conn = connect();
    if (!$conn) {
        $code = 5;
    }

    if ($code == 0 &&
        $result = $conn->query("SELECT * FROM User WHERE username = $username")) {
        if ($result->num_rows != 0) {
            $code = 4;
        } else {
            $hash = hash('sha256', $password);
            $sql = "INSERT INTO User (username, `password`, `name`, pronouns, profile_url, whatsapp) 
            VALUES (?, ?, ?, ?, ?, ?)";
            $query = $conn->prepare($sql);
            $query->bind_param('sssiss', $username, $hash, $name, $pronouns, $pic, $whatsapp);
            $query->execute();
            $result = $query->get_result();

            if (!$result) {
                $code = 5;
            } else {
                login($username, $password, true);
                return;
            }
        }
    } else {
        $code = 5;
    }

    $conn->close();
    redirect("accounts.html?action=register&code=$code");
}