
$(document).ready(function(){

    // count todos:  
    var countTask = function(){
        var todoLen = tasks.length;
        console.log(todoLen);
        $('.todo-calc').html("You have " + todoLen + " todos");
    }
   
   //handle bar function 
    function appendTaskToList(task) {
        var source = $("#task").html();
        var template = Handlebars.compile(source);
        var html = template(task);
        $('#list').append(html);
  
        // $('#list').append("<li class='todos'>" +  task.name  + "  <a href='#' class='done-btn'>Done</a> <a href='#' class='cancel-btn' data-item='" + task.name + "'>Remove</a></li>");
    }

    if (localStorage.tasks) {
        var tasks = JSON.parse(localStorage.tasks);
        countTask();
    } else {
        var tasks = [];
        countTask();
    }

    for(var i = 0; i < tasks.length; i++) {
        appendTaskToList(tasks[i]);
        countTask();
    }

    var addTask = function(){
        // get value from users' input
        var val = $('#name').val();
        var task = { name: val, done: false};
        
        // add the task to the array
        tasks.push(task);
        
        // save to local storage
        updateLocalStorage();
        
        // append the todo input to the list
        appendTaskToList(task);
        
        // reset the input field and focus it.
        $('#name').val("").focus();
          countTask();
    }

    $('#add-btn').click(addTask);
    $('#name').keyup(function(e){
        e.preventDefault;
        if (e.keyCode === 13) {
            addTask();
            countTask();
        }
    });


    //mark todo items as done, add css class 
    $('#list').on('click', '.done-btn', function(){
        $(this).parent('li').toggleClass('done');
        for(var i = 0; i < tasks.length; i++){
            tasks[i].done = true;
            updateLocalStorage();
        }
             countTask();  
    });

    //remove todo items
    $('#list').on( 'click', '.cancel-btn', function() {
      $(this).parent('li').fadeOut('slow');
        var item = $(this).data('item');
        for(var i = 0; i < tasks.length; i++) {
          if(item==tasks[i].name){
            tasks.splice(i, 1);
          }
        }
        updateLocalStorage();
        countTask();
    });  

    // clear all btn
    $('#clear-all').click(function() {
        localStorage.removeItem('tasks', JSON.stringify(tasks));
        console.log(tasks);
        $('#list').empty();
         updateLocalStorage();
         countTask();
    });


    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        countTask();
    }

}) 