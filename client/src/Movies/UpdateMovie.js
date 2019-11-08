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

    const handleSubmit = (event, id) => {
        event.preventDefault()

        axios.put(`/update-movies/${id}`, movie)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        
        props.history.push("/")
    }

    return (
        <div>
            <form className="update-container" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="director"
                    placeholder="Director"
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="metascore"
                    placeholder="Metascore"
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}