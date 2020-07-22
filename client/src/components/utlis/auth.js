import cookie from 'js-cookie'


export const setCookie =(key, value)=>{
if(process.browser){
    cookie.set(key,value,{
        expires:1
    })
    }
}

export const getCookie= key=>{
    if(process.browser){
        return cookie.get(key)
    }
}

export const setLocalStorage=(key,value)=>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
     
    }
}


export const authenticate = (response, next)=>{
    console.log('mamu 1st', response.data)
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

export const isAuth=()=>{
    if(process.browser){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
           
            if(localStorage.getItem('user')){
                console.log('mamu last', localStorage.getItem('user'))
                return JSON.parse(localStorage.getItem('user'))
                
            }
            else{
                return false
            }
        }
    }
}