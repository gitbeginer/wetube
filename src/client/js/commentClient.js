const btn = document.getElementById("post");
const textA = document.getElementById("txtcomment");
const videoContainer = document.getElementById("videoContainer");

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
btn.addEventListener("click", handle)
