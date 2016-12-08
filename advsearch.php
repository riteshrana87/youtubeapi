<?
	//error_reporting(E_ALL);
	//ini_set('display_errors', true);
	$datatype = $_GET['type'];
	header('Content-type: application/json');
	$db = mysql_connect('80.179.155.96', 'root', 'spinoff87db');
	$q = $_GET['q'];
	$vd = $_GET['vd'];
	$source = $_GET['s'];
	$categoryid = $_GET['c'];
	$minviews = $_GET['minviews'];
	$maxviews = $_GET['maxviews'];
	if (!$db) {
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("videopoint") or die(mysql_error());
	if ($datatype=='categories') {
		$result=mysql_query("select ProfileId,ProfileName from profiles order by ProfileName") or die ("Query failed:" .mysql_error());
	}
	if ($datatype=='viewdated') {
		$result=mysql_query("select date(LastUpdateDate) as date from medialinkstables GROUP BY date(LastUpdateDate) order by LastUpdateDate DESC limit 0,100") or die ("Query failed:" .mysql_error());
	}
	if ($datatype=='source') {
		$result=mysql_query("select v.WebSiteName from medialinkstables m left outer join videosharingwebsitestable v on m.WebsiteSource=v.ID group by WebSiteName") or die ("Query failed:" .mysql_error());
	}
	if ($datatype=='commitsearch') {
		if ($vd=='All') {
		} else {
			$filter.="AND (LastUpdateDate>'".$vd."')";
		}
		if ($source=='All') {
		} else {
			$filter.="AND (WebsiteSource=".$source.")";
		}
		if (($categoryid=='All') or ($categoryid=='0')) {
		} else {
			$filter.="AND (Categories=".$categoryid.")";
		}
		$filter.="AND NumberOfViews>".$minviews." AND NumberOfViews<".$maxviews;
		$result=mysql_query("SELECT ID,ImageUrl,embedUrl,Title,MovieText,Length FROM medialinkstables WHERE (Title LIKE '%".$q."%' OR MovieText LIKE '%".$q."%') ".$filter." LIMIT 0,25") or die ("Query failed:" .mysql_error());		
	}
	$title='';
	$posts = array();
	while($row = mysql_fetch_array($result ))
    {
		$posts[] = $row;
	}
	//echo "SELECT ID,ImageUrl,embedUrl,Title,MovieText,Length FROM medialinkstables WHERE (Title LIKE '%".$q."%' OR MovieText LIKE '%".$q."%') ".$filter." LIMIT 0,25";
	echo json_encode($posts);
	//mysql_close($db);
?>