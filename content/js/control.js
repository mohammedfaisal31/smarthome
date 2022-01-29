let toggle_button = document.getElementById("tgl-btn")

toggle_button.addEventListener('click',()=>{
    //console.log("Posting data")
    fetch('/control',{
        method:"POST",
        mode:"cors",
        body: JSON.stringify({"btn_checked" : toggle_button.checked}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch(); 
})
