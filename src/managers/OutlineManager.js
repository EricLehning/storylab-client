export const getOutlines = () => {
    return fetch("http://localhost:8000/outlines", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getOutlineById = (id) => {
    return fetch(`http://localhost:8000/outlines/${id}`, {
        headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
}

export const createOutline = (outline) => {
    return fetch("http://localhost:8000/outlines", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(outline)
    })
        .then(res => res.json())
}

export const deleteOutline = (id) => {
    return fetch(`http://localhost:8000/outlines/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    }
    )
}