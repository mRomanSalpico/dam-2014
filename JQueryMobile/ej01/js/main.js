/*$(function() {
	$("footer").load('include/commonFooter.html');
});*/

$("#index, #pagina1, #pagina1").bind( "pagebeforecreate", function( event ) {
	console.log("pagebeforecreate");
	var htmlFooter = "<h4>This is my footer</h4>"+
				"<div data-role='navbar' data-iconpos='top'>"+
					"<ul><li><a href='#' data-icon='star'>One</a></li>"+
					"<li><a href='#' data-icon='gear'>Two</a></li>"+
					"<li><a href='#' data-icon='back'>Three</a></li></ul>"+
				"</div>";
	$("footer").html(htmlFooter, function() {
		$("#footer").trigger("updatelayout");
	});

	/*$("footer").load("include/commonFooter.html", function() {
		$("footer").trigger("create");
	});*/
});
$("#flip-mini").on( "tap", function( event ) {
	alert("Se ha modificado el mute");
});


$("#panel").on( "tap", function( event ) {
	alert("Se ha pulsado el menu");
});
$(document).on( "orientationchange", function( event ) {
	alert("Se ha girado el movil");
});

