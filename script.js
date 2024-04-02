$(".search-btn").on("click", function () {
$.ajax({
    url: `http://www.omdbapi.com/?apikey=23a4f454&&s=` + $(".input-key").val(),
    success: (r) => {
        const Movies = r.Search;
        let cards = "";
        Movies.forEach((m) => {
        cards += ShowCards(m);
    });
    $(".movie-container").html(cards);

    // IMDBID FUNCTION
    $(".modal-detail-btn").on("click", function () {
        $.ajax({
            url: "http://www.omdbapi.com/?apikey=23a4f454&&i=" + $(this).data("imdbid"),
            success: (s) => {
            const movieDetail = ShowDetail(s);
            $(".modal-body").html(movieDetail);
        },
        error: (e) => {
            console.log(e.responseText);
            },
        });
        });
    },
    error: (e) => {
    console.log(e.responseText);
    },
    });
});

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
