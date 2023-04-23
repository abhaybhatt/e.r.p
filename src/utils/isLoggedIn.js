const isLoggedIn = () => {
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
        return true
    }
    return false
}

export default isLoggedIn