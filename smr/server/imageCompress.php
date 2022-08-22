<?php

function compressImage($source , $destination , $quality)
{
    $info = getimagesize($source);
    switch ($info['mime']) {
        case 'image/jpeg': $image = imagecreatefromjpeg($source); imagejpeg($image , $destination , $quality); break;
        case 'image/gif': $image = imagecreatefromgif($source); imagejpeg($image , $destination , $quality); break;
        case 'image/png':
            $image = imagecreatefrompng($source);
            imagealphablending($image, false);
            imagesavealpha($image, true);
            $qf = ($quality==100) ? 99 : $quality;
            $qf = $qf / 10;
            $qf = 10 - $qf;
            imagepng($image , $destination , $qf);
            break;
        default: return false;
    }
    return $destination;
}
