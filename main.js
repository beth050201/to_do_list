window.onlaod = function () {
    //variables
    let form = document.getElementById("form");
    let input = document.getElementById("input");
    let btn = document.getElementById("btn");
    let list = docment.getElementById("list");
    let btnClr = document.getElementById("btnClr");
    let id = 1;
    let liItem = "";
    let todoList = [];
    //button event listner
    btn.addEventListener("Click", addTodoitem);

    //list event listener
    list.addEventListener("Click", boxChecked);

    //clear list event listner
    btnClr.addEventListener("Click", clearList);

    //input.addEventListner("keydown", addTodoItem);

    if (localStorage.length < 0) {
        btnClr.style.display = "none"; // hides the clear button
    }

    //checking local storage has data
    if (localStorage.length <= 0) {
        btnClr.style.display = "none"; // hides the clear button
    }
    
    //add todo item to list
    function addTodoItem(){
        if(input.value === "") {
            alert("You must enter some value");
        }

        else {
            if(list.style.border.top === "") { //usually use 3 equals
                console.log("here")
                list.style.borderTop = "2px solid white";
                btnClr.style.display = "inline";
            }

            let text = input.value;
            let item = `<li id="li-${id}">${text}<input id="box-${id} class="checkboxes" type="checkbox"></li>`;
            list.insertAdjacentHTML('beforeend', item);
            liItem = {item: text, checked: false};
            todoList.push(liItem);
            id++;
            addToLocalStorage();
            form.reset();
        }
    }

    //adding string through style to list item
    function boxChecked(event) {
        const element = event.target;
        if(element.type === "checkbox") {
            element.parentNode.style.textDecoration = "line-through";
            todoList = JSON.parse(localstorage.getItem("todoList"));
            todoList[element.id.split('-')[1] - 1].checked = element.checked.toString();
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    }

    //adding data to local storage
    function addToLocalStorage(){
        if (typeof (storage) !== "undefined"){
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
        else{
            alert("borwser doesnt support local storage");
        }
    }

    //display all to do list
    function displayList(){
        list.style.borderTop = "2px solid white";
        todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.forEach(function (element) {
            console.log(element.item)
            let text = element.item;
            let item = `<li id="li-${id}">${text}<input id="box-${id} class="checkboxes" type="checkbox"></li>`;
            list.insertAdjacentHTML("beforeend", item);

            //if there is a checked box. then style
            if (element.checked) {
                let li = document.getElementById("li-" + id);
                li.style.textDecoration = "line-through";
                li.childNodes[1].checked = element.checked;
            }
            id++;
        });
        
    }

    //clear list event listner
    function clearList() {
        todoList = [];
        localStorage.clear();
        list.innerHTML = "";
        btnClr.style.display = "none";
        list.style.borderTop = "";
    }
}