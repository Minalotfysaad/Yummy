$(document).ready(function () {
    //Loader
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
var innerAreaArray = [];
async function getInnerArea(areaId) {
    try {
        var response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaId}`
        );
        var data = await response.json();
        innerAreaArray = innerAreaArray.concat(data.meals);
        $("h1.page-title").text(areaId);
        displayInnerArea();
    } catch (error) {
        // Handle error
    }
}

function displayInnerArea() {
    var content = ``;
    let displayLength = 0;
    if (innerAreaArray.length < 20) {
        displayLength = innerAreaArray.length;
    } else {
        displayLength = 20;
    }
    for (let i = 0; i < displayLength; i++) {
        content += `
            <div class="col-lg-3 col-md-4">
                <div id="${innerAreaArray[i].idMeal}" class="recipe">
                    <div class="recipe-image">
                        <img class="w-100" src="${innerAreaArray[i].strMealThumb}" alt="">
                        <div class="recipe-text">
                            <h3 class="text-center my-3 p-4">${innerAreaArray[i].strMeal}</h3>
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
});