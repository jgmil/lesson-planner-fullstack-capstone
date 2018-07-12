let user = "";
let userLoggedIn = false;

//functions, variables and object definitions


function getSubjects() {
    let user_id = $("#loggedInUser").val();
    let result = $.ajax({
            url: `/subjects/` + user_id,
            dataType: "json",
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            if (result.subjectOutput.length > 0) {
                console.log(result);
                generateSubject(result);
                subjectShortcuts(result);
                subjectOptGroups(result);
            } else {
                alert `No subjects found, please create one.`
            };
            return (result);
        })

        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

function getUnits(subjectId) {
    let user_id = $("#loggedInUser").val();
    console.log(user_id);
    let result = $.ajax({
            url: `/units/` + user_id,
            dataType: "json",
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            if (result.unitOutput.length > 0) {
                console.log(result);
                unitShortcuts(subjectId, result);
                generateUnit(result);
                //need to map over the generate functions
            } else {
                alert `No units found, please create one.`
                console.log(result);
            };
            return (result);
        })

        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

function getLessons() {
    const user_id = $("#loggedInUser").val();
    console.log(`user_id: ${user_id}`);
    const result = $.ajax({
            url: `/lessons/` + user_id,
            dataType: "json",
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            console.log(result);
            if (result.lessonOutput.length > 0) {
                console.log(result);
                result.lessonOutput.map(lesson => generateLessonShort(lesson));
            } else {
                alert `No lesson found, please create one.`
            };
            return (result);
        })

        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};


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

function subjectOptGroups(subjects) {
    //use this space to populate subject dropdown menus
    var buildTheHtmlOutput = "";

    buildTheHtmlOutput += `<optgroup label="Subject">`;

    $.each(subjects.subjectOutput, function (subjectsKey, subjectsValue) {
        //create and populate one option for each of the results
        buildTheHtmlOutput += `<option value="${subjectsValue._id}">${subjectsValue.subjectName}</option>`;
    });
    buildTheHtmlOutput += `</optgroup>`;
    //use the HTML output to show it in the index.html
    $(".subject-select").html(buildTheHtmlOutput);
}

function unitOptGroups(units) {
    //use this to populate unit dropdown menus
}

function subjectShortcuts(subjects) {
    console.log("subject shortcuts");
}

function generateSubject(subjects) {
    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";

    $.each(subjects.subjectOutput, function (subjectsKey, subjectsValue) {
        //create and populate one div for each of the results
        buildTheHtmlOutput += `<div id="subject-${subjectsValue._id}" class="subject-container clearfix">`;
        buildTheHtmlOutput += `<form class="inline-form" id="${subjectsValue._id}">`;
        buildTheHtmlOutput += `<input class="subject-title" type="text" aria-label="subject-title" name="subject-title" value="${subjectsValue.subjectName}">`;
        buildTheHtmlOutput += `<button class="update" type="button">Update subject</button>`;
        buildTheHtmlOutput += `</form>`;
        buildTheHtmlOutput += `<form class="delete-form inline-form clearfix">`
        buildTheHtmlOutput += `<input type="hidden" class="deleteSubject" value="${subjectsValue._id}">`;
        buildTheHtmlOutput += `<button class="delete-subject" type="submit">Delete subject</button>`;
        buildTheHtmlOutput += `</form>`;
        buildTheHtmlOutput += `<span class="float-right">`;
        buildTheHtmlOutput += `<p>Jump to: </p>`;
        buildTheHtmlOutput += `<span id="shortcuts-${subjectsValue._id}">`;
        buildTheHtmlOutput += `<a class="unit-shortcut" href="#unit-${subjectsValue._id}">Unit Name</a>`;
        buildTheHtmlOutput += `</span>`;
        buildTheHtmlOutput += `<button type="button">Add a unit</button>`;
        buildTheHtmlOutput += `<input type="hidden" class="subject_id" value="${subjectsValue._id}">`;
        buildTheHtmlOutput += `<div class="unit-create-cont"></div>`;
        buildTheHtmlOutput += `</span>`;
        buildTheHtmlOutput += `</div>`;
        buildTheHtmlOutput += `<div class="unit-container" id="units-${subjectsValue._id}"></div>`;
        getUnits(subjects.subjectOutput._id);
    });

    //use the HTML output to show it in the index.html
    $(".dashboard").html(buildTheHtmlOutput);


};

function subjectShortcuts(subjectData) {
    //create an empty variable to store one <a> for each one the results
    console.log(subjectData);
    var buildTheHtmlOutput = "";

    $.each(subjectData.subjectOutput, function (subjectDataKey, subjectDataValue) {
        //create and populate one div for each of the results
        buildTheHtmlOutput += `<a class="subject-shortcut" href="#subject-${subjectDataValue._id}">${subjectDataValue.subjectName}</a>`;

    });

    //use the HTML output to show it in the index.html
    $(`#subject-shortcuts`).html(buildTheHtmlOutput);
};


function unitShortcuts(subjectsId, unitData) {
    //create an empty variable to store one LI for each one the results
    console.log(subjectsId);
    console.log(unitData);
    var buildTheHtmlOutput = "";

    $.each(unitData.unitOutput, function (unitDataKey, unitDataValue) {
        //create and populate one div for each of the results
        buildTheHtmlOutput += `<a class="unit-shortcut" href="#unit-${unitDataValue._id}">${unitDataValue.title}</a>`;

    });

    //use the HTML output to show it in the index.html
    $(`#shortcuts-${subjectsId}`).html(buildTheHtmlOutput);
};

function generateUnit(unit) {
    $(".unit - container").append(
        `<div class="unit">
<form class="clearfix">
<input class="unit-title-dash" type="text" aria-label="unit-title" name="unit-title" id="unit-title-${unit._id}" value="${unit.title}">
<select id="subject-name-1-1" name="subject-name" aria-label="subject-name">
<p>Subject: ${unit.subject_id}</p>
</select>
<textarea name="unit-desc" aria-label="unit-description" id="unit-desc-${unit._id}">${unit.desc}</textarea>
<button type="submit" class="update" id="update-unit-${unit._id}">Update unit</button>
<button type="button" id="delete-unit-${unit._id}" class="delete">Delete unit</button>
<input type="hidden" class="unit_id" value="${unit._id}">
</form>
<div class="create-unit-cont"></div>
<div class="lesson-container clearfix" id="lessons-${unit._id}">
</div>
</div>`
    );
}

function generateLessonShort(lesson) {
    $(".lesson-container").append(`<div class="lesson-short">
<p>Lesson title</p>
<p>Description: lesson description goes here</p>
<p>Homework</p>
<button class="detail" id="lesson-${lesson._id}">Details</button>
<input type="hidden" class="lesson_id" value="">
</div>`);
    console.log("generateLessonShort ran");
};

function genereateLessonDetail(lesson) {
    $(".lesson-detail").html(`<fieldset>
<legend>
<h3>Lesson Detail</h3>
</legend>
<form>
<input type="text" aria-label="lesson-title" name="lesson-title" id="lesson-det-title" value="${lesson.title}">
<select id="subject-name-les-det" name="subject-name" aria-label="subject-name">
<optgroup label="Subject">
<option value="subject1">Class 1, Term 1</option>
<option value="subject2" selected>Class 2, Term 2</option>
<option value="subject3">Class 3, Term 3</option>
</optgroup>
</select>
<select id="unit-name-les-det" name="unit-name" aria-label="unit-name">
<optgroup label="Unit">
<option value="subject1">Unit 1</option>
<option value="subject2">Unit 2</option>
<option value="subject3" selected>Unit 3</option>
</optgroup>
</select>
<textarea name="standards" aria-label="standards" id="lesson-det-stnds">Standards: ${lesson.stnds} </textarea>
<textarea name="learning-targets" id="les-det-learning-targets" aria-label="learning targets or objectives">Learning Targets/Objectives: ${lesson.learningTargets}</textarea>
<textarea name="lesson-det-details" id="les-det-details" aria-label="lesson details">Description: ${lesson.desc}" </textarea>
<textarea name="assessment" id="les-det-assessment" aria-label="assessment">Assessment: ${lesson.assessment}</textarea>
<textarea name="homework" id="les-det-homework" aria-label="homework/independent practice">Homework: ${lesson.homework}</textarea>
<textarea name="notes" id="les-det-notes" aria-label="notes">Notes: ${lesson.notes}</textarea>
<textarea name="reflection" id="les-det-reflections" aria-label="reflection">Reflection: ${lesson.reflection}</textarea>
<input type="hidden" id="lesson-det-id value="${lesson._id}">
<button type="button" class="update" id="les-det-update">Update</button>
<button type="button" class="delete" id="les-det-delete" class="delete">Delete</button>
<button class="to-dashboard">Back to dashboard</button>
</form>
</fieldset>`);
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
        ``
        .done(function (result) {
                console.log(result);
                $("#loggedInUser").val(result._id);
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
                console.log(result._id);
                displayDashboard();
                window.scrollTo(0, 0);
                userLoggedIn = true;
                $("#log-in-link").hide();
                $("#loggedInUser").val(result._id);
                getSubjects();
                getLessons();

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
    const lesson_id = $(this).siblings("input[type='hidden']").val();
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
    console.log(newSubjectObject);
    $.ajax({
            type: 'POST',
            url: '/subject/create',
            dataType: 'json',
            data: JSON.stringify(newSubjectObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            displayDashboard();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on("submit", "#new-unit", function (event) {
    event.preventDefault();
    console.log("new unit submit");
    const title = $("#unit-title").val();
    const className = $('#class-name').val();
    const desc = $('#unit-desc').val();
    const user_id = $("#loggedInUser").val();
    const newUnitObject = {
        user_id: user_id,
        title: title,
        class_id: className,
        desc: desc,
    };
    console.log(newUnitObject);
    $.ajax({
            type: 'POST',
            url: '/unit/create',
            dataType: 'json',
            data: JSON.stringify(newUnitObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            displayDashboard();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on("submit", "#new-lesson", function (event) {
    event.preventDefault();
    console.log("new lesson submit");
    const title = $("#lesson-title").val();
    const subject_id = "subject_id";
    //need to get the class and unit id's somehow
    const unit_id = "unit_id";
    const stnds = $('#lesson-stnds').val();
    const learningTargets = $('#learning-targets').val();
    const lessonDetails = $('#lesson-details').val();
    const assessment = $('#assessment').val();
    const homework = $('#homework').val();
    const notes = $('#notes').val();
    const reflection = $('#reflection').val();
    const user_id = $("#loggedInUser").val();
    const newLessonObject = {
        user_id: user_id,
        title: title,
        subject_id: subject_id,
        unit_id: unit_id,
        stnds: stnds,
        learningTargets: learningTargets,
        lessonDetails: lessonDetails,
        assessment: assessment,
        homework: homework,
        notes: notes,
        reflection: reflection
    };
    console.log(newLessonObject);
    $.ajax({
            type: 'POST',
            url: '/lesson/create',
            dataType: 'json',
            data: JSON.stringify(newLessonObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            $(".lesson-short")[0].reset();
            displayDashboard();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});



$(document).on("click", ".create-subject-nav", function (event) {
    $(".create").html(`<fields  et>
<legend>
<h3>Create a new subject</h3>
</legend>
<form id="new-subject">
<input type="text" aria-label="subject-name" name="subject-name" id="subject-name" value="Subject name">
<button type="submit">Create</button>
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
<select class="subject-select" name="subject-name" aria-label="subject-name">

</select>
<textarea name="unit-desc" placeholder="Description" aria-label="unit-description"></textarea>
<button type="submit" id="new-unit-submit">Create</button>
<button type="button" class="cancel-button" id="new-unit-cancel">Cancel</button>
</form>
</fieldset>`);
    getSubjects();
    $(".create").show();
});

$(document).on("click", ".create-lesson-nav", function (event) {
    const subjectResults = getSubjects();
    console.log(subjectResults);
    $(".create").html(`<fieldset>
<legend>
<h3>Create a new lesson</h3>
</legend>
<form action="" id="new-lesson">
<input type="text" aria-label="lesson-title" name="lesson-title" id="lesson-title" placeholder="Lesson title">
<select id="new-lesson-subject-name" name="subject-name" aria-label="subject-name">
<optgroup label="Select a subject">
<option value="subject1">Subject 1, Term 1</option>
<option value="subject2">Subject 2, Term 2</option>
<option value="subject3">Subject 3, Term 3</option>
</optgroup>
</select>
<select id="unit-name" name="unit-name" aria-label="unit-name">
<optgroup label="Select a unit">
<option value="unit1">Unit 1</option>
<option value="unit2">Unit 2</option>
<option value="unit3">Unit 3</option>
</optgroup>
</select>
<textarea form="lesson-title" name="standards" placeholder="Standards" aria-label="standards" id="lesson-stnds"></textarea>
<textarea form="lesson-title" name="learning-targets" id="learning-targets" placeholder="Learning Targets/Objectives" aria-label="learning targets or objectives"></textarea>
<textarea form="lesson-title" name="lesson-details" id="lesson-details" placeholder="Lesson Details" aria-label="lesson details"></textarea>
<textarea form="lesson-title" name="assessment" id="assessment" placeholder="Assessment" aria-label="assessment"></textarea>
<textarea form="lesson-title" name="homework" id="homework" placeholder="Homework/Independent Practice" aria-label="homework/independent practice"></textarea>
<textarea form="lesson-title" name="notes" id="notes" placeholder="Notes" aria-label="notes"></textarea>
<textarea form="lesson-title" name="reflection" id="reflection" placeholder="Reflection: What went well? What needs improvement?" aria-label="reflection"></textarea>
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
