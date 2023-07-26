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
reportName = "Series de Tiempo"

// Initialize filters
$('.ui.dropdown').dropdown();

// Initialize iframe for embedding report
powerbi.bootstrap(reportContainer, { type: "report" });

// Embed a Power BI report in the given HTML element with the given configurations
// Read more about how to embed a Power BI report in your application here: https://go.microsoft.com/fwlink/?linkid=2153590

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
                console.log("Report load successful");

                // setPage will change the selected view to the page you indicate.
                // This is the actual page name not the display name.
                const pageName = "ReportSectionfa31ab13aea968e7d14d"
                try {
                    await report.setPage(pageName);
                }
                catch (errors) {
                    console.log(errors);
                }

            });

            // Clear any other rendered handler events
            report.off("rendered");

            // T
            report.on("rendered", async function () {
                console.log("Report render successful");

                const pages = await report.getPages();

                activePage = pages.filter(function (page) {
                    return page.isActive
                })[0];

                await activePage.deleteVisual("fb38c9ed251018b72c47");//Condición
                await activePage.deleteVisual("e87241da353d1791ee84");//Tipo de Acuerdo
                await activePage.deleteVisual("5a3de05bd6303195069e");//Tipo de Propiedad
                await activePage.deleteVisual("e5902dedca9bc30dd6ae");//Ubicación


            });

            // Clear any other error handler events
            report.off("error");

            // Handle embed errors
            report.on("error", function (event) {
                let errorMsg = event.detail;
                console.error(errorMsg);
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

    fetch("/api/filters/findFiltersForm2", requestOptions)
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

        })
        .catch(error => console.log('error', error));

    /* $.getJSON(urlKompletApi + '/api/GAF_Tipo/GetTipoDropDown', function (data) {
        
        for (var i = 0; i < options.length; i++) {
            $('#IdTipoGaf').append('<option value=' + options[i].IdTipoGaf + '>' + options[i].NombreTipoGaf + '</option>');
          
        }
        $("#IdTipoGaf").val(options[0].IdTipoGaf);
    }); */
}

getFilters();

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

        }).catch(error => console.log('error', error))

    }
    catch (errors) {
        console.log(errors);
    }

}

async function limpiar() {
    
    $('.ui.dropdown').dropdown('clear');
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
        "idform": 2,
        "agreementTypes": $("#tipoAcuerdo").val().toString(),
        "address": $('#ubicacion').val().toString(),
        "conditionRypes": $('#condicion').val().toString(),
        "propertyTypes": $('#tipopropiedad').val().toString(),
        "valueUSD": "",
        "m2Construction": "",
        "m2Plot": "",
        "room": ""
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