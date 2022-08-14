<?php

// Todo: remove in production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'dbconnect.php';

$action = $_GET['action'];


switch ($action) {
    case 'new':
        $userId = (int)getPost('userId');
        $name = getPost('name');
        $desc = getPost('desc');
        $price = floatval(getPost('price'));
        $file = uploadFile('image', '../img/products');
        if (!is_string($file)) $file = 'default.jpeg';
        newProduct($userId, $name, $desc, $price, $file);
        break;
    case 'all':
        allProducts();
        break;
    case 'user':
        $userId = (int) $_GET['id'];
        userProducts($userId);
        break;
    default:
        break;
}

/**
 * 0: Success
 * 1: Invalid product details
 * 2: Database connection error
 * @param int $userId
 * @param string $name
 * @param string $desc
 * @param float $price
 * @param string $file
 * @return void
 */
function newProduct(int $userId, string $name, string $desc, float $price, string $file): int
{
    $code = 0;
    if (!$userId || !$name || !$desc || !$price || !$file) {
        $code = 1;
    }

    if ($userId == -1) $code = 1;

    $conn = connect();
    if (!$conn) $code = 2;

    if ($code == 0) {
        $price = (int) ($price * 100); // Convert it to sen
        $sql = 'INSERT INTO Product (`name`, `description`, price, seller_id, image_url) VALUES (?, ?, ?, ?, ?)';
        $query = $conn->prepare($sql);
        $query->bind_param('ssiss', $name, $desc, $price, $userId, $file);
        $query->execute();
    }

    redirect("new_product.html?code=$code");
}

/**
 * @return void
 */
function allProducts()
{
    $conn = connect();

    if (!$conn) exit('false, cannot connect to database');

    $sql = 'SELECT * FROM Product';
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
function userProducts(int $userId)
{
    $conn = connect();

    if (!$conn) exit('false, cannot connect to database');

    $sql = 'SELECT * FROM Product WHERE seller_id = ?';
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
