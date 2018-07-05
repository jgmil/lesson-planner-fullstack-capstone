let user = "";
let userLoggedIn = false;

const MOCK_USER_DATA = {
    "users": [
        {
            "id": 029385098,
            "displayName": "Professor Dumbledore",
            "username": "demo",
            "password": "password"
        },
        {
            "id": 2039478,
            "displayName": "Hagrid",
            "username": "demo2",
            "password": "password"
        },
        {
            "id": 20389745,
            "displayName": "Professor McGonagall",
            "username": "demo3",
            "password": "password"
        }
    ]
};

const MOCK_CLASSES = {
    "classes": [
        {
            "id": 22222,
            "user_id": 029385098,
            "className": "Transfiguration",
            "term": "Fall 2012"
        },
        {
            "id": 234234,
            "user_id": 20389745,
            "className": "Transfiguration 2",
            "term": "Fall 2012"
        },
        {
            "id": 234234,
            "user_id": 2039478,
            "className": "Care of Magical Creatures",
            "term": "Fall 2012"
        },
    ]

};

const MOCK_UNITS = {
    "units": [
        {
            "id": 587690,
            "class_id": 234234,
            "user_id": 2039478,
            "unitTitle": "Unicorns",
            "unitDesc": "Learn how to care for and not scare away unicorns."
        }
    ]
};

const MOCK_LESSON_PLANS = {
    "lessonPlans": [
        {
            "id": 093845,
            "unit_id": 587690,
            "class_id": 234234,
            "user_id": 2039478,
            "lessonTitle": "Feeding",
            "lessonDesc": "Unicorns have a very unique diet.",
            "standards": "H.7.1.",
            "learningTargets": "Students will be able to feed a unicorn appropriate food.",
            "lessonDetails": "",
            "assessment": "Practice feeding a unicorn from the Forbidden Forest.",
            "homework": "Study Chapter 17.",
            "notes": "did not go well, most students scared the unicorns away",
            "reflection": "moved into feeding too quickly, unicorns and students need time to acclimate to each other"
        },
    ]
};

//functions, variables and object definitions

function displayCreateClass() {
    $(".create").html(`<fieldset>
<legend>
<h3>Create a new class</h3>
</legend>
<form>
<input type="text" aria-label="class-name" name="class-name" id="class-name" placeholder="Class name">
<input type="text" aria-label="class" name="class-term" id="class-term" placeholder="Term">
<button type="submit" id="new-class-submit">Create</button>
<button type="button" class="cancel-button" id="new-class-cancel">Cancel</button>
</form>
</fieldset>`);
}

function displayCreateUnit() {
    $(".create").html(`<fieldset>
<legend>
<h3>Create a new unit</h3>
</legend>
<form>
<input type="text" aria-label="unit-title" name="unit-title" id="unit-title" placeholder="Unit title">
<select id="new-unit-class-name" name="class-name" aria-label="class-name">
<optgroup label="Class">
<option value="class1">Class 1, Term 1</option>
<option value="class2">Class 2, Term 2</option>
<option value="class3">Class 3, Term 3</option>
</optgroup>
</select>
<textarea name="unit-desc" placeholder="Description" aria-label="unit-description"></textarea>
<button type="submit" id="new-unit-submit">Create</button>
<button type="button" class="cancel-button" id="new-unit-cancel">Cancel</button>
</form>
</fieldset>`);
}

function displayCreateLesson() {
    $(".create").html(`<fieldset>
<legend>
<h3>Create a new lesson</h3>
</legend>
<form>
<input type="text" aria-label="lesson-title" name="lesson-title" id="lesson-title" placeholder="Lesson title">
<select id="new-lesson-class-name" name="class-name" aria-label="class-name">
<optgroup label="Select a class">
<option value="class1">Class 1, Term 1</option>
<option value="class2">Class 2, Term 2</option>
<option value="class3">Class 3, Term 3</option>
</optgroup>
</select>
<select id="unit-name" name="unit-name" aria-label="unit-name">
<optgroup label="Select a unit">
<option value="class1">Unit 1</option>
<option value="class2">Unit 2</option>
<option value="class3">Unit 3</option>
</optgroup>
</select>
<input type="text" name="lesson-desc" placeholder="Description" aria-label="lesson description" id="lesson-desc">
<textarea name="standards" placeholder="Standards" aria-label="standards" id="lesson-stnds"></textarea>
<textarea name="learning-targets" id="learning-targets" placeholder="Learning Targets/Objectives" aria-label="learning targets or objectives"></textarea>
<textarea name="lesson-details" id="lesson-details" placeholder="Lesson Details" aria-label="lesson details"></textarea>
<textarea name="assessment" id="assessment" placeholder="Assessment" aria-label="assessment"></textarea>
<textarea name="homework" id="homework" placeholder="Homework/Independent Practice" aria-label="homework/independent practice"></textarea>
<textarea name="notes" id="notes" placeholder="Notes" aria-label="notes"></textarea>
<textarea name="reflection" id="reflections" placeholder="Reflection: What went well? What needs improvement?" aria-label="reflection"></textarea>
<button type="submit" id="new-lesson-submit">Create</button>
<button type="button" class="cancel-button" id="new-lesson-cancel">Cancel</button>
</form>
</fieldset>`);
}

//function displayLessons(lessonData) {
//    $(".journal-entries").html("<h3>My journal</h3>");
//    for (let i = 0; i < entryData.entryOutput.length; i++) {
//        let d = new Date(entryData.entryOutput[i].date);
//        let displayDate = d.toDateString();
//        $(".journal-entries").append(`
//<section class="entry" role="region">
//<p>Date: ${displayDate}</p>
//<p>My intention: ${entryData.entryOutput[i].intention}</p>
//<p>My mood was: ${entryData.entryOutput[i].mood}</p>
//<p>Type of meditation: ${entryData.entryOutput[i].medType}</p>
//<p>Length of meditation: ${entryData.entryOutput[i].medLength}</p>
//<p>After meditating, I felt: ${entryData.entryOutput[i].feeling}</p>
//<p>Notes: ${entryData.entryOutput[i].notes}</p>
//<p>Reflection: ${entryData.entryOutput[i].reflection}</p>
//<p>Gratitude: ${entryData.entryOutput[i].gratitude}</p>
//<button class="update">Update</button>
//<button class="delete">Delete</button>
//<input type="hidden" id="entryId" value="${entryData.entryOutput[i]._id}">
//</section>
//`)
//    };
//};

function displayLessonDetail(lessons) {
    $(".lesson-detail").html(`<fieldset>
<legend>
<h3>Lesson Detail</h3>
</legend>
<form>
<input type="text" aria-label="lesson-title" name="lesson-title" id="lesson-det-title" value="Lesson title">
<select id="class-name-les-det" name="class-name" aria-label="class-name">
<optgroup label="Select a class">
<option value="class1">Class 1, Term 1</option>
<option value="class2" selected>Class 2, Term 2</option>
<option value="class3">Class 3, Term 3</option>
</optgroup>
</select>
<select id="unit-name-les-det" name="unit-name" aria-label="unit-name">
<optgroup label="Select a unit">
<option value="class1">Unit 1</option>
<option value="class2">Unit 2</option>
<option value="class3" selected>Unit 3</option>
</optgroup>
</select>
<input type="text" name="lesson-desc" aria-label="lesson description" id="lesson-det-desc" value="Lesson Description: goes here">
<textarea name="standards" aria-label="standards" id="lesson-det-stnds">Standards: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </textarea>
<textarea name="learning-targets" id="les-det-learning-targets" aria-label="learning targets or objectives">Learning Targets/Objectives:I can have a learning target here. I can also put a second one.</textarea>
<textarea name="lesson-det-details" id="les-det-details" aria-label="lesson details">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </textarea>
<textarea name="assessment" id="les-det-assessment" aria-label="assessment">Assessment: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
<textarea name="homework" id="les-det-homework" aria-label="homework/independent practice">Homework: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</textarea>
<textarea name="notes" id="les-det-notes" aria-label="notes">Notes: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
<textarea name="reflection" id="les-det-reflections" aria-label="reflection">Reflection: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
<button type="submit" id="les-det-update">Update</button>
<button type="submit" id="les-det-delete">Delete</button>
</form>
</fieldset>`);
    $(".lesson-detail").show();
};

/* this function will get data for a specific user using different endpoints: classes, units, lessons */

function getData(type) {
    let user_id = $("#loggedInUser").val();
    let result = $.ajax({
            url: `/{$type}/` + user_id,
            dataType: "json",
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            if (result.entryOutput.length > 0) {
                displayDashboard(result);
            } else {
                alert `No ${type} found, please create one.`
            };
            displayDashboard();
        })

        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


function displayDashboard() {
    $("nav").hide();
    $("#landing").hide();
    $("#landing-page").hide();
    $("footer").show();
    $(".user-banner").show();
    $(".dashboard").show();
    $(".create").hide();
    $(".lesson-detail").hide();
};

function displayLanding() {
    $("nav").show();
    $("#landing").show();
    $(".landing-page").show();
    $("footer").show();
    $(".user-banner").hide();
    $(".dashboard").hide();
    $(".create").hide();
    $(".lesson-detail").hide();
};

//functions, variables and object definitions usage and triggers
//$(document).ready(function () {
//    displayLanding();
//});

$(document).on("submit", "#create-account-form", function (event) {
    console.log("form submitted");
    event.preventDefault();
    console.log("form submitted");
    const name = $('#new-name').val();
    const uname = $('#new-username').val();
    const pw = $('#new-password').val();
    const newUserObject = {
        username: uname,
        name: name,
        password: pw
    };
    console.log(newUserObject);
    const confirmPw = $('#confirm-password').val();
    if (pw !== confirmPw) {
        alert('Passwords must match!');
    } else {
        const newUserObject = {
            username: uname,
            name: name,
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

$(document).on("submit", "#log-in", function (event) {
    console.log("log in form submitted");
    event.preventDefault();
    const uname = $('#username').val();
    const pw = $('#passwordInput').val();
    // check for spaces, empty, undefined
    if ((!uname) || (uname.length < 1) || (uname.indexOf(' ') > 0)) {
        alert('Invalid username');
    } else if ((!pw) || (pw.length < 1) || (pw.indexOf(' ') > 0)) {
        alert('Invalid password');
    } else {
        const unamePwObject = {
            username: uname,
            password: pw
        };
        console.log(unamePwObject);
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
    }
    displayDashboard();
});


//$(document).on('click', '#new-entry', function (event) {
//    event.preventDefault();
//    $(".journal").siblings().hide();
//    $(".journal").show();
//    $("#view-entries").show();
//    $("#new-entry").hide();
//});
//
////this is getting the specific journal entry so that it can be displayed to the user
//$(document).on('click', '.update', function (event) {
//    event.preventDefault();
//    let entry_id = $(this).siblings("input[type='hidden']").val();
//    let result = $.ajax({
//            url: "/entry/" + entry_id,
//            dataType: "json",
//            type: "GET"
//        })
//        /* if the call is successful (status 200 OK) show results */
//        .done(function (result) {
//            if (result.length === 0) {
//                alert("Couldn't find entry. Please try again.");
//            } else {
//                displayEditEntry(result);
//            };
//        })
//        /* if the call is NOT successful show errors */
//        .fail(function (jqXHR, error, errorThrown) {
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//        });
//});
////this is the form submission to update an entry
//$(document).on('submit', '.edit-journal form', function (event) {
//    event.preventDefault();
//    let entry_id = $(this).find("#entryId").val();
//    const date = new Date();
//    const intention = $('#edit-intention').val();
//    const mood = $('#edit-mood').val();
//    const medType = $('#edit-meditation-type').val();
//    const medLength = $('#edit-length').val();
//    const feeling = $('#edit-feeling').val();
//    const notes = $('#edit-notes').val();
//    const reflection = $('#edit-reflection').val();
//    const gratitude = $('#edit-gratitude').val();
//    const user = $("#loggedInUser").val();
//
//    const entryObject = {
//        user: user,
//        date: date,
//        intention: intention,
//        mood: mood,
//        medType: medType,
//        medLength: medLength,
//        feeling: feeling,
//        notes: notes,
//        reflection: reflection,
//        gratitude: gratitude
//    };
//    $.ajax({
//            type: 'PUT',
//            url: '/entry/' + entry_id,
//            dataType: 'json',
//            data: JSON.stringify(entryObject),
//            contentType: 'application/json'
//        })
//        .done(function (result) {
//            $(".journal-entry")[0].reset();
//            getEntries();
//            displayDashboard();
//        })
//        .fail(function (jqXHR, error, errorThrown) {
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//        });
//});
//
//$(document).on('click', '.delete', function (event) {
//    event.preventDefault();
//    let entry_id = $(this).siblings("input[type='hidden']").val();
//    if (confirm("Are you sure you want to permanently delete this entry?") === true) {
//        $.ajax({
//                type: 'DELETE',
//                url: '/entry/' + entry_id,
//                dataType: 'json',
//                contentType: 'application/json'
//            })
//            .done(function (result) {
//                $(".journal-entries").html("<h3>My journal</h3>");
//                getEntries();
//                displayDashboard();
//            })
//            .fail(function (jqXHR, error, errorThrown) {
//                console.log(jqXHR);
//                console.log(error);
//                console.log(errorThrown);
//            });
//    };
//});
//
//$(document).on('click', '#log-out-link', function (event) {
//    event.preventDefault();
//    location.reload();
//});
//
//$(document).on("submit", "#log-in", function (event) {
//    event.preventDefault();
//    const inputUname = $('#username').val();
//    const inputPw = $('#passwordInput').val();
//    // check for spaces, empty, undefined
//    if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {
//        alert('Invalid username');
//    } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
//        alert('Invalid password');
//    } else {
//        const unamePwObject = {
//            username: inputUname,
//            password: inputPw
//        };
//        $.ajax({
//                type: "POST",
//                url: "/users/signin",
//                dataType: 'json',
//                data: JSON.stringify(unamePwObject),
//                contentType: 'application/json'
//            })
//            .done(function (result) {
//                displayDashboard();
//                userLoggedIn = true;
//                $("#log-in-link").hide();
//                $("#loggedInUser").val(result.id);
//                getLessons();
//            })
//            .fail(function (jqXHR, error, errorThrown) {
//                console.log(jqXHR);
//                console.log(error);
//                console.log(errorThrown);
//                alert('Invalid username and password combination. Pleae check your username and password and try again.');
//            });
//    };
//});
//
//
//$(document).on("submit", ".new-lesson", function (event) {
//    event.preventDefault();
//    const title = $('#lesson-title').val();
//    const class = $('#class-name').val();
//    const unit = $('#unit-name').val();
//    const desc = $('#lesson-desc').val();
//    const stnds = $('#lesson-stnds').val();
//    const learningTargets = $('#learning-targets').val();
//    const lessonDetails = $('#lesson-details').val();
//    const assessment = $('#assessment').val();
//    const homework = $('#homework').val();
//    const notes = $('#notes').val();
//    const reflection = $('#reflection').val();
//    const user = $("#loggedInUser").val();
//    const newEntryObject = {
//        user: user,
//        title: title,
//        class: class,
//        unit: unit,
//        desc: desc,
//        stnds: stnds,
//        learningTargets: learningTargets,
//        lessonDetails: lessonDetails,
//        assessment: assessment,
//        homework: homework,
//        notes: notes,
//        reflection: refelction
//    };
//    $.ajax({
//            type: 'POST',
//            url: '/lesson/create',
//            dataType: 'json',
//            data: JSON.stringify(newEntryObject),
//            contentType: 'application/json'
//        })
//        .done(function (result) {
//            $(".lesson-short")[0].reset();
//            getLessons();
//            displayDashboard();
//        })
//        .fail(function (jqXHR, error, errorThrown) {
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//        });
//});
//
//$(document).on("click", "#home", function (event) {
//    if (userLoggedIn == true) {
//        displayDashboard();
//    };
//});
