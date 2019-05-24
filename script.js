var popNow; //今開いているポップの番号

$(function(){

	// ボタンを押して再生、２回目以降はpopupが出る
	$('.main button').click(function(){
		var btnId = $(this).attr("id");

		var num = btnId.slice(-1); //idの末尾(＝数字)

		var isPlay = $('#nowplaying'+num).css("display")!=="none"; //そのプリセットが再生中かどうか

		if(isPlay){
			$('#overlay').css('display','block');
			$('#popup'+num).slideDown();
			// alert(pre_popId);
			popNow = num;

		}else{
			//再生１回目
			$('#nowplaying'+num).css('display','block');
		}
		
		$('#playIcon'+popNow).css('display','none');
		$('#pauseIcon'+popNow).css('display','block');
	});

	//ポップアップ 閉じる
	$('#overlay').click(function(){
		$('#popup'+popNow).slideUp();
		$('#overlay').css('display','none');
	});

	//キャンセル終了
	$('.my-pause').click(function(){
		$('#pauseIcon'+popNow).css('display','none');
		$('#playIcon'+popNow).css('display','block');
		$('#nowplaying'+popNow).css('display','none');

	});

	//キャンセル再開
	$('.my-play').click(function(){
		$('#playIcon'+popNow).css('display','none');
		$('#pauseIcon'+popNow).css('display','block');
		$('#nowplaying'+popNow).css('display','block');

	});


	//画面遷移
	$('.menuL').click(function(){
		$('#noise-cancel').css('display','block');
		$('#noise-map').css('display','none');

		$('.main').css('display','block');

		$('#L-on').css('display','block');
		$('#L-off').css('display','none');
		$('#R-on').css('display','none');
		$('#R-off').css('display','block');
	});
	$('.menuR').click(function(){
		$('#noise-cancel').css('display','none');
		$('#noise-map').css('display','block');

		$('.main').css('display','none');

		$('#L-on').css('display','none');
		$('#L-off').css('display','block');
		$('#R-on').css('display','block');
		$('#R-off').css('display','none');
	});
});





