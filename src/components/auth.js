export const getUserToken = () => {
    return(window.localStorage.getItem('portal_token'))
};
export const removeAuth = () => {
    window.localStorage.setItem('portal_token', '')
    window.localStorage.setItem('portal_userName', '')
    return true
};
export const getAuth = () => {
    return(window.localStorage.getItem('portal_token'))
};
