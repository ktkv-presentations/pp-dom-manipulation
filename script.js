const EVENT_DATE = "2027-07-17T16:00:00"

const artists = [
    {
        name: "[Артист 1]",
        genre: "[Жанр]",
        group: "main",
        emoji: "🎤",
        tracks: ["[Трек 1]", "[Трек 2]", "[Трек 3]"],
    },
    {
        name: "[Артист 2]",
        genre: "[Жанр]",
        group: "main",
        emoji: "🎧",
        tracks: ["[Трек 1]", "[Трек 2]", "[Трек 3]"],
    },
    {
        name: "[Артист 3]",
        genre: "[Жанр]",
        group: "other",
        emoji: "🎸",
        tracks: ["[Трек 1]", "[Трек 2]", "[Трек 3]"],
    },
]

const tickerTrack = document.querySelector(".ticker-track")
tickerTrack.innerHTML = artists.map((el) => el.name).join(" ★ ")

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

    card.append(top, body)
    return card
}

const lineup = document.querySelector("#lineup-cards")
artists.forEach((artist) => lineup.append(createCard(artist)))

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
}
document.querySelectorAll(".ticket").forEach(setupTicket)

const votes = [0, 0, 0]
function updateBars() {
    const total = votes[0] + votes[1] + votes[2]
    document.querySelectorAll(".vote-row").forEach((row, i) => {
        row.querySelector(".vote-count").textContent = votes[i]
        row.querySelector(".bar-fill").style.width =
            (votes[i] / total) * 100 + "%"
    })
}
