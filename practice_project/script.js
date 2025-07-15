const open_modal = document.getElementById('openModalBtn');
const close_modal = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');

open_modal.addEventListener('click', modal_open);
close_modal.addEventListener('click', modal_close)
function modal_open() {
    console.log('open');
    
    modal.classList.remove("hidden");
}

function modal_close() {
       console.log('close');
    modal.classList.add("hidden");
}


modal.addEventListener('click', function (e) {
    // console.log(e.target.className);
    if (e.target.className == 'modal') {
        modal_close();
    }
})

