import { ApiError } from "./ApiError.js"

const validator=function(userName,email,password,fullName)
{
    if(!userName||userName.trim() ==="" )
    {
        throw new ApiError(400,"username  cannot be empty")
    }
  
    else if(!email||!email.includes("@"))
    {
        throw new ApiError(400,"Email should contain @")
    }
    else if(!password||password.length<6)
    {
        throw new ApiError(400,"Length of password should be greater or equal to 6 characters")
    }
    return 1
}

export { validator }