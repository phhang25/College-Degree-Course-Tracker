function webDataEmpty () {
    return localStorage.length === 0 || localStorage.getItem('') === '{}';
}


//DRAFT RECTANGLE
function createDraftRectangle() {
    const draft_rectangle = document.createElement('div');
    draft_rectangle.className = 'draft_rectangle_template';
    draft_rectangle.textContent = '+';
    draft_rectangle.addEventListener('mouseover', makeBorderDashedUponMouseOver);
    draft_rectangle.addEventListener('mouseleave', makeBorderSolidUponMouseLeave);
    draft_rectangle.addEventListener('click', removeElementUponClick);
    draft_rectangle.addEventListener('click', appendMessageBoxToBodyAndFocusInput);
    
    return draft_rectangle;
}

function makeBorderDashedUponMouseOver(event) {
    event.target.style.borderStyle = 'dashed';
    if (event.target.className === 'draft_course_template') {
        event.target.style.marginBottom = '8.4px';
    }
    else if (event.target.className === 'draft_area_template') {
        event.target.style.marginBottom = '6.8px';
    }
}

function makeBorderSolidUponMouseLeave(event) {
    event.target.style.borderStyle = 'solid';
}

function makeBorderTransparentUponMouseLeave(event) {
    event.target.style.borderStyle = '';
    if (event.target.className === 'draft_course_template') {
        event.target.style.marginBottom = '10px';
    }
    else if (event.target.className === 'draft_area_template') {
        event.target.style.marginBottom = '10px';
    }
}

function boldTextUponMouseOver(event) {
    event.target.style.fontWeight = 'bold';
}

function unboldTextUponMouseLeave(event) {
    event.target.style.fontWeight = 'lighter';
}

function removeElementUponClick(event) {
    event.target.remove();
}

function appendMessageBoxToBodyAndFocusInput() {
    const message_box = createMessageBox();
    document.body.append(message_box);
    message_box.lastChild.focus();
}

function removeElementUponMouseLeave(event) {
    event.target.remove();
}

function addMessageUponMouseOver(event) {
    if (event.target.className === 'draft_area_template') {
        event.target.textContent = 'Add a new course area';
    }
    else if (event.target.className === 'draft_course_template') {
        event.target.textContent = 'Add a new course';
    }
}

//MESSAGE BOX
function createMessageBox() {
    const message_box = document.createElement('div');
    message_box.className = 'message_box_template';
    message_box.addEventListener('mouseleave', appendDraftRectangleToBodyUponMouseLeave);
    message_box.addEventListener('mouseleave', removeElementUponMouseLeave);
    
    const message_box_text = document.createElement('p');
    message_box_text.textContent = 'Enter a requirement:';
    message_box_text.className = 'message_box_text';
    message_box.append(message_box_text);

    const message_box_input = document.createElement('input');
    message_box_input.className = 'message_box_input';
    message_box_input.placeholder = 'Type a course requirement and hit Enter.';
    message_box_input.addEventListener('keydown', loadRectanglesUponEnter);   
    message_box.append(message_box_input);
    
    return message_box;
}

function loadRectanglesUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '' & !requirementExistsForRequirementInput(event)) {
        parseRequirementInputToLocalStorage(event);
        appendRectangleToBodyUponEnter(event);
        appendDraftRectangleToBodyUponEnter(event);
        removeMessageBoxUponEnter(event);
    }
}

function requirementExistsForRequirementInput(event) {
    const web_data_JSON = getJSONOfWebData();
    const requirement_string = event.target.value;
    return requirement_string in web_data_JSON;
}

function appendRectangleToBodyUponEnter(event) {
        
    const rectangle = createRectangle();

    const requirement = createRequirement();
    requirement.textContent = event.target.value;
    rectangle.append(requirement);

    const draft_area = createDraftArea();
    rectangle.append(draft_area);

    document.body.append(rectangle);
        
}

function appendDraftRectangleToBodyUponEnter(event) {
    const draft_rectangle = createDraftRectangle();
    document.body.append(draft_rectangle);
}

function removeMessageBoxUponEnter(event) {
    event.target.parentElement.remove();
}

function parseRequirementInputToLocalStorage(event) {
    
    const parsed_requirement_string = event.target.value;

    const JSON_of_web_data = getJSONOfWebData();

    JSON_of_web_data[parsed_requirement_string] = {}; 

    const stringified_JSON_of_web_data = JSON.stringify(JSON_of_web_data);

    localStorage.setItem('', stringified_JSON_of_web_data);

}

function appendDraftRectangleToBodyUponMouseLeave() {
    if (document.body.lastChild.className !== 'draft_rectangle_template') {
        const draft_rectangle = createDraftRectangle();
        document.body.append(draft_rectangle);
    }
}

//RECTANGLE
function createRectangle() {
    const rectangle = document.createElement('div');
    rectangle.className = 'rectangle_template';

    return rectangle;
}

//REQUIREMENT
function createRequirement() {
    const requirement = document.createElement('div');
    requirement.className = 'requirement_template';
    requirement.addEventListener('mouseover', boldTextUponMouseOver);
    requirement.addEventListener('mouseleave', unboldTextUponMouseLeave);
    requirement.addEventListener('click', loadEditBoxUponClickingRequirement);

    return requirement;
}

function loadEditBoxUponClickingRequirement(event) {

    if (event.target.parentElement.lastChild.className !== 'edit_box_template') {
        const requirement_string = event.target.textContent;

        const edit_box = createEditBox(); 
        edit_box.firstChild.textContent = requirement_string;
        edit_box.id = 'requirement';
        
        event.target.parentElement.append(edit_box);
        event.target.parentElement.style.position = 'relative';
        edit_box.style.left = '80%';
        edit_box.style.top = '0%';
    }
}

//DRAFT AREA
function createDraftArea() {
    const draft_area = document.createElement('div');
    draft_area.className = 'draft_area_template';

    draft_area.addEventListener('mouseover', makeBorderDashedUponMouseOver);
    draft_area.addEventListener('mouseover', addMessageUponMouseOver);
    draft_area.addEventListener('mouseleave', makeBorderTransparentUponMouseLeave);
    draft_area.addEventListener('mouseleave', removeMessageUponMouseLeave);
    draft_area.addEventListener('click', appendAreaInputUponClickAndFocus);
    draft_area.addEventListener('click', removeElementUponClick);

    return draft_area;
}

function appendAreaInputUponClickAndFocus(event) {
    const area_input = createAreaInput();
    area_input.style.marginBottom = '4.8px';
    event.target.parentElement.append(area_input);
    area_input.focus();
}

//AREA INPUT
function createAreaInput() {
    const area_input = document.createElement('input');
    area_input.className = 'area_input_template';
    area_input.placeholder = 'Type a course area and hit Enter.';

    area_input.addEventListener('mouseleave', appendDraftAreaUponMouseLeave);
    area_input.addEventListener('mouseleave', removeElementUponMouseLeave);
    area_input.addEventListener('keydown', loadAreaUponEnter);
    
    return area_input;
}

function appendDraftAreaUponMouseLeave(event) {
    const draft_area = createDraftArea();
    event.target.parentElement.append(draft_area);
}

function areaExistsForAreaInput(event) {
    const web_data_JSON = getJSONOfWebData();
    const area_string = event.target.value;
    const requirement_string = event.target.parentElement.firstChild.textContent;
    
    return area_string in web_data_JSON[requirement_string];
}

function loadAreaUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '' & !areaExistsForAreaInput(event)){
        parseAreaInputToLocalStorage(event);
        appendAreaUponEnter(event);
        appendDraftAreaUponEnter(event);
        removeAreaInputUponEnter(event);
    }
}

function appendAreaUponEnter(event) {
    const area = createArea();
    area.firstChild.textContent = event.target.value;
    event.target.parentElement.append(area);

    const draft_course = createDraftCourse();
    area.append(draft_course);
}

function appendDraftAreaUponEnter(event) {
    const draft_area = createDraftArea();
    event.target.parentElement.append(draft_area);
}

function removeAreaInputUponEnter(event) {
    event.target.remove();
}

function parseAreaInputToLocalStorage(event) {
    const area_input_string = event.target.value;

    const requirement_string = event.target.parentElement.firstChild.textContent;

    const web_data_JSON = getJSONOfWebData();

    web_data_JSON[requirement_string][area_input_string] = {};

    const stringified_JSON_of_web_data = JSON.stringify(web_data_JSON);

    localStorage.setItem('', stringified_JSON_of_web_data);
}

function removeMessageUponMouseLeave(event) {
    event.target.textContent = '';
}

//AREA
function createArea() {
    const area_container = document.createElement('div');
    area_container.className = 'area_container_template';

    const area = document.createElement('div');
    area.className = 'area_template';
    area_container.append(area);

    area.addEventListener('mouseover', boldTextUponMouseOver);
    area.addEventListener('mouseleave', unboldTextUponMouseLeave);
    area.addEventListener('click', loadEditBoxUponClickingArea);

    return area_container;
}

function loadEditBoxUponClickingArea(event) {
    if (event.target.parentElement.lastChild.className !== 'edit_box_template') {
        
        const area_string = event.target.textContent;

        const edit_box = createEditBox(); 
        edit_box.firstChild.textContent = area_string;
        edit_box.id = 'area';
        
        event.target.parentElement.append(edit_box);
        event.target.parentElement.style.position = 'relative';
        edit_box.style.left = '80%';
        edit_box.style.top = '0%';
    }
}

//DRAFT COURSE
function createDraftCourse() {
    const draft_course = document.createElement('div');
    draft_course.className = 'draft_course_template';
    draft_course.addEventListener('mouseover', makeBorderDashedUponMouseOver);
    draft_course.addEventListener('mouseover', addMessageUponMouseOver);
    draft_course.addEventListener('mouseleave', makeBorderTransparentUponMouseLeave);
    draft_course.addEventListener('mouseleave', removeMessageUponMouseLeave);
    draft_course.addEventListener('click', appendCourseInputUponClickAndFocus);
    draft_course.addEventListener('click', removeElementUponClick);
    
    return draft_course;
}

function appendCourseInputUponClickAndFocus(event) {
    const course_input = createCourseInput();
    course_input.style.marginBottom = '6.4px';
    course_input.placeholder = 'Course Name > Course Status'
    event.target.after(course_input);
    course_input.focus();
}

//COURSE INPUT
function createCourseInput() {
    const course_input = document.createElement('input');
    course_input.className = 'course_input_template';

    course_input.addEventListener('mouseleave', appendDraftCourseUponMouseLeave);
    course_input.addEventListener('mouseleave', removeElementUponMouseLeave);
    course_input.addEventListener('keydown', loadCoursesUponEnter);

    return course_input;
}

function loadCoursesUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '' & !courseExists(event)) {
        parseCourseInputToLocalStorage(event);
        appendCourseAndDraftCourseUponEnter(event);
    }
}

function courseExists(event) {
    const web_data_JSON = getJSONOfWebData();
    const requirement_string = event.target.parentElement.parentElement.firstChild.textContent;
    const area_string = event.target.parentElement.firstChild.textContent;
    const user_input = event.target.value;
    const user_input_split = user_input.split(' > ');
    let course_string = '';

    if (user_input_split.length === 1 || user_input_split.length === 2) {
        course_string = user_input_split[0];
        return course_string in web_data_JSON[requirement_string][area_string];
    }
}

function parseCourseInputToLocalStorage(event) {
    const course_input_string = event.target.value;
    const input_split_array = course_input_string.split(' > ');

    const JSON_of_web_data = getJSONOfWebData();
    const requirement_string = event.target.parentElement.parentElement.firstChild.textContent;
    const area_string = event.target.parentElement.firstChild.textContent;
    
    let course_name_string = '';
    let course_status_string = '';

    if (input_split_array.length === 1) {
        course_name_string = course_input_string;
        course_status_string = 'not satisfied';
    }
    else if (input_split_array.length === 2) {
        course_name_string = input_split_array[0];
        course_status_string = input_split_array[1];
    }

    JSON_of_web_data[requirement_string][area_string][course_name_string] = course_status_string;
    const stringified_JSON_of_web_data = JSON.stringify(JSON_of_web_data);
    localStorage.setItem('', stringified_JSON_of_web_data);
}

function appendDraftCourseUponMouseLeave(event) {
    const draft_course = createDraftCourse();
    event.target.after(draft_course);
}

function appendCourseAndDraftCourseUponEnter(event) {
    const course = createCourse();
    const area = event.target.parentElement;

    const course_input_string = event.target.value;
    const input_split_array = course_input_string.split(' > ');

    if (input_split_array.length === 1) {
        const course_name_string = course_input_string;
        const course_status_string = 'not satisfied';
        course.firstChild.textContent = course_name_string;
        course.firstChild.nextSibling.textContent = course_status_string;   
    }

    else if (input_split_array.length === 2) {
        const course_name_string = input_split_array[0];
        const course_status_string = input_split_array[1];
        course.firstChild.textContent = course_name_string;
        course.firstChild.nextSibling.textContent = course_status_string;
    }

    area.append(course);

    const draft_course = createDraftCourse();
    area.append(draft_course);

    event.target.remove();
}

//COURSE
function createCourse() {
    const course = document.createElement('div');
    course.className = 'course_status_container_template';

    const course_name = document.createElement('p');
    course_name.className = 'course_name_template';
    course.append(course_name);

    const course_status = document.createElement('p');
    course_status.className = 'course_status_template';
    course.append(course_status);

    course_name.addEventListener('mouseover', boldTextUponMouseOver);
    course_name.addEventListener('mouseleave', unboldTextUponMouseLeave);
    course_name.addEventListener('click', loadEditBoxUponClickingCourse);

    course_status.addEventListener('mouseover', boldTextUponMouseOver);
    course_status.addEventListener('mouseleave', unboldTextUponMouseLeave);
    course_status.addEventListener('click', loadEditBoxUponClickingCourse);

    return course;
}

function loadEditBoxUponClickingCourse(event) {
    if (event.target.parentElement.lastChild.className !== 'edit_box_template') {
        
        const course_string = event.target.parentElement.firstChild.textContent;
        const status_string = event.target.parentElement.firstChild.nextSibling.textContent;

        const edit_box = createEditBox(); 
        edit_box.firstChild.textContent = course_string + ' > ' + status_string;
        edit_box.id = 'course';
        
        event.target.parentElement.append(edit_box);
        event.target.parentElement.style.position = 'relative';
        edit_box.style.left = '80%';
        edit_box.style.top = '0%';
    }
}

//EDIT BOX
function createEditBox() {
    const edit_box = document.createElement('div');
    edit_box.className = 'edit_box_template';

    const edit_box_text = document.createElement('p');
    edit_box_text.className = 'edit_box_text_template';
    edit_box.append(edit_box_text);

    const update_option = document.createElement('div');
    update_option.className = 'edit_box_option_template';
    update_option.textContent = 'Update';
    update_option.style.backgroundColor = 'orange';
    edit_box.append(update_option);
    update_option.addEventListener('mouseover', boldTextUponMouseOver);
    update_option.addEventListener('mouseleave', unboldTextUponMouseLeave);
    update_option.addEventListener('click', appendUpdateInput);
    update_option.addEventListener('click', removeUpdateOption);

    const delete_option = document.createElement('div');
    delete_option.className = 'edit_box_option_template';
    delete_option.textContent = 'Delete'
    delete_option.style.backgroundColor = 'red';
    edit_box.append(delete_option);
    delete_option.addEventListener('mouseover', boldTextUponMouseOver);
    delete_option.addEventListener('mouseleave', unboldTextUponMouseLeave);
    delete_option.addEventListener('click', removeFieldFromLocalStorage);
    delete_option.addEventListener('click', removeRectangleUponClickingDeleteRequirement);

    const cancel_option = document.createElement('div');
    cancel_option.textContent = 'Cancel';
    cancel_option.className = 'edit_box_option_template';
    cancel_option.style.backgroundColor = 'lightgray'
    edit_box.append(cancel_option);
    cancel_option.addEventListener('mouseover', boldTextUponMouseOver);
    cancel_option.addEventListener('mouseleave', unboldTextUponMouseLeave);
    cancel_option.addEventListener('click', cancelEditBoxInteraction);

    return edit_box;
}

function removeUpdateOption(event) {
    event.target.remove();
} 

function createUpdateInput() {
    const update_input = document.createElement('input');
    update_input.className = 'update_input_template';
    update_input.placeholder = 'Enter an update.'

    update_input.addEventListener('mouseleave', appendUpdateOption);
    update_input.addEventListener('mouseleave', removeUpdateInput);
    update_input.addEventListener('keydown', loadUpdatedInput);

    return update_input;
}

function appendUpdateInput(event) {
    const update_input = createUpdateInput();
    update_input.id = event.target.parentElement.id;
    event.target.after(update_input);
    update_input.focus();
}

function duplicateExistsForField(event) {
    const field_name_string = event.target.value;
    const field_type_string = event.target.parentElement.id;
    
    if (field_type_string === 'requirement') {
        const array_of_requirements = getArrayOfRequirements();
        return array_of_requirements.includes(field_name_string);
    }
    else if (field_type_string === 'area') {
        const requirement_string = event.target.parentElement.parentElement.parentElement.firstChild.textContent;
        const array_of_areas = getArrayOfAreas(requirement_string);
        return array_of_areas.includes(field_name_string);
    }
    else if (field_type_string === 'course') {
        const field_name_split_array = field_name_string.split(' > '); 
        let course_string = '';
        const requirement_string = event.target.parentElement.parentElement.parentElement.firstChild.textContent;
        const area_string = event.target.parentElement.parentElement.firstChild.textContent;
        if (field_name_split_array.length === 1) {
            course_string = field_name_split_array[0];
        }
        else if (field_name_split_array.length === 2) {
            course_string = field_name_split_array[0];
        }
    }
}

function appendUpdateOption(event) {
    const update_option = document.createElement('div');
    update_option.className = 'edit_box_option_template';
    update_option.textContent = 'Update';
    update_option.style.backgroundColor = 'orange';
    event.target.after(update_option);
    update_option.addEventListener('mouseover', boldTextUponMouseOver);
    update_option.addEventListener('mouseleave', unboldTextUponMouseLeave);
    update_option.addEventListener('click', appendUpdateInput);
    update_option.addEventListener('click', removeUpdateOption);
}

function removeUpdateInput(event) {
    event.target.remove();
}

function loadUpdatedInput(event) {
    if (event.key === 'Enter' & event.target.value !== '' & !duplicateExistsForField(event)) {
        if (event.target.parentElement.id === 'requirement') {
            parseUpdatedRequirementToLocalStorage(event);
            changeTextContentOfRequirement(event);
            removeEditBoxUponEnter(event);
        }
        else if (event.target.parentElement.id === 'area') {
            parseUpdatedAreaToLocalStorage(event);
            changeTextContentOfArea(event);
            removeEditBoxUponEnter(event);
        }
        else if (event.target.parentElement.id === 'course') {
            parseUpdatedCourseToLocalStorage(event);
            changeTextContentOfCourse(event);
            removeEditBoxUponEnter(event);
        }
    }
}

function parseUpdatedRequirementToLocalStorage(event) {
    const new_requirement_string = event.target.value;
    const updated_requirement_string = event.target.parentElement.firstChild.textContent;
    const web_data_JSON = getJSONOfWebData();
    const updated_web_json = {};
    for (const [requirement_string, data] of Object.entries(web_data_JSON)) {
        if (requirement_string !== updated_requirement_string) {
            updated_web_json[requirement_string] = data;
        }
        else if (requirement_string === updated_requirement_string) {
            updated_web_json[new_requirement_string] = data;
        }
    }

    stringified_updated_web_json = JSON.stringify(updated_web_json);
    localStorage.setItem('', stringified_updated_web_json);
}

function changeTextContentOfRequirement(event) {
    event.target.parentElement.parentElement.firstChild.textContent = event.target.value;
}

function parseUpdatedAreaToLocalStorage(event) {
    const new_area_string = event.target.value;
    const updated_area_string = event.target.parentElement.firstChild.textContent;
    const web_data_JSON = getJSONOfWebData();
    const requirement_string = event.target.parentElement.parentElement.parentElement.firstChild.textContent;
    const requirement_json = web_data_JSON[requirement_string];
    const updated_requirement_json = {};
    for (const [area_string, data] of Object.entries(requirement_json)) {
        if (area_string !== updated_area_string) {
            updated_requirement_json[area_string] = data;
        }
        else if (area_string === updated_area_string) {
            updated_requirement_json[new_area_string] = data;
        }
    }
    web_data_JSON[requirement_string] = updated_requirement_json;
    const stringified_JSON_of_web_data = JSON.stringify(web_data_JSON);
    localStorage.setItem('', stringified_JSON_of_web_data);
}

function changeTextContentOfArea(event) {
    event.target.parentElement.parentElement.firstChild.textContent = event.target.value;
}

function parseUpdatedCourseToLocalStorage(event) {
    const new_course_status_string = event.target.value;
    const new_course_status_string_split_array = new_course_status_string.split(' > ');
    let new_course_name = '';
    let new_course_status = '';
    if (new_course_status_string_split_array.length === 1) {
        new_course_name = new_course_status_string_split_array[0];
        new_course_status = 'not satisfied';
    }
    else if (new_course_status_string_split_array.length === 2) {
        new_course_name = new_course_status_string_split_array[0];
        new_course_status = new_course_status_string_split_array[1];
    }

    const updated_course_status_string = event.target.parentElement.firstChild.textContent;
    const updated_course_status_string_split_array = updated_course_status_string.split(' > ');
    const updated_name_string = updated_course_status_string_split_array[0];
    const web_data_JSON = getJSONOfWebData();
    const requirement_string = event.target.parentElement.parentElement.parentElement.parentElement.firstChild.textContent;
    const area_string = event.target.parentElement.parentElement.parentElement.firstChild.textContent;
    const area_json = web_data_JSON[requirement_string][area_string];
    const updated_area_json = {};

    for (const [course_string, data] of Object.entries(area_json)) {
        if (course_string !== updated_name_string) {
            updated_area_json[course_string] = data;
        }
        else if (course_string === updated_name_string) {
            updated_area_json[new_course_name] = new_course_status;
        }
    }

    web_data_JSON[requirement_string][area_string] = updated_area_json;
    const stringified_JSON_of_web_data = JSON.stringify(web_data_JSON);
    localStorage.setItem('', stringified_JSON_of_web_data);
}

function changeTextContentOfCourse(event) {
    const course_status_string = event.target.value;
    const course_status_string_split_array = course_status_string.split(' > ');
    if (course_status_string_split_array.length === 1) {
        event.target.parentElement.parentElement.firstChild.textContent = course_status_string_split_array[0];
    }
    else if (course_status_string_split_array.length === 2) {
        event.target.parentElement.parentElement.firstChild.textContent = course_status_string_split_array[0];
        event.target.parentElement.parentElement.firstChild.nextSibling.textContent = course_status_string_split_array[1];
    }
}

function removeEditBoxUponEnter(event) {
    event.target.parentElement.remove();
}

function removeRectangleUponClickingDeleteRequirement(event) {
    event.target.parentElement.parentElement.remove();
}

function removeFieldFromLocalStorage(event) {
    const web_data_JSON = getJSONOfWebData();
    const field_type_string = event.target.parentElement.id;
    if (field_type_string === 'requirement') {
        delete web_data_JSON[event.target.parentElement.firstChild.textContent];
    }
    else if (field_type_string === 'area') {
        const requirement_string = event.target.parentElement.parentElement.parentElement.firstChild.textContent;
        const area_string = event.target.parentElement.parentElement.firstChild.textContent
        delete web_data_JSON[requirement_string][area_string];
        console.log(web_data_JSON);
    }
    else if (field_type_string === 'course') {
        const requirement_string = event.target.parentElement.parentElement.parentElement.parentElement.firstChild.textContent;
        const area_string = event.target.parentElement.parentElement.parentElement.firstChild.textContent;
        const course_name = event.target.parentElement.parentElement.firstChild.textContent;

        delete web_data_JSON[requirement_string][area_string][course_name]
    }
    const stringified_JSON_of_web_data = JSON.stringify(web_data_JSON);
    localStorage.setItem('', stringified_JSON_of_web_data);
}

function cancelEditBoxInteraction(event) {
    event.target.parentElement.remove();
}

function getJSONOfWebData() {
    if (!webDataEmpty()) {
        const web_data_JSON = JSON.parse(localStorage.getItem(''));
        return web_data_JSON;
    }
    return {};
}

function getArrayOfRequirements() {
    if (!webDataEmpty()) {
        const array_of_requirements = Object.keys(getJSONOfWebData());
        return array_of_requirements;
    }
    return [];
}

function getArrayOfAreas(requirement_string) {
    const array_of_areas = Object.keys(getJSONOfWebData()[requirement_string]);
    return array_of_areas;
}

function getMapOfCourseStatusPairs(requirement_string, area_string) {
    const area_data_obj = getJSONOfWebData()[requirement_string][area_string];
    const area_data_map = new Map(Object.entries(area_data_obj));
    return area_data_map;
}


function loadExistingCourseDataOntoWebPage() {
    if (!webDataEmpty()){
        for (const requirement_string of getArrayOfRequirements()) {
            const rectangle = createRectangle();
            document.body.append(rectangle);

            const requirement = createRequirement();
            requirement.textContent = requirement_string;
            rectangle.append(requirement);

            for (const area_string of getArrayOfAreas(requirement_string)) {
                const area = createArea();
                area.firstChild.textContent = area_string;
                rectangle.append(area);

                for (const [course_string, course_status] of getMapOfCourseStatusPairs(requirement_string, area_string)) {
                    const course = createCourse();
                    course.firstChild.textContent = course_string;
                    course.firstChild.nextSibling.textContent = course_status;
                    area.append(course);
                }

                const draft_course = createDraftCourse();
                area.append(draft_course);
            }
            
            const draft_area = createDraftArea();

            rectangle.append(draft_area);
        }
    }
}

loadExistingCourseDataOntoWebPage();

function loadBottomDraftRectangle() {
    const draft_rectangle = createDraftRectangle();

    document.body.append(draft_rectangle);
}

loadBottomDraftRectangle();