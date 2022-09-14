<?php

function compressImageOld($source, $destination, $quality)
{
    $info = getimagesize($source);
    switch ($info['mime']) {
        case 'image/jpeg':
            $image = imagecreatefromjpeg($source);
            imagejpeg($image, $destination, $quality);
            break;
        case 'image/gif':
            $image = imagecreatefromgif($source);
            imagejpeg($image, $destination, $quality);
            break;
        case 'image/png':
            $image = imagecreatefrompng($source);
            imagealphablending($image, false);
            imagesavealpha($image, true);
            $qf = ($quality == 100) ? 99 : $quality;
            $qf = $qf / 10;
            $qf = 10 - $qf;
            imagepng($image, $destination, $qf);
            break;
        default:
            return false;
    }
    return $destination;
}


/**
 * @throws ImagickException
 */
function compressImage($source, $destination, $quality)
{
    $img = new Imagick($source);
    $orient = $img->getImageOrientation();
    if ($orient === 6) {
        // we need to rotate it 90deg
        $img->rotateImage("rgba(255, 255, 255, 0.0)", 90);
    }
    if ($orient === 3) {
        // we need to rotate it 180deg
        $img->rotateImage("rgba(255, 255, 255, 0.0)", 180);
    }
    // Note that imagick does the storage for me as well!
    $img->writeImage($destination);
    return compressImageOld($destination, $destination, $quality);
}