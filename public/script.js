document.addEventListener("DOMContentLoaded", function() {
    const hamburgerButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.menu-container');
    const closeIcon = document.querySelector('.menu-close-button');
    // popup
    const addButtonlist = document.querySelectorAll('.btn-add');
    const popup = document.querySelector('.popup-container');
    const closeButton = document.querySelector('.close-btn-popup');
   
    // heart button
    const heartbutton = document.querySelectorAll('.heart-button');
    const heartIcon = document.querySelectorAll('.heart-img');
   


    hamburgerButton.addEventListener("click", toggleMenu);
    closeIcon.addEventListener("click", toggleMenu);

    function toggleMenu() {
        console.log("toggle check");
        // Toggle the 'showMenu' class on the menu
        menu.classList.toggle("showMenu");
    
        // Check if 'showMenu' class is present
        if (menu.classList.contains("showMenu")) {
            // If 'showMenu' class is present, set close icon visibility to 'block'
            menu.style.display = "block";
        } else {
            // If 'showMenu' class is not present, set close icon visibility to 'none'
            menu.style.display = "none";
        }
    }


    // pop up
    addButtonlist.forEach(function(addButton) {
        addButton.addEventListener("click", togglePopup);
    });

    closeButton.addEventListener("click", togglePopup);

    function togglePopup() {
        popup.classList.toggle("showPopup");

        if (popup.classList.contains("showPopup")) {
  
            popup.style.display = "none";
        } else {
          
            popup.style.display = "block";
        }

    }


// heart button
heartbutton.forEach(function(heartButton) {
    heartButton.addEventListener("click", toggleHeartButton);
});



// Function to toggle the 'filled' class on the heart button

    // Function to toggle the 'filled' class on the heart button
    function toggleHeartButton(event) {
        // Prevent default behavior of the button
        event.preventDefault();

        // Find the corresponding heart icon for the clicked button
        const heartIcon = this.querySelector('.heart-img');

        // Toggle the 'filled' class on the heart icon
        heartIcon.classList.toggle('filled');
    }

});