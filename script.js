/* ==========================================
            CINEMATIC LOADER
========================================== */

const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");
const loaderRole = document.getElementById("loader-role");
const progressBar = document.querySelector(".loader-progress");
const navbar = document.querySelector(".navbar");
const navbarName = document.getElementById("navbar-name");

const fullName = "Yashwanth R";

let index = 0;

// Type Writer
function typeName() {

    if (index < fullName.length) {

        loaderText.textContent += fullName.charAt(index);

        index++;

        setTimeout(typeName, 120);

    }

    else{

        showRole();

    }

}

// Show subtitle
function showRole(){

    loaderRole.style.opacity = "1";

    setTimeout(fillBar,700);

}

// Fill progress bar
function fillBar(){

    progressBar.style.width = "320px";

    setTimeout(moveName,1000);

}

// Fly to navbar
// Fly to navbar
function moveName() {

    // Mobile: Skip the flying animation
    if (window.innerWidth <= 768) {

        navbar.classList.add("show-navbar");

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.remove();

            document.body.classList.add("loaded");

            startDecryptAnimation();

        }, 800);

        return;
    }

    // Desktop Animation
    const loaderName = document.getElementById("loader-name");

    const start = loaderName.getBoundingClientRect();
    const end = navbarName.getBoundingClientRect();

    loaderName.style.position = "fixed";
    loaderName.style.left = start.left + "px";
    loaderName.style.top = start.top + "px";
    loaderName.style.margin = "0";
    loaderName.style.width = start.width + "px";

    loaderName.style.transition =
        "all .9s cubic-bezier(.16,1,.3,1)";

    requestAnimationFrame(() => {

        loaderName.style.left = end.left + "px";
        loaderName.style.top = end.top + "px";

        loaderName.style.fontSize = "22px";

    });

    navbar.classList.add("show-navbar");

    setTimeout(hideLoader, 900);
}

// Remove loader
function hideLoader(){

    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(()=>{

        loader.remove();

        document.body.classList.add("loaded");

        // Hero name decrypt effect is only started once the loader is
        // fully gone, so it actually plays where the user can see it
        // instead of finishing silently underneath the loader.
        startDecryptAnimation();

    },800);

}

window.addEventListener("load",()=>{

    typeName();

});


// Initialize Lucide



lucide.createIcons();

const themeBtn = document.querySelector(".theme-btn");
const dropdown = document.querySelector(".theme-dropdown");
const options = document.querySelectorAll(".theme-option");

// Open / Close dropdown
themeBtn.addEventListener("click", function(e){

    e.stopPropagation();

    // Close resume dropdown
    resumeDropdown.classList.remove("show");

    // Toggle theme dropdown
    dropdown.classList.toggle("show");

});

// Close dropdown when clicking outside
document.addEventListener("click", function () {
    dropdown.classList.remove("show");
    // Close Resume dropdown
    resumeDropdown.classList.remove("show");
});

// Change theme icon
function applyTheme(theme){

    if(theme === "system"){
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
    else{
        document.documentElement.setAttribute("data-theme", theme);
    }

    localStorage.setItem("theme", theme);

}

// Apply saved theme on page load
const savedTheme = localStorage.getItem("theme") || "system";
applyTheme(savedTheme);

if(savedTheme === "light"){
    themeBtn.innerHTML = '<i data-lucide="sun"></i>';
}
else if(savedTheme === "dark"){
    themeBtn.innerHTML = '<i data-lucide="moon"></i>';
}
else{
    themeBtn.innerHTML = '<i data-lucide="monitor"></i>';
}
lucide.createIcons();

options.forEach(option => {

    option.addEventListener("click", function () {

        const theme = this.dataset.theme;

        applyTheme(theme);

        if(theme === "light"){
            themeBtn.innerHTML = '<i data-lucide="sun"></i>';
        }
        else if(theme === "dark"){
            themeBtn.innerHTML = '<i data-lucide="moon"></i>';
        }
        else{
            themeBtn.innerHTML = '<i data-lucide="monitor"></i>';
        }

        lucide.createIcons();

        const icon = themeBtn.querySelector("svg");

        if(icon){
            icon.classList.add("rotate");
            setTimeout(()=>{
                icon.classList.remove("rotate");
            },500);
        }

    });

});
// ===============================
// Name Decryption Animation
// ===============================

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";

const nameElement = document.getElementById("decrypt-name");

function startDecryptAnimation() {

    if (!nameElement) return;

    const targetText = "YASHWANTH";
    let iteration = 0;

    const interval = setInterval(() => {

        nameElement.innerText = targetText
            .split("")
            .map((letter, index) => {

                if (index < iteration) {
                    return targetText[index];
                }

                return letters[Math.floor(Math.random() * letters.length)];

            })
            .join("");

        if (iteration >= targetText.length) {
            clearInterval(interval);
        }

        iteration += 1 / 5;

    }, 70);

}


const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if(window.scrollY > hero.offsetHeight-100){

        navbar.classList.add("compact");

    }

    else{

        navbar.classList.remove("compact");

    }

});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const NAVBAR_OFFSET = 170;

        const NAV_OFFSET = 120;

const sectionTop = section.offsetTop - NAV_OFFSET;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navItems.forEach(item => {

        item.classList.remove("active");

        if(currentSection && item.getAttribute("href") === "#" + currentSection){

            item.classList.add("active");

        }

    });

});


const resumeBtn = document.querySelector(".resume-btn");
const resumeDropdown = document.querySelector(".resume-dropdown");

resumeBtn.addEventListener("click", function(e){

    e.preventDefault();
    e.stopPropagation();

    // Close theme dropdown
    dropdown.classList.remove("show");

    // Toggle resume dropdown
    resumeDropdown.classList.toggle("show");

});
window.addEventListener("scroll", () => {
    dropdown.classList.remove("show");
    resumeDropdown.classList.remove("show");
});

const resumeLinks = document.querySelectorAll(".resume-dropdown a");

resumeLinks.forEach(link => {

    link.addEventListener("click", function(){

        resumeDropdown.classList.remove("show");

    });

});

resumeDropdown.addEventListener("click", function(e){

    e.stopPropagation();

});

document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(!target) return;

        e.preventDefault();

        // Force the navbar into its compact state BEFORE measuring/scrolling.
        // These nav links always jump past the hero section, so the navbar
        // will end up compact anyway once scrolling finishes. Switching it
        // now avoids a race between the smooth-scroll animation and the
        // navbar's own shrink transition, which was causing the offset to
        // be wrong (and the section heading to end up hidden behind it).
        navbar.classList.add("compact");

        const navOffset = navbar.getBoundingClientRect().height + 40;

        window.scrollTo({

            top: target.offsetTop - navOffset,

            behavior: "smooth"

        });

    });

});

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
if(menuBtn){

    menuBtn.addEventListener("click",function(e){

        e.stopPropagation();

        mobileMenu.classList.toggle("show");

        dropdown.classList.remove("show");
        resumeDropdown.classList.remove("show");

    });

}

document.addEventListener("click",function(){

    mobileMenu.classList.remove("show");

});

mobileMenu.addEventListener("click",function(e){

    e.stopPropagation();


});
document.querySelectorAll(".mobile-menu a").forEach(item => {

    item.addEventListener("click", function(e){

        const href = this.getAttribute("href");

        if(!href.startsWith("#")) return;

        e.preventDefault();

        const target = document.querySelector(href);

        if(!target) return;

        mobileMenu.classList.remove("show");

        navbar.classList.add("compact");

        const offset = window.innerWidth <= 768
            ? 95
            : navbar.getBoundingClientRect().height + 40;

        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: "smooth"
        });

    });

});
mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("show");

    });

});