
import axios from "axios";



export const login = async ({email,password})=>{

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }
        const response = await axios.post(`${backendURL}/login`,
            { email, password },
            config);


        if (response.status === 200) {
            const token = localStorage.setItem('token', response.data.token);
            alert('logged in')
            window.location.href = '/'
        }
    } catch (error) {
        console.log(error.message)
    }
}