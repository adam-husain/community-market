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
        $title = getPost('title');
        $desc = getPost('desc');
        $price = floatval(getPost('price'));
        $file = uploadFile('image', '../img/products');
        if (!is_string($file)) $file = 'default.jpeg';
        newProduct($userId, $title, $desc, $price, $file);
        break;
    case 'all':
        allProducts();
        break;
    case 'user':
        $userId = (int) $_GET['id'];
        userProducts($userId);
        break;
    case 'delete':
        $session = $_GET['session'];
        $prodId = (int) $_GET['product'];
        delete($session, $prodId);
        break;
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
 * @param float $price
 * @param string $file
 * @return void
 */
function newProduct(int $userId, string $title, string $desc, float $price, string $file): int
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
        $sql = 'INSERT INTO Product (`title`, `description`, price, seller_id, image_url) VALUES (?, ?, ?, ?, ?)';
        $query = $conn->prepare($sql);
        $query->bind_param('ssiss', $title, $desc, $price, $userId, $file);
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

    $sql = 'SELECT * FROM Product INNER JOIN User ON Product.seller_id = User.id WHERE available = true';
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

    $sql = 'SELECT * FROM Product WHERE seller_id = ? AND available = true';
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
function delete(string $session, int $prodId)
{
    $conn = connect();
    if (!$conn) exit('false, cannot connect to database');

    $sql = 'SELECT user_id FROM Session WHERE id = ?';
    $query = $conn->prepare($sql);
    $query->bind_param('s', $session);
    $query->execute();
    $result = $query->get_result();
    if (mysqli_num_rows($result) == 0) exit('false, invalid session');
    $userId = (int) $result->fetch_assoc()['user_id'];
    $query->close();

    $sql = 'UPDATE Product SET available = false WHERE id = ? and seller_id = ?';
    $query = $conn->prepare($sql);
    $query->bind_param('ii', $prodId, $userId);
    $query->execute();

    exit('true');
}