let initial_course_box_element = document.getElementById("initial_course_box");

initial_course_box_element.addEventListener("mouseover", makeboxdashed);

function makeboxdashed(e) {
    e.target.style.borderStyle = "dashed";
}

initial_course_box_element.addEventListener("mouseleave", makeboxsolid);

function makeboxsolid(e) {
    e.target.style.borderStyle = "solid";
}

initial_course_box_element.addEventListener("click", e => {
    e.target.textContent = "";
    e.target.style.backgroundColor = "lightblue";
    e.target.style.borderStyle = "solid";
    e.target.style.cursor = "default";
    initial_course_box_element.removeEventListener("mouseover",makeboxdashed);
    initial_course_box_element.removeEventListener("mouseleave",makeboxsolid);
});