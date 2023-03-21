const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? {
        'x-access-token': user.token,
    } : {};
}

export default authHeader