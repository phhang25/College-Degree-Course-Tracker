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
        if (event.key === 'Enter' && requirement_input.value !== ''){;
            localStorage.setItem(requirement_input.value, '{}');
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

function loadWebPage() {
    for (const key_index in Object.keys(localStorage)) {
        const rectangle = document.createElement('div');
        rectangle.className = 'rectangle_template';

        //append requirement to rectangle

        const requirement = document.createElement('div');
        requirement.textContent = localStorage.key(parseInt(key_index));
        requirement.className = 'requirement_template';
        rectangle.append(requirement);

        //append areas of each rectangle

        const current_key = requirement.textContent;
        const current_rectangle_data = JSON.parse(localStorage.getItem(current_key));

        for (const area_string in current_rectangle_data) {
            const area_and_courses_container = document.createElement('div');
            area_and_courses_container.className = 'area_and_courses_container_template';

            console.log(area_string);
            const area = document.createElement('p');
            area.className = 'area_template';
            area.textContent = area_string;
            rectangle.append(area_and_courses_container);
            area_and_courses_container.append(area);

            //append draft course to the bottom of each area in the rectangle
            
            const draft_course = document.createElement('p');
            draft_course.className = 'draft_course_template';
            area_and_courses_container.append(draft_course);

            draft_course.addEventListener('mouseover', makeDraftCourseBorderDashedWithMessage);
            draft_course.addEventListener('mouseleave', removeDraftCourseBorderAndMessage);
        }

        function makeDraftCourseBorderDashedWithMessage(event) {
            event.target.style.borderStyle = 'dashed';
            event.target.textContent = 'Add a new course';
        }

        function removeDraftCourseBorderAndMessage(event) {
            event.target.style.borderStyle = '';
            event.target.textContent = '';
        }

        //append draft area to the bottom of each rectangle
        
        const draft_area = document.createElement('div');
        draft_area.className = 'draft_area_template';
        draft_area.addEventListener('mouseover', makeDraftAreaBorderDashedWithMessage);
        draft_area.addEventListener('mouseleave', removeDraftAreaBorderAndMessage);

        function makeDraftAreaBorderDashedWithMessage(event) {
            event.target.style.borderStyle = 'dashed';
            event.target.textContent = 'Add a course area'
        }

        function removeDraftAreaBorderAndMessage(event) {
            event.target.style.borderStyle = '';
            event.target.textContent = '';
        }

        rectangle.append(draft_area);

        draft_area.addEventListener('click', removeDraftArea);
        draft_area.addEventListener('click', appendAreaInput);

        function removeDraftArea() {
            draft_area.remove();
        }

        function appendAreaInput() {
            rectangle.append(area_input);
            area_input.focus();
        }

        //when the user enters a course area, the area string is stored in a JSON and 
        //sent to local storage, an area paragraph is appended to the rectangle div,
        //a new draft area appears at the bottom of the rectangle, and the previous
        //area input text is cleared

        const area_input = document.createElement('input');
        area_input.className = 'area_input_template';

        area_input.addEventListener('keydown', parseAreaInputToLocalStorage);
        area_input.addEventListener('keydown', removeAreaInput);
        area_input.addEventListener('keydown', appendAreaAndDraftCourseToContainer);
        area_input.addEventListener('keydown', appendNewDraftArea);

        function parseAreaInputToLocalStorage(event) {
            if (event.key === 'Enter' & area_input.value !== '') {
                const rectangle_data = JSON.parse(localStorage.getItem(requirement.textContent));
                const area_input_string = area_input.value;
                rectangle_data[area_input_string] = '{}';
                localStorage.setItem(requirement.textContent, JSON.stringify(rectangle_data));
            }
        }

        function removeAreaInput(event) {
            if (event.key === 'Enter' & area_input.value !== '') {
                area_input.remove();
            }
        }

        
        

        function appendAreaAndDraftCourseToContainer(event) {
            if (event.key === 'Enter' & area_input.value !== '') {
                const area_and_courses_container = document.createElement('div');
                area_and_courses_container.className = 'area_and_courses_container_template';
                rectangle.append(area_and_courses_container);

                const area = document.createElement('p');
                area.className = 'area_template';
                area.textContent = area_input.value;
                area_and_courses_container.append(area);
                
                const draft_course = document.createElement('p');
                draft_course.className = 'draft_course_template';
                area_and_courses_container.append(draft_course);
                draft_course.addEventListener('mouseover', makeDraftCourseBorderDashedWithMessage);
                draft_course.addEventListener('mouseleave', removeDraftCourseBorderAndMessage);
            }
        }

        function appendNewDraftArea(event) {
            if (event.key === 'Enter' & area_input.value !== '') {
                rectangle.append(draft_area);
                area_input.value = '';
            }
        }

        document.body.append(rectangle);
    }    
}

