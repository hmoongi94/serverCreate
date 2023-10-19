const signUpAsset = {
  username:"",
  password1:"",
  password2:"",
  email:"",
  textColor: "#B6B6B6",
  inputBoxColor:"#D9D9D9",
  pointColor:"#FF6666"
}

input = document.getElementsByTagName('input')
console.dir(input)
input[0].style.backgroundColor = signUpAsset.inputBoxColor
input[1].style.backgroundColor = signUpAsset.inputBoxColor
input[2].style.backgroundColor = signUpAsset.inputBoxColor
input[3].style.backgroundColor = signUpAsset.inputBoxColor
input[4].style.backgroundColor = signUpAsset.pointColor

input[0].color = signUpAsset.textColor
input[1].color = signUpAsset.textColor
input[2].color = signUpAsset.textColor
input[3].color = signUpAsset.textColor

input[4].addEventListener("click",function(){
  signUpAsset.username = input[0].value
  signUpAsset.password1 = input[1].value
  signUpAsset.password2 = input[2].value
  signUpAsset.email = input[3].value
  
  // console.dir(input)
  // console.log(signUpAsset)
})

// module.exports = signUpAsset