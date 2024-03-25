import { useState, useEffect } from "react";
import { list } from "../service/api";

export default function ListMovies({ onSubmit }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        list()
            .then((response) => {
                setMovies(response);
                console.log("Filmes:", response);
            })
            .catch((error) => {
                console.error("Erro ao buscar os filmes:", error);
                throw error;
            });
    }, [onSubmit]);

    const dataFormat = (data) => {
        const date = new Date(data);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <h1>Lista de Filmes</h1>
            {movies &&
                movies.map((movie) => (
                    <div key={movie.id}>
                        <p>
                            {movie.name}
                            {" - "}
                            {dataFormat(movie.release)}
                        </p>
                    </div>
                ))}
        </div>
    );
}
