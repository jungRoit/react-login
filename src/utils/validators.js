export const validatePassword = password => {

  if(password.length < 8) {
    return {
      isValid: false,
      message:'Password must be atleast 8 character long.',
    }
  }

  const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!"#$%&'()*+,-.:;<=>?@{}/^_~`|\[\]]).{8,128}$/;
  const matcher = password.match(pattern);

  if(!matcher) {
    return {
      isValid: false,
      message: 'Password must contain One uppercase letter, One lower letter, one Number and one Special character.'
    }
  }

  return {
    isValid: true,
    message: ''
  }
}