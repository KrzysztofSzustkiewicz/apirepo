let myModal = function() {
    let newModal = `<div id='modal1' class='customModal'>
                        <div class='customModalBody'>
                         dupa..
                        </div>
                    </div>`;
    document.body.innerHTML += newModal;
};

let viewModal = function() {
    let viewedModal = document.getElementById('modal1');
    viewedModal.style.display='block';
    document.body.style.overflow = 'hidden';
    closeModal();
};

let closeModal = function() {
        window.addEventListener('click', function(event) {
        let eventModal = document.getElementById('modal1');
        console.log(eventModal);
        console.log(event.target);
        if (event.target == eventModal) {
            console.log('dupa');
            eventModal.style.display = 'none';
        }
    });
};