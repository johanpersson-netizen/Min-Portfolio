//HAMBURGERMENYN
let menuToggle = document.getElementById("menuToggle");
let navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show-menu");
    menuToggle.classList.toggle("active");

    let menuOpen = navLinks.classList.contains("show-menu");
    menuToggle.setAttribute("aria-expanded", menuOpen);
    if (menuOpen) {
        menuToggle.setAttribute("title", "Stäng menyn")
        menuToggle.setAttribute("aria-label", "Stäng menyn")
    }
    else {
        menuToggle.setAttribute("title", "Öppna menyn")
        menuToggle.setAttribute("aria-label", "Öppna menyn")
    }
});

let navItems = navLinks.querySelectorAll("a");

navItems.forEach(function (item) {
    item.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("show-menu");
        menuToggle.setAttribute("aria-label", "Öppna menyn");
        menuToggle.setAttribute("title", "Öppna menyn");
        menuToggle.setAttribute("aria-expanded", false);
    });
});


//KONTAKTFORMULÄRET
//Variabler för att kunna lyssna efter om användaren försöker skicka ett meddelande.
let kontaktForm = document.getElementById("contact-form");
let formMeddelande = document.getElementById("form-message");

//Variabel för "Skicka Meddelande" knappen.
let skickaKnapp = kontaktForm.querySelector('button[type="submit"]');

//Lyssnar efter att användaren trycker på "Skicka meddelande" - "submit"
kontaktForm.addEventListener("submit", async function (event) {

    //stoppar att webbläsaren laddas om
    event.preventDefault();

    //Variabel för att kunna få ut data från inmatning i kontakt delen.
    let formulardata = new FormData(kontaktForm);

    //Deaktiverar skicka knappen tills meddelandet skickats. Ändrar bool i finally blocket.
    skickaKnapp.disabled = true;
    skickaKnapp.textContent = "Skickar...";

    try {
        //Fetch() - Skicka till Formspree. Await - Vänta på respons
        let svar = await fetch("https://formspree.io/f/mljjoqyb", {
            method: "POST",
            body: formulardata,
            headers: {
                "Accept": "application/json"
            }
        });
        //Kolla så det gick att skicka meddelandet.
        if (svar.ok) {
            formMeddelande.textContent = "Tack för ditt meddelande! Jag återkommer så snart jag kan.";
            kontaktForm.reset();
        }
        else {
            formMeddelande.textContent = "Meddelandet kunde inte skickas. Försök igen senare.";
        }
        //Fångar upp eventuella fel - Tappad internetanslutning t.ex.
    } catch (fel) {
        formMeddelande.textContent = "Ett tekniskt fel uppstod. Försök igen senare.";
    }
    finally {
        skickaKnapp.disabled = false;
        skickaKnapp.textContent = "Skicka meddelande";
    }
});


//BILDGALLERIET
//Variablar för de classer och id:n som ska inhämtas för bildgalleriet.
const galleryImages = document.querySelectorAll(".image-gallery");
const imageDialog = document.getElementById("image-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogCaption = document.getElementById("dialog-caption");
const closeDialog = document.getElementById("close-dialog");

//Funktion för att iterera mellan buttons.
galleryImages.forEach(function (button) {
    button.addEventListener("click", function () {
        //Hämtar bilden och bildtexten från den klickade knappen (bilden).
        const image = button.querySelector("img");
        const figCaption = button.parentElement.querySelector("figcaption");

        //Hämtar bildens sökväg, alternativa text och bildtext.
        const imageSrc = image.src;
        const imageAlt = image.alt;
        const captionText = figCaption.textContent;

        //Tilldelar informationen till elementen i dialogrutan.
        dialogImage.src = imageSrc;
        dialogImage.alt = imageAlt;
        dialogCaption.textContent = captionText;

        imageDialog.showModal();

    });
});

//Funktion som stänger fönstret om användaren klickar utanför bilden.
imageDialog.addEventListener("click", function (event) {
    if (event.target === imageDialog) {
        imageDialog.close();
    }
});

//Funktion för att aktivera stäng knappen i galleriet.
closeDialog.addEventListener("click", function () {
    imageDialog.close();
}); 