let data = ( localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) :{
   todo: [],
   completed: []
};



// console.log( JSON.parse( localStorage.getItem('todoList')));


let removePNG = '<img src="img/icon-remove.png" alt="remove">';
let completePNG = '<img src="img/icon-checmark.png" alt="done">';


backToTasks();

   // let value = document.getElementById("item").value.innerHTML;
   // window.onkeydown = function(e){
   //    if(e.keyCode == 13){
   //       // addItemTodo(value);
   //       console.log(value);
   //    }
     
   // }

   
   document.getElementById("item").addEventListener('keydown', (e) => {
      let value = document.getElementById("item").value;
      if(e.keyCode == '13' && value){
         addItemTodo(value);
         document.getElementById("item").value = "";

         data.todo.push(value);
         dataObjectUpdated();
      }
   });


document.getElementById("add").addEventListener('click', () => {
   // document.getElementById("item").focus();
   document.getElementById("item").select();

   let value = document.getElementById("item").value;
   
   if (value){
       addItemTodo(value);
       
   } else 
   {
      alert("Enter next task!");
   }
   data.todo.push(value);
   dataObjectUpdated();
   // console.log(data);
});



function backToTasks() {
   if (!data.todo.length && !data.todo.length)return;
    for (let i = 0; i < data.todo.length; i++){
      let value = data.todo[i];
      addItemTodo(value);
    }
    for (let j = 0; j < data.completed.length; j++){
      let value = data.completed[j];
      addItemTodo(value);
    }  
    }

function dataObjectUpdated() {
   // console.log(data);

   localStorage.setItem('todoList', JSON.stringify(data));
}
function removeItem() {
   let item = this.parentNode.parentNode;
   let parent = item.parentNode;
   let id = parent.id;
   let value = item.innerHTML;
   
   if (id === 'todo') {
      data.todo.splice(data.todo.indexOf(value), 1);   
   }else{
      data.completed.splice(data.completed.indexOf(value), 1);
   }
   dataObjectUpdated();
   parent.removeChild(item);

}
let clearTasks = document.getElementById('clearTasks');
clearTasks.addEventListener('click', (e) => {
   let confirmRemove = confirm('Do you realy want to delete the whole list?');
   if (confirmRemove) {
      document.getElementById('todo').innerHTML = "";
      document.getElementById('completed').innerHTML = "";
      dataObjectUpdated();
   }
   dataObjectUpdated();  
});


function completeItem() {
   let item = this.parentNode.parentNode; //li
   let parent = item.parentNode; //ul
   let id = parent.id;

   // data.completed.push(completed.innerText);
   // console.log(data);
   value = item.innerText;

   if (id === 'todo') {
      data.todo.splice(data.todo.indexOf(value), 1);
      data.completed.push(value);    
   }else{
      data.completed.splice(data.completed.indexOf(value), 1);
      data.todo.push(value);

   }
   dataObjectUpdated();
  
   // console.log(data);

   let target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

   parent.removeChild(item);
   target.insertBefore(item, target.childNodes[999]);

}

function addItemTodo(text, completed) {
   let list =(completed)? document.getElementById('completed'): document.getElementById('todo');

   let items = document.createElement('li');
   items.innerText = text;
   
   let buttons = document.createElement('div');
   buttons.classList.add('buttons');

   let remove = document.createElement('button');
   remove.classList.add('remove');
   remove.innerHTML = removePNG;

   remove.addEventListener('click', removeItem);

   let complete = document.createElement('button');
   complete.classList.add('complete');
   complete.innerHTML = completePNG;
   complete.addEventListener('click', completeItem);

   buttons.appendChild(remove);
   buttons.appendChild(complete);
   items.appendChild(buttons);
   list.appendChild(items);

    document.getElementById("item").value = "";

   
}
// let niz = document.getElementById('todo');

// if (niz.indexOf(niz) == -1) {
// let node = document.createElement("div");
// let textnode = document.createTextNode("You have nothing to do!");
// node.appendChild(textnode);
// document.getElementById('todo').appendChild(node);
// }


//filter
let itemList = document.getElementById('todo');
let filter = document.getElementById('filter');
filter.addEventListener('keyup', filterItems);


function filterItems(e){
   let text = e.target.value.toLowerCase();
   let items = itemList.getElementsByTagName('li');

   console.log(items);

   Array.from(items).forEach(function (item) {
      let itemName = item.firstChild.textContent;
      // console.log(itemName);

      if (itemName.toLowerCase().indexOf(text) !=-1) {
         item.style.display = 'block';
      }else{
         item.style.display = 'none';
      }
   })
}