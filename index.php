<?php if(isset($_GET["database"])) :
$apiKey = "1bbd80766426432c9b0f9bafaece874c";
$url = "http://congress.api.sunlightfoundation.com";
//$url = "http://104.198.0.197:8080";
$url = $url."/".strtolower($_GET["database"])."?apikey=".$apiKey;
if(isset($_GET["per_page"])):
	$url = $url."&per_page=".$_GET["per_page"];
endif;
if(isset($_GET["page"])):
	$url = $url."&page=".$_GET["page"];
endif;
if(isset($_GET["order"])):
	$url = $url."&order=".$_GET["order"];
endif;
if(isset($_GET["member_ids"])):
	$url = $url."&member_ids=".$_GET["member_ids"];
endif;
if(isset($_GET["sponsor_id"])):
	$url = $url."&sponsor_id=".$_GET["sponsor_id"];
endif;
if(isset($_GET["bill_active"])):
	$url = $url."&history.active=".$_GET["bill_active"]."&order=introduced_on__desc";
endif;
if(isset($_GET["bill_haspdf"])):
	$url = $url."&last_version.urls.pdf__exists=".$_GET["bill_haspdf"];
endif;
$contents = file_get_contents($url);
echo $contents;
endif;
?>