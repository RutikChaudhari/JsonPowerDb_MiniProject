// register 
function validateRegister() {

    var name = document.getElementById("nameid").value;
    var mobile = document.getElementById("mobileid").value;
    var city = document.getElementById("cityid").value;

    if (name === "") {
        alert("Please enter your name!!!!");
        $("#nameid").focus();
        return "";
    }
    if (mobile === "") {
        alert("Please enter your mobile number!!!!");
        $("#mobileid").focus();
        return "";
    }
    if (city === "") {
        alert("Please enter your city name!!!!");
        $("#cityid").focus();
        return "";
    }

    var jsonStrObj = {
        name: name,
        mobile: mobile,
        city: city,
    };
    return JSON.stringify(jsonStrObj);
}

function insertData() {

    var jsonStr = validateRegister();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90935617|-31948840562026775|90933354",
        jsonStr, "Information", "info");
    jQuery.ajaxSetup({
        async: false
    });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({
        async: true
    });
    alert("Data inserted successfully !!!! " + JSON.stringify(resultObj));

    $("#nameid").val("");
    $("#mobileid").val("");
    $("#cityid").val("");
    $("#nameid").focus();
}

// delete Record

function deleteRecord() {
    var record = parseInt(document.getElementById("recordid").value);
    if (record === "") {
        alert("Please enter record id !!!!");
        $("#recordid").focus();
        return "";
    } else {

        var reqString = createREMOVERecordRequest("90935617|-31948840562026775|90933354",
            "Information", "info", record);
        jQuery.ajaxSetup({
            async: false
        });
        var resultObj = executeCommandAtGivenBaseUrl(reqString,
            "http://api.login2explore.com:5577", "/api/iml");
        jQuery.ajaxSetup({
            async: true
        });
        alert("Record deleted successfully !!!! " + JSON.stringify(resultObj));
    }
}

// View Record

function viewRecord() {
    var mobileno = document.getElementById("mobileviewid").value;
    if (mobileno === "") {
        alert("Please enter mobile number !!!!");
        $("#mobileid").focus();
        return "";
    } else {
        var jsonStr = {
            mobile: mobileno
        };
        var reqString = createGETRequest("90935617|-31948840562026775|90933354",
            "Information", "info", JSON.stringify(jsonStr));
        jQuery.ajaxSetup({
            async: false
        });
        var resultObj = executeCommandAtGivenBaseUrl(reqString,
            "http://api.login2explore.com:5577", "/api/irl");
        jQuery.ajaxSetup({
            async: true
        });

        var data = JSON.stringify(resultObj);
            var res = data.split("\"");
        if (res[7] === "DATA NOT FOUND") {
            alert("No such record found!!!! Enter record again!!!!");
            $("#mobileviewid").val("");
            $("#mobileviewid").focus();
        } else {

            var tableContain = document.getElementById("showData");
            alert("Data fetched successfully !!!!");
            tableContain.innerHTML = " Name : " + res[10].replace("\\", "") + ", Mobile Number : " + res[14].replace("\\", "") + ", City : " + res[6].replace("\\", "");
        }

    }
}

// update Record

function updateRecord() {
    var recordid = document.getElementById("recordupdateid").value;
    var mobileno = document.getElementById("mobileupdateid").value;
    if (recordid === "") {
        alert("Please enter record id !!!!");
        $("#recordupdateid").focus();
        return "";
    }
    if (mobileno === "") {
        alert("Please enter mobile number !!!!");
        $("#mobileid").focus();
        return "";
    } else {
        var jsonStr = {
            mobile: mobileno
        };
        var reqString = createUPDATERecordRequest("90935617|-31948840562026775|90933354", JSON.stringify(jsonStr),
            "Information", "info", recordid);
        jQuery.ajaxSetup({
            async: false
        });
        var resultObj = executeCommandAtGivenBaseUrl(reqString,
            "http://api.login2explore.com:5577", "/api/iml");
        jQuery.ajaxSetup({
            async: true
        });
        alert("Record updated Successfully!!!! Check record details in view record tab.");

    }
}
