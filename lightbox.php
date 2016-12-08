<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Lightbox</title>
  <link rel="stylesheet" type="text/css" href="include/style/lightbox.css"/>
  <link rel="stylesheet" type="text/css" href="include/style/style.css"/>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  
  <?php 
  $get = file_get_contents('http://api.leadspotting.com/LSAPI/LeadSpottingApi.jsp?Command=BadeeGetFeed&userId=74');
 $arr = simplexml_load_string($get);
 
 //echo "<pre>";print_r($arr); echo "</pre>";
//$ex = explode('/',$arr->Video->Image);
// print_r($ex[4]);
// echo "KEY :".$ex[4];

 //echo count($arr->Video);
//$videoid =array();

 ?>
 <script>
var videoid = new Array();
var videosourcetype = new Array();
var vidoelength = new Array();
var videovotes = new Array();
var videodesc = new Array();
var videorl = new Array(); /* related links */
var videothumb = new Array();
var viewersrange = new Array();
var videotags = new Array();
var videora = new Array();

var viewersrange_start = 100;
var viewersrange_end = 500;

videorl[0]='Video Point provides an effective complementary';
videorl[1]='German trailer / deutscher Trailer - premieres at the Berlin Film Festival 2011';
videorl[2]='Verwe ndung mit bla bla bla';
viewersrange[0]='0';
viewersrange[1]='100';
viewersrange[2]='500';
viewersrange[3]='750';
viewersrange[4]='1000';

var srvideoid = new Array();
var srvideothumb = new Array();
var srvideosourcetype = new Array();
var srvidoelength = new Array();
var srvideovotes = new Array();
var srvideodesc = new Array();
var srvideoembedurl = new Array();

var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

var currentpage = 0;

<?php
$get = file_get_contents('http://api.leadspotting.com/LSAPI/LeadSpottingApi.jsp?Command=BadeeGetFeed&userId=74');
$arr = simplexml_load_string($get);
for($i=0; $i<=count($arr->Video); $i++){

$ex 		= explode('/',$arr->Video[$i]->Image);
$jaTitle	= substr($arr->Video[$i]->Title,2);

//print_r($ex);
?>

videoid[<?php echo $i; ?>] 			= "<?php echo $ex[4]; ?>";
videosourcetype[<?php echo $i; ?>] 	= "youtube";
vidoelength[<?php echo $i; ?>] 		= '01:00';
videovotes[<?php echo $i; ?>] 		= '1';
videodesc[<?php echo $i; ?>] 		= '<?php echo $arr->Video[$i]->Title; ?>';
videothumb[<?php echo $i; ?>] 		= '<?php echo $arr->Video[$i]->Image; ?>';
videotags[<?php echo $i; ?>] 		= '<a href="#">1</a>,<a href="#">2</a>,<a href="#">3</a>';
videora[<?php echo $i; ?>] 			= '<a href="#">11</a>';

<?php } ?>
 
 </script>

  <script src="include/js/js.js"></script>
</head>

<body onload="createthumbs(0,0);">
<div align="left">
  <div class="container">
    <div class="header">
      <h1>Suggestions</h1>
      <!--<div class="close"><a href="#" class="lightSwitcher" id="hide"><img src="images/closex.jpg" border="0" /></a></div>-->
    </div>
    <div class="main">
    <div class="pad">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td height="375" width="485">
          <div class="hpad"></div>
          <div class="source">Source: <span id="sourcetype"></span></div>
          <div class="videoplayers">
            <div class="vimeo" style="display: none;">                
            </div>
            <div class="youtube" id="youtube">
            <div class="videoscreen" id="ytvideo">
			<div id="ytapiplayer" class="errormessage">You need Flash player 8+ and JavaScript enabled to view this video.</div>
            </div>
            </div>
            <div class="unknown" style="display:none;">
            </div>
          </div>
          <div class="panel">
            <ul>
              <li class="comment">
                <span id="votecomment" style="visibility: hidden;" class="votecomment"><img src="images/votecomment.png" />This was helpful, thanks.</span><img src="images/votestateoff.png" style="margin-left: 42px;" id="votepanel" width="59" height="25" border="0" usemap="#Map" />
              </li>
              <li class="sepper"><img src="images/itemssepper.jpg" width="1" height="22" alt="" /></li>
              <li class="sepper"><img src="images/itemssepper.jpg" width="1" height="22" alt="" /></li>
              <li>
              <div style="padding-top: 5px;">
                <div class="addthis_toolbox addthis_default_style addthis_16x16_style">
                  <a class="addthis_button_compact"></a>
                  <a class="addthis_button_preferred_4"></a>
                  <a class="addthis_button_preferred_3"></a>
                  <a class="addthis_button_preferred_2"></a>
                  <a class="addthis_button_preferred_1"></a>							  
                </div>
              </div>
              </li>
            </ul>
          </div>
        </td>
        <td width="14">&nbsp;</td>
        <td width="256" valign="top">
          <div class="inheader">
            <h2 onclick="createthumbs(0,0);closesearchpanel();"><a href="#">Suggestions</a></h2>
          </div>
          <div class="suggestions">            
          </div>
          <div class="pages" align="center">            
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>
        <div class="intrestedin">
        You might also be intrested in:
        <div class="relatedlinks">
        <ul>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
        </ul>
        </div>
        </div>
        </td>
        <td>&nbsp;</td>
        <td class="tags">
          <div class="tagsin">            
          </div>
          <a href="http://www.thevideopoint.com" target="_new" style="color: #4c4d4f;"><div class="vp">Powered by The VideoPoint</div></a>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
    </div>
    </div>
  </div>  
</div>
<map name="Map" id="Map">
  <area shape="rect" coords="31,1,56,24" onmouseover="rendervoteneg();" onmouseout="rendernovote();" href="javascript:setvoteneg();" />
  <area shape="rect" coords="2,1,27,24" onmouseover="rendervotepos();" onmouseout="rendernovote();" href="javascript:setvotepos();" />
</map>
<script type="text/javascript">
  
  $(document).ready(function(){

createthumbs(0,0);
renderinvideo(0);
  });
</script>
</body>
</html>
