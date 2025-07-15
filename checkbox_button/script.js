const body_section = document.body;

const input_Value = document.querySelector('#checkbox');

//  console.log(input_Value.value);

input_Value.addEventListener('change', function (e) {
    console.log('click', e.target.checked);

    if (e.target.checked == true) {
        body_section.style.backgroundColor = '#18cc00';
    } else if ((e.target.checked == false)) {
        body_section.style.backgroundColor = 'rgb(255, 0, 0)';
    }


})



// body_section.style.backgroundColor = "#fff";