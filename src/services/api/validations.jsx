export const getRequiredMessage=(fieldName)=>`${fieldName} is required`;

export const EMAIL_VALIDATION={required:'field is required',
  pattern:{
    value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
    message: "Invalid Email"
  }
}
// ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d?[a-z])(?=\S*?[0-9]).{6,})\S$
const PasswordRegEx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]]{6,}$/

export const PasswordValidation=(fieldName)=>{
  return{
    required: getRequiredMessage(fieldName),
    pattern:{
      value: PasswordRegEx,
      message:"At least 6 characters: UPPER/lowercase, numbers and special characters"
    }
  }
}