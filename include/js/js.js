
var videos = (videoid.length/4);
var pages = Math.ceil(videos);
var srpages = 0;
var rapanel = false;
var sepanel = false;

var params = { allowScriptAccess: "always" };
var atts = { id: "myytplayer" };
				
swfobject.embedSWF("http://www.youtube.com/v/"+videoid[0]+"&hl=en&enablejsapi=1&playerType=chromeless&playerVersion=as3&fs=1&autoplay=0&amp&disablekb=1&rel=0;playerapiid=ytplayer","ytapiplayer", "470", "265", "8", null, null, params, atts);

$(document).ready(function(){
	$(".closeadvancedpanel").click(function(){
		$("#advfields").html('<tr><td>Category</td><td><select name="categoryid" id="categoryid"><option>All</option></select></td></tr><tr><td colspan="2" height="10"></td></tr><tr><td>Video Dated</td><td><select name="videodated" id="videodated"><option>All</option></select></td></tr><tr><td colspan="2" height="10"></td></tr><tr><td>Source</td><td><select name="source" id="source"><option>All</option></select></td></tr><tr><td colspan="2" height="10"></td></tr><tr><td>Views</td><td class="sl"><input type="text" id="amount" style="border:0; display:none; color:#f6931f; font-weight:bold;" /> <div id="slider-range"></div></td></tr>');
		$("#advpages").html('');
		$("#advsearchbutton").show();
		$(".advancedpanel").toggle();
	});
	$(".advopen").click(function(){		
		$.ajax({
			type: 'GET',
			url: 'advsearch.php',
			error:function (xhr, ajaxOptions, thrownError){
				alert(xhr.statusText);
				alert(xhr.status);
				alert(thrownError);
			},
			success: function(data) {
				var counter=0;
				var toptions = '<option value="0">All</option>';
				$.each(data, function(i, object) {
				  $.each(this, function(k, v) {
					if (k=='ProfileId') {
						pid = v;
					}
					if (k=='ProfileName') {
						toptions += '<option value="' + pid + '">' + v + '</option>';
					}			
				  });
				});
				$("select#categoryid").html(toptions);
				$(".advancedpanel").toggle();
			},
			data: "type=categories",
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		});
		$.ajax({
			type: 'GET',
			url: 'advsearch.php',
			error:function (xhr, ajaxOptions, thrownError){
				alert(xhr.statusText);
				alert(xhr.status);
				alert(thrownError);
			},
			success: function(data) {
				var counter=0;
				var toptions = '<option value="0">All</option>';
				$.each(data, function(i, object) {
				  $.each(this, function(k, v) {
					if (k=='date') {
						toptions += '<option value="' + v + '">' + v + '</option>';
					}			
				  });
				});
				$("select#videodated").html(toptions);
			},
			data: "type=viewdated",
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		});
		$.ajax({
			type: 'GET',
			url: 'advsearch.php',
			error:function (xhr, ajaxOptions, thrownError){
				alert(xhr.statusText);
				alert(xhr.status);
				alert(thrownError);
			},
			success: function(data) {
				var counter=0;
				var toptions = '<option value="0">All</option>';
				$.each(data, function(i, object) {
				  $.each(this, function(k, v) {
					if (k=='WebSiteName') {
						toptions += '<option value="' + v + '">' + v + '</option>';
					}			
				  });
				});
				$("select#source").html(toptions);
			},
			data: "type=source",
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		});
		$( "#slider-range" ).slider({
			range: true,
			min: viewersrange[0],
			max: viewersrange[4],
			values: [ viewersrange_start, viewersrange_end],
			slide: function( event, ui ) {
				$( "#amount" ).val( ui.values[ 0 ] + '-' + ui.values[ 1 ] );
			}
		});
		sliderdata='<ul>';
		for (x=0;x<5;x++) {
			if (x==4) {
				sliderdata=sliderdata+'<li style="padding: 0;"><a href="#">'+viewersrange[x]+'</a></li>';
			} else {
				sliderdata=sliderdata+'<li><a href="#">'+viewersrange[x]+'</a></li>';
			}
		}
		sliderdata=sliderdata+'</ul>';
		$("#slider-data").html(sliderdata);
		$( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
			"-" + $( "#slider-range" ).slider( "values", 1 ) );
	});
	$("#hide").click(function(){
		$(".vimeo").html('');
		$(".youtube").hide();
	});
});
function goadvsearch() {
	var searchvalue = $("#searchvalue").val();
	var category = $('#categoryid :selected').val();
	var videodated = $('#videodated :selected').val();
	var source = $('#source :selected').val();
	var amount = $('#amount').val();
	amount=amount.split("-");
	minviews=amount[0];
	maxviews=amount[1];
	srvideoid.length=0;
	$.ajax({
		type: 'GET',
		url: 'advsearch.php',
		error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.statusText);
			alert(xhr.status);
            alert(thrownError);
        },
		success: function(data) {
			var counter=0;
			$.each(data, function(i, object) {
			  $.each(this, function(k, v) {
				if (k=='Title') {
					srvideodesc[counter]=v;
				}
				if (k=='embedUrl') {
					srvideoembedurl[counter]=v;
				}
				if (k=='ImageUrl') {
					srvideothumb[counter]=v;
				}
				/*
				if (k=='MovieText') {					
					if (v==null) {
						srvideodesc[counter]='';
					} else {
						srvideodesc[counter]=v.substring(0,45)+'...';
					}
				}
					*/
				if (k=='Length') {
					srvidoelength[counter]=v;
					counter++;
				}
				if (k=='ID') {
					srvideoid[counter]=v;
				}				
			  });
			});
			createadvsearchthumbs(0,0);
		},
		data: 'type=commitsearch&q='+searchvalue+'&c='+category+'&vd='+videodated+'&s='+source+'&minviews='+minviews+'&maxviews='+maxviews,
		contentType: "application/json; charset=utf-8",
        dataType: "json"
	});
}
function createadvsearchthumbs(startvideoid,page) {
	srpages = Math.ceil((srvideoid.length/3));
	$("#advfields").html('');
	var classdisplay = '';
	var tmpcounter = 0;
	for (x=startvideoid;((x<startvideoid+3)&&(x<srvideoid.length));x++) {
		var html = '';
		html += '<ul style="display: '+classdisplay+'">';
		html += '<li class="img"><a href="#" onclick="rendersrvideo('+(x)+');"><img src="'+srvideothumb[x]+'" width="86" height="58" border="0" /></a></li>';
		html += '<li class="sep">&nbsp;</li>';
		html += '<li class="content"><p>'+srvideodesc[x]+'</p><span class="time">'+srvidoelength[x]+' |</span><span class="data">&nbsp;'+srvideovotes[x]+'&nbsp;</span></li>';
		html += '</ul>';
		if (tmpcounter>2) {
			classdisplay = 'none';
		}
		tmpcounter++;
		html += '<ul class="sep" style="display: '+classdisplay+'"></ul>';
		$("#advfields").append(html);
	}	
	$("#advpages").html('');
	if (srpages<2) {
		if (srpages==0) {
			$("#advpages").html('<span style="color: white;">No results were found.</span>');
		}
	} else {
		html = '<ul><li><a href="javascript:renderassrprevpage();"><img id="page'+x+'" src="images/as_thumbsarrowleft.jpg" width="4" height="9" alt="" /></a></li>';
		for (x=0;x<srpages;x++) {
			if (x==0) {
				html += '<li><a href="javascript:createadvsearchthumbs(0,0);"><img id="page'+x+'" src="images/as_pageoff.jpg" width="11" height="11" alt="" /></a></li>';		
			} else {
				html += '<li><a href="javascript:createadvsearchthumbs('+(x*3)+','+x+');"><img id="page'+x+'" src="images/as_pageoff.jpg" width="11" height="11" alt="" /></a></li>';		
			}
		}
		html += '<li><a href="javascript:renderassrnextpage();"><img id="page'+x+'" src="images/as_thumbsarrowright.jpg" width="4" height="9" alt="" /></a></li></ul>';
		$("#advsearchbutton").hide();
		$("#advpages").append('<tr><td colspan="2" align="center">'+html+'</td></tr>');
		$("#page"+currentpage).attr("src","images/as_pageoff.jpg");
		currentpage = page;
		$("#page"+page).attr("src","images/as_pageon.jpg");
	}
}
function gosearch() {
	var searchvalue = $("#searchvalue").val();
	$.ajax({
		type: 'GET',
		url: 'search.php',
		error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.statusText);
			alert(xhr.status);
            alert(thrownError);
        },
		success: function(data) {
			var counter=0;
			$.each(data, function(i, object) {
			  $.each(this, function(k, v) {
				if (k=='Title') {
					srvideodesc[counter]=v;
				}
				if (k=='embedUrl') {
					srvideoembedurl[counter]=v;
				}
				if (k=='ImageUrl') {
					srvideothumb[counter]=v;
				}
				/*
				if (k=='MovieText') {
					if (v==null) {
						srvideodesc[counter]='';
					} else {
						srvideodesc[counter]=v.substring(0,45)+'...';
					}
				}
				*/
				if (k=='Length') {
					srvidoelength[counter]=v;
					counter++;
				}
				if (k=='ID') {
					srvideoid[counter]=v;
				}				
			  });
			});
			createsearchthumbs(0,0);
		},
		data: 'q='+searchvalue,
		contentType: "application/json; charset=utf-8",
        dataType: "json"
	});
}
function renderprevpage() {
	if (currentpage==0) {
	} else {
		var tmpcurrentpage=parseInt(currentpage);
		tmpcurrentpage--;
		createthumbs(tmpcurrentpage*4,tmpcurrentpage);
	}
}
function rendersrprevpage() {
	if (currentpage==0) {
	} else {
		var tmpcurrentpage=parseInt(currentpage);
		tmpcurrentpage--;
		createsearchthumbs(tmpcurrentpage*4,tmpcurrentpage);
	}
}
function renderassrprevpage() {
	if (currentpage==0) {
	} else {
		var tmpcurrentpage=parseInt(currentpage);
		tmpcurrentpage--;
		createadvsearchthumbs(tmpcurrentpage*4,tmpcurrentpage);
	}
}
function rendernextpage() {
	if (currentpage>pages-2) {
	} else {
		var tmpcurrentpage=parseInt(currentpage);
		tmpcurrentpage++;
		createthumbs(tmpcurrentpage*4,tmpcurrentpage);
	}
}
function rendersrnextpage() {
	if (currentpage>srpages-2) {
	} else {
		var tmpcurrentpage=parseInt(currentpage);
		tmpcurrentpage++;
		createsearchthumbs(tmpcurrentpage*4,tmpcurrentpage);
	}
}
function renderassrnextpage() {
	if (currentpage>srpages-2) {
	} else {
		var tmpcurrentpage=parseInt(currentpage);
		tmpcurrentpage++;
		createadvsearchthumbs(tmpcurrentpage*4,tmpcurrentpage);
	}
}
function setvoteneg() {
	document.getElementById('votecomment').style.visibility='visible';
}
function setvotepos() {
	document.getElementById('votecomment').style.visibility='visible';
}
function rendernovote() {
	$("#votepanel").attr("src","images/votestateoff.png");
}
function rendervotepos() {
	$("#votepanel").attr("src","images/votestateleft.png");
}
function rendervoteneg() {
	$("#votepanel").attr("src","images/votestateright.png");
}
function rendersrvideo(vidid) {
	document.getElementById('votecomment').style.visibility='hidden';
	renderrelatedlinks(vidid);
	renderrelatedtags(vidid);
	$(".vimeo").css("display","none");
	$(".youtube").css("display","none");
	$(".unknown").html(srvideoembedurl[vidid]);
	$(".unknown").css("display","block");
}
function createsearchthumbs(startvideoid,page) {
	srpages = Math.ceil((srvideoid.length/4));
	$(".suggestions").html('');
	var classdisplay = '';
	var tmpcounter = 0;
	for (x=startvideoid;((x<startvideoid+4)&&(x<srvideoid.length));x++) {
		var html = '';
		html += '<ul style="display: '+classdisplay+'">';
		html += '<li class="img"><a href="#" onclick="rendersrvideo('+(x)+');"><img src="'+srvideothumb[x]+'" width="86" height="58" border="0" /></a></li>';
		html += '<li class="sep">&nbsp;</li>';
		html += '<li class="content"><p>'+srvideodesc[x]+'</p><span class="time">'+srvidoelength[x]+' |</span><span class="data">&nbsp;'+srvideovotes[x]+'&nbsp;</span></li>';
		html += '</ul>';
		if (tmpcounter>2) {
			classdisplay = 'block';
		}
		tmpcounter++;
		html += '<ul class="sep" style="display: '+classdisplay+'"></ul>';
		$(".suggestions").append(html);
	}	
	$(".pages").html('');
	if (srpages==1) {
	} else {
		html = '<ul><li><a href="javascript:rendersrprevpage();"></a></li>';
		for (x=0;x<srpages;x++) {
			if (x==0) {
				//Pagination commented by RJ
				//html += '<li><a href="javascript:createsearchthumbs(0,0);"></a></li>';		
			} else {
				//html += '<li><a href="javascript:createsearchthumbs('+(x*4)+','+x+');"><img id="page'+x+'" src="images/pageoff.jpg" width="11" height="11" alt="" /></a></li>';		
			}
		}
		html += '<li><a href="javascript:rendersrnextpage();"></a></li></ul>';
		$(".pages").append(html);
		$("#page"+currentpage).attr("src","images/pageoff.jpg");
		currentpage = page;
		$("#page"+page).attr("src","images/pageon.jpg");
	}
}
function createthumbs(startvideoid,page) {
	$(".suggestions").html('');
	var classdisplay = '';
	var tmpcounter = 0;
	for (x=startvideoid;x<videoid.length;x++) {
		var html = '';
		html += '<ul style="display: '+classdisplay+'">';
		html += '<li class="img"><a href="#" onclick="renderinvideo('+(x)+');"><img src="'+videothumb[x]+'" width="86" height="58" border="0" /></a></li>';
		html += '<li class="sep">&nbsp;</li>';
		html += '<li class="content"><p>'+videodesc[x]+'</p><span class="time">'+vidoelength[x]+' |</span><span class="data">&nbsp;'+videovotes[x]+'&nbsp;</span></li>';
		html += '</ul>';
		if (tmpcounter>2) {
			classdisplay = 'block';
		}
		tmpcounter++;
		html += '<ul class="sep" style="display: '+classdisplay+'"></ul>';
		$(".suggestions").append(html);
	}	
	$(".pages").html('');
	if (pages==1) {
	} else {
		//html = '<ul><li><a href="javascript:renderprevpage();"><img id="page'+x+'" src="images/thumbsarrowleft.jpg" width="4" height="9" alt="" /></a></li>';
		html = '<ul><li><a href="javascript:renderprevpage();"></a></li>';
		for (x=0;x<pages;x++) {
			if (x==0) {
				//comment by RJ
				//html += '<li><a href="javascript:createthumbs(0,0);"><img id="page'+x+'" src="images/pageoff.jpg" width="11" height="11" alt="" /></a></li>';		
			} else {
				//html += '<li><a href="javascript:createthumbs('+(x*4)+','+x+');"><img id="page'+x+'" src="images/pageoff.jpg" width="11" height="11" alt="" /></a></li>';		
			}
		}
		html += '<li><a href="javascript:rendernextpage();"></a></li></ul>';
		$(".pages").append(html);
		$("#page"+currentpage).attr("src","images/pageoff.jpg");
		currentpage = page;
		$("#page"+page).attr("src","images/pageon.jpg");
	}
}
function renderinvideo(videoid) {
	rendervideo('show'+videoid);
}
function closesearchpanel() {
	document.getElementById('searchpanel').style.display='none';
	$("#sebutton").attr("src","images/search.jpg");
	sepanel = false;
}
function rendersearchpanel() {
	if (sepanel) {
		document.getElementById('searchpanel').style.display='none';
		$("#sebutton").attr("src","images/search.jpg");
		sepanel = false;
	} else {
		document.getElementById('searchpanel').style.display='';
		$("#sebutton").attr("src","images/search_sel.jpg");
		sepanel = true;
	}
}
function renderabusedpanel() {
	if (rapanel) {
		document.getElementById('reportabusedpanel').style.display='none';
		$("#rabutton").attr("src","images/reportabused.jpg");
		rapanel = false;
	} else {
		$( ".rareasons img" ).each(function() {
			$(this).attr('src','images/raeb.jpg');
		});
		document.getElementById('reportabusedpanel').style.display='';
		$("#rabutton").attr("src","images/reportabused_sel.jpg");
		rapanel = true;
	}
}
function rasend() {
	var selreason = 0;
	$(".rareasons img" ).each(function() {
		var tmp = $(this).attr('src');
		if (tmp=='images/rafb.jpg') {
			selreason = $(this).attr('id');
		}
	});
	if (selreason==0) {
		alert('Please select the reason');
	} else {
		selreason = parseInt(selreason.replace("raeb", ""));
		alert('need to add functionality for reason #'+selreason);
		document.getElementById('reportabusedpanel').style.display='none';
		$("#rabutton").attr("src","images/reportabused.jpg");
		rapanel = false;
	}	
	
}
function renderrareason(raeb) {
	$( ".rareasons img" ).each(function() {
		$(this).attr('src','images/raeb.jpg');
	});
	$('#raeb'+raeb).attr('src','images/rafb.jpg');
}
function renderrelatedlinks(vid) {
	x=0;
	var rl = '';
	if (vid==0) {
		var currentvideo = 0;
	} else {
		var currentvideo = parseInt(vid.replace("show", ""));	
	}
	vt = videora[currentvideo];
	tmpvideora = vt.split(',');
	for (x=0;x<tmpvideora.length;x++) {
		rl = rl + '<li>' + tmpvideora[x] + '</li>';
	}
	$(".relatedlinks ul").html(rl);
}
function renderrelatedtags(vid) {
	x=0;
	var tags = '';
	if (vid==0) {
		var currentvideo = 0;
	} else {
		var currentvideo = parseInt(vid.replace("show", ""));	
	}
	vt = videotags[currentvideo];
	tmpvideotags = vt.split(',');
	for (x=0;x<tmpvideotags.length;x++) {
		tags = tags + tmpvideotags[x] + ' ';
	}
	$(".tagsin").html('Tags: '+tags);
}
function rendervideo(vid) {
	document.getElementById('votecomment').style.visibility='hidden';
	var currentvideo = vid;
	currentvideo = parseInt(currentvideo.replace("show", ""));	
	
	$(".vimeo").css("display","none");
	//$(".youtube").css("display","none");
	$(".unknown").css("display","none");
	renderrelatedlinks(vid);
	renderrelatedtags(vid);
	if (videosourcetype[currentvideo]=='unknown') {
		$(".unknown").html(videoid[currentvideo]);
		$(".unknown").css("display","block");
		$(".youtube").css("display","none");
		$("#sourcetype").html("Other");
	}
	if (videosourcetype[currentvideo]=='vimeo') {
		var html= '';
		html += '<object width="470" height="265">';
		html += '<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id='+videoid[currentvideo]+'&server=vimeo.com&show_title=1&show_byline=1&show_portrait=0&color=&fullscreen=1"></param>';
		html += '<param name="autoplay" value="1">';
		html += '<param name="wmode" value="transparent"></param>';
		html += '<embed src="http://vimeo.com/moogaloop.swf?clip_id='+videoid[currentvideo]+'&server=vimeo.com&show_title=1&show_byline=1&show_portrait=0&color=&fullscreen=1" type="application/x-shockwave-flash" width="470" height="265" wmode="transparent" ></embed>';
		html += '</object>';
		console.log(html);
		$(".vimeo").html(html);
		$(".vimeo").css("display","block");
		$(".youtube").css("display","none");
		$("#sourcetype").html("Vimeo");
	}
	if (videosourcetype[currentvideo]=='youtube') {
		var html= '';
		html += '<object width="470" height="265">';
		html += '<param name="movie" value="http://www.youtube.com/v/'+videoid[currentvideo]+'"></param>';
		html += '<param name="autoplay" value="1">';
		html += '<param name="wmode" value="transparent"></param>';
		html += '<embed src="http://www.youtube.com/v/'+videoid[currentvideo]+'&autoplay=1" type="application/x-shockwave-flash" width="470" height="265" wmode="transparent" ></embed>';
		html += '</object>';
		$(".youtube").html(html);

		$("#youtubeembedsource").attr("src", "http://www.youtube.com/v/"+videoid[currentvideo]+"&autoplay=1");
		//$("#myytplayer").loadVideoById(videoid[currentvideo]);
		$(".youtube").css("visibility","visible");
		$(".youtube").css("display","block");
		document.getElementById("myytplayer").loadVideoById(videoid[currentvideo],0);
		$("#sourcetype").html("YouTube.com");		
	}
}