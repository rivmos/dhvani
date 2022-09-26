import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring'
import { motion } from 'framer-motion';
import './style.css'
import Audio from 'ts-audio';

const clickedButtonUI = {
    boxShadow: "-6px -6px 14px rgba(255, 255, 255, .7), -6px -6px 10px rgba(255, 255, 255, .5), 6px 6px 8px rgba(255, 255, 255, .075), 6px 6px 10px rgba(0, 0, 0, .15)",
}

const notClickedButtonUI = {
    // boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, .7), inset -2px -2px 4px rgba(255, 255, 255, .5), inset 2px 2px 2px rgba(255, 255, 255, .075), inset 2px 2px 4px rgba(0, 0, 0, .15)"
    boxShadow: "-2px -2px 6px rgba(255, 255, 255, .6), -2px -2px 4px rgba(255, 255, 255, .4), 2px 2px 2px rgba(255, 255, 255, .05), 2px 2px 4px rgba(0, 0, 0, .1)",
}

const SoundCard = ({ song, outerDiv }) => {
    const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

    const [isPlaying, setIsPlaying] = useState(false);
    const [clicked, setClicked] = useState(false)
    const audio = useRef()

    useEffect(() => {
        const audioRef = audio.current
        audioRef.addEventListener(
            "loadeddata",
            () => {
                audio.volume = 0;
            },
            false
        );

    }, [])

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audio.current.play();
        } else {
            audio.current.pause();
        }
    }

    // const ctx = new AudioContext();

    // let audio;

    // const play = async () => {
    //     await fetch(song.url, { mode: 'no-cors' })
    //         .then(data => {
    //             return data.arrayBuffer();
    //         })
    //         .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    //         .then(decodedAudio => {
    //             audio = decodedAudio;
    //         })

    //     const playSound = ctx.createBufferSource();
    //     playSound.buffer = audio;
    //     playSound.connect(ctx.destination);
    //     playSound.start(ctx.currentTime);
    // }

    // const audioCtx = new AudioContext();
    // let buffer = null;


    // const load = async () => {
    //     const request = new XMLHttpRequest();
    //     request.open("GET", song.url);
    //     request.responseType = "arraybuffer";
    //     request.onload = function () {
    //         let undecodedAudio = request.response;
    //         audioCtx.decodeAudioData(undecodedAudio, (data) => buffer = data);
    //         const source = audioCtx.createBufferSource();
    //         source.buffer = buffer;
    //         source.connect(audioCtx.destination);
    //         source.start(0);
    //     };
    //     request.send();
    // }


    // const play = () => {
    //     const source = audioCtx.createBufferSource();
    //     source.buffer = buffer;
    //     source.connect(audioCtx.destination);
    //     source.start();
    // };

    // const func = () => {
    //     load();
    //     play();
    // }


    // const audio = Audio({
    //     file: song.url,
    //     loop: true,
    //     volume: 0,
    // });



    // const PlayToggle = async () => {

    //     if (audio.state === 'running') {
    //         let volumeDec = setInterval(() => { audio.volume -= 0.1; console.log(audio.volume.toFixed(1)) }, 100)
    //         setTimeout(() => { audio.pause(); clearInterval(volumeDec) }, 1000)
    //     }
    //     else {
    //         audio.volume = 0
    //         audio.play()
    //         let volumeInc = setInterval(() => { audio.volume += 0.1; console.log(audio.volume.toFixed(1)) }, 100)
    //         setTimeout(() => { clearInterval(volumeInc) }, 1000)
    //     }
    // }


    return (
        <motion.div className='audio-player' drag dragConstraints={outerDiv}>
            <audio id='audio' ref={audio} preload="metadata">
                <source src={song.url}></source>
            </audio>
            <animated.div style={props}>
            <button onClick={() => { togglePlayPause(); setClicked(!clicked); }} className="toggle-play play" style={clicked ? clickedButtonUI : notClickedButtonUI}>{song.name}</button>
            </animated.div>        
        </motion.div>
    );
}

export default SoundCard;