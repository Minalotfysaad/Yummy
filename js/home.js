
    function hideLoader() {
        $(document).ready(function () {
            $("#innerLoader .loader").fadeOut(500, function () {
                $("#innerLoader").fadeOut(0, function () {
                    $("#loader").remove();
                    $("body").css("overflow", "auto");
                });
            });
        });
    }

//Loader

// Functions
var recipesArray = [];
async function getHomeRecipe(recipe) {
    try {
        var response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`
        );
        var data = await response.json();
        recipesArray = recipesArray.concat(data.meals);
        displayRecipe();
    } catch (error) {
        // Handle error
    }
}

function displayRecipe() {
    var content = ``;
    let displayLength = 0;
    if (recipesArray.length < 20) {
        displayLength = recipesArray.length;
    } else {
        displayLength = 20;
    }
    for (let i = 0; i < displayLength; i++) {
        content += `
            <div class="col-lg-3 col-md-4">
                <div id="${recipesArray[i].idMeal}" class="recipe">
                    <div class="recipe-image">
                        <img class="w-100" src="${recipesArray[i].strMealThumb}" alt="">
                        <div class="recipe-text">
                            <h3 class="text-center my-3 p-4">${recipesArray[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById("rowData").innerHTML = content;
    hideLoader();
    getIdOnClick();
}

function getIdOnClick() {
    $(".recipe").click(function () {
        const id = $(this).attr("id");
        window.navigateToDetails(id);
    });
}

