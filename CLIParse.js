

export function get_course_prefix() {
    document.getElementById("cli-course-numbers").addEventListener("keydown", function(e) {
        if (e.key == "Enter") {
            let parsed_input = document.getElementById("cli-course-prefix").value;
            console.log(parsed_input);
            return parsed_input;
        }
    });
}

export function get_course_numbers() {
    document.getElementById("cli-course-numbers").addEventListener("keydown", function(e) {
        if (e.key == "Enter") {
            let parsed_input = this.value.split(" ");
            this.value = "";
            console.log(parsed_input);
            return parsed_input
        }
    });
}

export function get_area() {
    document.getElementById("cli-course-numbers").addEventListener("keydown", function(e) {
        if (e.key == "Enter") {
            console.log("string_to_set: "+ string_to_set);
            return string_to_set;
        }
    });   
}

export function parse_dropdown(){
    document.getElementById("select_area").addEventListener("change", function(e) {
        string_to_set = e.target.value;
    });
}

export function get_action() {
    document.getElementById("select_action").addEventListener("change", function(e) {
        return e.target.value;
    });
}

export function get_dictionary_of_CLI() {
    let CLI_dictionary = {
        "course_prefix" : get_course_prefix(),
        "course_numbers" : get_course_numbers(),
        "area" : get_area(),
        "action": get_action()
    };
    console.log(CLI_dictionary);
    return CLI_dictionary;
}