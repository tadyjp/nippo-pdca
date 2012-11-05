// var host = "http://ec2-54-248-143-126.ap-northeast-1.compute.amazonaws.com";
var host = "http://127.0.0.1:3000";
var uuid = window.location.pathname.match(/items\/(.+?)$/)[1];

$.getJSON(host + "/"+ uuid +".json").then(
	function(data){
		set_html(data);
	},
	function(data){
		console.log(data);
	});


function set_html(data){
	var html_list = ['<fieldset class="side-content-box"><legend>もっと関連する投稿</legend><ul class="title-item-box">'];

	data.forEach(function(item){
		html_list.push('<li><a href="'+ item.url +'">'+ item.title +'</a></li>');
	});
	html_list.push('</ul><p style="text-align:right;font-size:11px;">powered by <a href="'+ host +'">Riita</a>.</p></fieldset>');

	$(".side-content-box:eq(1)").after(html_list.join(""));
}