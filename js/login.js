
let email=document.querySelector("#email")
let password=document.querySelector("#password")
let login_btn=document.querySelector("#sign_in")
let user_email=localStorage.getItem("email")
let user_password=localStorage.getItem("password")

login_btn.addEventListener("click",function(e){
    e.preventDefault()
    if(email.value===""||password.value===""){
        alert("please fill all data")
    } else{
        if(user_email&&user_email.trim()===email.value.trim()&&user_password&&user_password.trim()===password.value.trim()){
            setTimeout(function(){
                window.location="index.html"
            },1500)
        }else{
            alert("wrong email or password")
        }

    }



})


