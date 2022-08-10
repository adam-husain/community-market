<?php

if (!hasPost('name') || !hasPost('pic') || !hasPost('pronouns')) {
    header('Location: edit_profile.html');
    exit();
}

$unique_id = uniqid (rand(), true);
$name = $_POST['name'];
$pronouns = $_POST['pronouns'];


$img_name = basename($_FILES['pic']['name']);
$img_dir = 'img/profile/'.$img_name;

echo($unique_id.':'.$img_dir.':'.$name.':'.$pronouns);

function hasPost($varName): bool
{
    return isset($_POST[$varName]);
}

