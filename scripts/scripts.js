const slider = document.getElementById('slider');
    // Velocidad en píxeles (puedes ajustarla)
    let speed = 0.5;
    let currentOffset = 0;

    function animate() {
      // Incrementa el desplazamiento y actualiza la posición
      currentOffset += speed;
      slider.style.transform = `translateX(-${currentOffset}px)`;

      // Selecciona la primera imagen del slider
      const firstImage = slider.firstElementChild;
      if (firstImage) {
        // Calcula el ancho de la imagen (incluyendo el margen derecho)
        const imageStyle = getComputedStyle(firstImage);
        const firstImageWidth = firstImage.offsetWidth + parseInt(imageStyle.marginRight);

        // Si la primera imagen se desplazó completamente fuera de la vista...
        if (currentOffset >= firstImageWidth) {
          // La reubica al final del slider
          slider.appendChild(firstImage);
          // Resta el ancho de la imagen al desplazamiento acumulado
          currentOffset -= firstImageWidth;
          slider.style.transform = `translateX(-${currentOffset}px)`;

          // Aplica efecto fade in:
          // 1. Establece la opacidad a 0 inmediatamente
          firstImage.style.opacity = 0;
          // 2. Elimina cualquier transición previa y fuerza un reflow
          firstImage.style.transition = 'none';
          void firstImage.offsetWidth;
          // 3. Ahora, establece una transición para la opacidad y "anima" hasta opacidad 1
          firstImage.style.transition = 'opacity 1s ease-out';
          firstImage.style.opacity = 1;
        }
      }
      // Solicita el siguiente frame de animación
      requestAnimationFrame(animate);
    }

    // Inicia la animación
    animate();