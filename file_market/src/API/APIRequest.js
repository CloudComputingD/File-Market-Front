import { APIURL } from "./APIurl";

// join : Sign Up API [/join]
export const JOIN_REQUEST = (email, name, password) => {
    const payload = {
        email: email,
        name: name,
        password: password
    };
    
    return {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
}

// create : Create a Folder [/folder]
export const CREATE_REQUEST = (name) => {
    const payload = {
        name: name
    };
    
    return {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
}

// setfavorite : Set Favorite Folder [/folder/favorite/{folderId}]
export const SETFAVORITE_REQUEST = (folderId) => {
    const payload = {
        
    }
}