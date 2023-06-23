import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateSeed, getSeedById, getCharacters, getConsequences, getDesires, getFears, getGenres, getObstacles, getRewards } from '../../managers/SeedManager.js'
import "./SeedForm.css";

export const UpdateSeedForm = () => {
    const navigate = useNavigate()
    const { seedId } = useParams()
    const [characters, setCharacters] = useState([])
    const [consequences, setConsequences] = useState([])
    const [desires, setDesires] = useState([])
    const [fears, setFears] = useState([])
    const [genres, setGenres] = useState([])
    const [obstacleObjects, setObstacleObjects] = useState([])
    const [rewards, setRewards] = useState([])

    /*
        Since the input fields are bound to values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentSeed, setCurrentSeed] = useState({
        title: "",
        genre: 0,
        character: 0,
        desire: 0,
        fear: 0,
        obstacles: [],
        consequence: 0,
        reward:0
    })

    useEffect(() => {
        Promise.all([getSeedById(seedId), getGenres(), getCharacters(), getDesires(), getFears(), getObstacles(), getConsequences(), getRewards()])
            .then(([seedData, genreData, characterData, desireData, fearData, obstacleData, consequenceData, rewardData]) => {
                const obstacleIds = seedData.obstacles.map(obstacle => obstacle.id)
                const genreId = seedData.genre.id
                const characterId = seedData.character.id
                const desireId = seedData.desire.id
                const fearId = seedData.fear.id
                const consequenceId = seedData.consequence.id
                const rewardId = seedData.reward.id
                const updateSeedData = {...seedData, obstacles: obstacleIds, genre: genreId, character: characterId, desire: desireId, fear: fearId, consequence: consequenceId, reward: rewardId}

                setCurrentSeed(updateSeedData)
                setGenres(genreData)
                setCharacters(characterData)
                setDesires(desireData)
                setFears(fearData)
                setObstacleObjects(obstacleData)
                setConsequences(consequenceData)
                setRewards(rewardData)
            });
    }, [])

    // const fetchSeed = () => {
    //     getSeedById(seedId)
    //         .then((res) => setCurrentSeed(res))
    //     }

    // useEffect(
    //     () => {
    //         fetchSeed()
    //     },
    //     [] //infinite loop when seedId entered here
    //     )

    // useEffect(() => {
    //     // TODO: Get the genre, then set the state
    //     // Call the getGenres function from the SeedManager
    //     getGenres()
    //         .then((genres) => {
    //             // Set the genres state variable to the array of genres returned from the API
    //             setGenres(genres)
    //         })

    // }, [])

    // useEffect(() => {
    //     getCharacters()
    //         .then((characters) => {
    //             setCharacters(characters)
    //         })
    // }, [])

    // useEffect(() => {
    //     getDesires()
    //         .then((desires) => {
    //             setDesires(desires)
    //         })
    // }, [])

    // useEffect(() => {
    //     getFears()
    //         .then((fears) => {
    //             setFears(fears)
    //         })
    // }, [])

    // useEffect(() => {
    //     getObstacles()
    //         .then((obstacleObjects) => {
    //             setObstacleObjects(obstacleObjects)
    //         })
    // }, [])

    // useEffect(() => {
    //     getConsequences()
    //         .then((consequences) => {
    //             setConsequences(consequences)
    //         })
    // }, [])

    // useEffect(() => {
    //     getRewards()
    //         .then((rewards) => {
    //             setRewards(rewards)
    //         })
    // }, [])

    const changeSeedState = (domEvent) => {
        // TODO: Complete the onChange function
        // Get the name and value of the input field that triggered the onChange event
        const { name, value } = domEvent.target

        if (name === "genre" || name === "character" || name === "desire" || name === "fear" || name === "consequence" || name === "reward") {
            setCurrentSeed((prevState) => ({
                ...prevState,
                [name]: parseInt(value)
            }))
        } else {

        // Use the name of the input field to update the corresponding property in the currentSeed state variable
            setCurrentSeed(prevState => ({
                ...prevState,
                [name]: value
        }))
        }

    }

    const handleCheckboxChange = (evt) => {
        const { checked, value } = evt.target;
        const obstacleId = parseInt(value);

        setCurrentSeed((prevState) => {
            const updateObstacles = checked
                ? [...prevState.obstacles, obstacleId]
                : prevState.obstacles.filter((id) => id !== obstacleId);
            
            return {
                ...prevState,
                obstacles: updateObstacles,
            };
        });
    };

    // const changeSeedState = (domEvent) => {
    //     console.log(domEvent.target)
        
    //     const { name, value, type, checked } = domEvent.target;
    //     let newValue = type === "checkbox" ? checked : value;

    //     if (name === "obstacles") {
    //         const obstacleId = parseInt(value);
    //         const isCurrentlySelected = currentSeed.obstacles.includes(obstacleId);

    //         if (isCurrentlySelected) {
    //             newValue = currentSeed.obstacles.filter((id) => id !== obstacleId);
    //         } else {
    //             newValue = [...currentSeed.obstacles, obstacleId];
    //         }
    //     } else if (name !== "obstacles") {
    //         newValue = value; 
    //     }


    //     setCurrentSeed({
    //         ...currentSeed,
    //         [name]: newValue,
    //     });
    // };


    return (
        <form className="seedForm">
            <h2 className="seedForm__title">Update Story Seed</h2>
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
                    <label htmlFor="genre">Genre: </label>
                    <select name="genre" required autoFocus className="form-control" value={currentSeed.genre} onChange={changeSeedState}>
                        <option value="">{currentSeed?.genre?.category}</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>{genre.category}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="character">Character: </label>
                    <select name="character" required autoFocus className="form-control" value={currentSeed.character} onChange={changeSeedState}>
                        <option value="">{currentSeed?.character?.description}</option>
                        {characters.map(character => (
                            <option key={character.id} value={character.id}>{character.description}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="desire">Desire: </label>
                    <select name="desire" required autoFocus className="form-control" value={currentSeed.desire} onChange={changeSeedState}>
                        <option value="">{currentSeed?.desire?.wish}</option>
                        {desires.map(desire => (
                            <option key={desire.id} value={desire.id}>{desire.wish}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fear">Fear: </label>
                    <select name="fear" required autoFocus className="form-control" value={currentSeed.fear} onChange={changeSeedState}>
                        <option value="">{currentSeed?.fear?.fearName}</option>
                        {fears.map(fear => (
                            <option key={fear.id} value={fear.id}>{fear.fearName}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="obstacles">Obstacles (select 1-3): </label>
                    {obstacleObjects.map((obstacle) => (
                    <div key={obstacle.id} className="form-check">
                    <input
                    type="checkbox"
                    name="obstacles"
                    value={obstacle.id}
                    checked={
                        currentSeed?.obstacles?.some((currentObstacle) => currentObstacle.id === obstacle.id)
                    }
                    onChange={(evt) => {
                        console.log(evt);
                        console.log(evt.target);
                        const isChecked = evt.target.checked;
                        const obstacleId = obstacle.id;
            
                        // Update the currentSeed state based on checkbox changes
                        
                        if (isChecked) {
                          // Add the obstacle ID to the currentSeed.obstacles array
                            
                            changeSeedState({
                                ...currentSeed,
                                obstacles: [...currentSeed.obstacles, obstacleId],
                            });
                        } else {
                          // Remove the obstacle ID from the currentSeed.obstacles array
                    
                            changeSeedState({
                                ...currentSeed,
                                obstacles: currentSeed?.obstacles?.filter((currentObstacle) => currentObstacle.id !== obstacleId),
                            });
                        }
                        
                    }}
                    className="form-check-input"
                    />
                    <label className="form-check-label">{obstacle.obstruction}</label>
                    </div>
                    ))}
                </div>
            </fieldset> */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="obstacles">Obstacles: </label>
                    {obstacleObjects.map((obstacle) => (
                        <div key={obstacle.id} className="form-check">
                            <input
                                type="checkbox"
                                name="obstacles"
                                value={obstacle.id.toString()}
                                checked={currentSeed?.obstacles?.includes(obstacle.id)}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label">{obstacle.obstruction}</label>
                        </div>
                    ))}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="consequence">Consequence: </label>
                    <select name="consequence" required autoFocus className="form-control" value={currentSeed.consequence} onChange={changeSeedState}>
                        <option value="">{currentSeed?.consequence?.negResult}</option>
                        {consequences.map(consequence => (
                            <option key={consequence.id} value={consequence.id}>{consequence.negResult}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reward">Reward: </label>
                    <select name="reward" required autoFocus className="form-control" value={currentSeed.reward} onChange={changeSeedState}>
                        <option value="">{currentSeed?.reward?.prize}</option>
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

                    // const seed = {
                    //     title: currentSeed.title,
                    //     genre: parseInt(currentSeed.genre),
                    //     character: parseInt(currentSeed.character),
                    //     desire: parseInt(currentSeed.desire),
                    //     fear: parseInt(currentSeed.fear),
                    //     obstacles: currentSeed?.obstacles?.map((obstacle) => parseInt(obstacle.id)),
                    //     consequence: parseInt(currentSeed.consequence),
                    //     reward: parseInt(currentSeed.reward),
                    // }

                    // Send POST request to your API
                    updateSeed(currentSeed, seedId)
                        .then(() => navigate("/seeds"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}