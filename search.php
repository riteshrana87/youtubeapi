<?
	error_reporting(E_ALL);
	ini_set('display_errors', true);
	header('Content-type: application/json');
	$db = mysql_connect('80.179.155.96', 'root', 'spinoff87db');
	if (!$db) {
		die('Could not connect: ' . mysql_error());
	}
	$q = $_GET['q'];
	mysql_select_db("videopoint") or die(mysql_error());
	$result=mysql_query("SELECT ID,ImageUrl,embedUrl,Title,MovieText,Length FROM medialinkstables WHERE Title LIKE '%".$q."%' OR MovieText LIKE '%".$q."%' LIMIT 0,30")
	  or die ("Query failed:" .mysql_error());
	$title='';
	$posts = array();
	while($row = mysql_fetch_array($result ))
    {
		$posts[] = $row;
	}
	//echo json_encode('d');  
	echo json_encode($posts);
	//mysql_close($db);
?>