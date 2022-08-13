<?php

include 'dbconnect.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!hasPost('name') || !hasPost('pronouns')) {
    header('Location: edit_profile.html');
    exit();
}

$name = $_POST['name'];
$pronouns = (int)$_POST['pronouns'];
$whatsapp = $_POST['whatsapp'];

$img_dir = 'img/profile/';

/*
 * Error Codes
 * 0: Success
 * 1: No file uploaded
 * 2: File is too big
 * 3: Invalid file format
 * 4: Database connection lost
 * 5: Invalid parameters
 * 6: Unknown error
 */

$file_verification = uploadFile('pic', $img_dir);
$code = 0;
if (is_string($file_verification)) {
    $conn = connect();
    if ($conn === false) {
        $code = 4;
    } else {
        $sql = "INSERT INTO User (`name`, pronouns, profile_url, whatsapp) VALUES (?, ?, ?, ?)";
        $query = $conn->prepare($sql);
        if (!$query) echo($conn->error);
        $query->bind_param("siss", $name, $pronouns, $file_verification, $whatsapp);
        $query->execute();
        $query->close();
    }
    $conn->close();
} else {
    $code = $file_verification;
}

header("Location: products.html?code=$code");


function uploadFile($tag, $dir)
{
    // Undefined | Multiple Files | $_FILES Corruption Attack
    // If this request falls under any of them, treat it invalid.
    if (!isset($_FILES[$tag]['error']) || is_array($_FILES[$tag]['error'])) {
        return 0;
    }

    // Check $_FILES[$tag]['error'] value.
    switch ($_FILES[$tag]['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            return 1;
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            return 2;
        default:
            return 4;
    }

    // You should also check filesize here.
    /*if ($_FILES[$tag]['size'] > 100000) {
        throw new RuntimeException('Exceeded filesize limit.');
    }*/

    // DO NOT TRUST $_FILES[$tag]['mime'] VALUE !!
    // Check MIME Type by yourself.
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if (false === $ext = array_search($finfo->file($_FILES[$tag]['tmp_name']), array('jpg' => 'image/jpeg', 'png' => 'image/png'), true)) {
        return 3;
    }

    // You should name it uniquely.
    // DO NOT USE $_FILES[$tag]['name'] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.
    $filename = sprintf($dir . '%s.%s', sha1_file($_FILES[$tag]['tmp_name']), $ext);
    if (!move_uploaded_file($_FILES[$tag]['tmp_name'], $filename)) {
        return 2;
    }

    return $filename;
}

function hasPost($varName): bool
{
    return isset($_POST[$varName]);
}

