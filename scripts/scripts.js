//ANIMACION DEL SLIDER DE IMAGENES

const slider = document.getElementById("slider");
let speed = 0.5;
let currentOffset = 0;

function animate() {

  currentOffset += speed;
  slider.style.transform = `translateX(-${currentOffset}px)`;

  const firstImage = slider.firstElementChild;
  if (firstImage) {

    const imageStyle = getComputedStyle(firstImage);
    const firstImageWidth =
      firstImage.offsetWidth + parseInt(imageStyle.marginRight);

    if (currentOffset >= firstImageWidth) {
      slider.appendChild(firstImage);
      currentOffset -= firstImageWidth;
      slider.style.transform = `translateX(-${currentOffset}px)`;

      firstImage.style.opacity = 0;
      firstImage.style.transition = "none";
      void firstImage.offsetWidth;
      firstImage.style.transition = "opacity 1s ease-out";
      firstImage.style.opacity = 1;
    }
  }
  
  requestAnimationFrame(animate);
}


animate();

// MODAL DE IMAGENES
const images = document.querySelectorAll(".slider-image");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".close");

images.forEach((image) => {
  image.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImage.src = image.src;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});


window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});



//ANIMACION PARA ENTRADA DE TEXTO
document.addEventListener("DOMContentLoaded", function () {
  const texto = document.querySelector(".texto-animado");
  const imagen = document.querySelector(".imagen-animada");

  const opciones = {
    root: null, 
    rootMargin: "0px",
    threshold: 0.5, 
  };

  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); 
      }
    });
  }


  const observerTexto = new IntersectionObserver(callback, opciones);
  observerTexto.observe(texto);

  const observerImagen = new IntersectionObserver(callback, opciones);
  observerImagen.observe(imagen);
});
