function xbtnclick(e){
    pnode = e.target.parentNode;
    list = document.getElementById('todolist')
    list.removeChild(pnode)
}

function addItem(){
    console.log("addItem 함수 호출됨");
    
    todo = document.getElementById('item');
    list = document.getElementById('todolist');

    listitem = document.createElement('li');
    listitem.innerText = todo.value;
    listitem.className = 'list-group-item list-group-item-action list-group-item-warning';

    xbtn = document.createElement('button');
    xbtn.innerHtml = "&times"

    //onclick 지원방법 1 - 함수 적용  
    //xbtn.onclick = xbtnclick;
    //onclick 지원방법 2 - 익명함수 적용
    //xbtn.onclick = function(e){
    //    pnode = e.target.parentNode
    //    list.removeChild(pnode)
    //}
    //onclick 지원방법 3 - 화살표함수 적용

    
    xbtn.click = (e)=>{
        pnode = e.target.parentNode;
        list.removeChild(pnode)
    }

    // 완료버튼을 만들고 할일 리스트

    dbtn = document.createElement('button');
    dbtn.innerHtml = "d"

    dbtn.click = (e)=>{
        pnode = e.target.parentNode;
        pnode.style.textDecoration = "line-throgh"
    }
    
    dbtn.className = 'class';
    listitem.appendChild(dbtn)

    xbtn.className = 'class';

    listitem.appendChild(xbtn);

    list.appendChild(listitem);

    todo.value = ""
    todo.focus()



}