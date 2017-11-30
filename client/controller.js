angular.module("Todo", [])
.controller('TodoCtrl', ['$scope', function ($scope){
$scope.modeEdit=[];

  $scope.todolist=[];
  $scope.add = function(todo){
      var newtodo ={};

      newtodo.label = todo.label; 
      newtodo.cat   = todo.cat;  
      newtodo.check = todo.check;
      $scope.todolist.push(newtodo);
      $scope.todo={};
    }  
  $scope.delete = function(index){
  $scope.todolist.splice(index,1);
     }
  $scope.save= function(index){
    console.log($scope.todolist [index]);
    
     $scope.modeEdit=false;
     for(var i=0 ; i < $scope.modeEdit.length ; i++){
              if($scope.modeEdit[i] === index) {
                $scope.modeEdit.splice(index,1);
              }   
     }
    }
$scope.edit=function(index){
        console.log($scope.modeEdit);
        $scope.modeEdit.push(index);
      
        
}
$scope.isModeEdit= function(index){
  for(var i=0 ; i < $scope.modeEdit.length ; i++){
    if($scope.modeEdit[i] === index) {
     return true ;
    } 
  };
return false;
}
$scope.check=function(todo){
  return (todo.check == true) ?"Done" :"waiting";
}
 
}]);

