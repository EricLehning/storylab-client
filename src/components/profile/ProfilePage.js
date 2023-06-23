import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getWriter } from "../../managers/SeedManager"
import "./Profile.css"

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
            <div className="profile-container">
                {<img className="profile-picture" src={writer.profilePic} alt="Profile Picture" />}
                <div className="pen-name">{writer.penName}</div>            
            </div>
            
        </article>
    )
}
