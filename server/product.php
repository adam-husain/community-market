<?php

// Todo: remove in production
use JetBrains\PhpStorm\NoReturn;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'dbconnect.php';

$action = $_GET['action'];


switch ($action) {
    case 'new':
        $userId = (int)getPost('userId');
        $title = getPost('title');
        $desc = getPost('desc');
        $residence = getPost('residence');
        $price = floatval(getPost('price'));
        $file = uploadFile('image', '../img/products/');
        if (!is_string($file)) $file = 'default.jpeg';
        newProduct($userId, $title, $desc, $residence, $price, $file);
    case 'all':
        allProducts();
    case 'user':
        $userId = (int) $_GET['userId'];
        userProducts($userId);
    case 'delete':
        $session = $_GET['session'];
        $prodId = (int) $_GET['product'];
        delete($session, $prodId);
    case 'report':
        $ip = $_SERVER['REMOTE_ADDR'];
        $prodId = (int) $_GET['product'];
        report($ip, $prodId);
    default:
        break;
}

/**
 * 0: Success
 * 1: Invalid product details
 * 2: Database connection error
 * @param int $userId
 * @param string $title
 * @param string $desc
 * @param string $residence
 * @param float $price
 * @param string $file
 * @return void
 */
#[NoReturn] function newProduct(int $userId, string $title, string $desc, string $residence, float $price, string $file): void
{
    $code = 0;
    if (!$userId || !$title || !$desc || !$price || !$file) {
        $code = 1;
    }

    if ($userId == -1) $code = 1;

    $conn = connect();
    if (!$conn) $code = 2;

    if ($code == 0) {
        $price = (int) ($price * 100); // Convert it to sen
        $sql = 'INSERT INTO Product (`title`, `description`, price, seller_id, image_url, residence) VALUES (?, ?, ?, ?, ?, ?)';
        $query = $conn->prepare($sql);
        $query->bind_param('ssiss', $title, $desc, $price, $userId, $file, $residence);
        $query->execute();
    }

    redirect("new_product.html?code=$code");
}

/**
 * @return void
 */
#[NoReturn] function allProducts(): void
{
    $conn = connect();

    if (!$conn) exit('false, cannot connect to database');

    $sql = 'SELECT * FROM Product INNER JOIN User ON Product.seller_id = User.user_id WHERE available = true and hidden = false';
    if ($result = $conn->query($sql))
    {
        $data = array();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $conn->close();
        exit(json_encode($data));
    }
    else {
        $conn->close();
        exit('false, could not access database');
    }

}

/**
 * @param int $userId
 * @return void
 */
#[NoReturn] function userProducts(int $userId): void
{
    $conn = connect();

    if (!$conn) exit('false, cannot connect to database');

    $sql = 'SELECT * FROM Product WHERE seller_id = ? AND available = true and hidden = false';
    $query = $conn->prepare($sql);
    $query->bind_param('i', $userId);
    $query->execute();
    $result = $query->get_result();

    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $conn->close();
    exit(json_encode($data));
}

/**
 * @param string $session
 * @param int $prodId
 * @return void
 */
#[NoReturn] function delete(string $session, int $prodId): void
{
    $conn = connect();
    if (!$conn) exit('false, cannot connect to database');

    $sql = 'UPDATE Product SET available = false WHERE product_id = ? and seller_id = 
                                                              (SELECT user_id FROM Session WHERE session_id = ?)';
    $query = $conn->prepare($sql);
    $query->bind_param('is', $prodId, $session);
    $query->execute();
    $result = $query->get_result();
    if (mysqli_num_rows($result) == 0) exit('false, cannot find product');
    $query->close();

    exit('true');
}

/**
 * @param string $ip
 * @param int $prodId
 * @return void
 */
#[NoReturn] function report(string $ip, int $prodId): void
{
    $conn = connect();
    if (!$conn) exit('false, cannot connect to database');

    $sql = 'INSERT INTO Product_Report (user_ip, product_id, report) VALUES (?, ?, 0)';
    $query = $conn->prepare($sql);
    $query->bind_param('si', $ip, $prodId);
    $query->execute();
    $query->close();

    exit('true');
}