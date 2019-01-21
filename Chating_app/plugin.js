angular.module('open-chat-framework', [])
  .service('ngChatEngine', ['$timeout', function($timeout) {
    this.bind = function(ChatEngine) {
      // updates angular when anything changes
      ChatEngine.onAny(function(event, payload) {
        $timeout(function() {});
      });
    }
  }]);
  
  angular.module('chatApp', ['open-chat-framework'])
  .run(['$rootScope', 'ngChatEngine', function($rootScope, ngChatEngine) {
    $rootScope.ChatEngine = ChatEngineCore.create({
      publishKey: 'pub-c-d8599c43-cecf-42ba-a72f-aa3b24653c2b',
      subscribeKey: 'sub-c-6c6c021c-c4e2-11e7-9628-f616d8b03518'
    }, {
      debug: true,
      globalChannel: 'chat-engine-angular-simple'
    });
    // bind open chat framework angular plugin
    ngChatEngine.bind($rootScope.ChatEngine);
  }]);