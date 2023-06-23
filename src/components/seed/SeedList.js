import React, { useEffect, useState } from "react"
import { getSeeds, getSeedById, deleteSeed } from "../../managers/SeedManager.js"
import { useNavigate, useParams } from 'react-router-dom'
import "./SeedList.css";


export const SeedList = (props) => {
    const navigate = useNavigate()
    const { seedId } = useParams()
    const [seeds, setSeeds] = useState([]);
    

  useEffect(() => {
    getSeeds().then(data => setSeeds(data));
  }, []);

  const deleteSeedEvent = (id) => {
      deleteSeed(id).then(() => getSeeds().then(data => setSeeds(data)))
}

  return (
    <article className="seeds">
    <button className="btn"
        onClick={() => {
            navigate({ pathname: "/seeds/new" })
        }}
    >Create New Seed</button>
      {seeds.map(seed => (
        <section key={`seed--${seed.id}`} className="seed">
        <div className="seed__container">
          <div className="seed__logline">
            {`${seed.title} is a ${seed.genre.category} about a ${seed.character.description} who wants ${seed.desire.wish}, but is afraid of ${seed.fear.fearName} and must overcome ${seed.obstacles.map((obstacle, index) => {
              if (index === seed.obstacles.length - 1) {
                return `and ${obstacle.obstruction}`;
              } else {
                return obstacle.obstruction;
              }
            }).join(', ')} in order to ${seed.reward.prize}, or else ${seed.consequence.negResult}.`}
          </div>
          <button className="btn btn-2 btn-sep icon-update"
            onClick={() => {
                navigate({ pathname: `/seeds/update/${seed.id}` })
            }}
          >Update Seed</button>
          <button
            className="btn btn-2 btn-sep icon-update"
            onClick={() => {
                 // Prevent default form submission
                navigate({ pathname: `/seeds/plant/${seed.id}` });
            }}
          >
            Plant Seed
          </button>

          <button className="btn" onClick={()=>deleteSeedEvent(seed.id)}>Delete</button>
        </div>
        </section>
      ))}
    </article>
  );
  
};
