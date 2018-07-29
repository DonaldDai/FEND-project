/*
This is empty on purpose! Your code to build the resume will go here.
 */

var work = {
    "jobs": [{
        "employer": "Donald Trump",
        "title": "President",
        "location": "white house",
        "dates": "now - future",
        "description": "DT in the house, nothing else to do."
    }]
};

var projects = {
    "projects": [{
        "title": "Steganography",
        "dates": "2016 - now",
        "description": "That is a funny and useful projects for me, and I hope I will go deeper about it.",
        "images": ["./images/Me.jpg", "./images/Me.jpg"]
    }]
};

var bio = {
    "name": "Zhilian DAI",
    "role": "Developer",
    "welcomeMessage": "Hahahahaha",
    "biopic": "images/Me.jpg",
    "contacts": {
        "mobile": "666-666-666",
        "email": "daizhilian@hotmail.com",
        "github": "Donalddai",
        "twitter": "@Donald_D_Z_L",
        "location": "China"
    },
    "skills": [
        "Data Mining",
        "Web Develop",
        "Python"
    ]
};

var education = {
    "schools": [{
        "name": "NCEPU",
        "location": "China",
        "degree": "graduate",
        "dates": "2013 - 2017",
        "url": "http://net.ncepu.edu.cn/DefaultForAuto.aspx",
        "majors": ["Math"]
    }],
    "onlineCourses": [{
        "title": "web-front-engineer",
        "school": "Udacity",
        "dates": "2016 - 2017",
        "url": "cn.udacity.com/"
    }]
};
bio.display = function() {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedWelcomMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    var formattedPic = HTMLbioPic.replace("%data%", bio.biopic);
    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);


    $("#header").prepend(formattedName, formattedRole);
    $("#topContacts").append(formattedMobile, formattedEmail, formattedGithub, formattedTwitter, formattedLocation);
    $("#footerContacts").append(formattedMobile, formattedEmail, formattedGithub, formattedTwitter, formattedLocation);
    $("#header").append(formattedPic, formattedWelcomMessage);

    // if (bio.skills.length > 0) {

    //     var formattedSkill = HTMLskills.replace("%data%", bio.skills[0]);
    //     $("#skills").append(formattedSkill);

    //     formattedSkill = HTMLskills.replace("%data%", bio.skills[1]);
    //     $("#skills").append(formattedSkill);

    //     formattedSkill = HTMLskills.replace("%data%", bio.skills[2]);
    //     $("#skills").append(formattedSkill);
    // }
    $("#header").append(HTMLskillsStart);
    bio.skills.forEach(function(skill) {
        var formattedSkill = HTMLskills.replace("%data%", skill);
        $("#skills").append(formattedSkill);
    });
};

work.display = function() {
    for (var job = 0; job < work.jobs.length; job++) {
        $("#workExperience").append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
        var formattedEmployerTitle = formattedEmployer + formattedTitle;

        $(".work-entry:last").append(formattedEmployerTitle);

        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
        $(".work-entry:last").append(formattedLocation);

        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
        $(".work-entry:last").append(formattedDates);

        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append(formattedDescription);
    }
};

projects.display = function() {
    $("#projects").append(HTMLprojectStart);
    projects.projects.forEach(function(project) {
        var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
        $(".project-entry").append(formattedTitle);
        var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
        $(".project-entry").append(formattedDates);
        var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);
        $(".project-entry").append(formattedDescription);
        project.images.forEach(function(image) {
            var formattedImage = HTMLprojectImage.replace("%data%", image);
            $(".project-entry").append(formattedImage);
        });
    });
};

education.display = function() {
    $("#education").append(HTMLschoolStart);
    for (var i = 0; i < education.schools.length; i++) {
        var formattedName = HTMLschoolName.replace("%data%", education.schools[i].name);
        formattedName = formattedName.replace("#", education.schools[i].url);
        var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);
        var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
        var formattedDates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
        var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[i].majors[0]);

        $(".education-entry:last").append(formattedName + formattedDegree, formattedDates, formattedLocation, formattedMajor);
    }
    $(".education-entry:last").append(HTMLonlineClasses);
    education.onlineCourses.forEach(function(onlineCourse) {
        var formattedTitle = HTMLonlineTitle.replace("%data%", onlineCourse.title);
        formattedTitle = formattedTitle.replace("#", onlineCourse.url);
        var formattedSchool = HTMLonlineSchool.replace("%data%", onlineCourse.school);
        var formattedDates = HTMLonlineDates.replace("%data%", onlineCourse.dates);

        $(".education-entry:last").append(formattedTitle + formattedSchool, formattedDates);
    });
};

bio.display();
work.display();
projects.display();
education.display();
$("#mapDiv").append(googleMap);
