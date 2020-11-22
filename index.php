<?php

require_once __DIR__ . '/vendor/autoload.php';

$detect = new Mobile_Detect;

$mobile = ($detect->isMobile() || $detect->isTablet());

$js = $mobile ? './dist/main.mobileBundle.js' : './dist/main.bundle.js';

$pdo = new PDO("sqlite:./puzzles.db");

$query = $pdo->query('SELECT size, puzzle FROM puzzles LIMIT 1');

$startPuzzle = $query->fetch(PDO::FETCH_ASSOC);

$query = $pdo->query('SELECT size, COUNT(id) AS count FROM puzzles GROUP BY `size`');

$sizes = [];

while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
    $sizes[$row['size']] = (int) $row['count'];
}

$dimensions = explode('x', $startPuzzle['size']);

$script = '<script> var suguru = {';
$script .=  'height:' . $dimensions[1] . ',';
$script .=  'width:' . $dimensions[0] . ',';
$script .=  'data:' . $startPuzzle['puzzle'] . ',';
$script .=  'sizes:' . json_encode($sizes);
$script .=  '}; </script>';

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Suguru with images</title>
    <link rel="stylesheet" href="./dist/index.css">
    <?php
        echo $script;
        
        echo '<script src="' . $js . '" defer="true"></script>';        
    ?>
</head>
<body<?php if ($mobile) {
    echo ' class="mobile"';
?>
>
    <main id="mobile-app"></main>
<?php } else { ?>
>
    <div>
        <main id="app"></main>
    </div>
<?php } ?>
</body>
</html>