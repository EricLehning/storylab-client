export const chatInput = async (userInput) => {
    try {
        const response = await fetch("http://localhost:8000/chatbot",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify({user_input: userInput}),
        })

        const data = await response.json()
        return data.response        
    }   catch (error) {
        console.error("Error:", error)
        throw new Error("Failed to plant story seed.")
    }
    
}