const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.school = !isEmpty(data.school) ? data.school : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if(Validator.isEmpty(data.name)){
    errors.name = "名字不能为空!";
  }

  if(Validator.isEmpty(data.email)){
    errors.email = "邮箱不能为空!";
  }

  if(Validator.isEmpty(data.school)){
    errors.school = "学校不能为空!";
  }

  if(!Validator.isEmail(data.email)){
    errors.email = "邮箱不合法!";
  }

  if(Validator.isEmpty(data.password)){
    errors.password = "密码不能为空!";
  }

  if(Validator.isEmpty(data.password2)){
    errors.password2 = "确认密码不能为空!";
  }

  if(!Validator.equals(data.password,data.password2)){
    errors.password2 = "两次不一致!";
  }



  return {
    errors,
    isValid:isEmpty(errors)
  };
}