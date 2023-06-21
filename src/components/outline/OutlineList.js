import React, { useEffect, useState } from "react"
import { copy } from "clipboard";
import { getOutlines, getOutlineById, deleteOutline } from "../../managers/OutlineManager";
import { useNavigate, useParams } from 'react-router-dom'


export const OutlineList = (props) => {
    const navigate = useNavigate()
    const { outlineId } = useParams()
    const [outlines, setOutlines] = useState([]);
    const [copied, setCopied] = useState(false);
    

  useEffect(() => {
    getOutlines().then(data => setOutlines(data));
  }, []);

  const copyToClipboard = () => {
    const outlineContent = outlines.map((outline) => outline.prose).join("\n");
    copy(outlineContent);
    setCopied(true);
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
          <button onClick={copyToClipboard}>
            {copied ? "Copied!" : "Copy to Clipboard"}
            </button>

          <button onClick={()=>deleteOutlineEvent(outline.id)}>Delete</button>
        </section>
      ))}
    </article>
  );
  
};
