import { authHeader } from "./auth-header";

export const userService = {
    login,
    logout,
    register,
    getAll,
};

function login(email, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then((user) => {
            if (user.token) {
                localStorage.setItem("venturo_siakad_user", JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    localStorage.removeItem("venturo_siakad_user");
}

function register(user) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };
    return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(new Error(error));
        }
        return data;
    });
}
