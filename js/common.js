/*####################################################################
 *### 共通
 *####################################################################*/

/*====================================================================
 *= モーダルウィンドウ
 *====================================================================*/
jQuery(function($) {
	/** モーダル ========================================================*/
	// モーダル表示
	$('#button-modal').click(function() {
		let target = $(this).data('target');
		//モーダル内のメイン画像のsrcを取得
		let jqModalContent = $(this).closest('div').closest('').find('.modal');
		$(target).addClass('is-active');
		//モーダル元画像表示
	});
	// モーダル閉じる
	$('.modal .delete').click(function() {
		$(this).closest('.modal').removeClass('is-active');
	});
	$('.button, .modal-background, #button-modal-close').click(function() {
		$(this).closest('.modal').removeClass('is-active');
	});
});