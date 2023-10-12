document.addEventListener('DOMContentLoaded', function () {
    // Select all 'section' elements in the document
    const sections = document.querySelectorAll('section');
    
    // Select the 'page-nav' element
    const pageNav = document.querySelector('.page-nav');
    
    // Select the 'toggleNavButton' element
    const toggleNavButton = document.getElementById('toggleNavButton');
    
    // Select the 'toggleMenuButton' element
    const toggleMenuButton = document.getElementById('toggleMenuButton');

    // Initialize variables to track the state of navigation and menu visibility
    let isNavHidden = false;
    let isMenuHidden = false;

    // Function to smoothly scroll to a section based on the index
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle scroll events to determine which section is in view
    document.addEventListener('wheel', (event) => {
        event.preventDefault();
        const delta = event.deltaY;
        let currentIndex = -1;

        // Find the index of the section currently in view
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentIndex = index;
            }
        });

        // Scroll to the next or previous section based on scroll direction
        if (delta > 0) {
            scrollToSection(currentIndex + 1);
        } else if (delta < 0) {
            scrollToSection(currentIndex - 1);
        }
    });

    // Show page navigation when scrolling down, hide when scrolling up
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && !isNavHidden) {
            pageNav.style.display = 'block';
        } else if (!isNavHidden) {
            pageNav.style.display = 'none';
        }
    });

    // Function to toggle manual section navigation
    toggleNavButton.addEventListener('click', () => {
        if (!isNavHidden) {
            pageNav.style.display = 'none';
            toggleNavButton.innerText = 'Show Navigation';
        } else {
            pageNav.style.display = 'block';
            toggleNavButton.innerText = 'Hide Navigation';
        }
        isNavHidden = !isNavHidden;
    });

    // Function to toggle the menu and menu items
    toggleMenuButton.addEventListener('click', () => {
        const menu = document.querySelector('.menu');
        const menuItems = document.querySelectorAll('.menu-items > li');

        if (!isMenuHidden) {
            menu.style.display = 'none'; // Hide the entire menu
            menuItems.forEach(item => {
                item.style.display = 'none'; // Hide each menu item
            });
            toggleMenuButton.innerText = 'Show Menu';
        } else {
            menu.style.display = 'block'; // Show the entire menu
            menuItems.forEach(item => {
                item.style.display = 'block'; // Show each menu item
            });
            toggleMenuButton.innerText = 'Hide Menu';
        }
        isMenuHidden = !isMenuHidden;
    });

    // Replace "show" class with "hide" for the Show Menu button
    toggleMenuButton.classList.replace('show', 'hide');
});
