"use strict";

const forgiveButton = document.getElementById("forgiveBtn");
const response = document.getElementById("response");
const gif = document.getElementById("apologyGif");
const gifFallback = document.getElementById("gifFallback");
const musicFile = document.getElementById("musicFile");
const music = document.getElementById("music");
const hearts = document.getElementById("hearts");

gif.addEventListener("error", () => {
    gif.hidden = true;
    gifFallback.hidden = false;
});

forgiveButton.addEventListener("click", () => {
    response.textContent = "Thank you for hearing me. I care about you so much 💙";
    forgiveButton.textContent = "Thank you 💙";
    forgiveButton.disabled = true;
});

musicFile.addEventListener("change", () => {
    const file = musicFile.files && musicFile.files[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
        response.textContent = "Please choose an audio file.";
        musicFile.value = "";
        return;
    }

    if (music.src.startsWith("blob:")) URL.revokeObjectURL(music.src);
    music.src = URL.createObjectURL(file);
    music.hidden = false;
    music.load();
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent = "♥";
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${5 + Math.random() * 4}s`;
        heart.style.fontSize = `${14 + Math.random() * 18}px`;
        hearts.append(heart);
        heart.addEventListener("animationend", () => heart.remove(), { once: true });
    }, 900);
}
