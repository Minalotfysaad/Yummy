//Loader hide function
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

// Functions
var innerIngredientArray = [];
async function getInnerIngredient(ingId) {
    try {
        var response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingId}`
        );
        var data = await response.json();
        innerIngredientArray = innerIngredientArray.concat(data.meals);
        $("h1.page-title").text(ingId);
        displayInnerIngredient();
    } catch (error) {
        // Handle error
    }
}

function displayInnerIngredient() {
    var content = ``;
    let displayLength = 0;
    if (innerIngredientArray.length < 20) {
        displayLength = innerIngredientArray.length;
    } else {
        displayLength = 20;
    }
    for (let i = 0; i < displayLength; i++) {
        content += `
            <div class="col-lg-3 col-md-4">
                <div id="${innerIngredientArray[i].idMeal}" class="recipe">
                    <div class="recipe-image">
                        <img class="w-100" src="${innerIngredientArray[i].strMealThumb}" alt="">
                        <div class="recipe-text">
                            <h3 class="text-center my-3 p-4">${innerIngredientArray[i].strMeal}</h3>
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

