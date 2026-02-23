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
}

function makeBorderSolidUponMouseLeave(event) {
    event.target.style.borderStyle = 'solid';
}

function makeBorderTransparentUponMouseleave(event) {
    event.target.style.borderStyle = '';
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

function removeParentUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        event.target.parentElement.remove(); 
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
    message_box_input.addEventListener('keydown', appendRectangleToBodyUponEnter);
    message_box_input.addEventListener('keydown', parseRequirementInputToLocalStorage);
    message_box_input.addEventListener('keydown', appendDraftRectangleToBodyUponEnter);
    message_box_input.addEventListener('keydown', removeParentUponEnter);        
    message_box.append(message_box_input);
    
    return message_box;
}

function addMessageUponMouseOver(event) {
    if (event.target.className === 'draft_area_template') {
        event.target.textContent = 'Add a new course area';
    }
    else if (event.target.className === 'draft_course_template') {
        event.target.textContent = 'Add a new course';
    }
}

function parseRequirementInputToLocalStorage(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        const parsed_requirement_string = event.target.value;

        const JSON_of_web_data = getJSONOfWebData();

        JSON_of_web_data[parsed_requirement_string] = {}; 

        const stringified_JSON_of_web_data = JSON.stringify(JSON_of_web_data);

        localStorage.setItem('', stringified_JSON_of_web_data);
    }
}   

function appendRectangleToBodyUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        const rectangle = createRectangle();

        const requirement = createRequirement();
        requirement.textContent = event.target.value;
        rectangle.append(requirement);

        const draft_area = createDraftArea();
        rectangle.append(draft_area);

        document.body.append(rectangle);
    } 
}

function appendDraftRectangleToBodyUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        const draft_rectangle = createDraftRectangle();
        document.body.append(draft_rectangle);
    }
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
    return requirement;
}

//DRAFT AREA
function createDraftArea() {
    const draft_area = document.createElement('div');
    draft_area.className = 'draft_area_template';

    draft_area.addEventListener('mouseover', makeBorderDashedUponMouseOver);
    draft_area.addEventListener('mouseover', addMessageUponMouseOver);
    draft_area.addEventListener('mouseleave', makeBorderTransparentUponMouseleave);
    draft_area.addEventListener('mouseleave', removeMessageUponMouseLeave);
    draft_area.addEventListener('click', appendAreaInputUponClickAndFocus);
    draft_area.addEventListener('click', removeElementUponClick);

    return draft_area;
}

function appendAreaInputUponClickAndFocus(event) {
    const area_input = createAreaInput();
    event.target.parentElement.append(area_input);
    area_input.focus();
}

//AREA INPUT
function createAreaInput() {
    const area_input = document.createElement('input');
    area_input.className = 'area_input_template';

    area_input.addEventListener('mouseleave', appendDraftAreaUponMouseLeave);
    area_input.addEventListener('mouseleave', removeElementUponMouseLeave);
    area_input.addEventListener('keydown', parseAreaInputToLocalStorage);
    area_input.addEventListener('keydown', appendAreaUponEnter);
    area_input.addEventListener('keydown', appendDraftAreaUponEnter);
    area_input.addEventListener('keydown', removeAreaInputUponEnter);
    
    return area_input;
}

function appendDraftAreaUponMouseLeave(event) {
    const draft_area = createDraftArea();
    event.target.parentElement.append(draft_area);
}

function parseAreaInputToLocalStorage(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        const area_input_string = event.target.value;

        const requirement_string = event.target.parentElement.firstChild.textContent;

        const web_data_JSON = getJSONOfWebData();

        web_data_JSON[requirement_string][area_input_string] = {};

        const stringified_JSON_of_web_data = JSON.stringify(web_data_JSON);

        localStorage.setItem('', stringified_JSON_of_web_data);
    }
}

function appendAreaUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        const area = createArea();
        area.firstChild.textContent = event.target.value;
        event.target.parentElement.append(area);

        const draft_course = createDraftCourse();
        area.append(draft_course);
    }
}

function appendDraftAreaUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        const draft_area = createDraftArea();
        event.target.parentElement.append(draft_area);
    }
}

function removeAreaInputUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        event.target.remove();
    }
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

    return area_container;
}

//DRAFT COURSE
function createDraftCourse() {
    const draft_course = document.createElement('div');
    draft_course.className = 'draft_course_template';
    draft_course.addEventListener('mouseover', makeBorderDashedUponMouseOver);
    draft_course.addEventListener('mouseover', addMessageUponMouseOver);
    draft_course.addEventListener('mouseleave', makeBorderTransparentUponMouseleave);
    draft_course.addEventListener('mouseleave', removeMessageUponMouseLeave);
    draft_course.addEventListener('click', appendCourseInputUponClickAndFocus);
    draft_course.addEventListener('click', removeElementUponClick);
    
    return draft_course;
}

function appendCourseInputUponClickAndFocus(event) {
    const course_input = createCourseInput();
    event.target.after(course_input);
    course_input.focus();
}

//COURSE INPUT
function createCourseInput() {
    const course_input = document.createElement('input');
    course_input.className = 'course_input_template';

    course_input.addEventListener('mouseleave', appendDraftCourseUponMouseLeave);
    course_input.addEventListener('mouseleave', removeElementUponMouseLeave);
    course_input.addEventListener('keydown', parseCourseInputToLocalStorage);
    course_input.addEventListener('keydown', appendCourseAndDraftCourseUponEnter);

    return course_input;
}

function appendDraftCourseUponMouseLeave(event) {
    const draft_course = createDraftCourse();
    event.target.after(draft_course);
}

function parseCourseInputToLocalStorage(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
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

        console.log(area_string);

        JSON_of_web_data[requirement_string][area_string][course_name_string] = course_status_string;
        const stringified_JSON_of_web_data = JSON.stringify(JSON_of_web_data);
        localStorage.setItem('', stringified_JSON_of_web_data);        
    }
}

function appendCourseAndDraftCourseUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
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
}

function createCourse() {
    const course = document.createElement('div');
    course.className = 'course_status_container_template';

    const course_name = document.createElement('p');
    course_name.className = 'course_name_template';
    course.append(course_name);

    const course_status = document.createElement('p');
    course_status.className = 'course_status_template';
    course.append(course_status);

    return course;
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