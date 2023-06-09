import axios from "axios";
import { APIURL } from "./APIurl";

// Signup : Sign Up API
export async function API_Signup(email, name, password) {
    const url = APIURL.USER_CONTROLLER.POST.signup;
    var response = await axios.post(url, {
        email: email,
        name: name,
        password: password
    });
    if (response.data === '회원가입 성공') {
        return {
            success: true,
            code: "200",
            message: "Signup Success"
        }
    } else {
        return {
            success: false,
            code: "500",
            message: "Signup Fail"
        }
    }
}