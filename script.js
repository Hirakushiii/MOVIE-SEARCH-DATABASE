// USING AJAX QUERY //

// $(".search-btn").on("click", function () {
// $.ajax({
//     url: `http://www.omdbapi.com/?apikey=23a4f454&&s=` + $(".input-key").val(),
//     success: (r) => {
//         const Movies = r.Search;
//         let cards = "";
//         Movies.forEach((m) => {
//         cards += ShowCards(m);
//     });
//     $(".movie-container").html(cards);

//     // IMDBID FUNCTION
//     $(".modal-detail-btn").on("click", function () {
//         $.ajax({
//             url: "http://www.omdbapi.com/?apikey=23a4f454&&i=" + $(this).data("imdbid"),
//             success: (s) => {
//             const movieDetail = ShowDetail(s);
//             $(".modal-body").html(movieDetail);
//         },
//         error: (e) => {
//             console.log(e.responseText);
//             },
//         });
//         });
//     },
//     error: (e) => {
//     console.log(e.responseText);
//     },
//     });
// });

// USE FETCH JAVASCRIPT VANILLA //

// const SearchBtn = document.querySelector('.search-btn').addEventListener('click', function(){
//     const SearchKey = document.querySelector('.input-key').value;
//     fetch('http://www.omdbapi.com/?apikey=23a4f454&&s=' + SearchKey)
//     .then(response => response.json())
//     .then(response =>{
//         const movies = response.Search;
//         let cards = '';
//         movies.forEach(m => cards += ShowCards(m));
//         const MovieContainer = document.querySelector('.movie-container');
//         MovieContainer.innerHTML = cards;

//     // DETAIL FUNCTION
//     const DetailBtn = document.querySelectorAll('.modal-detail-btn');
//     DetailBtn.forEach(btn => {
//         btn.addEventListener('click', function(){
//             const imdbid = this.dataset.imdbid;
            
//             fetch('http://www.omdbapi.com/?apikey=23a4f454&&i=' + imdbid)
//             .then(s => s.json())
//             .then(s =>{
//                     console.log(s);
//                     const MovieDetail = ShowDetail(s);
//                     const ModalBody = document.querySelector('.modal-body');
//                     ModalBody.innerHTML = MovieDetail;
                
//                 })
//             })
//         })
//     })
// })

// REFACTORING CODE //
const SearchBtn = document.querySelector('.search-btn').addEventListener('click', async function(){
    try{
        const SearchKey = document.querySelector('.input-key').value;
        const Movie = await GetMovies(SearchKey);
        UpdateUI(Movie);
    }catch(error){
        // alert(error);
        alert(error);
    }
})
function GetMovies (key) {
    return fetch('http://www.omdbapi.com/?apikey=23a4f454&&s=' + key)
            .then(response =>{
                if(!response.ok){
                    throw new Error(response.statusText);
                    // response.statusText
                }
                return response.json();
            })
            .then(response => {
                if(response.Response === "False"){
                    throw new Error(`${key} Is Not found`);
                    // response.Error
                }
                return response.Search;
            });
}
function UpdateUI (movies) {
    let cards = '';
    movies.forEach(m => cards += ShowCards(m));
    const MovieContainer = document.querySelector('.movie-container');
    MovieContainer.innerHTML = cards;
}

document.addEventListener('click', async function(e){
    if( e.target.classList.contains('modal-detail-btn')){
        const imdbid = e.target.dataset.imdbid;
        const MovieDetail = await GetMovieDetail(imdbid);
        UpdateDetail(MovieDetail);
    }
})
function UpdateDetail(s) {
    const MovieDetail = ShowDetail(s);
    const ModalBody = document.querySelector('.modal-body');
    ModalBody.innerHTML = MovieDetail;
}
function GetMovieDetail(id) {
    return fetch('http://www.omdbapi.com/?apikey=23a4f454&&i=' + id)
        .then(s => s.json())
        .then(s => s);
}

function ShowCards(m) {
    return `<div class="col-md-3 my-2">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-btn" data-bs-toggle="modal" data-bs-target="#Movie-detail" data-imdbid="${m.imdbID}">More Details</a>
                    </div>
                </div>
            </div>`;
}
function ShowDetail(s) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${s.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${s.Title} ${s.Year}</h4></li>
                            <li class="list-group-item"><strong>Director :</strong>${s.Director}</li>
                            <li class="list-group-item"><strong>Actors :</strong> ${s.Actors}</li>
                            <li class="list-group-item"><strong>Writer: </strong> ${s.Writer}</li>
                            <li class="list-group-item"><strong>Plot: </strong><br> ${s.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
