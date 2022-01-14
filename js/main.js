const $ = document;
const $el = (el) => document.querySelector(el);
const $els = (el) => document.querySelectorAll(el);
const $createEl = (el) => $.createElement(el);

const addBtn = $el(".add-todo");
const input = $el(".input-todo");
const tasks = $el(".tasks");
const del = $el('.delete')
const btns = $els('.btn')

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = input.value === "" ? "No Task" : input.value;
  tasks.appendChild(addTask(title));
  input.value = "";
});

function addTask(title) {
  const task = $createEl("div");
  task.className = "task todo";

  setTimeout(()=>{
      task.classList.add('enter')
  }, 200)

  const left = $createEl("div");
  left.className = "left";

  const btnCheck = $createEl("button");
  btnCheck.className = "check";
  btnCheck.addEventListener('click', check)

  const span = $createEl("span");
  span.className = "task-title";
  span.innerText = title;

  const dlt = $createEl("button");
  dlt.className = "delete";
  dlt.addEventListener('click', removeParent)

  left.appendChild(btnCheck);
  left.appendChild(span);

  task.appendChild(left);
  task.appendChild(dlt);
  return task;
}

function removeParent(){
    this.parentNode.classList.add('leave')
    setTimeout(() => {
        this.parentNode.remove()
    }, 200)
}

function check(){
    this.classList.toggle('active')
    let parent = this.parentNode
    let task = parent.querySelector('.task-title')
    if(this.classList.contains('active')){
        task.style.textDecoration = 'line-through'
        task.style.opacity = "0.3"
        parent.parentNode.classList.replace('todo', 'done')
    }else{
        task.style.textDecoration = 'none'
        task.style.opacity = "1"
        parent.parentNode.classList.replace('done', 'todo')

    }
}

btns.forEach(btn => btn.addEventListener('click', (e) => {
    btns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    if(btn.classList.contains('todo')){
        let task = $els('.task')
        task.forEach(t => t.classList.contains('done') ? t.style.display = 'none' : t.style.display = "flex")
    }
    else if(btn.classList.contains('done')){
        let task = $els('.task')
        task.forEach(t => t.classList.contains('todo') ? t.style.display = 'none' : t.style.display = "flex")
    }
    else {
        let task = $els('.task')
        task.forEach(t => t.style.display = "flex")
    }
}))