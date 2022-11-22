export default function user_id(){
    let cookies = (document.cookie.split(";")).map((object) => {object = object.split("="); let result = {}; result[object[0]] = object[1]; return result;});
    let User_ID = undefined
    for(let i = 0; i < cookies.length; i++){
        if(cookies[i].user != undefined){
            User_ID = cookies[i].user
        }        
    }
    if(User_ID == undefined){
        window.location.href = '/';   
    }
    else{
        return User_ID 
    }
}
