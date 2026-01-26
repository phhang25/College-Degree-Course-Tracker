//when there is no pre-existing course data

if (localStorage.length === 0) {

    //create beginning draft rectangle

    const beginning_draft_rectangle = document.createElement('div');
    beginning_draft_rectangle.id = 'beginning_draft_rectangle';
    beginning_draft_rectangle.textContent = '+';

    document.body.append(beginning_draft_rectangle);

    beginning_draft_rectangle.addEventListener('mouseover', makeBorderDashed);
    beginning_draft_rectangle.addEventListener('mouseleave', makeBorderSolid);

    function makeBorderDashed(event) {
        event.target.style.borderStyle = 'dashed';
    }

    function makeBorderSolid(event) {
        event.target.style.borderStyle = 'solid';
    }

    //prompt user to enter a course requirement for the first rectangle
    //after clicking on beginning draft rectangle

    beginning_draft_rectangle.addEventListener('click', removeBeginningDraftRectangle);

    function removeBeginningDraftRectangle() {
        beginning_draft_rectangle.remove();
    }
    
    const message_box = document.createElement('div');
    message_box.className = 'message_box_template';
    const message_box_text = document.createElement('p');
    message_box_text.textContent = 'Enter a course requirement';
    message_box_text.className = 'message_box_text';
    message_box.append(message_box_text);
    const requirement_input = document.createElement('input');
    requirement_input.id = 'requirement_input';
    message_box.append(requirement_input);

    beginning_draft_rectangle.addEventListener('click', createMessageBox);
    beginning_draft_rectangle.addEventListener('click', makeRequirementInputFocus);

    function createMessageBox(){
        document.body.append(message_box);
    }

    function makeRequirementInputFocus() {
        requirement_input.focus();
    }

    requirement_input.addEventListener('keydown', parseRequirementInputToLocalStorage);
    requirement_input.addEventListener('keydown', removeMessageBox);
    requirement_input.addEventListener('keydown', loadFirstRectangleUponEnter);

    //after the user enters text and hits the enter key, the first rectangle with
    //its course requirement is created

    function parseRequirementInputToLocalStorage(event) {
        if (event.key === 'Enter' && requirement_input.value !== ''){
            const rectangle_0_json = {"requirement":requirement_input.value, "areas_and_courses":""};
            localStorage.setItem('rectangle_0', JSON.stringify(rectangle_0_json));
        }
    }

    function removeMessageBox(event) {
        if (event.key === 'Enter' && requirement_input.value !== ''){
            message_box.remove();
        }
    }

    function loadFirstRectangleUponEnter(event) {
        if (event.key === 'Enter' && requirement_input.value !== '') {
            loadWebPage();
        }
    }
}

//when there is pre-existing course data

else {
    loadWebPage();
}

//todo: create a new way to organize rectangles to account for deletion of rectangles
//allowing the use of for each loop?

function loadWebPage() {
    for (let i = 0; i < localStorage.length; i++) {
        const current_rectangle = document.createElement('div');
        current_rectangle.className = 'rectangle_template';
        current_rectangle.id = 'rectangle_' + i;

        const current_rectangle_requirement_string = JSON.parse(localStorage.getItem(current_rectangle.id)).requirement;
        const current_rectangle_requirement_paragraph = document.createElement('p');
        current_rectangle_requirement_paragraph.textContent = current_rectangle_requirement_string;
        current_rectangle.append(current_rectangle_requirement_paragraph);

        document.body.append(current_rectangle);
    }
}