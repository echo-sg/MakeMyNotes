$(function () {


    var tasksList = new Array();
    chrome.storage.sync.get(['list'], function (val) {
        if (val.list.length > 0)
            tasksList = val.list;
        //console.log("val.list :" + val.list);
        //displaying the old items
        for (var i = 0; i < tasksList.length; i++) {
            addListItem(tasksList[i]);
        }
    })

    $('#addButtonTask').click(function () {

        var newTask = $('#taskInput').val();
        //adding the new item to tasklist array
        tasksList.push(newTask);
        //console.log("tasksList under click :" + tasksList);
        addListItem(newTask);
        //adding the new list back to chrome storage
        chrome.storage.sync.set({
            'list': tasksList
        })


    });

    $('#clearNotes').click(function () {
        if(tasksList.length)
        $("#todo-section").append("<br> <br> Notes Cleared ! Refresh to start making notes again <br> In case if this is done by mistake, copy the notes right now, else they will be lost");
        tasksList = [];
        chrome.storage.sync.set({
            'list': tasksList
        })
        chrome.storage.sync.get(['list'], function (val) {
            for (var i = 0; i < tasksList.length; i++) {
                addListItem(tasksList[i]);
            }
        })
    });



    function addListItem(value) {
        //console.log("addListItem");
        document.getElementById("taskInput").value = "";
        var ul = document.getElementById("todo-listUl");

        addUI(ul, value, 1)
    }

    function addUI(ul, value, num) {
        var li = document.createElement("li");
        $("li").addClass("list-group-item");
        li.appendChild(document.createTextNode(value));

        if (value !== '') {
            ul.appendChild(li);
        }
        }
    }

)