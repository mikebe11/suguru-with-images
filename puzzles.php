<?php

$id = isset($_GET['id']) ? (int) $_GET['id'] : 1;

$height = isset($_GET['h']) ? $_GET['h'] : 5;

$width = isset($_GET['w']) ? $_GET['w'] : 5;

$size = $width . 'x' . $height;

$pdo = new PDO('sqlite:./puzzles.db');

$query = $pdo->prepare('SELECT puzzle FROM puzzles WHERE id = ? AND size = ?');

$status = $query->execute([$id, $size]);

$result = $query->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'status' => $status,
    'data'   => json_decode($result['puzzle'])
]);
