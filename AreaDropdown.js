export function area_dropdown_change(){
    document.getElementById("select_requirement").addEventListener("change",function(e){
    if (e.target.value == "Primary Major") {
            clear_select_area_dropdown();
            append_unselected_area();
            append_area_options("primary_major_areas");
    }
    else if (e.target.value == "General Education") {
            clear_select_area_dropdown();
            append_unselected_area();
            append_area_options("general_education_areas");
    }
    else {
            clear_select_area_dropdown();
            append_unselected_area()
    }
    })
}

export function clear_select_area_dropdown() {
    document.getElementById("select_area").replaceChildren();
}

export function append_unselected_area() {
    let default_message = document.createElement("option");
    default_message.textContent = "Select Area";
    document.getElementById("select_area").append(default_message);
}

export function append_area_options(course_requirement_areas_id) {
    Array.from(document.getElementById(course_requirement_areas_id).children).forEach(function(child){
            let appended_option = document.createElement("option");
            appended_option.textContent = child.textContent;
            document.getElementById("select_area").append(appended_option);
        });
}