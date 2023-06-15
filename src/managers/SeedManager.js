export const getSeeds = () => {
    return fetch("http://localhost:8000/seeds", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}