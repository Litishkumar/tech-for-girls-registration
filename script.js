let shareCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const shareBtn = document.getElementById('whatsappShare');
  const submitBtn = document.getElementById('submitBtn');
  const messageEl = document.getElementById('message');
  const counterText = document.getElementById('counterText');

  // Prevent multiple submissions
  if (localStorage.getItem("submitted") === "true") {
    form.querySelectorAll("input, button").forEach(el => el.disabled = true);
    messageEl.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    return;
  }

  shareBtn.addEventListener('click', () => {
    if (shareCount < 5) {
      shareCount++;
      const shareText = encodeURIComponent("Hey Buddy, Join Tech For Girls Community! https://techforgirls.example.com");
      const waLink = `https://wa.me/?text=${shareText}`;
      window.open(waLink, '_blank');

      counterText.textContent = `Click count: ${shareCount} / 5`;

      if (shareCount === 5) {
        counterText.textContent += " ✅ Sharing complete. Please continue.";
        submitBtn.disabled = false;
      }
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (shareCount < 5) {
      alert("Please complete WhatsApp sharing before submitting.");
      return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const college = document.getElementById("college").value;
    const fileInput = document.getElementById("screenshot");
    const file = fileInput.files[0];

    // Upload file to Google Drive using Apps Script (via fetch to Google Script URL)
    let formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("file", file);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxlAZiL_lace1O4VROe2l1QadOUPRSulmUySJRKtcyytou2Av-sNh5ObyBP5wVi3wFS1g/exec", {
        method: "POST",
        body: formData
      });

      const result = await response.text();
      messageEl.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
      form.querySelectorAll("input, button").forEach(el => el.disabled = true);
      localStorage.setItem("submitted", "true");
    } catch (err) {
      alert("Something went wrong while submitting. Try again.");
      console.error(err);
    }
  });
});
