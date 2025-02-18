<?php
if (isset($_COOKIE['user'])) {
    echo "Welcome back, " . $_COOKIE['user'] . "!";
} else {
    echo "No cookie found!";
}
?>
