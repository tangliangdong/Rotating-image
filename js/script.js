$(function(){
	var $imglist = null,
		$but_left = null,
		$but_right = null,
		$but_play = null,
		origin = ['150px','100px'],
		imgAll = changeimg([['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg'],
					['images/5.jpg','images/6.jpg','images/7.jpg','images/8.jpg'],
						['images/9.jpg','images/10.jpg','images/11.jpg','images/12.jpg']]),
		imgArrIndex = 0,
		imgAng = 25,
		imgTime = 300,
		autoTimer = null,
		autoInterval = 3000,
		rotating = false;


	function init () {
		$imglist=$('.carousel ul li');
		$but_left = $('.button .last');
		$but_right = $('.button .next');
		$but_play = $('.button .play');

		configer();

		setEvent();
	}

	function configer () {
		var img_ang = 6,
		  	img_rotate_change = 6;

		$imglist.transition({origin:origin});
		$imglist.each(function(index) {
			var $this = $(this);

			$this.transition({rotate:-img_ang+(index*img_rotate_change)+'deg'});

		});
	}

	function setEvent (argument) {
		 $but_left.bind('click', function(event) {
		 	anigo(-1);
		 	
		 	return false;
		 });

		 $but_right.bind('click', function(event) {
		 	anigo(1);
		 	return false;
		 });

		 $but_play.bind('click', function(event) {
		 	var play = 'play',
		 		pause = 'pause',
		 		$but = $(this);
		 	if($but.text()===play){
		 		$but_play.text(pause);
		 		autoGo();
		 	}else{
		 		$but_play.text(play);
		 		autoStop();
		 	}

		 });
	}

	function anigo (x) {
		if(rotating){
			return false;
		}else{
			rotating = true;
		}
		imgArrIndex += x;
		if(imgArrIndex > imgAll.length-1){
			imgArrIndex = 0;
		}else if(imgArrIndex<0){
			imgArrIndex = imgAll.length-1;
		}
		$imglist.each(function(index, el) {
			var $this = $(this);
			var $thisimg = $this.children('img');
			var $targetImg = $(imgAll[imgArrIndex][index]);
			var thisTime = (x===1)?imgTime*index : imgTime*($imglist.length-1-index)
			$targetImg.css({'transform-origin':'150px 900px'});
			$thisimg.css({'transform-origin':'150px 900px'});

			$targetImg.transition({rotate:(0-x)*imgAng+'deg'});
			$this.append($targetImg);
			setTimeout(function () {
				$thisimg.animate({rotate:imgAng*x+'deg'},1000);
				
			 	$targetImg.animate({rotate:'0deg'},1000,function(){
			 		$thisimg.remove();
			 		if(thisTime == (($imglist.length-1)*imgTime)){
						rotating = false;
					}
			 	}); 
			 	
			}, thisTime);
			
			

		});
	}
	function autoGo (argument) {
		 anigo(1);
		 clearInterval(autoTimer);
		 autoTimer = setInterval(function () {
		 	anigo(1);
		 }, autoInterval)
	}

	function autoStop (argument) {
		 clearInterval(autoTimer);
	}

	function changeimg (arr) {
		 var imgArr = [];
		 for(var i in arr){
		 	imgArr[i] = [];
		 	for(var x in arr[i]){
		 		imgArr[i][x] = new Image();
		 		imgArr[i][x].src = arr[i][x];
		 	}
		 }
		 return imgArr;
	}

	return init();
})
