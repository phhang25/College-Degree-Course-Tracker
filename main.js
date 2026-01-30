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
            const rectangle_0_json = {"requirement":requirement_input.value, "areas_and_courses":{}};
            localStorage.setItem('0', JSON.stringify(rectangle_0_json));
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
    // for (let i = 0; i < localStorage.length; i++) {
    //     if (localStorage.getItem('rectangle_' + i) !== null) {
    //         const rectangle = document.createElement('div');
    //         rectangle.className = 'rectangle_template';
    //         rectangle.id = 'rectangle_' + i;

    //         //append course requirement text 

    //         const requirement_string = JSON.parse(localStorage.getItem(rectangle.id)).requirement;
    //         const requirement_paragraph = document.createElement('p');
    //         requirement_paragraph.textContent = requirement_string;
    //         requirement_paragraph.className = 'requirement_template';
    //         rectangle.append(requirement_paragraph);

    //         const areas_and_courses_string = JSON.parse(localStorage.getItem(rectangle.id)).areas_and_courses;
    //         if (areas_and_courses_string === '') {
    //             const draft_area = document.createElement('div');
    //             draft_area.className = 'draft_area_template';
    //         } 

    //         document.body.append(rectangle);
    //     }
    // }

    for (const key in Object.keys(localStorage)) {
        console.log(key);
        const rectangle = document.createElement('div');
        rectangle.className = 'rectangle_template';
        const rectangle_json = JSON.parse(localStorage.getItem(key));
        const requirement = rectangle_json.requirement;
        const areas_and_courses = rectangle_json.areas_and_courses;

        appendRequirement(rectangle, requirement);
        appendAreas(rectangle, areas_and_courses);
        document.body.append(rectangle);
    }

    function appendRequirement(rectangle, requirement) {
        const requirement_div = document.createElement('div');
        requirement_div.textContent = requirement;
        requirement_div.className = 'requirement_template';
        rectangle.append(requirement_div);
    }

    function appendAreas(rectangle, areas_and_courses) {
        const array_of_areas = Object.keys(areas_and_courses);
        if (array_of_areas.length === 0) {
            const draft_area = document.createElement('div');
            draft_area.className = 'draft_area_template';
            draft_area.addEventListener
            rectangle.append(draft_area);

            draft_area.addEventListener('mouseover', makeBorderDashedWithMessage);
            draft_area.addEventListener('mouseleave', removeBorderAndMessage);

            function makeBorderDashedWithMessage(event) {
                event.target.style.borderStyle = 'dashed';
                event.target.style.borderRadius = '20px';
                event.target.textContent = 'Add a course area'
                event.target.style.cursor = 'pointer';
            }

            function removeBorderAndMessage(event) {
                event.target.style.borderStyle = '';
                event.target.textContent = '';
            }

            draft_area.addEventListener('click', removeDraftArea);
            draft_area.addEventListener('click', createMessageBox);

            function removeDraftArea() {
                draft_area.remove();
            }

            function createMessageBox() {
                const message_box = document.createElement('div');
                message_box.className = 'message_box_template';
            }
        }

        
    }

    
}

