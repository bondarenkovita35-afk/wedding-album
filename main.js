const photos = [
    "img/photo1.jpg",
    "img/photo2.jpg",
    "img/photo3.jpg",
    "img/photo4.jpg",
    "img/photo5.jpg",
    "img/photo6.jpg",
    "img/photo7.jpg",
    "img/photo8.jpg",
    "img/photo9.jpg"
];

const TEXTS = {
    ru: {
        titleMain: "Премиальный свадебный альбом",
        titleSub: "Нежные воспоминания в золотых оттенках",
        captions: [
            "Ваш день начинается с первых нежных взглядов.",
            "Момент, когда сердца бьются в одном ритме.",
            "Тишина, наполненная ожиданием счастья.",
            "Прикосновения, полные тепла и любви.",
            "Смех, который объединяет.",
            "Движение, похожее на дыхание.",
            "Свет, который делает момент вечным.",
            "Традиции, которые становятся вашим.",
            "Финальный аккорд — и начало новой истории."
        ]
    },

    sv: {
        titleMain: "Premium bröllopsalbum",
        titleSub: "Mjuka minnen i gyllene toner",
        captions: [
            "Er dag börjar med mjuka blickar.",
            "Ögonblicket när era hjärtan slår som ett.",
            "Stillheten fylld av förväntan.",
            "Beröringar fyllda av värme och kärlek.",
            "Skratt som förenar er.",
            "Rörelser som känns som andning.",
            "Ljuset som gör ögonblicket evigt.",
            "Traditioner som blir era egna.",
            "Sista tonen — men starten på en ny historia."
        ]
    }
};

let currentLang = "ru";
let currentIndex = 0;

// элементы
const h1 = document.querySelector('[data-i18n="title.main"]');
const p = document.querySelector('[data-i18n="title.sub"]');

const imgEl = document.getElementById("album-photo");
const captionEl = document.getElementById("album-caption");
const counterEl = document.getElementById("counter");
const logoEl = document.getElementById("album-logo");

function render() {
    imgEl.src = photos[currentIndex];
    imgEl.alt = TEXTS[currentLang].captions[currentIndex];
    captionEl.textContent = TEXTS[currentLang].captions[currentIndex];

    counterEl.textContent = `${currentIndex + 1} / ${photos.length}`;

    if (currentIndex === photos.length - 1) {
        logoEl.classList.add("visible");
    } else {
        logoEl.classList.remove("visible");
    }

    h1.textContent = TEXTS[currentLang].titleMain;
    p.textContent = TEXTS[currentLang].titleSub;
}

// навигация
document.getElementById("next").onclick = () => {
    if (currentIndex < photos.length - 1) {
        currentIndex++;
        render();
    }
};

document.getElementById("prev").onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        render();
    }
};

// язык
document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentLang = btn.dataset.lang;

        document
            .querySelectorAll(".lang-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        render();
    });
});

// запуск
render();
