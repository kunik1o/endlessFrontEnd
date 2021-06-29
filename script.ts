// -数据初始化
// 使用localStorage
// -添加条目
// -删除条目
// 设定时间
// -动态效果

// Initial data
let initVal = [
  {
    name: "使用原生Html5/ES6/CSS3完成一个Todo-List",
    time: 1624782194540,
    status: "done",
  },
  {
    name: "使用webpack模块化todo-List",
    time: 1624782194541,
    status: "doing",
  },
  {
    name: "学习前端框架AngularJs/Vue/React，并使用框架重构该app",
    time: 1624782194542,
    status: "pending",
  },
  {
    name: "学习异步相关知识",
    time: 1624782194543,
    status: "pending",
  },
  {
    name: "学习NodeJS，为App适配一个RESTful API后端和websocket后端",
    time: 1624782194544,
    status: "pending",
  },
  {
    name: "学习touchevents并适配移动端",
    time: 1624782194545,
    status: "pending",
  },
  {
    name: "自选demo项目",
    time: 1624782194546,
    status: "pending",
  },
  {
    name: "学习OIWiKi里的基本算法",
    time: 1624782194547,
    status: "pending",
  },
  {
    name: "学习http 1.1/2/3 GRPC OSI模型",
    time: 1624782194548,
    status: "pending",
  },
];
// localStorage.setItem("data", initVal)
const delItem = (id) => {
  event.stopPropagation();
  $("#" + id).animate(
    {
      opacity: 0,
      height: 0,
    },
    500
  );
};

const switchItem = (id) => {
  event.stopPropagation();
  let item = document.getElementById(id);
  let newClassName = item.className;
  switch (item.className) {
    case "doing":
      newClassName = "done";
      break;
    case "done":
      newClassName = "pending";
      break;
    case "pending":
      newClassName = "doing";
      break;
    default:
      break;
  }
  item.className = newClassName;
  item.getElementsByTagName("label")[0].innerText = newClassName;
};

const modifyItem = (id) => {
  let currentInput = document.getElementById("add").value;
  if (currentInput == "") {
    let prev = document
      .getElementById(id)
      .getElementsByTagName("p")[0].innerText;
    for (let index = 0; index < prev.length; index++) {
      setTimeout(
        () => (document.getElementById("add").value += prev[index]),
        50
      );
    }
    delItem(id);
  } else {
    console.log(currentInput);
  }
};

const createNewItemDom = (newItem) => {
  let newDOM = document.createElement("li");
  let btnCtn = document.createElement("div");
  let delBtn = document.createElement("button");
  let switchState = document.createElement("button");

  newDOM.id = newItem.time;
  newDOM.className = newItem.status;
  newDOM.innerHTML = `<label>${newItem.status}</label><p>${newItem.name}</p>`;
  newDOM.onclick = () => modifyItem(newDOM.id);

  delBtn.innerText = "D";
  delBtn.onclick = () => delItem(newDOM.id);
  switchState.innerText = "S";
  switchState.onclick = () => switchItem(newDOM.id);
  btnCtn.appendChild(delBtn);
  btnCtn.appendChild(switchState);
  newDOM.appendChild(btnCtn);

  newDOM.style.height = 0;
  newDOM.style.opacity = 0;
  document.getElementById("todo-list").appendChild(newDOM);
  $("#" + newDOM.id).animate(
    {
      height: "2rem",
      opacity: 1,
    },
    500
  );
};

const addItem = () => {
  let inputVal = document.getElementById("add").value;
  if (inputVal) {
    document.getElementById("add").value = "";
    document.getElementById("add").placeholder = "Add New Item Here";
    let newItem = {
      name: inputVal,
      time: Date.now().toString(),
      status: "pending",
    };
    createNewItemDom(newItem);
  } else {
    document.getElementById("add").placeholder = "Do Not Submit Null Job";
  }
};

// On load
initVal.map((it) => {
  createNewItemDom(it);
});
