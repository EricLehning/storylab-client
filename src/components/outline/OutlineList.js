import React, { useEffect, useState } from "react"
import { copy } from "clipboard";
import { getOutlines, getOutlineById, deleteOutline } from "../../managers/OutlineManager";
import { useNavigate, useParams } from 'react-router-dom'
import "./OutlineList.css";


export const OutlineList = (props) => {
    const navigate = useNavigate()
    const { outlineId } = useParams()
    const [outlines, setOutlines] = useState([]);
    

  useEffect(() => {
    getOutlines().then(data => setOutlines(data));
  }, []);

  const copyToClipboard = (outline) => {
    const outlineContent = outline.prose;
    copy(outlineContent);
  };
  

  const deleteOutlineEvent = (id) => {
      deleteOutline(id).then(() => getOutlines().then(data => setOutlines(data)))
}

  return (
    <article className="outlines">
    <h2 className="outlines_header">Outline Library</h2>
      {outlines.map(outline => (
        <section key={`seed--${outline.id}`} className="outline">
          <div className="outline_main_title">
            <h3 className="outline_title">{`${outline.title}`}</h3>
          </div>
          <div className="outline_prose">
            {outline.prose.split("\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
          </div>
          <button className="outline_copy_button" onClick={() => copyToClipboard(outline)}>
          Copy to Clipboard
          </button>

          <button className="outline_delete_button" onClick={()=>deleteOutlineEvent(outline.id)}>Delete</button>
        </section>
      ))}
    </article>
  );
  
};
