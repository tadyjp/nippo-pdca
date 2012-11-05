var Nippo = (function(){
  var getData = function(date){
    return localStorage[date] ? JSON.parse(localStorage[date]) : {};
  };
  var setData = function(date, data){
    localStorage[date] = JSON.stringify(data);
    return data;
  };
  var fmt = new DateFormat("yyyy-MM-dd");
  return {
    today: function(data){
      var today = fmt.format(new Date());
      return data ? setData(today, data) : getData(today);
    }
  };
})();

function MainCtrl($scope) {
  var today_data = Nippo.today();
  $scope.todos = today_data.todos;
  $scope.actions = today_data.todos;
 
  $scope.addTodo = function() {
    $scope.todos.push({id: generate_uid(), text: $scope.todoText, done: false});
    $scope.todoText = '';
  };
 
  $scope.donePlan = function(todo) {
		todo.done = true;
		todo.doneTime = +new Date();
  };

  $scope.removePlan = function(todo) {
    var old_todos = $scope.todos;
    $scope.todos = [];
    angular.forEach(old_todos, function(old_todo) {
      if(todo.uid !== old_todo.uid){ $scope.todos.push(old_todo); }
    });
  };

  $scope.showCheckEditor = function(todo) {
		todo._editing = '';
		todo.doneTime = +new Date();
  };

  $scope.revertDo = function(todo) {
		todo.done = false;
  };
 
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.addAction = function() {
    $scope.actions.push({id: generate_uid(), text: $scope.actionText});
    $scope.actionText = '';
  };
 
  $scope.removeAction = function(action) {
    var old_actions = $scope.actions;
    $scope.actions = [];
    angular.forEach(old_actions, function(old_action) {
      if(action.uid !== old_action.uid){ $scope.actions.push(old_action); }
    });
  };
 
  $scope.copyToGmail = function(){
		var to = "a.dat.jp@gmail.com";
		var subject = "多田 日報 11/4";
		var body = "日報";

		var url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + to + "&su=" + subject + "&body=" + body;
		chrome.tabs.create({'url': url}, function(tab){});
	};

	$scope.copyToClipboard = function(){
		copyToClipboard("へい！");
	};

}

function generate_uid(){
	return md5('' + (+new Date()) + Math.random());
}



function copyToClipboard( text ){
	var copyDiv = document.createElement('div');
	copyDiv.contentEditable = true;
	document.body.appendChild(copyDiv);
	copyDiv.innerHTML = text;
	copyDiv.unselectable = "off";
	copyDiv.focus();
	document.execCommand('SelectAll');
	document.execCommand("Copy", false, null);
	document.body.removeChild(copyDiv);
}


$(function(){
	$("*[rel=tooltip]").tooltip();
	$("#first_focus").focus();

});