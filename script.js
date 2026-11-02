let menuToggle = document.getElementById("menuToggle");
let navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("show-menu");
    menuToggle.classList.toggle("active");

    let menuOpen = navLinks.classList.contains("show-menu");
    if(menuOpen) {
        menuToggle.setAttribute("title", "Stäng menyn")
        menuToggle.setAttribute("aria-label", "Stäng menyn")
    }
    else {
        menuToggle.setAttribute("title", "Öppna menyn")
        menuToggle.setAttribute("aria-label", "Öppna menyn")
    }
});

let navItems = navLinks.querySelectorAll("a");

navItems.forEach(function(item) {
    item.addEventListener("click", function() {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("show-menu");
        menuToggle.setAttribute("aria-label", "Öppna menyn");
        menuToggle.setAttribute("title", "Öppna menyn");
    });
});
