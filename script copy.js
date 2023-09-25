var terms = ['1', '2', '3', '4']
var futureTerms = [{ id: -1, term: "Not Coursed", season: "Not Coursed", name: "notcoursed" }, { id: 0, term: "Coursed", season: "Coursed", name: "coursed" }, { id: 1, term: "Winter/2024", season: "Winter", name: "winter2024" }, { id: 2, term: "Spring Summer/2024", season: "Spring", name: "spring2024" }, { id: 3, term: "Fall/2024", season: "Fall", name: "fall2024" }, { id: 4, term: "Winter/2025", season: "Winter", name: "winter2025" }, { id: 5, term: "Spring Summer/2025", season: "Spring", name: "spring2025" }, { id: 6, term: "Fall/2025", season: "Fall", name: "fall2025" }]
var data = [{ term: '1', code: 'MATH1901', course: 'Math for the Computer Industry', credits: '3', availability: 'Fall/Winter', prerequisite1: '', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{ term: '1', code: 'MGMT1103', course: 'Essential Skills for Teams Collaboration', credits: '3', availability: 'Fall/Winter', prerequisite1: '', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{ term: '1', code: 'SODV1101', course: 'Programming Fundamentals', credits: '3', availability: 'Fall/Winter', prerequisite1: '', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{ term: '1', code: 'TECH1101', course: 'Web and Internet Fundamentals', credits: '3', availability: 'Fall/Winter', prerequisite1: '', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{ term: '1', code: 'TECH1102', course: 'Internet of Things', credits: '3', availability: 'Fall/Winter', prerequisite1: '', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{ term: '2', code: 'DATA1201', course: 'Introduction to Relational Databases', credits: '3', availability: 'Winter/Spring', prerequisite1: 'SODV1101', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{ term: '2', code: 'DESN2301', course: 'User Experience Design', credits: '3', availability: 'Winter/Spring', prerequisite1: '', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{ term: '2', code: 'SODV1201', course: 'Introduction to Web Programming', credits: '3', availability: 'Winter/Spring', prerequisite1: 'SODV1101', prerequisite2: 'TECH1101', prerequisite3: '', prerequisite4: '' },
{
    term: '2', code: 'SODV1202', course: 'Introduction to Object Oriented Programming', credits: '3', availability: 'Winter / Spring', prerequisite1: 'SODV1101', prerequisite2: 'MATH1901', prerequisite3: '', prerequisite4: ''
},
{ term: '2', code: 'TECH1201', course: 'Networking Essentials', credits: '3', availability: 'Winter/Spring', prerequisite1: '', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{ term: '3', code: 'DATA2201', course: 'Relational Databases', credits: '3', availability: 'Fall', prerequisite1: 'DATA1201', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{
    term: '3', code: 'MGMT1104', course: 'Project Management in Software Development', credits: '3', availability: 'Fall', prerequisite1: 'MGMT1103', prerequisite2: '', prerequisite3: '', prerequisite4: ''
},
{ term: '3', code: 'SODV2101', course: 'Rapid Application Development', credits: '3', availability: 'Fall', prerequisite1: 'SODV1202', prerequisite2: 'DATA1201', prerequisite3: '', prerequisite4: '' },
{ term: '3', code: 'SODV2201', course: 'Web Programming', credits: '3', availability: 'Fall', prerequisite1: 'SODV1201', prerequisite2: 'SODV1202', prerequisite3: 'DATA1201', prerequisite4: '' },
{ term: '3', code: 'SODV2202', course: 'Object Oriented Programming', credits: '3', availability: 'Fall', prerequisite1: 'DATA1201', prerequisite2: 'SODV1202', prerequisite3: '', prerequisite4: '' },
{
    term: '4', code: 'SODV2203', course: 'Introduction to Game and Simulation Programming', credits: '3', availability: 'Winter', prerequisite1: 'SODV2202', prerequisite2: '', prerequisite3: '', prerequisite4: ''
},
{ term: '4', code: 'SODV3203', course: 'Mobile Application Development', credits: '3', availability: 'Winter', prerequisite1: '', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{ term: '4', code: 'SODV2401', course: 'Algorithms and Data Structures', credits: '3', availability: 'Winter', prerequisite1: 'SODV1202', prerequisite2: '', prerequisite3: '', prerequisite4: '' },
{
    term: '4', code: 'SODV2999', course: 'Software Development Diploma Capstone Project', credits: '3', availability: 'Winter', prerequisite1: 'DESN2301', prerequisite2: 'MGMT1104', prerequisite3: 'SODV2101', prerequisite4: 'SODV2201'
},
{ term: '4', code: 'TECH2102', course: 'Enterprise Computing', credits: '3', availability: 'Winter', prerequisite1: 'TECH1201', prerequisite2: 'SODV2201', prerequisite3: '', prerequisite4: '' }
]

var board = document.getElementById("board")
var boardSchedule = document.getElementById("board-schedule")
var options = document.getElementById("options")
var boxSelected = ""
var courseSelected = {}
var prerequisited1Selected = {}
var prerequisited2Selected = {}
var prerequisited3Selected = {}
var prerequisited4Selected = {}


for (let i = 0; i < terms.length; i++) {
    let column = document.createElement("div")
    column.id = "term" + terms[i]
    column.className = "column"
    column.innerText = "term" + terms[i]

    board.appendChild(column)

}

for (let i = 1; i < futureTerms.length; i++) {
    let column = document.createElement("div")
    column.id = futureTerms[i].name
    column.className = "column"
    column.innerText = futureTerms[i].term

    boardSchedule.appendChild(column)

}
for (let index = 0; index < data.length; index++) {
    let code = document.createElement("div")
    code.innerText = data[index].code + "\n" + data[index].course
    code.id = "code" + data[index].code
    code.className = "code"
    code.addEventListener("mouseenter", mouseenter)
    code.addEventListener("mouseleave", mouseleave)
    code.addEventListener("click", click)

    let setColumn = document.getElementById("term" + data[index].term)
    setColumn.appendChild(code)
    data[index].columnValue = -1
}

function click() {
    updatePrerequisities()
    
    boxSelected = this
    selected = this.id.substring(4, 12)

    
    $("#options").show("slow")

    let possible = ["Not Coursed"]

    data.forEach(element => {
        if (element.code == selected) {
            courseSelected = element
            console.log(courseSelected);
            futureTerms.forEach(e => {
                if (element.availability.indexOf(e.season) >= 0 || e.season == "Coursed") {
                    possible.push(e.term)
                }

            });
        }
    });



    console.log(possible);
    options.innerHTML = ""

    possible.forEach(p => {
        item = document.createElement("input")
        item.setAttribute('type', 'radio')
        item.setAttribute('name', "option")
        item.setAttribute('id', p)
        item.setAttribute('value', p)
        item.addEventListener("change", optionChanged)
        label = document.createElement("label")
        label.setAttribute("for", p)
        label.innerText = p

        options.appendChild(item)
        options.appendChild(label)
    })

}

function updatePrerequisities(){
    data.forEach(element => {

        if (element.code == courseSelected.prerequisite1) {
            prerequisited1Selected = element
        }
        if (element.code == courseSelected.prerequisite2) {
            prerequisited2Selected = element
        }
        if (element.code == courseSelected.prerequisite3) {
            prerequisited3Selected = element
        }
        if (element.code == courseSelected.prerequisite4) {
            prerequisited4Selected = element
        }

        console.log("prerequisites");
        console.log(prerequisited1Selected);
        console.log(prerequisited2Selected);
        console.log(prerequisited4Selected);
        console.log(prerequisited4Selected);

    })

}

function optionChanged() {
    console.log("changed");

    optionsAvailable = document.getElementsByName("option")
    optionSelected = ""
    optionsAvailable.forEach(o => {
        if (o.checked) {
            optionSelected = o.value
        }
    })

    var nameColumn = ""
    var columnValue = 

    // if(optionSelected == "Not Coursed"){
    //     courseSelected.scheduled = false
    // }else{
    //     courseSelected.scheduled = true
    // }

    futureTerms.forEach(f => {
        if (f.term == optionSelected) {
            nameColumn = f.name
            columnValue = f.id
        }
    })
    console.log(nameColumn)

    newElement = this

    console.log(optionSelected);
    if (optionSelected == "Not Coursed") {
        console.log(boxSelected.id.substring(4, 12));
        let setColumn = ""
        data.forEach(d => {
            if (d.code == boxSelected.id.substring(4, 12)) {
                setColumn = d.term
            }
        })
        document.getElementById("term" + setColumn).appendChild(boxSelected)
        courseSelected.columnValue = -1

    } else {

        futureTerms.forEach(t => {
            if(t.name == optionSelected){

            }
        })
        // if (checkRequisites(optionSelected)) {
        //     console.log(optionSelected)
            document.getElementById(nameColumn).appendChild(boxSelected)
        // }

    }

    $("#options").hide("slow")
}

function checkRequisites(c) {
    if (prerequisited1Selected != {}) {
        console.log("prerequisited1Selected")
        console.log(prerequisited1Selected)
    }


    return true
}

function mouseenter() {

    this.classList.add("selected")
    let code = (this.id).substring(4, 12)

    let selected = data.filter(c => c.code == code)
    if (selected[0].prerequisite1 != "") {
        let prerequisite1 = document.getElementById("code" + selected[0].prerequisite1)
        prerequisite1.classList.add("prerequisite")
    }
    if (selected[0].prerequisite2 != "") {
        let prerequisite2 = document.getElementById("code" + selected[0].prerequisite2)
        prerequisite2.classList.add("prerequisite")
    }
    if (selected[0].prerequisite3 != "") {
        let prerequisite3 = document.getElementById("code" + selected[0].prerequisite3)
        prerequisite3.classList.add("prerequisite")
    }
    if (selected[0].prerequisite4 != "") {
        let prerequisite4 = document.getElementById("code" + selected[0].prerequisite4)
        prerequisite4.classList.add("prerequisite")
    }
    data.forEach(element => {
        if (element.prerequisite1 == code ||
            element.prerequisite2 == code ||
            element.prerequisite3 == code ||
            element.prerequisite4 == code
        ) {
            document.getElementById("code" + element.code).classList.add("posrequisite")
        }

    });

}
function mouseleave() {

    this.classList.remove("selected")
    data.forEach(element => {
        document.getElementById("code" + element.code).classList.remove("prerequisite")
        document.getElementById("code" + element.code).classList.remove("posrequisite")

    })


}


function addCoursed(codeCourse) {

    document.getElementById("code" + codeCourse).classList.add("coursed")

}


