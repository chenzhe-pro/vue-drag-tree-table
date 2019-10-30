import reg from './reg'
export const validator_phone = (rule, value, callback) => {
  let Regex = reg.reg_phone;
  if (!Regex.test(value)) {
    callback(new Error('手机号码格式不正确！'))
  } else {
    callback();
  }
};
export const validator_email = (rule, value, callback) => {
  let Regex = reg.reg_email;
  if (!Regex.test(value)) {
    callback(new Error('手机号码格式不正确！'))
  } else {
    callback();
  }
};
export const validator_space = (rule, value, callback) => {
  if (value.indexOf(" ") >=0) {
    callback(new Error('输入值中不能包含空格！'))
  } else {
    callback();
  }
};
export const validator_special = (rule, value, callback) => {
  let Regex = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  if (Regex.test(value)) {
    callback(new Error('输入值中不能包含特殊字符！'))
  } else {
    callback();
  }
};
// pattern: /^[a-z]+$/
