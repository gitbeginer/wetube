import { async } from "regenerator-runtime";

const btn = document.getElementById("post");
const textA = document.getElementById("txtcomment");
const videoContainer = document.getElementById("videoContainer");

const delComment = async(e) => {

    e.path[0].disabled = true;
    const { id } = e.path[1].dataset;
    const rs = await fetch(`/api/${id}/commentdel`,{
       method:"POST" ,
       headers: {
           'Content-Type' : 'application/json'
       },
    });
    if(rs.status ==200){
        e.path[2].removeChild(e.path[1]);
    }else{
        alert(rs.status +" ERROR");
    }
    e.path[0].disabled = false;

}

function addDiv(id,user,text){
    const div =  document.createElement('div');
    div.setAttribute("data-id",id)
    const spanName = document.createElement('span');
    spanName.innerText =  user;
    div.appendChild(spanName);
    const spanSpace = document.createElement('span');  
    spanSpace.classList.add("comSpace") ;
    div.appendChild(spanSpace);
    const content = document.createElement('span');
    content.innerText = text;
    div.appendChild(content);
    const delcom = document.createElement('span');
    delcom.classList.add("delcom");
    delcom.addEventListener('click', delComment)
    delcom.innerText = "❌";
    div.appendChild(delcom);
    document.getElementById("commentDiv").prepend(div);
}

const handle = async ()=>{
    if(textA.value.trim().length <1){
        alert("내용을 입력하세요");
        textA.focus();
        return;
    }
    btn.disabled = true;
    const { id } = videoContainer.dataset;
    const rs = await fetch(`/api/${id}/comment`,{
       method:"POST" ,
       headers: {
           'Content-Type' : 'application/json'
       },
       body: JSON.stringify({txt: textA.value.trim()})
    });
    if(rs.status ==201){

        addDiv(await rs.json(), textA.dataset.name ,textA.value.trim()  );
        textA.value = "";
    }else{
        alert(rs.status +" ERROR");
    }
    btn.disabled = false;
}
btn.addEventListener("click", handle);

for(const obj of document.getElementsByClassName('delcom')) obj.addEventListener("click",delComment);
