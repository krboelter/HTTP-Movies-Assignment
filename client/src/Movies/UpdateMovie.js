import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateMovie(props) {
    const [movie, setMovie] = useState({
        id: "",
        title: "",
        director: "",
        metascore: 0,
        stars: []
    })

    const handleChange = (event) => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeStars = (event) => {
        setMovie({
            ...movie,
            stars: [event.target.value]
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [props.match.params.id])

    const handleSubmit = (event, id) => {
        event.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.history.push("/")
            })
            .catch(err => {
                console.log(err)
            })
        
    }

    return (
        <div>
            <form className="update-container" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="director"
                    value={movie.director}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="stars"
                    value={movie.stars}
                    onChange={handleChangeStars}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}