function webDataEmpty () {
    return localStorage.length === 0 || localStorage.getItem('') === '{}';
}

function createDraftRectangle() {
    const draft_rectangle = document.createElement('div');
    draft_rectangle.className = 'draft_rectangle_template';
    draft_rectangle.textContent = '+';

    function attachDraftRectangleEventListeners() {
        draft_rectangle.addEventListener('mouseover', makeBorderDashedUponMouseOver);
        draft_rectangle.addEventListener('mouseleave', makeBorderSolidUponMouseLeave);
        draft_rectangle.addEventListener('click', removeElementUponClick);
        draft_rectangle.addEventListener('click', appendMessageBoxToBodyAndFocusInput);
    }

    attachDraftRectangleEventListeners();

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

function addMessageUponMouseOverDraftArea(event) {
    if (event.target.className === 'draft_area_template') {
        event.target.textContent = 'Add a new course area';
    }
    else if (event.target.className === 'draft_course_template') {
        event.target.textContent = 'Add a new course';
    }
}

function removeMessageUponMouseLeave(event) {
    event.target.textContent = '';
}

function removeElementUponClick(event) {
    event.target.remove();
}

function removeElementUponMouseLeave(event) {
    event.target.remove();
}

function removeElementUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        event.target.remove(); 
    }
}

function removeParentUponEnter(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        event.target.parentElement.remove(); 
    }
}

function createMessageBox() {
    const message_box = document.createElement('div');
    message_box.className = 'message_box_template';

    function createMessageBoxText(message) {
        const message_box_text = document.createElement('p');
        message_box_text.textContent = message;
        message_box_text.className = 'message_box_text';
        return message_box_text;
    }

    const message_box_text = createMessageBoxText('Enter a requirement:');
    message_box.append(message_box_text);

    function createMessageBoxInput(){
        const message_box_input = document.createElement('input');
        message_box_input.className = 'message_box_input';

        function attachMessageBoxInputEventListeners() {
            message_box_input.addEventListener('keydown', appendRectangleToBodyUponEnter);
            message_box_input.addEventListener('keydown', parseRequirementInputToLocalStorage);
            message_box_input.addEventListener('keydown', appendDraftRectangleToBodyUponEnter);
            message_box_input.addEventListener('keydown', removeParentUponEnter);
        }

        attachMessageBoxInputEventListeners();

        return message_box_input;
    }
    
    const message_box_input = createMessageBoxInput();
    message_box.append(message_box_input);

    function attachMessageBoxEventListeners() {
        message_box.addEventListener('mouseleave', appendDraftRectangleToBodyUponMouseLeave);
        message_box.addEventListener('mouseleave', removeElementUponMouseLeave);
    }

    attachMessageBoxEventListeners();

    return message_box;
}

function appendMessageBoxToBodyAndFocusInput() {
    const message_box = createMessageBox();
    document.body.append(message_box);
    message_box.lastChild.focus();
}

function parseRequirementInputToLocalStorage(event) {
    if (event.key === 'Enter' & event.target.value !== '') {
        const parsed_requirement = event.target.value;

        let current_web_data = getMapOfCourseData();

        current_web_data.set(parsed_requirement, '{}');

        setMapToLocalStorage(current_web_data); 
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

function createRectangle() {
    const rectangle = document.createElement('div');
    rectangle.className = 'rectangle_template';

    return rectangle;
}

function createRequirement() {
    const requirement = document.createElement('div');
    requirement.className = 'requirement_template';
    return requirement;
}

function createDraftArea() {
    const draft_area = document.createElement('div');
    draft_area.className = 'draft_area_template';

    function attachDraftAreaEventListeners() {
        draft_area.addEventListener('mouseover', makeBorderDashedUponMouseOver);
        draft_area.addEventListener('mouseover', addMessageUponMouseOverDraftArea);
        draft_area.addEventListener('mouseleave', makeBorderTransparentUponMouseleave);
        draft_area.addEventListener('mouseleave', removeMessageUponMouseLeave);
        draft_area.addEventListener('click', appendAreaInputUponClickAndFocus);
        draft_area.addEventListener('click', removeElementUponClick);
    }

    attachDraftAreaEventListeners();

    return draft_area;
}

function appendAreaInputUponClickAndFocus(event) {
    const area_input = createAreaInput();
    event.target.parentElement.append(area_input);
    area_input.focus();
}

function AreaInputToLocalStorage(event) {
    //todo: write a function to parse the area input to the associated
    //course requirement in local storage
    //e.g. 'Area A' -> store in "General Education" key as the value
    //'{'Area A':'{}'}'
    //adding more areas: '{'Area A':'{}', 'Area B':'{}', 'Area C':'{}'}'
    const area_input_string = area_input.value;

}

function createAreaInput() {
    const area_input = document.createElement('input');
    area_input.className = 'area_input_template';

    function attachAreaInputEventListeners() {
        area_input.addEventListener('mouseleave', appendDraftAreaUponMouseLeave);
        area_input.addEventListener('mouseleave', removeElementUponMouseLeave);
        
    }

    attachAreaInputEventListeners();

    return area_input;
}

function appendDraftAreaUponMouseLeave(event) {
    const draft_area = createDraftArea();
    event.target.parentElement.append(draft_area);
}

function createArea() {
    const area = document.createElement('div');
    area.className = 'area_template';
    return area;
}

function getMapOfCourseData() {
    if (localStorage.length !== 0 & localStorage.getItem('') !== '{}') {
        const obj = JSON.parse(localStorage.getItem(''));
        const map = new Map(Object.entries(obj));
        return map;
    }
    return new Map();
}

function setMapToLocalStorage(map) {
    const obj = Object.fromEntries(map);
    const obj_string = JSON.stringify(obj);
    localStorage.setItem('', obj_string);
}

function getMapOfRequirementData(requirement_string) {
    const course_data = getMapOfCourseData();
    if (course_data.size !== 0 & course_data.get(requirement_string) !== '{}') {
        const obj_string = course_data.get(requirement_string);
        const obj = JSON.parse(obj_string);
        const map = new Map(Object.entries(obj));
        return map;
    }
    return new Map();
}

function loadExistingCourseDataOntoWebPage() {
    for (requirement_string of getMapOfCourseData().keys()) {
        const rectangle = createRectangle();
        document.body.append(rectangle);

        const requirement = createRequirement();
        requirement.textContent = requirement_string;
        rectangle.append(requirement);
        
        const draft_area = createDraftArea();

        rectangle.append(draft_area);
    }

}

loadExistingCourseDataOntoWebPage();

function loadBottomDraftRectangle() {

    const draft_rectangle = createDraftRectangle();

    document.body.append(draft_rectangle);
}

loadBottomDraftRectangle();