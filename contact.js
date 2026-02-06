  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("agencyForm");
    const submitBtn = form.querySelector(".btn-submit");
    const btnText = submitBtn.querySelector("span");

    // Create status message dynamically
    const statusMessage = document.createElement("p");
    statusMessage.className = "form-status";
    statusMessage.setAttribute("aria-live", "polite");
    form.appendChild(statusMessage);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // UI: loading state
      submitBtn.disabled = true;
      btnText.textContent = "Sending...";
      statusMessage.textContent = "";
      statusMessage.className = "form-status";

      try {
        // Collect form data
        const formData = {
          name: form.querySelector('input[type="text"]').value.trim(),
          email: form.querySelector('input[type="email"]').value.trim(),
          project: form.querySelectorAll('input[type="text"]')[1].value.trim(),
          message: form.querySelector("textarea").value.trim(),
        };

        // Simulated API call (replace with fetch)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        statusMessage.textContent =
          "Thank you! Your message has been sent. We’ll contact you shortly.";
        statusMessage.classList.add("success");
        form.reset();

      } catch (error) {
        // Error
        statusMessage.textContent =
          "Something went wrong. Please try again later.";
        statusMessage.classList.add("error");
      } finally {
        submitBtn.disabled = false;
        btnText.textContent = "Send Message";
      }
    });
  });