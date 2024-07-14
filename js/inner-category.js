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
var InnerCategoryArray = [];
async function getInnerCategory(catId) {
    try {
        var response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`
        );
        var data = await response.json();
        InnerCategoryArray = InnerCategoryArray.concat(data.meals);
        $("h1.page-title").text(catId);
        displayInnerCategory();
    } catch (error) {
        // Handle error
    }
}

function displayInnerCategory() {
    var content = ``;
    let displayLength = 0;
    if (InnerCategoryArray.length < 20) {
        displayLength = InnerCategoryArray.length;
    } else {
        displayLength = 20;
    }
    for (let i = 0; i < displayLength; i++) {
        content += `
            <div class="col-lg-3 col-md-4">
                <div id="${InnerCategoryArray[i].idMeal}" class="recipe">
                    <div class="recipe-image">
                        <img class="w-100" src="${InnerCategoryArray[i].strMealThumb}" alt="">
                        <div class="recipe-text">
                            <h3 class="text-center my-3 p-4">${InnerCategoryArray[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById("rowData").innerHTML = content;
    getIdOnClick();
}

function getIdOnClick() {
    $(".recipe").click(function () {
        const id = $(this).attr("id");
        window.navigateToDetails(id);
    });
}
