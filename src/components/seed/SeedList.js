import React, { useEffect, useState } from "react"
import { getSeeds } from "../../managers/SeedManager.js"
import { useNavigate, useParams } from 'react-router-dom'


export const SeedList = (props) => {
    const navigate = useNavigate()
    const [seeds, setSeeds] = useState([]);

  useEffect(() => {
    getSeeds().then(data => setSeeds(data));
  }, []);

  return (
    <article className="seeds">
    <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            navigate({ pathname: "/seeds/new" })
        }}
    >Create New Seed</button>
      {seeds.map(seed => (
        <section key={`seed--${seed.id}`} className="seed">
          <div className="seed__logline">
            {`${seed.title} is a ${seed.genre.category} about a ${seed.character.description} who wants ${seed.desire.wish}, but is afraid of ${seed.fear.fearName} and must overcome ${seed.obstacles.map((obstacle, index) => {
              if (index === seed.obstacles.length - 1) {
                return `and ${obstacle.obstruction}`;
              } else {
                return obstacle.obstruction;
              }
            }).join(', ')} in order to ${seed.reward.prize}, or else ${seed.consequence.negResult}.`}
          </div>
        </section>
      ))}
    </article>
  );
  
};
