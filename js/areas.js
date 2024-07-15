$(document).ready(function () {
    //Loaded
    function hideLoader() {
        $("#innerLoader .loader").fadeOut(500, function () {
            $("#innerLoader").fadeOut(0, function () {
                $("#loader").remove();
                $("body").css("overflow", "auto");
            });
        });
    }
    
    // Functions
    var countryCodes = {
        American: "US",
        British: "GB",
        Canadian: "CA",
        Chinese: "CN",
        Croatian: "HR",
        Dutch: "NL",
        Egyptian: "EG",
        Filipino: "PH",
        French: "FR",
        Greek: "GR",
        Indian: "IN",
        Irish: "IE",
        Italian: "IT",
        Jamaican: "JM",
        Japanese: "JP",
        Kenyan: "KE",
        Malaysian: "MY",
        Mexican: "MX",
        Moroccan: "MA",
        Polish: "PL",
        Portuguese: "PT",
        Russian: "RU",
        Spanish: "ES",
        Thai: "TH",
        Tunisian: "TN",
        Turkish: "TR",
        Vietnamese: "VN",
    };

    async function getCountries() {
        try {
            const response = await fetch(
                "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
            );
            const data = await response.json();
            return data.meals.map((meal) => meal.strArea);
        } catch (error) {
            // Handle error
            return [];
        }
    }

    function getFlagUrl(countryName) {
        const countryCode = countryCodes[countryName];
        if (countryCode) {
            return `https://flagsapi.com/${countryCode}/flat/64.png`;
        } else {
            // Handle error
            return null;
        }
    }

    async function displayFlags() {
        try {
            const countries = await getCountries();
            let content = "";
            countries.forEach((country) => {
                const flagUrl = getFlagUrl(country);
                if (flagUrl) {
                    content += `
                    <div class=" col-md-2">
                        <div id="${country}" class="recipe">
                            <div class="recipe-image">
                                <img class="w-100" src="${flagUrl}" alt="">
                                <div class="recipe-text d-flex flex-column justify-content-center align-items-center">
                                    <h3 class="text-center my-3 p-4">${country}</h3>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }
            });
            $("#rowData").html(content);
            getIdOnClick();
            hideLoader();
        } catch (error) {
            console.log(error);
                hideLoader();

        }
    }
        displayFlags();
    function getIdOnClick() {
        $(".recipe").click(function () {
            const id = $(this).attr("id");
            window.navigateToInnerArea(id);
        });
    }
});
