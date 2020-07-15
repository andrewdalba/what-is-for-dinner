$(function(){
	
	jQTubeUtil.init({
		key: 'AI39si5AFsYwCt6WqLzJq4EiqUASTxgSs4BTjIoBnvj1Ql3chQ5Y6dxkSUZqFNiiolQ5dm183Vnnq0OBf2pYzo7C_xUUyG0mkw',
		orderby: 'viewCount',
		time: 'all_time',  
		maxResults: 9
	});
	
	$('.search').keyup(function(){
		var val = $(this).val();
		jQTubeUtil.suggest(val, function(response){
			var html = '';
			for(s in response.suggestions){
				var sug = response.suggestions[s];
				html += '<li><a href="#">'+sug+'</a></li>';
			}
			if (response.suggestions.length)
				$('.autocomplete').html(html).fadeIn(500);
			else 
				$('.autocomplete').fadeOut(500);
		});
	});
	
	
	$('.btn').click(function(){
		show_videos();
		$('.autocomplete').fadeOut(500);
		return false;
	});
	
	$('.autocomplete').find('a').live('click', function(){
		var text = $(this).text();
		$('.blocks').find('.search').val(text);
		$('.autocomplete').fadeOut(500);
		show_videos();
		return false;
	});
	
	function show_videos(){
		var val = $('.blocks').find('.search').val();
		$('.videos').addClass('preloader').html('');
		jQTubeUtil.search(val, function(response){
			var html = '';
			for (v in response.videos) {
				var	video = response.videos[v],
					minutes = parseInt(video.duration / 60),
					seconds = video.duration % 60;
				html += '<li>';
				html += '<p class="image"><a href="http://www.youtube.com/watch?v='+video.videoId+'">';
				html += '<img src="' + video.thumbs[1].url + '" alt="' + video.title + '" title="' + video.title + '" />';
				html += '</a></p>'
				html += '<p class="entry"><a href="http://www.youtube.com/watch?v='+video.videoId+'">' + video.title + '</a>';
				html += '<small>' + minutes + ':' + (seconds < 10 ? '0'+seconds : seconds) + '</small>';
				html += '</p>';
				html += '</li>';
			}
			$('.videos').removeClass('preloader').html(html);
		});
	}
			
});