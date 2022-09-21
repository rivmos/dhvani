import { useRef } from "react";
import SoundCard from "./SoundCard"

const outerDivStyle = {
  height: '98vh',
  width:'100%',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}


function App() {

  const songs = [
    {
      "name": "Water",
      "artist": "Artist Name",
      "album": "Album Name",
      "url": "water.mp3",
      "cover_art_url": "/cover/art/url.jpg"
    },
    {
      "name": "Wind",
      "artist": "Artist Name",
      "album": "Album Name",
      "url": "https://s3.amazonaws.com/test.sounds.com/wind.aac ",
      "cover_art_url": "/cover/art/url.jpg"
    }
  ]

  const outerDiv = useRef(null);

  return (
    <div className="App">
      <div ref={outerDiv} style={outerDivStyle}>
        {
          songs.map(song => {
            return (
              <SoundCard key={song.url} song={song} outerDiv={outerDiv} />
            )
          })
        }
      </div>
    </div>
  )
}

export default App
