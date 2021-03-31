var menuItem = {
    "id": "createNote",
    "title": "Create Note",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    var tasksList = new Array();
    chrome.storage.sync.get(['list'], function (val) {
        if (val.list.length > 0)
            tasksList = val.list;
        for (var i = 0; i < tasksList.length; i++) {
            addListItem(tasksList[i]);
        }
    })

    var newTask = clickData.selectionText;
        tasksList.push(newTask);
        addListItem(newTask);
        chrome.storage.sync.set({
            'list': tasksList
        })
        
    function addListItem(value) {
        //console.log("addListItem");
        // document.getElementById("taskInput").value = "";
        value = clickData.selectionText;
        var ul = document.getElementById("todo-listUl");

        addUI(ul,value, 1)
    }

    function addUI(ul,value , num) {
        var li = document.createElement("li");
        $("li").addClass("list-group-item");
        li.appendChild(document.createTextNode(value));

        if (value !== '') {
            ul.appendChild(li);
        }
        }
});