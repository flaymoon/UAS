const materiDatabase = {
    integer: {
        title: "INTEGER (Bilangan Bulat)", icon: "🔢",
        desc: "Integer menampung angka bulat murni positif maupun negatif tanpa koma desimal. Sangat hemat memori dan cepat diproses.",
        memory: "4 Bytes (32-bit)", char: "Bilangan Bulat Murni", defaultVal: "100", varName: "hp_player"
    },
    float: {
        title: "FLOAT (Bilangan Pecahan)", icon: "🧪",
        desc: "Float digunakan untuk bilangan desimal yang memiliki angka di belakang koma. Menggunakan tanda titik (.) sebagai pemisah pecahan.",
        memory: "4 Bytes / 8 Bytes", char: "Pecahan / Desimal Presisi", defaultVal: "0.75", varName: "crit_rate"
    },
    string: {
        title: "STRING (Teks Literis)", icon: "📜",
        desc: "String digunakan untuk menampung teks, huruf, kata, atau kalimat. Nilai wajib dibungkus tanda petik tunggal ('') atau ganda (\"\").",
        memory: "Dinamis (Ikut Jumlah Karakter)", char: "Kumpulan Huruf / Simbol", defaultVal: '"Farel"', varName: "nama_hero"
    },
    boolean: {
        title: "BOOLEAN (Kondisi Logika)", icon: "⚖️",
        desc: "Boolean hanya bernilai benar atau salah. Sangat penting untuk membuat struktur penyeleksian kondisi logika keputusan (if-else).",
        memory: "1 Byte", char: "True atau False", defaultVal: "True", varName: "is_alive"
    }
};

let currentActiveType = "";

function openModal(type) {
    currentActiveType = type;
    const data = materiDatabase[type];
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-icon').innerText = data.icon;
    document.getElementById('modal-desc').innerText = data.desc;
    document.getElementById('modal-memory').innerText = data.memory;
    document.getElementById('modal-char').innerText = data.char;
    document.getElementById('modal-var-name').innerText = data.varName;
    document.getElementById('modal-input').value = data.defaultVal;
    livePreviewCode();
    document.getElementById('materi-modal').classList.remove('hidden');
}

function closeModal() { document.getElementById('materi-modal').classList.add('hidden'); }

function livePreviewCode() {
    const inputVal = document.getElementById('modal-input').value.trim();
    const fb = document.getElementById('modal-feedback');
    const typeInd = document.getElementById('modal-detected-type');

    if (inputVal === "") {
        fb.innerText = "❌ Kosong!"; fb.className = "text-rose-500 font-bold";
        typeInd.innerText = "UNKNOWN"; return;
    }

    if (currentActiveType === 'integer') {
        if (/^-?\d+$/.test(inputVal)) {
            fb.innerText = "✔ Valid Integer!"; fb.className = "text-emerald-400 font-bold";
            typeInd.innerText = "INTEGER";
        } else {
            fb.innerText = "❌ Error! Harus bulat."; fb.className = "text-rose-500 font-bold";
            typeInd.innerText = "COMPILER ERROR";
        }
    } else if (currentActiveType === 'float') {
        if (/^-?\d+\.\d+$/.test(inputVal)) {
            fb.innerText = "✔ Valid Float Pecahan!"; fb.className = "text-emerald-400 font-bold";
            typeInd.innerText = "FLOAT";
        } else {
            fb.innerText = "❌ Error! Gunakan titik (.)."; fb.className = "text-rose-500 font-bold";
            typeInd.innerText = "COMPILER ERROR";
        }
    } else if (currentActiveType === 'string') {
        if ((inputVal.startsWith('"') && inputVal.endsWith('"')) || (inputVal.startsWith("'") && inputVal.endsWith("'"))) {
            fb.innerText = "✔ Valid String Teks!"; fb.className = "text-emerald-400 font-bold";
            typeInd.innerText = "STRING";
        } else {
            fb.innerText = "❌ Error! Wajib pakai petik ' atau \"."; fb.className = "text-rose-500 font-bold";
            typeInd.innerText = "SYNTAX ERROR";
        }
    } else if (currentActiveType === 'boolean') {
        if (['True', 'False', 'true', 'false'].includes(inputVal)) {
            fb.innerText = "✔ Valid Boolean!"; fb.className = "text-emerald-400 font-bold";
            typeInd.innerText = "BOOLEAN";
        } else {
            fb.innerText = "❌ Error! Hanya boleh True / False."; fb.className = "text-rose-500 font-bold";
            typeInd.innerText = "LOGIC ERROR";
        }
    }
    function openModal(type) {
    // ... kode bawaan yang sudah ada ...
    document.getElementById('materi-modal').classList.remove('hidden');

    // SINKRONISASI GAME: Picu misi 1 selesai karena siswa sudah membaca materi
    if(typeof triggerMisi1Selesai === "function") { triggerMisi1Selesai(); }
}
}