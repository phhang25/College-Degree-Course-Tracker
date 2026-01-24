if (localStorage.length === 0) {
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

    beginning_draft_rectangle.addEventListener('click', removeBeginningDraftRectangle);
    beginning_draft_rectangle.addEventListener('click', addFirstRectangleToLocalStorage);
    beginning_draft_rectangle.addEventListener('click', loadWebPage);
    beginning_draft_rectangle.addEventListener('click', removeUnusedEventListeners);

    function removeBeginningDraftRectangle() {
        beginning_draft_rectangle.remove();
    }

    function addFirstRectangleToLocalStorage() {
        localStorage.setItem('rectangle_0', '{"requirement":"", "areas_and_courses":""}');
    }

    function removeUnusedEventListeners() {
        beginning_draft_rectangle.removeEventListener('mouseover', makeBorderDashed);
        beginning_draft_rectangle.removeEventListener('mouseleave', makeBorderSolid);
        beginning_draft_rectangle.removeEventListener('click', addFirstRectangleToLocalStorage);
        beginning_draft_rectangle.removeEventListener('click', loadWebPage);
    }
}
else {
    loadWebPage();
}

function loadWebPage() {
    for (let i = 0; i < localStorage.length; i++) {
        const current_rectangle = document.createElement('div');
        current_rectangle.className = 'rectangle_template';
        current_rectangle.id = 'rectangle_' + i;

        document.body.append(current_rectangle);
    }
}
