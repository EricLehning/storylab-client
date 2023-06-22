import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createSeed, getCharacters, getConsequences, getDesires, getFears, getGenres, getObstacles, getRewards } from '../../managers/SeedManager.js'


export const Seed = () => {
    const navigate = useNavigate()
    const [characters, setCharacters] = useState([])
    const [consequences, setConsequences] = useState([])
    const [desires, setDesires] = useState([])
    const [fears, setFears] = useState([])
    const [genres, setGenres] = useState([])
    const [obstacles, setObstacles] = useState([])
    const [rewards, setRewards] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentSeed, setCurrentSeed] = useState({
        title: "",
        genreId: 0,
        characterId: 0,
        desireId: 0,
        fearId: 0,
        obstacleIds: [],
        consequenceId: 0,
        rewardId:0
    })

}