// ДАННЫЕ АЛЬБОМА: фото + тексты RU/SV
const photos = [
    {
        src: "img/photo1.jpg",
        ru: {
            title: "Описание кадра",
            desc: "Момент, когда вы встретились взглядами и весь зал исчез."
        },
        sv: {
            title: "Beskrivning av bilden",
            desc: "Ögonblicket när era blickar möttes och hela rummet försvann."
        }
    },
    {
        src: "img/photo2.jpg",
        ru: {
            title: "Описание кадра",
            desc: "Тот самый шаг навстречу, когда сердце говорит «да» раньше слов."
        },
        sv: {
            title: "Beskrivning av bilden",
            desc: "Det där steget mot varandra där hjärtat sa ”ja” långt före orden."
        }
    },
    {
        src: "img/photo3.jpg",
        ru: {
            title: "Описание кадра",
            desc: "Тихая радость в глазах, будто весь мир сузился до двух людей."
        },
        sv: {
            title: "Beskrivning av bilden",
            desc: "Den stilla glädjen i blicken, som om hela världen krympte till två personer."
        }
    },
    {
        src: "img/photo4.jpg",
        ru: {
            title: "Описание кадра",
            desc: "Руки, которые обещают держаться друг за друга во всех сезонах жизни."
        },
        sv: {
            title: "Beskrivning av bilden",
            desc: "Händer som lovar att hålla i varandra genom alla livets årstider."
        }
    },
    {
        src: "img/photo5.jpg",
        ru: {
            title: "Описание кадра",
            desc: "Смех, который разлетается по залу и остаётся эхо в памяти."
        },
        sv: {
            title: "Beskrivning av bilden",
            desc: "Skratt som fyller rummet och blir ett eko i minnet."
        }
    },
    {
        src: "img/photo6.jpg",
        ru: {
            title: "Описание кадра",
            desc: "Танец, где каждый шаг — признание в любви без единого слова."
        },
        sv: {
            title: "Beskrivning av bilden",
            desc: "Dansen där varje steg är en kärleksförklaring utan ett enda ord."
        }
    },
    {
        src: "img/photo7.jpg",
        ru: {
            title: "Описание кадра",
            desc: "Объятие, в котором становится спокойно и ясно, что дом — это человек."
        },
        sv: {
            title: "Beskrivning av bilden",
            desc: "Omfamningen där allt blir stilla och klart: hem är en människa."
        }
    },
    {
        src: "img/photo8.jpg",
        ru: {
            title: "Описание кадра",
            desc: "Вечерний свет, в котором ваши силуэты уже пишут семейную историю."
        },
        sv: {
            title: "Beskrivning av bilden",
            desc: "Kvällsljuset där era siluetter redan skriver familjehistoria."
        }
    },
    {
        src: "img/photo9.jpg",
        ru: {
            title: "Описание кадра",
            desc: "Праздник подошёл к концу, но в сердце остался мягкий свет этого дня."
        },
        sv: {
            title: "Beskrivning av bilden",
            desc: "Festligheterna tog slut, men i hjärtat stannade dagens mjuka sken kvar."
        }
    }
];

// Тексты интерфейса для двух языков
const uiTexts = {
    ru: {
        mainTitle: "СВАДЕБНЫЙ ДИЖИТАЛ-АЛЬБОМ",
        subTitleTop: "Нежные воспоминания в бело-розовых тонах / Mjuka minnen i vitt och rosa.",
        pageLabel: (i, total) => `Страница ${i} из ${total}`
    },
    sv: {
        mainTitle: "Bröllopsdigital-album",
        subTitleTop: "Mjuka minnen i vitt och rosa / Nежные minnen i vitt och rosa.",
        pageLabel: (i, total) => `Sida ${i} av ${total}`
    }
};

// ЭЛЕМЕНТЫ DOM
const photoImg = document.getElementById("photoImg");
const frameTitle = document.getElementById("frameTitle");
const frameDescription = document.getElementById("frameDescription");
const pageIndicator = document.getElementById("pageIndicator");
const mainTitleEl = document.getElementById("mainTitle");
const subTitleTopEl = document.getElementById("subTitleTop");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const albumPage = document.getElementById("albumPage");
const logoFooter = document.getElementById("logoFooter");
const langButtons = document.querySelectorAll(".lang-btn");

// Текущее состояние
let currentIndex = 0;
let currentLang = "ru";

// Обновление страницы альбома
function updateAlbumPage(animateDirection = null) {
    const photo = photos[currentIndex];

    // Картинка
    photoImg.src = photo.src;

    // Текст в зависимости от языка
    const textBlock = photo[currentLang];
    frameTitle.textContent = `${textBlock.title} / ${currentLang === "ru" ? "Beskrivning av bilden" : "Описание кадра"}`;
    frameDescription.textContent = textBlock.desc;

    // Заголовки
    const ui = uiTexts[currentLang];
    mainTitleEl.textContent = ui.mainTitle;
    subTitleTopEl.textContent = ui.subTitleTop;
    pageIndicator.textContent = ui.pageLabel(currentIndex + 1, photos.length);

    // Кнопки в начало/конец
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === photos.length - 1;

    // Логотип только на последней странице
    logoFooter.style.display = currentIndex === photos.length - 1 ? "block" : "none";

    // Анимация перелистывания
    if (animateDirection) {
        albumPage.classList.remove("flip-right", "flip-left");
        // триггер, чтобы перезапустить анимацию
        void albumPage.offsetWidth;
        albumPage.classList.add(animateDirection === "right" ? "flip-right" : "flip-left");
    }
}

// Смена языка
langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        if (lang === currentLang) return;

        currentLang = lang;

        langButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        updateAlbumPage(); // без анимации, только текст
    });
});

// Навигация по страницам
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex -= 1;
        updateAlbumPage("left");
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < photos.length - 1) {
        currentIndex += 1;
        updateAlbumPage("right");
    }
});

// ПЕРВЫЙ РЕНДЕР
updateAlbumPage();
