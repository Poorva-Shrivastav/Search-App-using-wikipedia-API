import React, { useState } from 'react'
import './Home.css'

function Home() {
    const [wikiTexts, setWikiTexts] = useState([])
    const [wikiLinks, setWikiLinks] = useState([])

    function wikiSearch(e) {
        let str = e.target.value;
        if(str) {
        let url = 'https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=' + str ;
    
        fetch(url)
        .then(data => {
          return data.json();
        }).then(json => {
          //console.log(json);
          setWikiLinks(wikiLinks => json[3]);
          setWikiTexts(wikiTexts => json[1]);
        })
        }
        else {
          setWikiLinks(wikiLinks => []);
          setWikiTexts(wikiTexts => []);
        }
      }

    //debouncing

    var timer;

    const inputChangeHandler = (e) => {
        clearTimeout(timer)
        timer = setTimeout(() =>{
            wikiSearch(e);
            timer = undefined;
        },500)
        
    }

    return (
        <div> 
            <div className="input">
                <h1>Knowledge Engine</h1>
                <h3>The Search App</h3>
                <input type="text" onChange={inputChangeHandler}/>
                
            </div>
            <ul>
                {
                   wikiTexts && wikiTexts.map((item, id) =>
                   <li key={id}>
                    <a href={wikiLinks[id]} target="_blank">{item}</a>
                    </li>
                   )
                }

            </ul>
        </div>
    )
}

export default Home
