import { useState, useEffect } from 'react'

import lethalCompanyEntities from '../../lib/lethalCompanyEntities.json'

import '../../styles/pages/App.css'

/* - - - - - */

import ImageNavigationBarLCGIcon from '../../assets/web/favicon/icon.png'
import ImageNavigationBarSearch from '../../assets/content/navigation-bar/nb-search.svg'
import ImageNavigationBarFilter from '../../assets/content/navigation-bar/nb-filter.svg'
import ImageFooterJSALogo from '../../assets/content/footer/jsa-logo.png'

import EntityCard from '../components/EntityCard'

/* - - - - - */

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredEntities = lethalCompanyEntities.filter(entity => entity.name.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name))

  useEffect(() => {
    const images = document.querySelectorAll('img')
    let loadedImages = 0

    const imageLoaded = () => {
      loadedImages++
      if (loadedImages === images.length) {
        setTimeout(() => {
          setIsLoading(false)
          console.log('All images loaded')
          document.body.classList.remove('loading')
          document.body.classList.add('loaded')
        }, 500)
      }
    }

    images.forEach(img => {
      if (img.complete) {
        imageLoaded()
      } else {
        img.addEventListener('load', imageLoaded)
      }
    })

    return () => {
      images.forEach(img => img.removeEventListener('load', imageLoaded))
    }
  }, [filteredEntities])

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="spinner"></div>
            <span>Loading data</span>
          </div>
        </div>
      )}
      <main className={`p-app-m ${!isLoading ? 'show' : ''}`}>
        <section className="navigation-bar">
          <div className="left">
            <img src={ImageNavigationBarLCGIcon} alt="LCG Icon"/>
            <span>Lethal Company Guide</span>
          </div>
          <div className="right">
            <div className="input">
              <img src={ImageNavigationBarSearch} alt="Search" />
              <input type="text" placeholder='Search entities...' value={searchTerm} onChange={handleSearchChange} />
            </div>
          </div>
        </section>
        <section className="entity-cards">
          {filteredEntities.length > 0 ? (
            <div className="entity-card-container" id="entity-card-container">
              {filteredEntities.map((entity, index) => (
                <EntityCard
                  key={index}
                  name={entity.name}
                  imageID={entity.imageID}
                  contents={entity.content}
                />
              ))}
            </div>
          ) : (
            <span className="no-entities">No entities found</span>
          )}
        </section>
        <section className="footer">
          <div>
            <span className="desc">Complete and updated guide for Lethal Company (V69)</span>
            <span className="mes">If you want to contribute with data or report an error, write to my <a href='#' className="feature">PERSONAL DISCORD DM</a></span>
          </div>
          <div>
            <span className="author">Developed by JSArango</span>
            <img src={ImageFooterJSALogo} alt="JSA" />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
