<?php
// Updating the 'user' cookie with a new value
setcookie("user", "Jane Doe", time() + 3600, "/");
echo "Cookie 'user' is updated! New value: " . $_COOKIE['user'] ?? 'Not set yet';
?>
