<?php

if (!hasPost('name') || !hasPost('pic') || !hasPost('pronouns')) {
    header('Location: edit_profile.html');
    exit();
}
$name = $_POST['name'];
$pic = $_POST['pic'];
$pronouns = $_POST['pronouns'];


function hasPost($varName): bool
{
    return isset($_POST[$varName]);
}

