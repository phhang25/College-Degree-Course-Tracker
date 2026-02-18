loadWebPageWithNoData();
loadWebPage();

//when there is no pre-existing course data

function loadWebPageWithNoData() {

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
}

//when there is pre-existing course data

function loadWebPage() {
    for (const key_index in Object.keys(localStorage)) {
        //iterate over each individual rectangle div

        const rectangle = document.createElement('div');
        rectangle.className = 'rectangle_template';

        //append course requirement divs to rectangle divs

        const requirement = document.createElement('div');
        requirement.textContent = localStorage.key(parseInt(key_index));
        requirement.className = 'requirement_template';
        rectangle.append(requirement);

        //parse strings of the rectangle's course areas from local storage,
        //append an individual course area div to its own area and courses container,
        //and append the container to the current rectangle

        const current_key = requirement.textContent;
        const current_rectangle_data = JSON.parse(localStorage.getItem(current_key));

        for (const area_string in current_rectangle_data) {
            const area_and_courses_container = document.createElement('div');
            area_and_courses_container.className = 'area_and_courses_container_template';

            const area = document.createElement('p');
            area.className = 'area_template';
            area.textContent = area_string;

            area_and_courses_container.append(area);
            rectangle.append(area_and_courses_container);

            //append a draft course div to the bottom of 
            //the area and courses container
            
            const draft_course = document.createElement('p');
            draft_course.className = 'draft_course_template';
            area_and_courses_container.append(draft_course);

            draft_course.addEventListener('mouseover', makeDraftCourseBorderDashed);
            draft_course.addEventListener('mouseover', addMessageToDraftCourse);
            draft_course.addEventListener('mouseleave', removeDraftCourseBorder);
            draft_course.addEventListener('mouseleave', removeDraftCourseMessage);

            const course_input = document.createElement('input');
            course_input.className = 'course_input_template';

            draft_course.addEventListener('click', removeDraftCourse);
            draft_course.addEventListener('click', addCourseInput);
            draft_course.addEventListener('click', focusCourseInput);

            function removeDraftCourse() {
                draft_course.remove();
            }

            function addCourseInput() {
                area_and_courses_container.append(course_input);
            }

            function focusCourseInput() {
                course_input.focus();
            }

            rectangle.addEventListener('mouseleave', removeCourseInputUponExit);
            rectangle.addEventListener('mouseleave', addDraftCourseUponExit);

            function removeCourseInputUponExit() {
                course_input.remove();
            }

            function addDraftCourseUponExit() {
                draft_course.style.borderStyle = '';
                draft_course.textContent = '';
                area_and_courses_container.append(draft_course);
            }

            course_input.addEventListener('keydown', parseCourseInputToLocalStorage);
            course_input.addEventListener('keydown', removeCourseInputUponEnter);
            
            function parseCourseInputToLocalStorage(event) {
                if (event.key === 'Enter' & course_input.value !== '') {
                    const current_area_json = JSON.parse(current_rectangle_data[area_string]);
                    current_area_json[course_input.value] = 'not satisfied';
                    current_rectangle_data[area_string] = current_area_json;
                    const new_rectangle_data_string = JSON.stringify(current_rectangle_data);
                    
                    const requirement_string = requirement.textContent;
                    
                    localStorage.setItem(requirement_string, new_rectangle_data_string);
                }
            }

            function addCourseToContainer(event) {
                if (event.key === 'Enter' & course_input.value !== '') {
                    const course_and_status_container = document.createElement('div');
                    
                }
            }

            function removeCourseInputUponEnter(event) {
                if (event.key === 'Enter' & course_input.value !== '') {
                    course_input.remove();
                }
            }
        }

        function makeDraftCourseBorderDashed(event) {
            event.target.style.borderStyle = 'dashed';
        }

        function addMessageToDraftCourse(event) {
            event.target.textContent = 'Add a new course';
        }

        function removeDraftCourseBorder(event) {
            event.target.style.borderStyle = '';
        }

        function removeDraftCourseMessage(event) {
            event.target.textContent = '';
        }

        //append a draft area div to the bottom of each rectangle div
        
        const draft_area = document.createElement('div');
        draft_area.className = 'draft_area_template';
        rectangle.append(draft_area);

        draft_area.addEventListener('mouseover', makeDraftAreaBorderDashed);
        draft_area.addEventListener('mouseover', addMessageToDraftArea);
        draft_area.addEventListener('mouseleave', removeDraftAreaBorder);
        draft_area.addEventListener('mouseleave', removeDraftAreaMessage);

        function makeDraftAreaBorderDashed(event) {
            event.target.style.borderStyle = 'dashed';
        }

        function addMessageToDraftArea(event) {
            event.target.textContent = 'Add a course area';
        }

        function removeDraftAreaBorder(event) {
            event.target.style.borderStyle = '';
        }

        function removeDraftAreaMessage(event) {
            event.target.textContent = '';
        }

        //when the user clicks on the draft area at the bottom of the rectangle,
        //an input for the user to enter the new course area appears

        const area_input = document.createElement('input');
        area_input.className = 'area_input_template';

        draft_area.addEventListener('click', removeDraftArea);
        draft_area.addEventListener('click', appendAreaInput);
        draft_area.addEventListener('click', makeAreaInputFocus);

        function removeDraftArea() {
            draft_area.remove();
        }

        function appendAreaInput() {
            rectangle.append(area_input);
        }

        function makeAreaInputFocus() {
            area_input.focus();
        }

        //when the user enters a course area:
        //1) the user input is stored in local storage 
        //2) a course area paragraph is appended to a container, 
        //which is appended to the rectangle div
        //3) a new draft area appears at the bottom of the rectangle
        //4) the previous user input text is cleared

        area_input.addEventListener('keydown', parseAreaInputToLocalStorage);
        area_input.addEventListener('keydown', removeAreaInputUponEnter);
        area_input.addEventListener('keydown', appendAreaAndDraftCourseToContainer);
        area_input.addEventListener('keydown', appendNewDraftArea);

        function parseAreaInputToLocalStorage(event) {
            if (event.key === 'Enter' & area_input.value !== '') {
                const requirement_string = requirement.textContent;
                const rectangle_data_string = localStorage.getItem(requirement_string);
                const rectangle_data = JSON.parse(rectangle_data_string);

                const area_input_string = area_input.value;

                rectangle_data[area_input_string] = '{}';
                const new_rectangle_data_string = JSON.stringify(rectangle_data)

                localStorage.setItem(requirement_string, new_rectangle_data_string);
            }
        }

        function removeAreaInputUponEnter(event) {
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
                draft_course.addEventListener('mouseover', makeDraftCourseBorderDashed);
                draft_course.addEventListener('mouseover', addMessageToDraftCourse);
                draft_course.addEventListener('mouseleave', removeDraftCourseBorder);
                draft_course.addEventListener('mouseleave', removeDraftCourseMessage);
                draft_course.addEventListener('click', removeDraftCourse);
                draft_course.addEventListener('click', addCourseInput);
                draft_course.addEventListener('click', focusCourseInput);
            }
        }

        function appendNewDraftArea(event) {
            if (event.key === 'Enter' & area_input.value !== '') {
                rectangle.append(draft_area);
                area_input.value = '';
            }
        }

        //the user can move their cursor out of the rectangle to cancel
        //inputting an area

        rectangle.addEventListener('mouseleave', removeAreaInputUponCursorExit);
        rectangle.addEventListener('mouseleave', addDraftAreaUponExit);

        function removeAreaInputUponCursorExit() {
            area_input.remove();
        }

        function addDraftAreaUponExit() {
            rectangle.append(draft_area);
            draft_area.style.borderStyle = '';
            draft_area.textContent = '';
        }

        document.body.append(rectangle);
    }    
}

//todo: create course-adding functionality for the draft courses
//of newly created areas

//todo: add a status-adding functionality for course inputs
//e.g "Area B --satisfied"
//e.g "Area B --not satisfied"
//e.g. "Area B --in progress"
//e.g. "Area B" -> default is not satisfied

//todo: add the option to delete requirements, areas, and courses 
//click a div to delete

