import { useState, useEffect } from 'react'

import '../../styles/components/EntityCard.css'

/* - - - - - */



/* - - - - - */

function EntityCard({ name, imageID, contents }) {
  const imagePath = `/src/assets/content/entity-cards/entities-images/e-${imageID}.png`;

  return (
    <main className="c-entitycard-m">
      <span className="entity-name">{name}</span>
      <div className="entity-image">
        <img src={imagePath} alt={name} />
      </div>
      <figure className="entity-data">
        {contents.map((content, index) => (
          <article key={index} className="content">
            <div className="content-title">
              <span>{`> ${content.contentTitle}`}</span>
            </div>
            <div className="data">
              {content.data.map((data, index) => (
                <div key={index} className={`text-align ${data.textWrap}`}>
                  <span className="title">{data.title}</span>
                  <span className="value">{data.value}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </figure>
    </main>
  )
}

export default EntityCard
