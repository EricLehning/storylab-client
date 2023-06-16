import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createSeed, getCharacters, getConsequences, getDesires, getFears, getGenres, getObstacles, getRewards } from '../../managers/SeedManager.js'


export const SeedForm = () => {
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

    useEffect(() => {
        // TODO: Get the genre, then set the state
        // Call the getGenres function from the SeedManager
        getGenres()
            .then((genres) => {
                // Set the genres state variable to the array of genres returned from the API
                setGenres(genres)
            })

    }, [])

    useEffect(() => {
        getCharacters()
            .then((characters) => {
                setCharacters(characters)
            })
    }, [])

    useEffect(() => {
        getDesires()
            .then((desires) => {
                setDesires(desires)
            })
    }, [])

    useEffect(() => {
        getFears()
            .then((fear) => {
                setFears(fear)
            })
    }, [])

    useEffect(() => {
        getObstacles()
            .then((obstacles) => {
                setObstacles(obstacles)
            })
    }, [])

    useEffect(() => {
        getConsequences()
            .then((consequences) => {
                setConsequences(consequences)
            })
    }, [])

    useEffect(() => {
        getRewards()
            .then((rewards) => {
                setRewards(rewards)
            })
    }, [])

    const changeSeedState = (domEvent) => {
        const { name, value, type, checked } = domEvent.target;
        let newValue = type === "checkbox" ? checked : value;

        if (name === "obstacleIds") {
            const obstacleId = parseInt(value);
            const isCurrentlySelected = currentSeed.obstacleIds.includes(obstacleId);

            if (isCurrentlySelected) {
                newValue = currentSeed.obstacleIds.filter((id) => id !== obstacleId);
            } else {
                newValue = [...currentSeed.obstacleIds, obstacleId];
            }
        }

        setCurrentSeed({
            ...currentSeed,
            [name]: newValue,
        });
    };


    return (
        <form className="seedForm">
            <h2 className="seedForm__title">Create New Story Seed</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentSeed.title}
                        onChange={changeSeedState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genreId">Genre: </label>
                    <select name="genreId" required autoFocus className="form-control" value={currentSeed.genreId} onChange={changeSeedState}>
                        <option value="">Select a genre</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>{genre.category}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="characterId">Character: </label>
                    <select name="characterId" required autoFocus className="form-control" value={currentSeed.characterId} onChange={changeSeedState}>
                        <option value="">Select a character</option>
                        {characters.map(character => (
                            <option key={character.id} value={character.id}>{character.description}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="desireId">Desire: </label>
                    <select name="desireId" required autoFocus className="form-control" value={currentSeed.desireId} onChange={changeSeedState}>
                        <option value="">Select a desire</option>
                        {desires.map(desire => (
                            <option key={desire.id} value={desire.id}>{desire.wish}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fearId">Fear: </label>
                    <select name="fearId" required autoFocus className="form-control" value={currentSeed.fearId} onChange={changeSeedState}>
                        <option value="">Select a fear</option>
                        {fears.map(fear => (
                            <option key={fear.id} value={fear.id}>{fear.fearName}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="obstacleIds">Obstacles (select 1-3): </label>
                    {obstacles.map((obstacle) => (
                    <div key={obstacle.id} className="form-check">
                    <input
                    type="checkbox"
                    name="obstacleIds"
                    value={obstacle.id}
                    checked={currentSeed.obstacleIds.includes(obstacle.id)}
                    onChange={changeSeedState}
                    className="form-check-input"
                    />
                    <label className="form-check-label">{obstacle.obstruction}</label>
                    </div>
                    ))}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="consequenceId">Consequence: </label>
                    <select name="consequenceId" required autoFocus className="form-control" value={currentSeed.consequenceId} onChange={changeSeedState}>
                        <option value="">Select a consequence</option>
                        {consequences.map(consequence => (
                            <option key={consequence.id} value={consequence.id}>{consequence.negResult}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rewardId">Reward: </label>
                    <select name="rewardId" required autoFocus className="form-control" value={currentSeed.rewardId} onChange={changeSeedState}>
                        <option value="">Select a reward</option>
                        {rewards.map(reward => (
                            <option key={reward.id} value={reward.id}>{reward.prize}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const seed = {
                        title: currentSeed.title,
                        genre: parseInt(currentSeed.genreId),
                        character: parseInt(currentSeed.characterId),
                        desire: parseInt(currentSeed.desireId),
                        fear: parseInt(currentSeed.fearId),
                        obstacles: currentSeed.obstacleIds.map((id) => parseInt(id)),
                        consequence: parseInt(currentSeed.consequenceId),
                        reward: parseInt(currentSeed.rewardId),
                    }

                    // Send POST request to your API
                    createSeed(seed)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}