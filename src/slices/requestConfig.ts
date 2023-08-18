import Cookies from "universal-cookie";

const cookies = new Cookies();
export const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + cookies.get("bearerToken")
    }
};

export const formConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + cookies.get("bearerToken")
    }
}