document.addEventListener('DOMContentLoaded', function () {
    let addCount = 2;
    document.getElementById('addOfficer').addEventListener('click', function (event) {
        event.preventDefault();


        // Create new div for club officer information (*Image, position, and name appended to this*)
        const newOfficerWrapper = document.createElement('div');
        newOfficerWrapper.classList.add('club-officer-card');
        newOfficerWrapper.id = 'officerContainer';

        // Append the officer wrapper to the club officer grid
        document.getElementById('officerContent').appendChild(newOfficerWrapper);

        // Create new div for Officer Image Form
        const newOfficerImage = document.createElement('div');
        newOfficerImage.classList.add('club-officer-img-form');
        const newPicLabel = document.createElement('label');
        const newPicInput = document.createElement('input');

        // Fill Officer Image Form with necessary values
        newPicInput.type = 'file';
        newPicInput.name = 'off_image' + (addCount)
        newPicInput.id = 'off_image' + (addCount);
        newPicLabel.htmlFor = newPicInput.id;
        newPicLabel.textContent = 'Insert Officer Image';

        // Append Officer Image form to Officer Image, and then to officer form  wrapper
        newOfficerImage.appendChild(newPicLabel);
        newOfficerImage.appendChild(newPicInput);
        newOfficerWrapper.appendChild(newOfficerImage);



        // Create p element for club officer info form (first name and last name)
        const newOfficerInfo = document.createElement('p');
        newOfficerInfo.classList.add('otitle1');

        // Create officer dropdowns for officer position
        const newOfficerPositionLabel = document.createElement('label');
        const newOfficerPositionSelect = document.createElement('select');
        const positionOption1 = document.createElement('option');
        const positionOption2 = document.createElement('option');
        const positionOption3 = document.createElement('option');
        const positionOption4 = document.createElement('option');
        const positionOption5 = document.createElement('option');
        const positionOption6 = document.createElement('option');

        // Fill officer position form with necessary values
        newOfficerPositionSelect.name = 'officer_position' + (addCount);
        newOfficerPositionSelect.id = 'officer_position' + (addCount);
        newOfficerPositionSelect.required = true;
        newOfficerPositionLabel.htmlFor = newOfficerPositionSelect.id;

        // FIll officer position form with options
        positionOption1.value = null;
        positionOption1.text = '';
        positionOption2.value = 'president';
        positionOption2.text = 'President';
        positionOption3.value = 'vice_president';
        positionOption3.text = 'Vice President';
        positionOption4.value = 'secretary';
        positionOption4.text = 'Secretary';
        positionOption5.value = 'treasurer';
        positionOption5.text = 'Treasurer';
        positionOption6.value = 'historian';
        positionOption6.text = 'Historian';

        // Append officer position options to the officer position form
        newOfficerPositionSelect.appendChild(positionOption1);
        newOfficerPositionSelect.appendChild(positionOption2);
        newOfficerPositionSelect.appendChild(positionOption3);
        newOfficerPositionSelect.appendChild(positionOption4);
        newOfficerPositionSelect.appendChild(positionOption5);
        newOfficerPositionSelect.appendChild(positionOption6);

        // Append the officer position form to the officer information form
        newOfficerInfo.appendChild(newOfficerPositionLabel);
        newOfficerInfo.appendChild(newOfficerPositionSelect);

        // Create form for officer first name
        const newOfficerFirstNameLabel = document.createElement('label');
        const newOfficerFirstNameInput = document.createElement('input');

        // Fill officer first name form with necessary values
        newOfficerFirstNameInput.type = 'text';
        newOfficerFirstNameInput.name = 'off_first_name' + (addCount);
        newOfficerFirstNameInput.id = 'off_first_name' + (addCount);
        newOfficerFirstNameInput.placeholder = 'Officer First Name';
        newOfficerFirstNameInput.required = true;
        newOfficerFirstNameLabel.htmlFor = newOfficerFirstNameInput.id;

        // Append officer info to officer wrapper. Then officer first name form to officer info.
        newOfficerWrapper.appendChild(newOfficerInfo);
        newOfficerInfo.appendChild(newOfficerFirstNameLabel);
        newOfficerInfo.appendChild(newOfficerFirstNameInput);

        // Create form for officer last name
        const newOfficerLastNameLabel = document.createElement('label');
        const newOfficerLastNameInput = document.createElement('input');

        // Fill officer last name form with necessary values
        newOfficerLastNameInput.type = 'text';
        newOfficerLastNameInput.name = 'off_last_name' + (addCount);
        newOfficerLastNameInput.id = 'off_last_name' + (addCount);
        newOfficerLastNameInput.placeholder = 'Officer Last Name';
        newOfficerLastNameInput.required = true;
        newOfficerLastNameLabel.htmlFor = newOfficerLastNameInput.id;

        // Append officer last name form to officer info
        newOfficerInfo.appendChild(newOfficerLastNameLabel);
        newOfficerInfo.appendChild(newOfficerLastNameInput);

        //Append officer info form (officer position + first name + last name) to the officer information wrapper
        newOfficerWrapper.appendChild(newOfficerInfo);

        // Every time a new officer card form is made, increase the counter by one (PREVENTS DUPLICATE FORM INPUTS)
        addCount++;

        // Create button to remove an officer card form
        const newButton = document.createElement('button');
        newButton.textContent = 'Remove';
        newButton.classList.add('removeButton');

        // When the remove officer button is clicked, the officer card is removed, and the counter of officer cards is reduced by one
        newButton.addEventListener('click', function (event) {
            event.preventDefault();
            event.target.parentNode.remove();
            addCount--;
        });

        // Append remove officer button to the officer wrapper form
        newOfficerWrapper.appendChild(newButton);


    });
})