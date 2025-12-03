// ДАННЫЕ АЛЬБОМА: фото + тексты на двух языках
const albumPhotos = [
    {
        img: "img/photo1.jpg",
        ru: {
            title: "Первое прикосновение",
            caption: "Тот момент, когда кольца встретились, а мир вокруг исчез."
        },
        sv: {
            title: "Den första beröringen",
            caption: "Ögonblicket då ringarna möttes och världen runt omkring försvann."
        }
    },
    {
        img: "img/photo2.jpg",
        ru: {
            title: "Собранные мечты",
            caption: "Все дороги привели вас к этому дню, к этому лёгкому дыханию счастья."
        },
        sv: {
            title: "Samlande drömmar",
            caption: "Alla vägar ledde hit, till denna dag och den mjuka andetaget av lycka."
        }
    },
    {
        img: "img/photo3.jpg",
        ru: {
            title: "Тёплые голоса",
            caption: "Смех близких смешался с шёпотом обещаний навсегда."
        },
        sv: {
            title: "Varma röster",
            caption: "Nära och käras skratt blandades med viskade löften om för alltid."
        }
    },
    {
        img: "img/photo4.jpg",
        ru: {
            title: "Танец сердец",
            caption: "Каждый шаг — как строка из вашей общей истории любви."
        },
        sv: {
            title: "Hjärtans dans",
            caption: "Varje steg blev en rad i er gemensamma kärlekshistoria."
        }
    },
    {
        img: "img/photo5.jpg",
        ru: {
            title: "Объятие тишины",
            caption: "В паузе между музыкой вы услышали, как спокойно бьются два сердца."
        },
        sv: {
            title: "Tystnadens omfamning",
            caption: "I pausen mellan tonerna hörde ni hur två hjärtan slog lugnt tillsammans."
        }
    },
    {
        img: "img/photo6.jpg",
        ru: {
            title: "Сила взгляда",
            caption: "Одного взгляда было достаточно, чтобы почувствовать: дом — это вы вдвоём."
        },
        sv: {
            title: "Blickens kraft",
            caption: "En enda blick räckte för att känna att hem är ni två tillsammans."
        }
    },
    {
        img: "img/photo7.jpg",
        ru: {
            title: "В кругу света",
            caption: "Свечи, улыбки, тихое тепло — всё это бережно хранит ваш день."
        },
        sv: {
            title: "I ljusets cirkel",
            caption: "Ljus, leenden och stilla värme bevarar varsamt denna dag."
        }
    },
    {
        img: "img/photo8.jpg",
        ru: {
            title: "Шаг навстречу будущему",
            caption: "Рука в руке, вы сделали первый шаг в свою новую семейную историю."
        },
        sv: {
            title: "Ett steg mot framtiden",
            caption: "Hand i hand tog ni det första steget in i er nya familjehistoria."
        }
    },
    {
        img: "img/photo9.jpg",
        ru: {
            title: "Тихое послевкусие",
            caption: "Праздник закончился, но внутри осталось мягкое сияние этого дня."
        },
        sv: {
            title: "Det stilla efterglödet",
            caption: "Festligheterna tog slut, men inom er stannade dagens mjuka sken kvar."
        }
    }
];

// Общие тексты интерфейса
const uiText = {
    ru: {
        albumTitle: "СВАДЕБНЫЙ ДИЖИТАЛ-АЛЬБОМ",
        subtitle: "Нежные воспоминания в бело-розовых тонах.",
        descriptionLabel: "Описание кадра",
        pageWord: "Страница",
        ofWord: "из"
    },
    sv: {
        albumTitle: "Bröllopsdigital-album",
        subtitle: "Mjuka minnen i vitt och rosa.",
        descriptionLabel: "Beskrivning av bilden",
        pageWord: "Sida",
        ofWord: "av"
    }
};

// ЭЛЕМЕНТЫ DOM
const pageCard = document.getElementById("page-card");
const photoImg = document.getElementById("photo-img");
const descriptionLabel = document.getElementById("description-label");
const photoCaption = document.getElementById("photo-caption");
const pageCounter = document.getElementById("page-counter");
const albumTitleEl = document.getElementById("album-title");
const albumSubtitleEl = document.getElementById("album-subtitle");
const albumLogo = document.getElementById("album-logo");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const langButtons = document.querySelectorAll(".lang-btn");

// СОСТОЯНИЕ
let currentIndex = 0;
let currentLang = "ru";

// ФУНКЦИЯ ОТРИСОВКИ СТРАНИЦЫ
function renderPage() {
    const item = albumPhotos[currentIndex];
    const langData = item[currentLang];
    const ui = uiText[currentLang];

    // фото
    photoImg.src = item.img;

    // текст
    descriptionLabel.textContent = ui.descriptionLabel;
    albumTitleEl.textContent = ui.albumTitle;
    albumSubtitleEl.textContent = ui.subtitle;
    photoCaption.textContent = langData.caption;

    const total = albumPhotos.length;
    pageCounter.textContent = `${ui.pageWord} ${currentIndex + 1} ${ui.ofWord} ${total}`;

    // логотип только на последней странице
    if (currentIndex === total - 1) {
        albumLogo.classList.remove("hidden");
    } else {
        albumLogo.classList.add("hidden");
    }

    // язык документа (для доступности)
    document.documentElement.lang = currentLang === "ru" ? "ru" : "sv";

    // кнопки вперёд/назад
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === total - 1;
}

// АНИМАЦИЯ ПЕРЕЛИСТЫВАНИЯ
function playFlipAnimation(direction) {
    const className = direction === "next" ? "flip-next" : "flip-prev";
    pageCard.classList.remove("flip-next", "flip-prev"); // сброс
    // принудительная перерисовка
    void pageCard.offsetWidth;
    pageCard.classList.add(className);
}

// ОБРАБОТЧИКИ КНОПОК
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        playFlipAnimation("prev");
        renderPage();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < albumPhotos.length - 1) {
        currentIndex++;
        playFlipAnimation("next");
        renderPage();
    }
});

// ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА
langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (lang === currentLang) return;

        currentLang = lang;

        langButtons.forEach((b) => b.classList.toggle("active", b === btn));
        renderPage();
    });
});

// ПЕРВЫЙ РЕНДЕР
renderPage();
