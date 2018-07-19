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
                getUnits();
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
                unitShortcuts(result);
                generateUnit(result);
                unitOptGroups(result);
                getLessons();
            } else {
                $(`.unit-container`).html("No units found, please create one.");
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
                generateLessonShort(result);
            } else {
                $(".lesson-container").html("No lesson found, please create one.");
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
    $(".subject-shortcuts").show();
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
    //use this to populate unit dropdown menu
    var buildTheHtmlOutput = "";

    buildTheHtmlOutput += `<optgroup label="Unit">`;

    $.each(units.unitOutput, function (unitsKey, unitsValue) {
        //create and populate one option for each of the results
        buildTheHtmlOutput += `<option value="${unitsValue._id}">${unitsValue.title}</option>`;
    });
    buildTheHtmlOutput += `</optgroup>`;
    //use the HTML output to show it in the index.html
    $(".unit-select").html(buildTheHtmlOutput);
}

function generateSubject(subjects) {
    //create an empty variable to store one LI for each one the results
    $(".dashboard").html("");
    var buildTheHtmlOutput = "";

    $.each(subjects.subjectOutput, function (subjectsKey, subjectsValue) {
        //create and populate one div for each of the results
        buildTheHtmlOutput += `<div id="subject-${subjectsValue._id}" class="subject-container clearfix">`;
        buildTheHtmlOutput += `<form class="inline-form update-subject" id="${subjectsValue._id}">`;
        buildTheHtmlOutput += `<input class="subject-title" type="text" aria-label="subject-title" name="subject-title" value="${subjectsValue.subjectName}">`;
        buildTheHtmlOutput += `<input type="hidden" name="subject-id" value="${subjectsValue._id}">`;
        buildTheHtmlOutput += `<input name="update-subject-button" type="submit" value="Update subject">`;
        buildTheHtmlOutput += `</form>`;
        buildTheHtmlOutput += `<form id="delete-subject-${subjectsValue._id}" class="delete-subject inline-form clearfix">`
        buildTheHtmlOutput += `<input type="hidden" value="${subjectsValue._id}">`;
        buildTheHtmlOutput += `<input name="subject-id" class="delete" type="submit" value="Delete subject">`;
        buildTheHtmlOutput += `</form>`;
        buildTheHtmlOutput += `<span class="float-right">`;
        buildTheHtmlOutput += `<p>Jump to: </p>`;
        buildTheHtmlOutput += `<span class="unit-shortcuts" id="shortcuts-${subjectsValue._id}">`;
        buildTheHtmlOutput += `</span>`;
        buildTheHtmlOutput += `<div class="unit-create-cont"></div>`;
        buildTheHtmlOutput += `</span>`;
        buildTheHtmlOutput += `</div>`;
        buildTheHtmlOutput += `<div class="unit-container" id="units-${subjectsValue._id}"></div>`;

    });

    //use the HTML output to show it in the index.html
    $(".dashboard").html(buildTheHtmlOutput);


};

function subjectShortcuts(subjectData) {
    //create an empty variable to store one <a> for each one the results
    console.log(subjectData);
    $(`.subject-shortcuts`).html("");
    var buildTheHtmlOutput = "";
    buildTheHtmlOutput += `<p>Jump to: </p>`;

    $.each(subjectData.subjectOutput, function (subjectDataKey, subjectDataValue) {
        //create and populate one div for each of the results
        buildTheHtmlOutput += `<a class="subject-shortcut" href="#subject-${subjectDataValue._id}"> ${subjectDataValue.subjectName}</a>`;
    });

    //use the HTML output to show it in the index.html
    $(`.subject-shortcuts`).html(buildTheHtmlOutput);
};


function unitShortcuts(unitData) {
    //create an empty variable to store one LI for each one the results
    console.log("unitShortcuts");
    console.log(unitData);
    $(".unit-shortcuts").html("");

    $.each(unitData.unitOutput, function (unitDataKey, unitDataValue) {
        var buildTheHtmlOutput = "";
        //create and populate one div for each of the results
        buildTheHtmlOutput += `<a class="unit-shortcut" href="#unit-${unitDataValue._id}">${unitDataValue.title}</a>`;
        $(`#shortcuts-${unitDataValue.class_id}`).append(buildTheHtmlOutput);
    });
};

function generateUnit(units) {
    $(`.unit-container`).html("");
    $.each(units.unitOutput, function (unitsKey, unitsValue) {
        //create and populate one div for each of the results
        var buildTheHtmlOutput = "";
        buildTheHtmlOutput += `<div class="unit">`;
        buildTheHtmlOutput += `<form class="inline-form update-unit" id="unit-${unitsValue._id}">`;
        buildTheHtmlOutput += `<input class="unit-title-dash" type="text" aria-label="unit-title" name="unit-title" value="${unitsValue.title}">`;
        buildTheHtmlOutput += `<input class="unit-id-dash" type="hidden" name="unit-id" value="${unitsValue._id}">`;
        buildTheHtmlOutput += `<input type="submit" name="update-unit-submit" value="Update unit">`;
        buildTheHtmlOutput += `</form>`;
        buildTheHtmlOutput += `<form id="delete-unit-${unitsValue._id}" class="delete-unit inline-form">`
        buildTheHtmlOutput += `<input type="hidden" class="delete-unit" value="${unitsValue._id}">`;
        buildTheHtmlOutput += `<input name="unit-id" aria-hidden="true" class="delete" type="submit" value="Delete unit">`;
        buildTheHtmlOutput += `<div id="lesson-container-${unitsValue._id}" class="lesson-container clearfix"></div>`;
        buildTheHtmlOutput += `</form>`;
        $(`#units-${unitsValue.class_id}`).append(buildTheHtmlOutput);
    });

    //use the HTML output to show it in the index.html
}

function generateLessonShort(lessons) {
    $(".lesson-container").html("");
    $.each(lessons.lessonOutput, function (lessonsKey, lessonsValue) {
        console.log("generateLessonShort");
        var buildTheHtmlOutput = "";
        //create and populate one div for each of the results
        buildTheHtmlOutput += `<div class="lesson-short clearfix">`;
        buildTheHtmlOutput += `<h4>${lessonsValue.title}</h4>`;
        buildTheHtmlOutput += `<p>Day: ${lessonsValue.day}</p>`;
        buildTheHtmlOutput += `<p>${lessonsValue.learningTargets}</p>`;
        buildTheHtmlOutput += `<p>${lessonsValue.homework}</p>`;
        buildTheHtmlOutput += `<form class="clearfix lesson-short-form">`;
        buildTheHtmlOutput += `<input type="hidden" name="lesson-id" value='${lessonsValue._id}'>`;
        buildTheHtmlOutput += `<input type="submit" value="Details" class="detail float-right"/>`;
        buildTheHtmlOutput += `</form>`;
        buildTheHtmlOutput += `</div>`;
        $(`#lesson-container-${lessonsValue.unit_id}`).append(buildTheHtmlOutput);
    });

    //    buildTheHtmlOutput += `<div class="lesson-short lesson-end">`;
    //    buildTheHtmlOutput += `<button type="button" class="create-lesson">Add a lesson</button>`;
    //    buildTheHtmlOutput += `</div>`;
    //    buildTheHtmlOutput += `<section class="lesson-create-cont"></section>`;
    //use the HTML output to show it in the index.html

};

function genereateLessonDetail(lessonId) {
    event.preventDefault();
    let result = $.ajax({
            url: "/lesson/" + lessonId,
            dataType: "json",
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            if (result.length === 0) {
                alert("Couldn't find lesson. Please try again.");
            } else {
                console.log(result);
                $(".lesson-detail").html(`<button class="to-dashboard">Back to dashboard</button>
<fieldset>
<legend>
<h3>Lesson Detail</h3>
</legend>
<form id="update-lesson" class="inline-form clearfix">
<input type="text" aria-label="lesson-title" name="lesson-title" id="lesson-det-title" value="${result.title}">
<label for="day">Day: </label>
<input required="true" type="number" name="day" min="1" max="180" id="lesson-day" value="${result.day}">
<textarea name="standards" aria-label="standards" id="lesson-det-stnds">${result.stnds}</textarea>
<textarea name="learning-targets" id="les-det-learning-targets" aria-label="learning targets or objectives">${result.learningTargets}</textarea>
<textarea name="lesson-det-details" id="les-det-details" aria-label="lesson details">${result.lessonDetails} </textarea>
<textarea name="assessment" id="les-det-assessment" aria-label="assessment">${result.assessment}</textarea>
<textarea name="homework" id="les-det-homework" aria-label="homework/independent practice">${result.homework}</textarea>
<textarea name="notes" id="les-det-notes" aria-label="notes">Notes: ${result.notes}</textarea>
<textarea name="reflection" id="les-det-reflections" aria-label="reflection">${result.reflection}</textarea>
<input name="lesson-id" type="hidden" id="lesson-id" value="${result._id}">
<input type="submit" class="update-lesson float-right" value="Update">
</form>
</fieldset>
<form id="delete-lesson">
<input type="hidden" id="lesson-delete-id" value="${result._id}">
<input type="submit" class="delete float-right" value="Delete Lesson">
</form>`);
            };
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

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
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Invalid username and password combination. Please check your username and password and try again.');
            });
    }
});

$(document).on("submit", ".update-subject", function (event) {
    event.preventDefault();
    console.log("update subject submit");
    const subjectName = $(this).children(".subject-title").val();
    console.log(subjectName);
    let subject_id = $(this).children("input[type='hidden']").val();
    console.log(subject_id);
    const updateSubjectObject = {
        subjectName: subjectName,
    };
    console.log(updateSubjectObject);
    $.ajax({
            type: 'PUT',
            url: '/subject/' + subject_id,
            dataType: 'json',
            data: JSON.stringify(updateSubjectObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            console.log("subject updated");
            getSubjects();
            displayDashboard();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on("submit", ".update-unit", function (event) {
    event.preventDefault();
    console.log("update unit submit");
    const title = $(this).children(".unit-title-dash").val();
    let unit_id = $(this).children("input[type='hidden']").val();
    const updateUnitObject = {
        title: title,
    };
    console.log(unit_id);
    console.log(updateUnitObject);
    $.ajax({
            type: 'PUT',
            url: '/unit/' + unit_id,
            dataType: 'json',
            data: JSON.stringify(updateUnitObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log("unit updated");
            getUnits();
            displayDashboard();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on('submit', '#update-lesson', function (event) {
    event.preventDefault();
    console.log("update hit");
    const title = $(this).children("#lesson-det-title").val();
    const lesson_id = $(this).children("input[type='hidden']").val();
    const day = $(this).children("#lesson-day").val();
    const stnds = $(this).children("#lesson-det-stnds").val();
    const learningTargets = $(this).children('#les-det-learning-targets').val();
    const lessonDetails = $(this).children('#les-det-details').val();
    const assessment = $(this).children('#les-det-assessment').val();
    const homework = $(this).children('#les-det-homework').val();
    const notes = $(this).children('#les-det-notes').val();
    const reflection = $(this).children('#les-det-reflections').val();
    const updateLessonObject = {
        title: title,
        day: day,
        stnds: stnds,
        learningTargets: learningTargets,
        lessonDetails: lessonDetails,
        assessment: assessment,
        homework: homework,
        notes: notes,
        reflection: reflection
    };
    console.log(lesson_id);
    console.log(updateLessonObject);
    $.ajax({
            type: 'PUT',
            url: '/lesson/' + lesson_id,
            dataType: 'json',
            data: JSON.stringify(updateLessonObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log("lesson updated");
            getLessons();
            displayDashboard();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});


$(document).on('submit', '.delete-subject', function (event) {
    event.preventDefault();
    console.log("delete hit");
    if (confirm("Are you sure you want to permanently delete this subject?") === true) {
        const subject_id = $(this).children("input[type='hidden']").val();
        console.log(subject_id);
        $.ajax({
                type: 'DELETE',
                url: '/subject/' + subject_id,
                dataType: 'json',
                contentType: 'application/json'
            })
            .done(function (result) {
                getSubjects();
                subjectShortcuts();
                displayDashboard();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$(document).on('submit', '.delete-unit', function (event) {
    event.preventDefault();
    console.log("delete hit");
    if (confirm("Are you sure you want to permanently delete this unit?") === true) {
        const unit_id = $(this).children("input[type='hidden']").val();
        console.log(unit_id);
        $.ajax({
                type: 'DELETE',
                url: '/unit/' + unit_id,
                dataType: 'json',
                contentType: 'application/json'
            })
            .done(function (result) {
                getUnits();
                displayDashboard();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$(document).on('submit', '#delete-lesson', function (event) {
    event.preventDefault();
    console.log("delete hit");
    if (confirm("Are you sure you want to permanently delete this lesson?") === true) {
        const lesson_id = $(this).children("input[type='hidden']").val();
        console.log(lesson_id);
        $.ajax({
                type: 'DELETE',
                url: '/lesson/' + lesson_id,
                dataType: 'json',
                contentType: 'application/json'
            })
            .done(function (result) {
                getLessons();
                displayDashboard();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$(document).on("click", ".detail", function (event) {
    event.preventDefault();
    $(".dashboard").hide();
    $(".subject-shortcuts").hide();
    const lesson_id = $(this).siblings("input[type='hidden']").val();
    console.log(lesson_id);
    genereateLessonDetail(lesson_id);
    window.scrollTo(0, 0);
    $(".lesson-detail").show();
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
            getSubjects();
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
    const class_id = $('.subject-select').val();
    const user_id = $("#loggedInUser").val();
    const newUnitObject = {
        user_id: user_id,
        title: title,
        class_id: class_id,
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
            getUnits();
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
    const subject_id = $('.subject-select').val();
    //need to get the class and unit id's somehow
    const unit_id = $('.unit-select').val();
    const day = $('#lesson-day').val();
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
        day: day,
        stnds: "Standards: " + stnds,
        learningTargets: "Learning Targets: " + learningTargets,
        lessonDetails: "Lesson Details: " + lessonDetails,
        assessment: "Assessment: " + assessment,
        homework: "Independent Practice/Homework: " + homework,
        notes: "Notes: " + notes,
        reflection: "Reflection: " + reflection
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
            getLessons();
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
<input type="text" aria-label="subject-name" name="subject-name" id="subject-name" placeholder="Subject name">
<button type = "submit">Create</button>
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
<button type="submit"">Create</button>
<button type="button" class="cancel-button">Cancel</button>
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
<form id="new-lesson">
<input type="text" aria-label="lesson-title" name="lesson-title" id="lesson-title" placeholder="Lesson title" required="true">
<select class="subject-select" name="subject-name" aria-label="subject-name">
</select>
<select class="unit-select" name="unit-name" aria-label="unit-name">
</select>
<label for="day">Day: </label>
<input required="true" type="number" name="day" min="1" max="180" id="lesson-day" plaeholder="Order in unit: 1, 2, 3, ...">
<textarea form="lesson-title" name="standards" placeholder="Standards" aria-label="standards" id="lesson-stnds"></textarea>
<textarea form="lesson-title" name="learning-targets" id="learning-targets" placeholder="Learning Targets/Objectives" aria-label="learning targets or objectives"></textarea>
<textarea form="lesson-title" name="lesson-details" id="lesson-details" placeholder="Lesson Details" aria-label="lesson details"></textarea>
<textarea form="lesson-title" name="assessment" id="assessment" placeholder="Assessment" aria-label="assessment"></textarea>
<textarea form="lesson-title" name="homework" id="homework" placeholder="Homework/Independent Practice" aria-label="homework/independent practice"></textarea>
<textarea form="lesson-title" name="notes" id="notes" placeholder="Notes" aria-label="notes"></textarea>
<textarea form="lesson-title" name="reflection" id="reflection" placeholder="Reflection: What went well? What needs improvement?" aria-label="reflection"></textarea>
<button type="submit"">Create</button>

</form>
</fieldset>
<button type="button" class="cancel-button">Cancel</button>`);
    $(".create").show();
    getSubjects();
    getUnits();
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
