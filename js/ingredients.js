$(document).ready(function () {
    //Loader
    $("#innerLoader .loader").fadeOut(500, function () {
        $("#innerLoader").fadeOut(500, function () {
            $("#innerLoader").remove();
            $("body").css("overflow", "auto");
        });
    });
});

// Functions
var ingredientsArray = [];
async function getIngredients() {
    try {
        var response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
        );
        var data = await response.json();
        ingredientsArray = ingredientsArray.concat(data.meals);
        displayIngredients();
    } catch (error) {
        // Handle error
    }
}
getIngredients();
function displayIngredients() {
    var content = ``;
    for (let i = 0; i < 20; i++) {
        const truncatedDescription = truncateString(
            ingredientsArray[i].strDescription,
            100
        );
        content += `
            <div class="col-lg-3 col-md-4">
                <div id="${ingredientsArray[i].strIngredient}" class="recipe">
                    <div class="recipe-image">
                        <img class="w-100" src="imgs/ingredients3.jpg" alt="">
                        <div class="recipe-text d-flex flex-column justify-content-center align-items-center">
                            <h3 class="text-center my-3 p-4">${ingredientsArray[i].strIngredient}</h3>
                            <p class="px-3 text-center">${truncatedDescription}</p>
                            
                        </div>
                    </div>
                </div>
            </div>`;
    }

    document.getElementById("rowData").innerHTML = content;
    getIdOnClick();
}
function truncateString(str, num) {
    // Find the last space within the limit
    const truncated = str.slice(0, num);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    if (lastSpaceIndex > 0) {
        return truncated.slice(0, lastSpaceIndex) + "...";
    }
    return truncated + "...";
}

function getIdOnClick() {
    $(".recipe").click(function () {
        const id = $(this).attr("id");
        $(".title").text(id);
        window.navigateToInnerIngredient(id);
    });
}
