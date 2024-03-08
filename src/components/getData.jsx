
export const GetData = () => {
    const movieTitle = 'Jumanji (1995)';
    fetch(`http://127.0.0.1:8000/recommendations/${encodeURIComponent(movieTitle)}`)
        .then((response) => response.json())
        .then((data) => {
            // Update your component's state or handle the recommendations data as needed
            console.log(data);
        });
    return(
        <h1>!!!Verifica consola coios!!!</h1>
    )
}