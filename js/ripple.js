window.addEventListener("load", () => {
  const buttons = document.querySelectorAll(".ripple");
  if (!buttons) return;

  for (const button of buttons) {
    button.addEventListener("click", (e) => {
      const rippleEffect = button.querySelector(".ripple-effect");
      if (rippleEffect) rippleEffect.remove();

      const posX = button.offsetLeft;
      const posY = button.offsetTop;
      let buttonWidth = button.offsetWidth;
      let buttonHeight = button.offsetHeight;

      const span = document.createElement("span");
      if (button.classList.contains("dark")) {
        span.classList.add("ripple-effect-dark");
      } else {
        span.classList.add("ripple-effect");
      }

      button.appendChild(span);

      if (buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth;
      } else {
        buttonWidth = buttonHeight;
      }

      const x = e.pageX - posX - buttonWidth / 2;
      const y = e.pageY - posY - buttonHeight / 2;

      span.style.width = buttonWidth + "px";
      span.style.height = buttonHeight + "px";
      span.style.left = x + "px";
      span.style.top = y + "px";

      span.classList.add("ripple-animation");
    });
  }
});
