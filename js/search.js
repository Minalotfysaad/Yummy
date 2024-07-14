$(document).ready(function () {
    //Loader
    hideLoader();
    function showLoader() {
        $("#innerLoader .loader").fadeIn(500, function () {
            $("#innerLoader").fadeIn(0, function () {
                $("body").css("overflow", "hidden");
            });
        });
    }

    function hideLoader() {
        $(document).ready(function () {
            $("#innerLoader .loader").fadeOut(500, function () {
                $("#innerLoader").fadeOut(0, function () {
                    $("body").css("overflow", "auto");
                });
            });
        });
    }

    // Search by name input handler
    let searchedTerm = "";
    $(".search-inputs #searchByNameInput").keyup(function () {
        ``;
        if ($(this).val().length > 0) {
            searchedTerm = $(this).val();
            searchRecipeByName(searchedTerm);
        } else {
            // Clear the search results if the input is empty
            document.getElementById("rowData").innerHTML = "";
        }
    });
    //Fetch by name data
    var recipesArray = [];
    async function searchRecipeByName(recipe) {
        try {
            var response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`
            );
            var data = await response.json();
            recipesArray = data.meals || [];
            displayRecipe();
        } catch (error) {
            // Handle error
        }
    }

    // Search by letter input handler
    $(".search-inputs #searchByLetterInput").keyup(function () {
        if ($(this).val().length > 0) {
            searchedTerm = $(this).val();
            searchRecipeByLetter(searchedTerm);
        } else {
            // Clear the search results if the input is empty
            document.getElementById("rowData").innerHTML = "";
        }
    });

    //Fetch by letter data
    var recipesArray = [];
    async function searchRecipeByLetter(recipe) {
        try {
            var response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?f=${recipe}`
            );
            var data = await response.json();
            recipesArray = data.meals || [];
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
            if (
                recipesArray[i].strMeal
                    .toLowerCase()
                    .includes(searchedTerm.toLowerCase())
            ) {
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
            getIdOnClick();
        }
    }

    function getIdOnClick() {
        $(".recipe").click(function () {
            const id = $(this).attr("id");
            window.navigateToDetails(id);
        });
    }
});
