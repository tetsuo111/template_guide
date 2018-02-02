/*####################################################################
 *### index.js
 *####################################################################*/

/*====================================================================
 *= ブロックを上下入れ替える
 *====================================================================*/
jQuery(function($){
	var w = $(window).width();
	var ua = navigator.userAgent;
	//更新しても崩れないようにする。
	if(w < 768){
		$(".hall-list").insertAfter(".funeral-list");
		$(".hall-list").css("margin-bottom" , "30px");
	}else if(w >= 769){
		$(".funeral-list").insertAfter(".hall-list");
	}
	$(window).on('load resize' , function(){
		//再度画面幅を取得して更新時、元のサイズに戻す。
		var w = $(window).width();
		if(w < 768){
			$(".hall-list").insertAfter(".funeral-list");
			$(".hall-list").css("margin-bottom" , "30px");
		}else if(w >= 769){
			$(".funeral-list").insertAfter(".hall-list");
		}
	});
});
