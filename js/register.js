let firstname=document.querySelector("#firstname")
let lastname=document.querySelector("#lastname")
let email=document.querySelector("#email")
let password=document.querySelector("#password")
let register_btn=document.querySelector("#sign_up")

register_btn.addEventListener("click",function(e){
    e.preventDefault()
   if(firstname.value===""||lastname.value===""||email.value===""||password.value===""){
    alert("please fill all data")
   }else{
    localStorage.setItem("firstname",firstname.value)
    localStorage.setItem("lastname",lastname.value)
    localStorage.setItem("email",email.value)
    localStorage.setItem("password",password.value)
    setTimeout(function(){
    window.location="login.html"
   },1500)
   }

})