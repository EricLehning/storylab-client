export const getSeeds = () => {
    return fetch("http://localhost:8000/seeds", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
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