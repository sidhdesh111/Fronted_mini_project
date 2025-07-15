let lists = document.getElementsByClassName('list');
let right_div = document.getElementById("right");
let left_div = document.getElementById("left");

for (const list of lists) {
    list.addEventListener('dragstart', function (e) {
        let selected = e.target;
        right_div.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        right_div.addEventListener('drop', () => {

            right_div.appendChild(selected);
            selected = null;

        });
        left_div.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        left_div.addEventListener('drop', () => {

            left_div.appendChild(selected);
            selected = null;

        })
    });


}