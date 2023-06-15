import React, { useEffect, useState } from "react"
import { getSeeds } from "../../managers/SeedManager.js"


export const SeedList = (props) => {
  const [seeds, setSeeds] = useState([]);

  useEffect(() => {
    getSeeds().then(data => setSeeds(data));
  }, []);

  return (
    <article className="seeds">
      {seeds.map(seed => (
        <section key={`seed--${seed.id}`} className="seed">
          <div className="seed__logline">
            {`${seed.title} is a ${seed.genre.category} about a ${seed.character.description} who wants ${seed.desire.wish}, but is afraid of ${seed.fear.fearName} and must overcome ${seed.obstacles.map(obstacle => obstacle.obstruction).join(', ')} in order to ${seed.reward.prize}, or else ${seed.consequence.negResult}.`}
          </div>
        </section>
      ))}
    </article>
  );
};
