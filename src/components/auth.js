export const getUserToken = () => {
    return(window.localStorage.getItem('portal_token'))
};