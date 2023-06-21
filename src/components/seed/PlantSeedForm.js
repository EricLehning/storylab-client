import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateSeed, getSeedById, getCharacters, getConsequences, getDesires, getFears, getGenres, getObstacles, getRewards } from '../../managers/SeedManager.js'
import { chatInput } from "../../managers/ChatbotManager.js"
import { createOutline } from "../../managers/OutlineManager.js"

export const PlantSeedForm = () => {
    const navigate = useNavigate()
    const { seedId } = useParams()
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

    const [outline, setOutline] = useState(null)

    const fetchSeed = () => {
        getSeedById(seedId)
            .then((res) => setCurrentSeed(res))
        }
    
    useEffect(
        () => {
            fetchSeed()
        },
        [seedId] 
        )

    useEffect(() => {
        const userInput = `${currentSeed.title} is a ${currentSeed.genre.category} about a ${currentSeed.character.description} who wants ${currentSeed.desire.wish} but is afraid of ${currentSeed.fear.fearName} and must overcome ${currentSeed.obstacles.map((obstacle, index) => {
            if (index === currentSeed.obstacles.length - 1) {
                return `and ${obstacle.obstruction}`;
            } else {
                return obstacle.obstruction;
            }
        }).join(', ')} in order to ${currentSeed.reward.prize} or else ${currentSeed.consequence.negResult}.`
    
        const fetchOutline = async () => {
            try {
                const generatedOutline = await chatInput(userInput);
                setOutline(generatedOutline);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchOutline();
    }, [currentSeed])

    console.log(outline)

        return (
            <article className="outline">
                <h2 className="plantForm_header">Outline</h2>
                <h3 className="outline_title">{`${currentSeed.title}`}</h3>
                <div className="seed_outline">
                {outline !== null ? (
                    <>
                        {outline.split("\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </>
                ) : (
                    "Loading outline..."
                )}
                </div>
                <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const outlineObject = {
                        title: currentSeed.title,
                        prose: outline,
                    }

                    // Send POST request to your API
                    createOutline(outlineObject)
                        .then(() => navigate("/outlines"))
                }}
                className="btn btn-primary">Save</button>
            </article>
        )
}