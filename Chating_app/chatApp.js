angular.module('chatApp', ['open-chat-framework'])
  .run(['$rootScope', 'ngChatEngine', function($rootScope, ngChatEngine) {
    $rootScope.ChatEngine = ChatEngineCore.create({
      publishKey: 'pub-c-e23042bc-34bd-4756-9509-006946f8215a',
      subscribeKey: 'sub-c-d7f1f40c-1db4-11e9-b735-ca3a04aa6aa9'
    }, {
      debug: true,
      globalChannel: 'chat-engine-angular-simple'
    });
    // bind open chat framework angular plugin
    ngChatEngine.bind($rootScope.ChatEngine);
  }])
  .controller('chatAppController',function($scope){
	$scope.ChatEngine.connect(new Date().getTime(),{},'auth-key');
	$scope.ChatEngine.on('$.ready',(data) =>{
	$scope.me = data.me;
	});
  });