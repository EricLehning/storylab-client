import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getWriter } from "../../managers/SeedManager"

export const ProfilePage = () => {
    const navigate = useNavigate()
    const [writer, setWriter] = useState({})

    useEffect(() => {
        getWriter()
            .then((writerData) => {
                setWriter(writerData)
            })
    }, [])

    console.log(writer)

    return (
        <article>
            <div>
                {<img src={writer.profilePic} alt="Profile Picture" />}
            </div>
            <div>
                {writer.penName}
            </div>
        </article>
    )
}
