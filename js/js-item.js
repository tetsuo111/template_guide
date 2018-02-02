/*####################################################################
 *### item.js
 *####################################################################*/

/*====================================================================
 *= 画像入れ替え
 *====================================================================*/
jQuery(function($){
	$(".modal-big-image img").on("load" , function(){
		var imgHeight = $(this).height();
		$("#modal-image-block").css("height , imgHeight");
	});
	$("#modal-image-block a").click(function(){
		if($(this).hasClass("over") == false){
			$("#modal-image-block a").removeClass("over");
			$(this).addClass("over");
			$(".modal-big-image .modal-image").hide().attr("src" , $(this).children("img").attr("src")).show();
		}
		return false;
	});
});


