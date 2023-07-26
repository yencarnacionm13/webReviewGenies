// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

let models = window["powerbi-client"].models;
let reportContainer = $("#report-container").get(0);
let report;
let activePage;
const rol = 0;
isTab = false;
report = "ReportSection057f8783acab444660a9"
reportName = "Búsqueda de Propiedades"

const format = (num, decimals) => num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});


// Initialize filters
$('.ui.dropdown').dropdown();

// Initialize iframe for embedding report
powerbi.bootstrap(reportContainer, { type: "report" });

// Embed a Power BI report in the given HTML element with the given configurations
// Read more about how to embed a Power BI report in your application here: https://go.microsoft.com/fwlink/?linkid=2153590

$(document).ready(function () {



    const rangeInput = document.querySelectorAll(".range-input input"),
        priceInput = document.querySelectorAll(".price-input input"),
        range = document.querySelector(".slider .progress"),
        range2 = document.getElementById("2"),
        range3 = document.getElementById("3"),
        range4 = document.getElementById("4");

    //USD
    let priceGap = 0;
    priceInput.forEach(input => {
        input.addEventListener("input", e => {
            let minPrice = parseInt(priceInput[0].value),
                maxPrice = parseInt(priceInput[1].value);

            if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "input-min") {
                    rangeInput[0].value = minPrice.toFixed(2);
                    range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
                } else {
                    rangeInput[1].value = maxPrice.toFixed(2);
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                }
            }
        });
    });

    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(rangeInput[0].value),
                maxVal = parseInt(rangeInput[1].value);


            if ((maxVal - minVal) < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[0].value = (maxVal - priceGap).toFixed(2)
                } else {
                    rangeInput[1].value = (minVal + priceGap).toFixed(2);
                }
            } else {
                priceInput[0].value = (minVal).toFixed(2);
                priceInput[1].value = (maxVal).toFixed(2);
                range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
                range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        });
    });


    ///M2 Construccion
    priceInput.forEach(input => {
        input.addEventListener("input", e => {
            let minPrice = parseInt(priceInput[2].value),
                maxPrice = parseInt(priceInput[3].value);
            if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[3].max) {
                if (e.target.className === "input-min") {
                    rangeInput[2].value = minPrice;
                    range2.style.left = ((minPrice / rangeInput[2].max) * 100) + "%";
                } else {
                    rangeInput[3].value = maxPrice;
                    range2.style.right = 100 - (maxPrice / rangeInput[3].max) * 100 + "%";
                }
            }
        });
    });

    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(rangeInput[2].value),
                maxVal = parseInt(rangeInput[3].value);
            if ((maxVal - minVal) < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[2].value = maxVal - priceGap
                } else {
                    rangeInput[3].value = minVal + priceGap;
                }
            } else {
                priceInput[2].value = minVal;
                priceInput[3].value = maxVal;
                range2.style.left = ((minVal / rangeInput[2].max) * 100) + "%";
                range2.style.right = 100 - (maxVal / rangeInput[3].max) * 100 + "%";
            }
        });
    });

    ///M2 Solar
    priceInput.forEach(input => {
        input.addEventListener("input", e => {
            let minPrice = parseInt(priceInput[4].value),
                maxPrice = parseInt(priceInput[5].value);
            if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[5].max) {
                if (e.target.className === "input-min") {
                    rangeInput[4].value = minPrice;
                    range3.style.left = ((minPrice / rangeInput[4].max) * 100) + "%";
                } else {
                    rangeInput[5].value = maxPrice;
                    range3.style.right = 100 - (maxPrice / rangeInput[5].max) * 100 + "%";
                }
            }
        });
    });

    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(rangeInput[4].value),
                maxVal = parseInt(rangeInput[5].value);
            if ((maxVal - minVal) < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[4].value = maxVal - priceGap
                } else {
                    rangeInput[5].value = minVal + priceGap;
                }
            } else {
                priceInput[4].value = minVal;
                priceInput[5].value = maxVal;
                range3.style.left = ((minVal / rangeInput[4].max) * 100) + "%";
                range3.style.right = 100 - (maxVal / rangeInput[5].max) * 100 + "%";
            }
        });
    });


    ///Habitaciones
    priceInput.forEach(input => {
        input.addEventListener("input", e => {
            let minPrice = parseInt(priceInput[6].value),
                maxPrice = parseInt(priceInput[7].value);
            if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[7].max) {
                if (e.target.className === "input-min") {
                    rangeInput[6].value = minPrice;
                    range4.style.left = ((minPrice / rangeInput[6].max) * 100) + "%";
                } else {
                    rangeInput[7].value = maxPrice;
                    range4.style.right = 100 - (maxPrice / rangeInput[7].max) * 100 + "%";
                }
            }
        });
    });

    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(rangeInput[6].value),
                maxVal = parseInt(rangeInput[7].value);
            if ((maxVal - minVal) < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[6].value = maxVal - priceGap
                } else {
                    rangeInput[7].value = minVal + priceGap;
                }
            } else {
                priceInput[6].value = minVal;
                priceInput[7].value = maxVal;
                range4.style.left = ((minVal / rangeInput[6].max) * 100) + "%";
                range4.style.right = 100 - (maxVal / rangeInput[7].max) * 100 + "%";
            } 
        });
    });


})


async function getFilters() {

    var id = getCookie('if');
    var tk = getCookie('tk');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", tk);


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("/api/filters/findFiltersForm3", requestOptions)
        .then(response => response.json())
        .then(response => {

            //Tipo Acuerdo
            var options = response.AgreementTypes;
            for (var i = 0; i < options.length; i++) {
                $('#tipoAcuerdo').append('<option value="' + options[i].Type + '">' + options[i].Type + '</option>');
            }

            //Tipo Acuerdo
            var options = response.ConditionTypes;
            for (var i = 0; i < options.length; i++) {
                $('#condicion').append('<option value="' + options[i].Condicion + '">' + options[i].Condicion + '</option>');
            }

            //Ubicacion
            var options = response.Georesults;
            for (var i = 0; i < options.length; i++) {
                $('#ubicacion').append('<option value="' + options[i].correct_address + '">' + options[i].correct_address + '</option>');
            }

            //Tipo Propiedad
            var options = response.PropertyTypes;
            for (var i = 0; i < options.length; i++) {
                $('#tipopropiedad').append('<option value="' + options[i].Type + '">' + options[i].Type + '</option>');
            }

            //Valor USD
            $('#InputMinUSD').val((response.ValorUSD[0].Min).toFixed(2));
            $('#InputMaxUSD').val((response.ValorUSD[0].Max).toFixed(2));

            $("#MinUSD").attr({
                "max": (response.ValorUSD[0].Max).toFixed(2),
                "min": (response.ValorUSD[0].Min).toFixed(2),
                "value": (response.ValorUSD[0].Min).toFixed(2)
            });

            $("#MaxUSD").attr({
                "max": (response.ValorUSD[0].Max).toFixed(2),
                "min": (response.ValorUSD[0].Min).toFixed(2),
                "value": (response.ValorUSD[0].Max).toFixed(2)
            });


            //m2Construccion
            $('#InputMinm2Construction').val((response.M2Construidos[0].Min).toFixed(2));
            $('#InputMaxm2Construction').val((response.M2Construidos[0].Max).toFixed(2));

            $("#Minm2Construction").attr({
                "max": (response.M2Construidos[0].Max).toFixed(2),
                "min": (response.M2Construidos[0].Min).toFixed(2),
                "value": (response.M2Construidos[0].Min).toFixed(2)
            });

            $("#Maxm2Construction").attr({
                "max": (response.M2Construidos[0].Max).toFixed(2),
                "min": (response.M2Construidos[0].Min).toFixed(2),
                "value": (response.M2Construidos[0].Max).toFixed(2)
            });


            //Solar
            $('#InputMinm2Plot').val((response.M2Solar[0].Min).toFixed(2));
            $('#InputMaxm2Plot').val((response.M2Solar[0].Max).toFixed(2));

            $("#Minm2Plot").attr({
                "max": (response.M2Solar[0].Max).toFixed(2),
                "min": (response.M2Solar[0].Min).toFixed(2),
                "value": (response.M2Solar[0].Min).toFixed(2)
            });

            $("#Maxm2Plot").attr({
                "max": (response.M2Solar[0].Max).toFixed(2),
                "min": (response.M2Solar[0].Min).toFixed(2),
                "value": (response.M2Solar[0].Max).toFixed(2)
            });


            //Habitaciones
            $('#InputMinroom').val(response.Habitaciones[0].Min);
            $('#InputMaxroom').val(response.Habitaciones[0].Max);

            $("#Minroom").attr({
                "max": (response.Habitaciones[0].Max.toFixed(2)),
                "min": (response.Habitaciones[0].Min.toFixed(2)),
                "value": (response.Habitaciones[0].Min.toFixed(2))
            });

            $("#Maxroom").attr({
                "max": (response.Habitaciones[0].Max.toFixed(2)),
                "min": (response.Habitaciones[0].Min.toFixed(2)),
                "value": (response.Habitaciones[0].Max.toFixed(2))
            });

        }).finally(() => {

        })
        .catch(error => console.log('error', error));

}

getFilters();

async function embedPowerBIReport() {

    // AJAX request to get the report details from the API and pass it to the UI
    $.ajax({
        type: "GET",
        url: "/getEmbedToken",
        dataType: "json",
        success: async function (embedData) {


            if (this.rol == 1) { this.isTab = true }
            else { this.isTab = false }

            // Create a config object with type of the object, Embed details and Token Type
            let reportLoadConfig = {
                type: "report",
                tokenType: models.TokenType.Embed,
                accessToken: embedData.accessToken,

                // Use other embed report config based on the requirement. We have used the first one for demo purpose
                embedUrl: embedData.embedUrl[0].embedUrl,

                // Enable this setting to remove gray shoulders from embedded report
                settings: {

                    panes: {
                        filters: {
                            visible: false
                        },
                        pageNavigation: {
                            visible: this.isTab
                        }
                    }
                }
            };

            // Use the token expiry to regenerate Embed token for seamless end user experience
            // Refer https://aka.ms/RefreshEmbedToken
            tokenExpiry = embedData.expiry;

            // Embed Power BI report when Access token and Embed URL are available
            report = powerbi.embed(reportContainer, reportLoadConfig);

            // Clear any other loaded handler events
            report.off("loaded");

            // Triggers when a report schema is successfully loaded
            report.on("loaded", async function () {
                //console.log("Report load successful");
                // setPage will change the selected view to the page you indicate.
                // This is the actual page name not the display name.
                const pageName = "ReportSection057f8783acab444660a9"
                try {
                    await report.setPage(pageName);
                    //console.log(`Page was set to: ${pageName}`);
                }
                catch (errors) {
                    //console.log(errors);
                }
            });

            // Clear any other rendered handler events
            report.off("rendered");

            // T
            report.on("rendered", async function () {
                //console.log("Report render successful");

                const pages = await report.getPages();

                activePage = pages.filter(function (page) {
                    return page.isActive
                })[0];


                await activePage.deleteVisual("7dbf6f304d074d263c90");//Condición
                await activePage.deleteVisual("07e113000b455a06294e");//Tipo de Acuerdo
                await activePage.deleteVisual("d2c147f001508290a172");//Tipo de Propiedad
                await activePage.deleteVisual("af969d3b77d32c5d73ea");//Ubicación

                await activePage.deleteVisual("aeafdd952420c0cc6a68");//M2Solar
                await activePage.deleteVisual("702dd2c6e390b41ac83c");//Habitaciones
                await activePage.deleteVisual("9533edb0cc95022c21ed");//M2Construccion
                await activePage.deleteVisual("f276f5fbc20652015003");//RangoPrecio

            });

            // Clear any other error handler events
            report.off("error");

            // Handle embed errors
            report.on("error", function (event) {
                let errorMsg = event.detail;
                //console.error(errorMsg);
                return;
            });


        },
        error: function (err) {

            // Show error container
            let errorContainer = $(".error-container");
            $(".embed-container").hide();
            errorContainer.show();

            // Get the error message from err object
            let errMsg = JSON.parse(err.responseText)['error'];

            // Split the message with \r\n delimiter to get the errors from the error message
            let errorLines = errMsg.split("\r\n");

            // Create error header
            let errHeader = document.createElement("p");
            let strong = document.createElement("strong");
            let node = document.createTextNode("Error Details:");

            // Get the error container
            let errContainer = errorContainer.get(0);

            // Add the error header in the container
            strong.appendChild(node);
            errHeader.appendChild(strong);
            errContainer.appendChild(errHeader);

            // Create <p> as per the length of the array and append them to the container
            errorLines.forEach(element => {
                let errorContent = document.createElement("p");
                let node = document.createTextNode(element);
                errorContent.appendChild(node);
                errContainer.appendChild(errorContent);
            });
        }
    });
}

embedPowerBIReport();

async function filtrar() {

    const AgreementTypesFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "AgreementTypes",
            column: "Type"
        },
        operator: "In",
        values: $("#tipoAcuerdo").val()
    };

    const GeoResultsFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "geo_results",
            column: "correct_address"
        },
        operator: "In",
        values: $("#ubicacion").val()
    };

    const PropertyTypesFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "PropertyTypes",
            column: "Type"
        },
        operator: "In",
        values: $("#tipopropiedad").val()
    };

    const ConditionTypesFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "ConditionTypes",
            column: "Condicion"
        },
        operator: "In",
        values: $("#condicion").val()
    };

    const ValorUSDFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "Properties Latest",
            column: "ValorUSD"
        },
        logicalOperator: "And",
        conditions: [
            {
                operator: "GreaterThanOrEqual",
                value: $('#InputMinUSD').val()
            },
            {
                operator: "LessThanOrEqual",
                value: $('#InputMaxUSD').val()
            }]
    };

    const m2ContructionFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "Properties Latest",
            column: "M2Construidos"
        },
        logicalOperator: "And",
        conditions: [
            {
                operator: "GreaterThanOrEqual",
                value: $('#InputMinm2Construction').val()
            },
            {
                operator: "LessThanOrEqual",
                value: $('#InputMaxm2Construction').val()
            }]
    };

    const m2PlotFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "Properties Latest",
            column: "M2Solar"
        },
        logicalOperator: "And",
        conditions: [
            {
                operator: "GreaterThanOrEqual",
                value: $('#InputMinm2Plot').val()
            },
            {
                operator: "LessThanOrEqual",
                value: $('#InputMaxm2Plot').val()
            }]
    };

    const roomFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "Properties Latest",
            column: "Habitaciones"
        },
        logicalOperator: "And",
        conditions: [
            {
                operator: "GreaterThanOrEqual",
                value: $('#InputMinroom').val()
            },
            {
                operator: "LessThanOrEqual",
                value: $('#InputMaxroom').val()
            }]
    };

    // Retrieve the page collection and then add the filter to the active page's filters.
    try {

        await Save().then(async () => {
            const pages = await report.getPages();

            // Retrieve the active page.
            let page = pages.filter(function (page) {
                return page.isActive
            })[0];


            await page.updateFilters(models.FiltersOperations.RemoveAll);

            if ($("#tipoAcuerdo").val() != "") {
                await page.updateFilters(models.FiltersOperations.Add, [AgreementTypesFilter]);
            }

            if ($("#ubicacion").val() != "") {
                await page.updateFilters(models.FiltersOperations.Add, [GeoResultsFilter]);
            }

            if ($("#tipopropiedad").val() != "") {
                await page.updateFilters(models.FiltersOperations.Add, [PropertyTypesFilter]);
            }

            if ($("#condicion").val() != "") {
                await page.updateFilters(models.FiltersOperations.Add, [ConditionTypesFilter]);
            }

            await page.updateFilters(models.FiltersOperations.Add, [ValorUSDFilter]);

            await page.updateFilters(models.FiltersOperations.Add, [m2ContructionFilter]);

            await page.updateFilters(models.FiltersOperations.Add, [m2PlotFilter]);

            await page.updateFilters(models.FiltersOperations.Add, [roomFilter]);



        }).catch(error => console.log('error', error))
    }
    catch (errors) {
        console.log(errors);
    }

    /* 
            // Create a config object with type of the object, Embed details and Token Type
            let reportLoadConfig = {
                type: "report",
                tokenType: models.TokenType.Embed,
                accessToken: embedData.accessToken,

                // Use other embed report config based on the requirement. We have used the first one for demo purpose
                embedUrl: embedData.embedUrl[0].embedUrl,

                // Enable this setting to remove gray shoulders from embedded report
                settings: {
                    background: models.BackgroundType.Transparent,
                    panes: {
                        filters: {
                            visible: false
                        },
                        pageNavigation: {
                            visible: this.isTab
                        }
                    }
                }
            };

            // Embed Power BI report when Access token and Embed URL are available
            report = powerbi.embed(reportContainer, reportLoadConfig);

            const AgreementTypesFilter = {
                $schema: "http://powerbi.com/product/schema#basic",
                target: {
                    table: "AgreementTypes",
                    column: "Type"
                },
                operator: "In",
                values: [$( "#tipoAcuerdo" ).val()]
            };

            // Retrieve the page collection and then add the filter to the active page's filters.
            try {
                const pages = await report.getPages();
                // Retrieve the active page.
                let page = pages.filter(function (page) {
                    return page.isActive
                })[0];

                await page.updateFilters(models.FiltersOperations.Add, [AgreementTypesFilter]);
                console.log("Page filter was added.");
            }
            catch (errors) {
                console.log(errors);
            } */

}

async function limpiar() {

    $('.ui.dropdown').dropdown('clear');

    const rangeInput = document.querySelectorAll(".range-input input"),
    range = document.querySelector(".slider .progress"),
    range2 = document.getElementById("2"),
    range3 = document.getElementById("3"),
    range4 = document.getElementById("4");

    $('#InputMinUSD').val(parseInt(rangeInput[0].min))
    $('#InputMaxUSD').val(parseInt(rangeInput[1].max))
    rangeInput[0].value = rangeInput[0].min;
    rangeInput[1].value = rangeInput[1].max;
    range.style.left = ((rangeInput[0].min / rangeInput[1].max) * 100) + "%";
    range.style.right = 100 - (rangeInput[1].max / rangeInput[1].max) * 100 + "%";



    $('#InputMinm2Construction').val(parseInt(rangeInput[2].min))
    $('#InputMaxm2Construction').val(parseInt(rangeInput[3].max))
    rangeInput[2].value = rangeInput[2].min;
    rangeInput[3].value = rangeInput[3].max;
    range2.style.left = ((rangeInput[2].min / rangeInput[3].max) * 100) + "%";
    range2.style.right = 100 - (rangeInput[3].max / rangeInput[3].max) * 100 + "%";



    $('#InputMinm2Plot').val(parseInt(rangeInput[4].min))
    $('#InputMaxm2Plot').val(parseInt(rangeInput[5].max))
    rangeInput[4].value = rangeInput[4].min;
    rangeInput[5].value = rangeInput[5].max;
    range3.style.left = ((rangeInput[4].min / rangeInput[5].max) * 100) + "%";
    range3.style.right = 100 - (rangeInput[5].max / rangeInput[5].max) * 100 + "%";

    $('#InputMinroom').val(parseInt(rangeInput[6].min))
    $('#InputMaxroom').val(parseInt(rangeInput[7].max))
    rangeInput[6].value = rangeInput[6].min;
    rangeInput[7].value = rangeInput[7].max;
    range4.style.left = ((rangeInput[6].min / rangeInput[7].max) * 100) + "%";
    range4.style.right = 100 - (rangeInput[7].max / rangeInput[7].max) * 100 + "%";
 
    filtrar(); 
}

async function Save() {

    var id = getCookie('if');
    var tk = getCookie('tk');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", tk);

    var raw = JSON.stringify({
        "iduser": id,
        "idform": 3,
        "agreementTypes": $("#tipoAcuerdo").val().toString(),
        "address": $('#ubicacion').val().toString(),
        "conditionRypes": $('#condicion').val().toString(),
        "propertyTypes": $('#tipopropiedad').val().toString(),
        "valueUSD": $('#InputMinUSD').val() + " - " + $('#InputMaxUSD').val(),
        "room": $('#InputMinroom').val() + " - " + $('#InputMaxroom').val(),
        "m2Plot": $('#InputMinm2Plot').val() + " - " + $('#InputMaxm2Plot').val(),
        "m2Construction": $('#InputMinm2Construction').val() + " - " + $('#InputMaxm2Construction').val()
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/api/filters/", requestOptions)
        .then(response => {
            if (response.status == 401 || response.status == 403) {
                alert("Hubo un error al momento de consultar.")
                exit();
            }
        })
        .catch(error => console.log('error', error));

}

// Set a Cookie
function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    //date.setTime(date.getTime() + (expDays * 6000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function getCookie(cookieName) {

    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + "= ;Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}

function exit() {

    var id = getCookie('if');
    var tk = getCookie('tk');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", tk);

    var raw = JSON.stringify({
        "id": id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/api/auth/signout/", requestOptions)
        .then(response => response.json())
        .then(() => {
            deleteCookie('if');
            deleteCookie('tk');
            window.location.href = '/'
        })
        .catch(error => console.log('error', error));




}



// Retrieve the page collection and get the visuals for the active page.
/* try {
    const pages = await report.getPages();

    // Retrieve the active page.
    let page = pages.filter(function (page) {
        return page.isActive
    })[0];

    const visuals = await page.getVisuals();

    // Retrieve the target visual.
    let visual = visuals.filter(function (visual) {
        return visual.name === "VisualContainer4";
    })[0];

    const filters = await visual.getFilters();
    console.log(filters);
}
catch (errors) {
    console.log(errors);
} */



///Listado de elementos
/* let pages = await report.getPages();

// Retrieve the active page.
let activePage = pages.filter(function (page) {
    return page.isActive
})[0];

let visuals = await activePage.getVisuals();
console.log(

    visuals.map(function (visual) {
        return {
            name: visual.name,
            type: visual.type,
            title: visual.title,
            layout: visual.layout
        };
    })); */


///Remove los filtros
/* activePage.deleteVisual("1eb1e89e778b97669b88");
activePage.deleteVisual("368782448713a863d238");
activePage.deleteVisual("368782448713a863d238");
activePage.deleteVisual("4d55baaa5eddde4cdf90"); */



//Add value al filter
// Create the filter object. For more information see https://go.microsoft.com/fwlink/?linkid=2153364
/* const filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
        table: "Geo",
        column: "Region"
    },
    operator: "In",
    values: ["Central"]
}; */