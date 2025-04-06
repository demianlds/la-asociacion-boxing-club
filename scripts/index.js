let percent = 0;
const percentageText = document.getElementById("percentage");
const shield = document.getElementById("shield");
const loader = document.getElementById("loader");
const content = document.getElementById("content");

function updateLoader() {
    if (percent < 100) {
        percent += 1;
        percentageText.innerText = percent + "%";
        shield.style.filter = `brightness(${0.3 + (percent / 100) * 0.7})`; 
        setTimeout(updateLoader, 30);
    } else {
        loader.style.display = "none";
        content.style.display = "block";
    }
}

updateLoader();

document.querySelectorAll('a.nav-link, button.scroll-btn').forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace o botón

        // Obtiene el destino de la sección a la que se hace clic
        const targetId = this.getAttribute('href') ? this.getAttribute('href').substring(1) : this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        // Desplazamiento suave hacia la sección
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Alinea la sección al principio de la pantalla
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textSection = document.querySelector(".us-text");

    function handleScroll() {
        const sectionPosition = textSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            textSection.classList.add("visible");
        }
    }

    window.addEventListener("scroll", handleScroll);
});

document.addEventListener("DOMContentLoaded", function() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1, // 1 slide visible en pantallas pequeñas
        spaceBetween: 10, // Espaciado entre slides
        loop: true, // Permite desplazamiento infinito
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2, // 2 slides en tablets
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3, // 3 slides en pantallas grandes
                spaceBetween: 30
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".open-modal");
    let currentIndex = 0;

    const modalElement = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modal = new bootstrap.Modal(modalElement, { keyboard: true });

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const closeModalBtn = document.querySelector(".btn-close-modal");
    modal.hide();

    function showImage(index) {
        if (index >= 0 && index < images.length) {
            modalImage.src = images[index].src;
            currentIndex = index;
        }
    }

    images.forEach((img, index) => {
        img.addEventListener("click", function () {
            showImage(index);
            modal.show(); // Solo se abre al hacer clic
            document.body.style.overflow = "hidden";
        });
    });

    prevBtn.addEventListener("click", function () {
        showImage((currentIndex - 1 + images.length) % images.length);
    });

    nextBtn.addEventListener("click", function () {
        showImage((currentIndex + 1) % images.length);
    });

    closeModalBtn.addEventListener("click", function () {
        modal.hide();
    });

    modalElement.addEventListener("hidden.bs.modal", function () {
        document.body.style.overflow = "auto"; // Restaura el scroll cuando se cierra
    });
});


document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita la recarga de la página

    const form = event.target;
    const formData = new FormData(form);
    const successMessage = document.getElementById("successMessage");

    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => {
        if (response.ok) {
            successMessage.style.display = "block"; // Muestra el mensaje de éxito
            form.reset(); // Limpia los campos del formulario
        } else {
            throw new Error("Error al enviar el formulario");
        }
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
        alert("Hubo un error al enviar el formulario.");
    });
});

document.getElementById('hamburger').addEventListener('click', function() {
    const navbar = document.getElementById('navbarNav');
    navbar.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
    const whatsappButton = document.querySelector(".whatsapp-button");
    const footer = document.querySelector("#site-footer");

    function checkIntersection() {
        const buttonRect = whatsappButton.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();

        if (buttonRect.bottom > footerRect.top) {
            whatsappButton.classList.add("fade-out");
        } else {
            whatsappButton.classList.remove("fade-out");
        }
    }

    window.addEventListener("scroll", checkIntersection);
    window.addEventListener("resize", checkIntersection);
});