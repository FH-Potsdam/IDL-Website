<?php

$db_server = "localhost";
$db_user = "root";
$db_pass = "root";
$db_database = "idl";

/*------------------- MYSQL -------------------*/

$mysqli = new mysqli($db_server, $db_user, $db_pass, $db_database);

if (mysqli_connect_errno()) {
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

ini_set('default_socket_timeout', 900);
$mysqli->query("SET NAMES 'utf8'");

?>