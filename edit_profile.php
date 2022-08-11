<?php

include 'dbconnect.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!hasPost('name') || !hasPost('pronouns')) {
    header('Location: edit_profile.html');
    exit();
}

$file = 'img/profile/default.jpeg';
$name = $_POST['name'];
$pronouns = (int) $_POST['pronouns'];
$whatsapp = $_POST['whatsapp'];

$img_dir = './img/profile/';

$file_verification = uploadFile('pic', $img_dir);
if ($file_verification === true) {
    $conn = smrConnect();
    if ($conn === false) {
        echo ('db error');
    }
    else {
        $sql = "INSERT INTO User (name, pronouns, profile_url, whatsapp) VALUES (?, ?, ?, ?)";
        $query = $conn->prepare($sql);
        $query->bind_param("siss", $name, $pronouns, $file, $whatsapp);
        $query->execute();
        $query->close();
    }
}
else {
    echo ($file_verification);
}

function uploadFile($tag, $dir)
{
    try {
        // Undefined | Multiple Files | $_FILES Corruption Attack
        // If this request falls under any of them, treat it invalid.
        if (!isset($_FILES[$tag]['error']) || is_array($_FILES[$tag]['error'])) {
            throw new RuntimeException('Invalid parameters.');
        }

        // Check $_FILES[$tag]['error'] value.
        switch ($_FILES[$tag]['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new RuntimeException('No file sent.');
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                throw new RuntimeException('Exceeded filesize limit.');
            default:
                throw new RuntimeException('Unknown errors.');
        }

        // You should also check filesize here.
        /*if ($_FILES[$tag]['size'] > 100000) {
            throw new RuntimeException('Exceeded filesize limit.');
        }*/

        // DO NOT TRUST $_FILES[$tag]['mime'] VALUE !!
        // Check MIME Type by yourself.
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        if (false === $ext = array_search($finfo->file($_FILES[$tag]['tmp_name']),
                array('jpg' => 'image/jpeg', 'png' => 'image/png'), true)) {
            throw new RuntimeException('Invalid file format.');
        }

        // You should name it uniquely.
        // DO NOT USE $_FILES[$tag]['name'] WITHOUT ANY VALIDATION !!
        // On this example, obtain safe unique name from its binary data.
        $filename = sprintf($dir.'%s.%s', sha1_file($_FILES[$tag]['tmp_name']), $ext);
        if (!move_uploaded_file($_FILES[$tag]['tmp_name'], $filename)) {
            throw new RuntimeException('Failed to move uploaded file.');
        }

        $GLOBALS['file'] = $filename;
        return true;

    } catch (RuntimeException $e) {
        return $e->getMessage();
    }
}

function hasPost($varName): bool
{
    return isset($_POST[$varName]);
}

