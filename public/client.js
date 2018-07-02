let user = "";
let userLoggedIn = false;

//functions, variables and object definitions


function displayEntries(entryData) {
    $(".journal-entries").html("<h3>My journal</h3>");
    for (let i = 0; i < entryData.entryOutput.length; i++) {
        let d = new Date(entryData.entryOutput[i].date);
        let displayDate = d.toDateString();
        $(".journal-entries").append(`
<section class="entry" role="region">
<p>Date: ${displayDate}</p>
<p>My intention: ${entryData.entryOutput[i].intention}</p>
<p>My mood was: ${entryData.entryOutput[i].mood}</p>
<p>Type of meditation: ${entryData.entryOutput[i].medType}</p>
<p>Length of meditation: ${entryData.entryOutput[i].medLength}</p>
<p>After meditating, I felt: ${entryData.entryOutput[i].feeling}</p>
<p>Notes: ${entryData.entryOutput[i].notes}</p>
<p>Reflection: ${entryData.entryOutput[i].reflection}</p>
<p>Gratitude: ${entryData.entryOutput[i].gratitude}</p>
<button class="update">Update</button>
<button class="delete">Delete</button>
<input type="hidden" id="entryId" value="${entryData.entryOutput[i]._id}">
</section>
`)
    };
};

function displayEditEntry(entryData) {
    $(".dashboard").hide();
    $(".edit-journal").html(`<h3>edit a journal entry</h3>
        <form method="put" action="#">
        <label for="edit-intention">set an intention for your practice</label><br>
        <input type="text" name="intention" id="edit-intention" value="${entryData.intention}">
        <label for="edit-mood">How are you?</label><br>
        <input type="text" name="mood" id="edit-mood" value="${entryData.mood}">
        <label for="edit-meditation-type">what type of meditation did you practice?</label><br>
        <input id="edit-meditation-type" type="text" value="${entryData.medType}"><br>
        <label for="edit-length">how long did you meditate?</label><br>
        <input type="text" id="edit-length" value="${entryData.medLength}"><br>
        <label for="edit-feeling">how did you feel after?</label><br>
        <input id="edit-feeling" type="text" value="${entryData.feeling}"><br>
        <label for="edit-notes">notes</label><br>
        <input type="text" id="edit-notes" value="${entryData.notes}"><br>
        <label for="edit-reflection">reflections</label><br>
        <input id="edit-reflection" type="text" value="${entryData.reflection}"><br>
        <label for="edit-gratitude">what are you grateful for today?</label><br>
        <input id="edit-gratitude" type="text" value="${entryData.gratitude}"><br>
        <button type="submit" id="entry-update">update</button>
        <input type="hidden" id="entryId" value="${entryData._id}">
        </form>`);
    $(".edit-journal").show();
    $(".journal-entries").hide();
};

function getEntries() {
    let username = $("#loggedInUser").val();
    let result = $.ajax({
            url: "/entries/" + username,
            dataType: "json",
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            if (result.entryOutput.length > 0) {
                displayEntries(result);
            } else {
                alert("No entries found, please create one.");
                displayDashboard();
            };
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


function displayDashboard() {
    //get user information to display their journal
    $(".dashboard").siblings().hide();
    $(".dashboard").show();
    $("#log-in-link").hide();
    $("#view-entries").hide();
    $("#landing").hide();
    $("#log-out-link").show();
    $(".journal-entries").show();
    $("#create-account-nav-link").hide();
    $("#new-entry").show();
};

function displayLanding() {
    $("#log-out-link").hide();
    $("log-in-link").show();
    $("#landing").show();
    $(".create-account").hide();
    $("#about").siblings().not("button").hide();
    $(".dashboard").hide();
    $(".journal").hide();
    $(".journal-entries").hide();
    $(".edit-journal").hide();
};

//functions, variables and object definitions usage and triggers
$(document).ready(function () {
    displayLanding();
});

$(document).on('click', '#create-account-nav-link', function (event) {
    event.preventDefault();
    $("#create-account").siblings().hide();
    $("#create-account").show();
    $("#landing").hide();
});

$(document).on("submit", "#create-account-form", function (event) {
    event.preventDefault();
    const fname = $('#new-first-name').val();
    const uname = $('#new-username').val();
    const pw = $('#new-password').val();
    const confirmPw = $('#confirm-password').val();
    if (pw !== confirmPw) {
        alert('Passwords must match!');
    } else {
        const newUserObject = {
            username: uname,
            firstName: fname,
            password: pw
        };
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                $("#loggedInUser").val(result.username);
                getEntries();
                displayDashboard();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert("User already exists.");
            });
    }
});

$(document).on('click', '#new-entry', function (event) {
    event.preventDefault();
    $(".journal").siblings().hide();
    $(".journal").show();
    $("#view-entries").show();
    $("#new-entry").hide();
});

//this is getting the specific journal entry so that it can be displayed to the user
$(document).on('click', '.update', function (event) {
    event.preventDefault();
    let entry_id = $(this).siblings("input[type='hidden']").val();
    let result = $.ajax({
            url: "/entry/" + entry_id,
            dataType: "json",
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            if (result.length === 0) {
                alert("Couldn't find entry. Please try again.");
            } else {
                displayEditEntry(result);
            };
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});
//this is the form submission to update an entry
$(document).on('submit', '.edit-journal form', function (event) {
    event.preventDefault();
    let entry_id = $(this).find("#entryId").val();
    const date = new Date();
    const intention = $('#edit-intention').val();
    const mood = $('#edit-mood').val();
    const medType = $('#edit-meditation-type').val();
    const medLength = $('#edit-length').val();
    const feeling = $('#edit-feeling').val();
    const notes = $('#edit-notes').val();
    const reflection = $('#edit-reflection').val();
    const gratitude = $('#edit-gratitude').val();
    const user = $("#loggedInUser").val();

    const entryObject = {
        user: user,
        date: date,
        intention: intention,
        mood: mood,
        medType: medType,
        medLength: medLength,
        feeling: feeling,
        notes: notes,
        reflection: reflection,
        gratitude: gratitude
    };
    $.ajax({
            type: 'PUT',
            url: '/entry/' + entry_id,
            dataType: 'json',
            data: JSON.stringify(entryObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            $(".journal-entry")[0].reset();
            getEntries();
            displayDashboard();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on('click', '.delete', function (event) {
    event.preventDefault();
    let entry_id = $(this).siblings("input[type='hidden']").val();
    if (confirm("Are you sure you want to permanently delete this entry?") === true) {
        $.ajax({
                type: 'DELETE',
                url: '/entry/' + entry_id,
                dataType: 'json',
                contentType: 'application/json'
            })
            .done(function (result) {
                $(".journal-entries").html("<h3>My journal</h3>");
                getEntries();
                displayDashboard();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$(document).on('click', '#log-out-link', function (event) {
    event.preventDefault();
    location.reload();
});

$(document).on("submit", "#log-in", function (event) {
    event.preventDefault();
    const inputUname = $('#username').val();
    const inputPw = $('#passwordInput').val();
    // check for spaces, empty, undefined
    if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {
        alert('Invalid username');
    } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
        alert('Invalid password');
    } else {
        const unamePwObject = {
            username: inputUname,
            password: inputPw
        };
        $.ajax({
                type: "POST",
                url: "/users/signin",
                dataType: 'json',
                data: JSON.stringify(unamePwObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                displayDashboard();
                userLoggedIn = true;
                $("#log-in-link").hide();
                $("#loggedInUser").val(result.username);
                getEntries();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Invalid username and password combination. Pleae check your username and password and try again.');
            });
    };
});

$(document).on('click', '#about-button', function (event) {
    event.preventDefault();
    $("#about").siblings().not("button").hide();
    $("#about").show();
});

$(document).on('click', '#about-mindfulness-button', function (event) {
    event.preventDefault();
    $("#mindfulness-description").siblings().not("button").hide();
    $("#mindfulness-description").show();
});

$(document).on('click', '#benefits-button', function (event) {
    event.preventDefault();
    $("#benefits").siblings().not("button").hide();
    $("#benefits").show();
});

$(document).on('click', '#resources-button', function (event) {
    event.preventDefault();
    $("#resources").siblings().not("button").hide();
    $("#resources").show();
});

$(document).on('click', '#info-link', function (event) {
    event.preventDefault();
    $(".info").show();
    $(".info").siblings().hide();
    $("#landing").hide();
});

$(document).on("submit", ".journal-entry", function (event) {
    event.preventDefault();
    const date = new Date();
    const intention = $('#intention').val();
    const mood = $('#mood').val();
    const medType = $('#meditation-type').val();
    const medLength = $('#length').val();
    const feeling = $('#feeling').val();
    const notes = $('#notes').val();
    const reflection = $('#reflection').val();
    const gratitude = $('#gratitude').val();
    const user = $("#loggedInUser").val();
    const newEntryObject = {
        user: user,
        date: date,
        intention: intention,
        mood: mood,
        medType: medType,
        medLength: medLength,
        feeling: feeling,
        notes: notes,
        reflection: reflection,
        gratitude: gratitude
    };
    $.ajax({
            type: 'POST',
            url: '/entry/create',
            dataType: 'json',
            data: JSON.stringify(newEntryObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            $(".journal-entry")[0].reset();
            getEntries();
            displayDashboard();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on("click", "#log-in-link", function (event) {
    event.preventDefault();
    displayLanding();
});

$(document).on("click", "#home", function (event) {
    if (userLoggedIn == true) {
        displayDashboard();
    } else {
        displayLanding();
    };
});
