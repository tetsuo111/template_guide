/* アコーディオン */
jQuery(function($){
	$("#open-in").on("click", function() {
		$(this).parents().find('#accordion-target').toggle();
		$(this).hide();
		$(this).next().show();
	});
	$("#close-out").on("click", function() {
		$(this).parents().find('#accordion-target').toggle();
		$(this).hide();
		$(this).prev().show();
	});

});
function change_text(obj) {
	var $str  = $(obj).val();
	var $name = $(obj).attr('name');

	if($name == 'address1' || $name == 'address2'){
		if ($('.seibetu:checked').val() == '0') {
			// 注文者と同じにチェック時
			var ordererAddress = getOrdererAddress();
			$('#sender-address').val(ordererAddress);
			$('#layout-address').text(ordererAddress);
		}
	}
	if($name == 'name_sei' || $name == 'name_mei'){
		if($('.message-sender-name-select:checked').val() == '0'){
			// 注文者と同じにチェック時
			var ordererName = getOrdererName();
			$('#sender-name1').val(ordererName);
			$('#layout-sender-name1').text(ordererName);
		}
	}
	if( $name == 'recipient' ) {
		if( $str == '' ) $('#layout-recipient').text('');
		else             $('#layout-recipient').text($str + ' 様');
	}
	if($name == 'sender_address') {
		if( $str == '' )	$('#layout-address').text('');
		else			$('#layout-address').text($str);
	}
	if( $name == 'position1' ) {
		if( $str == '' ) $('#layout-position1').addClass('hidden');
		else             $('#layout-position1').removeClass('hidden').text($str);
	}
	if( $name == 'sender_name1' ) {
		if( $str == '' ) $('#layout-sender-name1').text('');
		else             $('#layout-sender-name1').text($str);
	}
	if( $name == 'position2' ) {
		if( $str == '' ) $('#layout-position2').addClass('hidden');
		else             $('#layout-position2').removeClass('hidden').text($str);
	}
	if( $name == 'sender_name2' ) {
		if( $str == '' ) $('#layout-sender-name2').addClass('hidden');
		else             $('#layout-sender-name2').removeClass('hidden').text($str);
	}
	if( $name == 'position3' ) {
		if( $str == '' ) $('#layout-position3').addClass('hidden');
		else             $('#layout-position3').removeClass('hidden').text($str);
	}
	if( $name == 'sender_name3' ) {
		if( $str == '' ) $('#layout-sender-name3').addClass('hidden');
		else             $('#layout-sender-name3').removeClass('hidden').text($str);
	}
}
// 注文者住所値取得
function getOrdererAddress() {
	var address = '';
	$('.orderer-address').each(function() {
		address += $(this).val();
	});
	return address;
}
// 注文者名取得
function getOrdererName() {
	return ($('#name-sei').val() + $('#name-mei').val());
}

jQuery(function($) {
	//*************************************************************************
	// 郵便番号（住所自動設定）
	//*************************************************************************
	/*
	$('#zipcode').jpostal({
		postcode : [
			'#zipcode'
		],
		address : {
			'#pref-id'  : '%3',
			'#address1' : '%4%5'
		},
		url : {
			'http'  : 'choden/jq/json/',
			'https' : 'choden/jq/json/'
		}
	});
	*/
	//*************************************************************************
	// テキストボックス キーアップイベント
	//*************************************************************************
	$('input').change(function() {
		change_text(this);
	}).change();
	$('input').keyup(function(e) {
		change_text(this);
	}).change();
	//*************************************************************************
	// メッセージ変更イベント
	//*************************************************************************
	$('select[name="message"]').change(function () {
		$('#layout-message').text($(this).find('option:selected').text());
	});
	//*************************************************************************
	// 差出人住所選択クリックイベント
	//*************************************************************************
	$('.seibetu').click(function(){
		var ordererAddress = getOrdererAddress();
		if ($(this).val() == '0') {
			// 注文者の住所を設定
			$('#sender-address').val(ordererAddress);
			$('#layout-address').text(ordererAddress);
		} else {
			// 差出人住所をクリア
			$('#sender-address').val('');
			$('#layout-address').text('');
		}
	});
	//*************************************************************************
	// 差出人選択クリックイベント
	//*************************************************************************
	$('.message-sender-name-select').click(function(){
		var ordererName = getOrdererName();
		if ($(this).val() == '0') {
			// 注文者と同じ名前を設定
			$('#sender-name1').val(ordererName);
			$('#layout-sender-name1').text(ordererName);
		} else {
			// 差出人名1をクリア
			$('#sender-name1').val('');
			$('#layout-sender-name1').text('');
		}
	});
	//*************************************************************************
	// 初期化処理
	//*************************************************************************
	// メッセージセット
	var message = $('#message-default-value').text();
	if (message != '') {
		$('#message-select-id').val(message);
		$('#layout-message').text($('#message-select-id option:selected').text());
	}
});
