
function Shorts(movies, request, checkboxStatus) {
    let shorts = movies;
    let result;

    if (checkboxStatus) {
        shorts = shorts.filter((movie) => movie.duration <= 40);
    }

    result = shorts.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    })
    return result;
}

export default Shorts;

