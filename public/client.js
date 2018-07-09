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
    "subjects": [
        {
            "id": 22222,
            "user_id": 029385098,
            "subjectName": "Transfiguration",
            "term": "Fall 2012"
        },
        {
            "id": 234234,
            "user_id": 20389745,
            "subjectName": "Transfiguration 2",
            "term": "Fall 2012"
        },
        {
            "id": 234234,
            "user_id": 2039478,
            "subjectName": "Care of Magical Creatures",
            "term": "Fall 2012"
        },
    ]

};

const MOCK_UNITS = {
    "units": [
        {
            "id": 587690,
            "subject_id": 234234,
            "user_id": 2039478,
            "unitTitle": "Unicorns",
            "unitDesc": "Learn how to care for and not scare away unicorns."
        }
    ]
};

const MOCK_LESSONS = {
    "lessons": [
        {
            "id": 093845,
            "unit_id": 587690,
            "subject_id": 234234,
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

//function displayLessonDetail(lessons) {
//    $(".lesson-detail").html(`<fieldset>
//<legend>
//<h3>Lesson Detail</h3>
//</legend>
//<form>
//<input type="text" aria-label="lesson-title" name="lesson-title" id="lesson-det-title" value="Lesson title">
//<select id="class-name-les-det" name="class-name" aria-label="class-name">
//<optgroup label="Select a class">
//<option value="class1">Class 1, Term 1</option>
//<option value="class2" selected>Class 2, Term 2</option>
//<option value="class3">Class 3, Term 3</option>
//</optgroup>
//</select>
//<select id="unit-name-les-det" name="unit-name" aria-label="unit-name">
//<optgroup label="Select a unit">
//<option value="class1">Unit 1</option>
//<option value="class2">Unit 2</option>
//<option value="class3" selected>Unit 3</option>
//</optgroup>
//</select>
//<input type="text" name="lesson-desc" aria-label="lesson description" id="lesson-det-desc" value="Lesson Description: goes here">
//<textarea name="standards" aria-label="standards" id="lesson-det-stnds">Standards: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </textarea>
//<textarea name="learning-targets" id="les-det-learning-targets" aria-label="learning targets or objectives">Learning Targets/Objectives:I can have a learning target here. I can also put a second one.</textarea>
//<textarea name="lesson-det-details" id="les-det-details" aria-label="lesson details">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </textarea>
//<textarea name="assessment" id="les-det-assessment" aria-label="assessment">Assessment: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
//<textarea name="homework" id="les-det-homework" aria-label="homework/independent practice">Homework: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</textarea>
//<textarea name="notes" id="les-det-notes" aria-label="notes">Notes: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
//<textarea name="reflection" id="les-det-reflections" aria-label="reflection">Reflection: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
//<button type="submit" id="les-det-update">Update</button>
//<button type="submit" id="les-det-delete">Delete</button>
//</form>
//</fieldset>`);
//    $(".lesson-detail").show();
//
//};

/* this function will get data for a specific user using different endpoints: classes, units, lessons */

//function getData(type) {
//    let user_id = $("#loggedInUser").val();
//    let result = $.ajax({
//            url: `/{$type}/` + user_id,
//            dataType: "json",
//            type: "GET"
//        })
//        /* if the call is successful (status 200 OK) show results */
//        .done(function (result) {
//            if (result.entryOutput.length > 0) {
//                displayDashboard(result);
//            } else {
//                alert `No ${type} found, please create one.`
//            };
//            displayDashboard();
//        })
//
//        /* if the call is NOT successful show errors */
//        .fail(function (jqXHR, error, errorThrown) {
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//        });
//}


function displayDashboard() {
    $(".dashboard-nav").show();
    $(".landing-nav").hide();
    $("#landing-page").hide();
    $("footer").show();
    $(".user-banner").show();
    $(".dashboard").show();
    $(".create").hide();
    $(".lesson-detail").hide();
};

function displayLanding() {
    $(".landing-nav").show();
    $(".dashboard-nav").hide();
    $("#landing").show();
    $(".landing-page").show();
    $("footer").show();
    $(".user-banner").hide();
    $(".dashboard").hide();
    $(".create").hide();
    $(".lesson-detail").hide();
};

//functions, variables and object definitions usage and triggers
$(document).ready(function () {
    displayLanding();
});

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
                $("#loggedInUser").val(result.id);
                //                getLessons();
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
                console.log(result);
                displayDashboard();
                window.scrollTo(0, 0);
                userLoggedIn = true;
                $("#log-in-link").hide();
                $("#loggedInUser").val(result.id);
                //                        getEntries();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Invalid username and password combination. Please check your username and password and try again.');
            });
    }
});


$(document).on('click', '.update', function (event) {
    event.preventDefault();
    console.log("update hit");
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
    //                displayDashboard(result);
    //            };
    //        })
    //        /* if the call is NOT successful show errors */
    //        .fail(function (jqXHR, error, errorThrown) {
    //            console.log(jqXHR);
    //            console.log(error);
    //            console.log(errorThrown);
    //        });
});


$(document).on('click', '.delete', function (event) {
    event.preventDefault();
    console.log("delete hit");
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
});

$(document).on("click", ".detail", function (event) {
    event.preventDefault();
    $(".dashboard").hide();
    $(".lesson-detail").show();
});

$(document).on("click", ".create-unit-1", function (event) {
    event.preventDefault();
});

$(document).on("click", ".to-dashboard", function (event) {
    event.preventDefault();
    displayDashboard();
});


$(document).on("submit", "#new-subject", function (event) {
    event.preventDefault();
    console.log("new subject submit");
    const subjectName = $("#subject-name").val();
    const user_id = $("#loggedInUser").val();
    const newSubjectObject = {
        user_id: user_id,
        subjectName: subjectName,
    };
    console.log(newClassObject);
    //    $.ajax({
    //            type: 'POST',
    //            url: '/unit/create',
    //            dataType: 'json',
    //            data: JSON.stringify(newUnitObject),
    //            contentType: 'application/json'
    //        })
    //        .done(function (result) {
    //            displayDashboard();
    //        })
    //        .fail(function (jqXHR, error, errorThrown) {
    //            console.log(jqXHR);
    //            console.log(error);
    //            console.log(errorThrown);
    //        });
});

$(document).on("submit", "#new-unit", function (event) {
    event.preventDefault();
    console.log("new unit submit");
    const title = $("#unit-title").val();
    const className = $('#class-name').val();
    const desc = $('#unit-desc').val();
    const user = $("#loggedInUser").val();
    const newUnitObject = {
        user_id: user_id,
        title: title,
        class: className,
        desc: desc,
    };
    console.log(newUnitObject);
    //    $.ajax({
    //            type: 'POST',
    //            url: '/unit/create',
    //            dataType: 'json',
    //            data: JSON.stringify(newUnitObject),
    //            contentType: 'application/json'
    //        })
    //        .done(function (result) {
    //            displayDashboard();
    //        })
    //        .fail(function (jqXHR, error, errorThrown) {
    //            console.log(jqXHR);
    //            console.log(error);
    //            console.log(errorThrown);
    //        });
});

$(document).on("submit", "#new-lesson", function (event) {
    event.preventDefault();
    console.log("new lesson submit");
    const title = $("#lesson-title").val();
    const className = $('#class-name').val();
    //need to get the class and unit id's somehow
    const unit = $('#unit-name').val();
    const desc = $('#lesson-desc').val();
    const stnds = $('#lesson-stnds').val();
    const learningTargets = $('#learning-targets').val();
    const lessonDetails = $('#lesson-details').val();
    const assessment = $('#assessment').val();
    const homework = $('#homework').val();
    const notes = $('#notes').val();
    const reflection = $('#reflection').val();
    const user = $("#loggedInUser").val();
    const newLessonObject = {
        user: user,
        title: title,
        class: className,
        unit: unit,
        desc: desc,
        stnds: stnds,
        learningTargets: learningTargets,
        lessonDetails: lessonDetails,
        assessment: assessment,
        homework: homework,
        notes: notes,
        reflection: reflection
    };
    console.log(newLessonObject);
    //    $.ajax({
    //            type: 'POST',
    //            url: '/lesson/create',
    //            dataType: 'json',
    //            data: JSON.stringify(newLessonObject),
    //            contentType: 'application/json'
    //        })
    //        .done(function (result) {
    //            $(".lesson-short")[0].reset();
    //            displayDashboard();
    //        })
    //        .fail(function (jqXHR, error, errorThrown) {
    //            console.log(jqXHR);
    //            console.log(error);
    //            console.log(errorThrown);
    //        });
});



$(document).on("click", ".create-subject-nav", function (event) {
    $(".create").html(`<fieldset>
<legend>
<h3>Create a new subject</h3>
</legend>
<form>
<input type="text" aria-label="subject-name" name="subject-name" id="subject-name" value="Subject name">
<button type="submit" id="new-subject-submit">Create</button>
<button type="button" class="cancel-button" id="new-subject-cancel">Cancel</button>
</form>
</fieldset>`);
    $(".create").show();
});

$(document).on("click", ".create-unit-nav", function (event) {
    $(".create").html(`<fieldset>
<legend>
<h3>Create a new unit</h3>
</legend>
<form id="new-unit">
<input type="text" aria-label="unit-title" name="unit-title" id="unit-title" placeholder="Unit title">
<select id="new-unit-subject-name" name="subject-name" aria-label="subject-name">
<optgroup label="Class">
<option value="subject1">Class 1, Term 1</option>
<option value="subject2">Class 2, Term 2</option>
<option value="subject3">Class 3, Term 3</option>
</optgroup>
</select>
<textarea name="unit-desc" placeholder="Description" aria-label="unit-description"></textarea>
<button type="submit" id="new-unit-submit">Create</button>
<button type="button" class="cancel-button" id="new-unit-cancel">Cancel</button>
</form>
</fieldset>`);
    $(".create").show();
});

$(document).on("click", ".create-lesson-nav", function (event) {
    $(".create").html(`<fieldset>
<legend>
<h3>Create a new lesson</h3>
</legend>
<form action="" id="new-lesson">
<input type="text" aria-label="lesson-title" name="lesson-title" id="lesson-title" placeholder="Lesson title">
<select id="new-lesson-subject-name" name="subject-name" aria-label="subject-name">
<optgroup label="Select a subject">
<option value="subject1">Class 1, Term 1</option>
<option value="subject2">Class 2, Term 2</option>
<option value="subject3">Class 3, Term 3</option>
</optgroup>
</select>
<select id="unit-name" name="unit-name" aria-label="unit-name">
<optgroup label="Select a unit">
<option value="unit1">Unit 1</option>
<option value="unit2">Unit 2</option>
<option value="unit3">Unit 3</option>
</optgroup>
</select>
<input type="text" name="lesson-desc" placeholder="Description" aria-label="lesson description" id="lesson-desc">
<textarea form="lesson-title" name="standards" placeholder="Standards" aria-label="standards" id="lesson-stnds"></textarea>
<textarea form="lesson-title" name="learning-targets" id="learning-targets" placeholder="Learning Targets/Objectives" aria-label="learning targets or objectives"></textarea>
<textarea form="lesson-title" name="lesson-details" id="lesson-details" placeholder="Lesson Details" aria-label="lesson details"></textarea>
<textarea form="lesson-title" name="assessment" id="assessment" placeholder="Assessment" aria-label="assessment"></textarea>
<textarea form="lesson-title" name="homework" id="homework" placeholder="Homework/Independent Practice" aria-label="homework/independent practice"></textarea>
<textarea form="lesson-title" name="notes" id="notes" placeholder="Notes" aria-label="notes"></textarea>
<textarea form="lesson-title" name="reflection" id="reflections" placeholder="Reflection: What went well? What needs improvement?" aria-label="reflection"></textarea>
<button type="submit" id="new-lesson-submit">Create</button>

</form>
</fieldset>
<button type="button" class="cancel-button" id="new-lesson-cancel">Cancel</button>`);
    $(".create").show();
});


$(document).on("click", ".cancel-button", function (event) {
    if (confirm("Are you sure you want to cancel? Your work will not be saved.") === true) {
        displayDashboard();
    }
});


$(document).on('click', '#log-out-link', function (event) {
    event.preventDefault();
    location.reload();
});

//
//$(document).on("click", "#home", function (event) {
//    if (userLoggedIn == true) {
//        displayDashboard();
//    };
//});
