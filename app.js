const API_URL = "https://script.google.com/macros/s/AKfycbzn22KZnOss3kzv-qW3_JcAnKepjx13dUgP6w1fxUGiqgDUckMdr1TufbfGX0j_siU4/exec";

const form = document.getElementById("form");
const fullNameInput = document.getElementById("fullName");
const submitBtn = document.getElementById("submitBtn");
const msg = document.getElementById("msg");

function setMessage(text, type = "") {
  msg.textContent = text;
  msg.className = "msg " + (type || "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = fullNameInput.value.trim();
  if (!fullName) {
    setMessage("Будь ласка, введіть ПІБ", "err");
    return;
  }

  submitBtn.disabled = true;
  setMessage("Надсилаємо...");

  try {
    const body = new URLSearchParams();
    body.append("fullName", fullName);

    const res = await fetch(API_URL, {
      method: "POST",
      body
    });

    const data = await res.json();

    if (data.ok) {
      setMessage(data.message || "Заявку прийнято ✅", "ok");
      form.reset();
    } else {
      const details = data.error ? ` (${data.error})` : "";
      setMessage((data.message || "Не вдалося надіслати заявку") + details, "err");
      console.error("API error:", data);
    }
  } catch (error) {
    console.error("Submit error:", error);
    setMessage("Помилка з'єднання. Спробуйте ще раз.", "err");
  } finally {
    submitBtn.disabled = false;
  }
});
