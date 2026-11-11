// ================== НАСТРОЙКИ ==================
// Когда начнётся фестиваль: год-месяц-деньTчасы:минуты:секунды
const EVENT_DATE = "2026-08-01T16:00:00"

// ================== ДАННЫЕ: исполнители ==================
// group нужен для фильтра: 'main' или 'other'
const artists = [
    {
        name: "Dopeclvb",
        genre: "Объединение с 2012 года",
        group: "main",
        emoji: "💿",
        tracks: ["Доуп (альбом DOPET4PE)"],
    },
    {
        name: "i61",
        genre: "Альтернативный хип-хоп, Уфа",
        group: "other",
        emoji: "👽",
        tracks: ["ALIEN", "RADAR", "STL NRKTK"],
    },
    {
        name: "Basic Boy",
        genre: "Хип-хоп",
        group: "other",
        emoji: "🏐",
        tracks: ["Низкий Флекс", "Трэп Замок", "Пляжный Волейбол"],
    },
    {
        name: "Thomas Mraz",
        genre: "Хип-хоп, мелодичный вокал",
        group: "other",
        emoji: "🎙️",
        tracks: ["Чернила", "Фотки"],
    },
]

// ================== [1] ТЕМЫ (делаем вместе) ==================
// Кнопки .theme-btn меняют класс у <body>.
// Подсказка: document.body.className = btn.dataset.theme
// Потом сам: добавь в style.css свои цвета в .theme-mine и кнопку в шапку.
document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.body.className = btn.dataset.theme
    })
})

// ================== ОТСЧЁТ (готово, меняй только EVENT_DATE) ==================
function updateCountdown() {
    const box = document.querySelector("#countdown")
    const diff = new Date(EVENT_DATE) - new Date()
    if (diff <= 0) {
        box.textContent = "Фестиваль уже начался или прошёл"
        return
    }
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor(diff / 3600000) % 24
    const mins = Math.floor(diff / 60000) % 60
    box.textContent = days + " дн. " + hours + " ч. " + mins + " мин."
}
updateCountdown()
setInterval(updateCountdown, 60000)

// ================== [2] ПРОМОКОД: скрытое становится видимым (делаем вместе) ==================
// При клике на #secret-btn убери у #secret класс hidden.
// Подсказка: document.querySelector('#secret').classList.remove('hidden')
document.querySelector("#secret-btn").addEventListener("click", () => {
    document.querySelector("#secret").classList.remove("hidden")
})

// ================== [3] КАРТОЧКИ ИСПОЛНИТЕЛЕЙ (делаем вместе, потом сам) ==================
function createCard(artist) {
    const card = document.createElement("article")
    card.className = "card"
    card.dataset.group = artist.group

    const top = document.createElement("div")
    top.className = "card-top"
    top.textContent = artist.emoji

    const body = document.createElement("div")
    body.className = "card-body"

    const title = document.createElement("h3")
    title.textContent = artist.name

    const meta = document.createElement("p")
    meta.className = "meta"
    meta.textContent = artist.genre

    body.append(title, meta)

    // [3a] Список треков (ul с классом tracks hidden, внутри li для каждого трека)
    const list = document.createElement("ul")
    list.className = "tracks hidden"
    artist.tracks.forEach((track) => {
        const li = document.createElement("li")
        li.textContent = "♪ " + track
        list.append(li)
    })

    // [3b] Кнопка «Показать треки»: переключает список и меняет свой текст
    const btn = document.createElement("button")
    btn.className = "btn btn-small"
    btn.textContent = "Показать треки"
    btn.addEventListener("click", () => {
        list.classList.toggle("hidden")
        btn.textContent = list.classList.contains("hidden")
            ? "Показать треки"
            : "Скрыть треки"
    })
    body.append(btn, list)

    // [3c] Кнопка лайка: «♥ 0», каждый клик прибавляет 1
    let likes = 0
    const like = document.createElement("button")
    like.className = "like"
    like.textContent = "♥ 0"
    like.addEventListener("click", () => {
        likes++
        like.textContent = "♥ " + likes
    })
    body.append(like)

    card.append(top, body)
    return card
}

const lineup = document.querySelector("#lineup-cards")
artists.forEach((artist) => lineup.append(createCard(artist)))

// ================== [4] БИЛЕТЫ: плюс и минус (делаем вместе) ==================
// Итог считается готовой функцией. Твоя задача: кнопки + и − меняют число .qty.
function updateTotal() {
    let sum = 0
    document.querySelectorAll(".ticket").forEach((ticket) => {
        sum +=
            Number(ticket.dataset.price) *
            Number(ticket.querySelector(".qty").textContent)
    })
    document.querySelector("#total").textContent = "Итого: " + sum + " ₽"
}

function setupTicket(ticket) {
    const qty = ticket.querySelector(".qty")
    ticket.querySelector(".plus").addEventListener("click", () => {
        qty.textContent = Number(qty.textContent) + 1
        updateTotal()
    })
    ticket.querySelector(".minus").addEventListener("click", () => {
        if (Number(qty.textContent) > 0) {
            qty.textContent = Number(qty.textContent) - 1
            updateTotal()
        }
    })
}
document.querySelectorAll(".ticket").forEach(setupTicket)

// ================== [5] ВОПРОСЫ И ОТВЕТЫ (сам, по образцу задания 2) ==================
// По клику на .faq-q показывай и скрывай следующий за ним элемент (.faq-a).
// Подсказка: question.nextElementSibling
document.querySelectorAll(".faq-q").forEach((question) => {
    question.addEventListener("click", () => {
        question.nextElementSibling.classList.toggle("hidden")
    })
})

// ================== [6] ПОДПИСКА (делаем вместе) ==================
// По клику на #sub-btn прочитай имя из #sub-name и напиши приветствие в #sub-msg.
// Подсказка: input.value. Если имя пустое, попроси ввести его.
document.querySelector("#sub-btn").addEventListener("click", () => {
    const name = document.querySelector("#sub-name").value
    const msg = document.querySelector("#sub-msg")
    if (name === "") {
        msg.textContent = "Введи имя, чтобы подписаться"
    } else {
        msg.textContent = "Спасибо, " + name + "! Ты в списке."
    }
})

// ================== [7] БОНУС: ФИЛЬТР ИСПОЛНИТЕЛЕЙ ==================
// Кнопки .filter-btn показывают только карточки нужной группы (data-filter и data-group).
// Подсказка: card.classList.toggle('hidden', условие)
document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".card").forEach((card) => {
            const show =
                btn.dataset.filter === "all" ||
                card.dataset.group === btn.dataset.filter
            card.classList.toggle("hidden", !show)
        })
    })
})

// ================== [8] ВКЛАДКИ: зоны площадки (делаем вместе) ==================
// Кнопка .tab-btn показывает блок с id из data-tab и прячет остальные .tab.
// Подсказка: сначала всем .tab добавь класс hidden, потом нужному убери.
document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document
            .querySelectorAll(".tab")
            .forEach((tab) => tab.classList.add("hidden"))
        document.querySelector("#" + btn.dataset.tab).classList.remove("hidden")
    })
})

// ================== [9] СЛУЧАЙНЫЙ ТРЕК (делаем вместе) ==================
// По клику на #random-btn выбери случайного артиста и его случайный трек, выведи в #random-out.
// Подсказка: Math.floor(Math.random() * artists.length)
document.querySelector("#random-btn").addEventListener("click", () => {
    const artist = artists[Math.floor(Math.random() * artists.length)]
    const track =
        artist.tracks[Math.floor(Math.random() * artist.tracks.length)]
    document.querySelector("#random-out").textContent =
        "Послушай: " + track + " (" + artist.name + ")"
})

// ================== [10] ГОЛОСОВАНИЕ ==================
// Полоски рисует готовая функция updateBars. Твоя задача: по клику на кнопку
// добавить голос в массив votes и вызвать updateBars().
const votes = [0, 0, 0]
function updateBars() {
    const total = votes[0] + votes[1] + votes[2]
    document.querySelectorAll(".vote-row").forEach((row, i) => {
        row.querySelector(".vote-count").textContent = votes[i]
        row.querySelector(".bar-fill").style.width =
            (votes[i] / total) * 100 + "%"
    })
}
document.querySelectorAll(".vote-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
        votes[i]++
        updateBars()
    })
})

// ================== [11] СТЕНА ОТЗЫВОВ ==================
// По клику на #wall-btn создай <p class="wall-item"> с текстом из #wall-text,
// добавь его в начало #wall-list (prepend) и очисти поле. Пустой текст не добавляй.
document.querySelector("#wall-btn").addEventListener("click", () => {
    const input = document.querySelector("#wall-text")
    if (input.value === "") return
    const item = document.createElement("p")
    item.className = "wall-item"
    item.textContent = "💬 " + input.value
    document.querySelector("#wall-list").prepend(item)
    input.value = ""
})

// ================== [12] ОКНО С ПРАВИЛАМИ ==================
// #rules-btn открывает #modal, #modal-close закрывает. Бонус: клик по тёмному фону тоже закрывает.
// Подсказка: в обработчике клика есть event.target
const modal = document.querySelector("#modal")
document
    .querySelector("#rules-btn")
    .addEventListener("click", () => modal.classList.remove("hidden"))
document
    .querySelector("#modal-close")
    .addEventListener("click", () => modal.classList.add("hidden"))
modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.add("hidden")
})

// ================== [13] КНОПКА «НАВЕРХ» ==================
// Кнопка #to-top видна, только когда страница прокручена вниз (window.scrollY больше 400).
// По клику плавно прокрути наверх: window.scrollTo({ top: 0, behavior: 'smooth' })
const toTop = document.querySelector("#to-top")
window.addEventListener("scroll", () => {
    toTop.classList.toggle("hidden", window.scrollY < 400)
})
toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
})
