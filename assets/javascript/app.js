// Initialize Firebase
var config = {
    apiKey: "AIzaSyDSwQe3shybIkeT_l5Gu1QREykPycIhk3o",
    authDomain: "timesheet-b386a.firebaseapp.com",
    databaseURL: "https://timesheet-b386a.firebaseio.com/",
    projectId: "timesheet-b386a",
    storageBucket: "timesheet-b386a.appspot.com",
    messagingSenderId: "1096163461499"
};
firebase.initializeApp(config);

var database = firebase.database();

//inital values
var empName = "";
var role = "";
var startDate = "";
var monthlyRate = "";
var randomFormat = "DD/MM/YY";
// var convertedDate = moment(startDate, randomFormat);

//capture button on click
$("#add-employee-btn").on("click", function () {
    event.preventDefault();

    empName = $("#employee-name-input").val().trim();
    role = $("#role-input").val().trim();
    startDate = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
    monthlyRate = $("#rate-input").val().trim();

    database.ref().set({
        empName: empName,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
    });
    $(".form-control").val("");
})

//firebase watcher + initial loader
// The createRow function takes data returned by OMDB and appends the table data to the tbody
database.ref().on("value", function (data) {
    console.log(data.val());
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("tBody");
    var tRow = $("<tr>");
    var child = data.val();
    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var empNameTd = $("<td>").text(child.empName);
    var roleTd = $("<td>").text(child.role);
    var startDateTd = $("<td>").text(moment.unix(child.startDate).format("MM/DD/YY"));
    var monthlyRateTd = $("<td>").text(child.monthlyRate);
    // var empStartPretty = 
    var empMonthsTd = $("<td>").text(moment().diff(moment.unix(child.startDate, "X"), "months"));
    console.log(empMonthsTd);
    // Append the newly created table data to the table row
    tRow.append(empNameTd, roleTd, startDateTd, empMonthsTd, monthlyRateTd);
    // Append the table row to the table body
    tBody.append(tRow);

})