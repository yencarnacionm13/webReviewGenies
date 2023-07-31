// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------
let activePage;
reportName = "Mercado Inmobiliario"



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

    await fetch("/api/params/"+id, requestOptions)
        .then(response => response.json())
        .then(response => {
            
            $('#iframe').attr('src', response.resultado.params)

        })
        .catch(error => console.log('error', error)); 
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

            if ($("#condicion").val() != "") {
                await page.updateFilters(models.FiltersOperations.Add, [ConditionTypesFilter]);
            }

        }).catch(error => console.log('error', error))

    }
    catch (errors) {
        console.log(errors);
    }

}

async function Save() {

    var id = getCookie('if');
    var tk = getCookie('tk');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", tk);

    var raw = JSON.stringify({
        "iduser": id,
        "idform": reportName,
        "agreementTypes": $("#tipoAcuerdo").val().toString(),
        "address": $('#ubicacion').val().toString(),
        "conditionRypes": $('#condicion').val().toString(),
        "propertyTypes": "",
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

async function limpiar() {
    $('.ui.dropdown').dropdown('clear');
    filtrar();
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