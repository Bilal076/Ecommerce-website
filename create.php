<?php
// Creating a cookie named 'user' with value 'John Doe' that expires in 1 hour
setcookie("user", "John Doe", time() + 3600, "/");
echo "Cookie 'user' is set!<br>";
echo "Value: " . $_COOKIE['user'] ?? 'Not set yet';
?>
