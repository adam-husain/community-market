<?php

// Todo: remove in production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "snyper";
$password = "adamH123#";

function connect() {
    GLOBAL $servername, $username, $password;

    return mysqli_connect($servername, $username, $password, 'smr_market');
}

function redirect($url) {
    header("Location: http://myresidence.shop/smr/".$url);
    exit();
}

function getPost($varName)
{
    if (!isset($_POST[$varName])) return false;
    return $_POST[$varName];
}

/*
 * Error Codes
 * string: Success
 * 1: No file uploaded
 * 2: File is too big
 * 3: Invalid file format
 * 4: Database connection lost
 * 5: Invalid parameters
 * 6: Unknown error
 */
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
    $fileInfo = new finfo(FILEINFO_MIME_TYPE);
    if (false === $ext = array_search($fileInfo->file($_FILES[$tag]['tmp_name']), array('jpg' => 'image/jpeg', 'png' => 'image/png'), true)) {
        return 3;
    }

    // You should name it uniquely.
    // DO NOT USE $_FILES[$tag]['name'] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.
    $tmpFile = $_FILES[$tag]['tmp_name'];
    $filename = sprintf('%s.%s', sha1_file($tmpFile), $ext);
    $fileDir = $dir . $filename;

    // Compress image
    if (!compressImage($tmpFile , $fileDir , 50)) {
        return 2;
    }

    return $filename;
}