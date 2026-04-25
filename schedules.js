const allGenres = [
    "hiphop",
    "無house",
    "限house",
    "pop",
    "lock",
    "punking",
    "jazz",
    "girls",
    "break"
];

const weeklyGenreRules = {
    0: allGenres, // 日
    1: ["無house", "lock"], // 月
    2: ["girls", "punking"], // 火
    3: ["break", "限house"], // 水
    4: ["jazz", "OP"], // 木
    5: ["hiphop", "pop"], // 金
    6: allGenres // 土
};

const runthroughSchedules = [
    {
        date: "2026-04-04",
        time: "時間未定",
        title: "第1回通し",
        place: "場所未定",
        genres: allGenres,
        type: "通し"
    },
    {
        date: "2026-04-19",
        time: "時間未定",
        title: "第2回通し",
        place: "アリーナ",
        genres: allGenres,
        type: "通し"
    },
    {
        date: "2026-05-06",
        time: "時間未定",
        title: "第3回通し",
        place: "白浜フローラルホール",
        genres: allGenres,
        type: "通し"
    },
    {
        date: "2026-05-10",
        time: "時間未定",
        title: "第4回通し",
        place: "アリーナ",
        genres: allGenres,
        type: "通し"
    },
    {
        date: "2026-05-13",
        time: "時間未定",
        title: "第5回通し",
        place: "湘南台文化センター",
        genres: allGenres,
        type: "通し"
    },
    {
        date: "2026-05-28",
        time: "時間未定",
        title: "第6回通し",
        place: "湘南台文化センター",
        genres: allGenres,
        type: "通し"
    }
];

function parseDateLocal(dateString) {
    const parts = dateString.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatDateJapanese(dateString) {
    const date = parseDateLocal(dateString);
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];

    return `${month}月${day}日（${weekday}）`;
}

function createDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function isBetween(dateString, startString, endString) {
    const date = parseDateLocal(dateString);
    const start = parseDateLocal(startString);
    const end = parseDateLocal(endString);

    return date >= start && date <= end;
}

function generatePracticeSchedules() {
    const schedules = [];

    const start = parseDateLocal("2026-04-01");
    const end = parseDateLocal("2026-06-13");

    for (
        let current = new Date(start);
        current <= end;
        current.setDate(current.getDate() + 1)
    ) {
        const dateString = createDateString(current);
        const day = current.getDay();

        let title = "通常練習";
        let place = "場所未定";
        let time = "時間未定";
        let genres = weeklyGenreRules[day];
        let type = "練習";

        if (isBetween(dateString, "2026-05-03", "2026-05-06")) {
            title = "合宿";
            place = "白浜フローラルホール";
            genres = allGenres;
            type = "合宿";
        }

        if (isBetween(dateString, "2026-06-09", "2026-06-12")) {
            title = "小屋入り期間";
            place = "会場";
            genres = allGenres;
            type = "小屋入り";
        }

        if (dateString === "2026-06-13") {
            title = "本番";
            place = "本番会場";
            genres = allGenres;
            type = "本番";
        }

        schedules.push({
            date: dateString,
            time: time,
            title: title,
            place: place,
            genres: genres,
            type: type
        });
    }

    const mergedSchedules = schedules.concat(runthroughSchedules);

    mergedSchedules.sort((a, b) => {
        const dateA = parseDateLocal(a.date);
        const dateB = parseDateLocal(b.date);

        if (dateA.getTime() !== dateB.getTime()) {
            return dateA - dateB;
        }

        if (a.type === "通し") return 1;
        if (b.type === "通し") return -1;

        return 0;
    });

    return mergedSchedules;
}

const practiceSchedules = generatePracticeSchedules();