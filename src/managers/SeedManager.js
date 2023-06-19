export const getSeeds = () => {
    return fetch("http://localhost:8000/seeds", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSeedById = (id) => {
    return fetch(`http://localhost:8000/seeds/${id}`, {
        headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
}

export const createSeed = (seed) => {
    return fetch("http://localhost:8000/seeds", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(seed)
    })
        .then(res => res.json())
}

export const updateSeed = (seed, seedId) => {
    return fetch(`http://localhost:8000/seeds/${seedId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(seed)
    })
        // .then(response => response.json())
}

export const deleteSeed = (id) => {
    return fetch(`http://localhost:8000/seeds/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    }
    )
}

export const getGenres = () => {
    return fetch("http://localhost:8000/genres", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getCharacters = () => {
    return fetch("http://localhost:8000/characters", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getDesires = () => {
    return fetch("http://localhost:8000/desires", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getFears = () => {
    return fetch("http://localhost:8000/fears", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getObstacles = () => {
    return fetch("http://localhost:8000/obstacles", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getConsequences = () => {
    return fetch("http://localhost:8000/consequences", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getRewards = () => {
    return fetch("http://localhost:8000/rewards", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getWriter = () => {
    return fetch("http://localhost:8000/writers", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}