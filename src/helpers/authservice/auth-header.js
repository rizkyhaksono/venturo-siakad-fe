export function authHeader() {
    let user = JSON.parse(localStorage.getItem("venturo_siakad_user"));
    if (user && user.token) {
        return { Authorization: "Bearer " + user.token };
    } else {
        return {};
    }
}
