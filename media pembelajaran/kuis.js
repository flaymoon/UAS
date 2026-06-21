const kuisData = [
    {
        tanya: "Di dalam game, skor pemain disimpan dengan angka bulat seperti: `skor = 150`. Apa tipe data yang paling tepat untuk menyimpan angka bulat tersebut?",
        pilihan: ["STRING", "BOOLEAN", "INTEGER", "FLOAT"],
        kunci: 2 // Indeks ke-2 yaitu INTEGER
    },
    {
        tanya: "Jika kamu ingin menyimpan nilai persentase akurasi tembakan berupa angka desimal, contohnya: `akurasi = 85.5`. Tipe data apa yang harus digunakan?",
        pilihan: ["FLOAT", "INTEGER", "BOOLEAN", "STRING"],
        kunci: 0 // Indeks ke-0 yaitu FLOAT
    },
    {
        tanya: "Potongan kode berikut digunakan untuk menyimpan nama karakter: `hero = \"Farel\"`. Mengapa nilai \"Farel\" disebut sebagai tipe data STRING?",
        pilihan: [
            "Karena nilainya berupa angka pecahan.",
            "Karena nilainya berupa teks yang diapit tanda petik.",
            "Karena nilainya hanya berisi True atau False.",
            "Karena nilainya digunakan untuk menghitung matematika."
        ],
        kunci: 1 // Indeks ke-1 yaitu opsi kedua
    },
    {
        tanya: "Sebuah sensor gerbang memori mengecek kondisi status permainan: `is_active = True`. Apa nama tipe data yang hanya memiliki dua pilihan nilai (True/False) seperti ini?",
        pilihan: ["INTEGER", "STRING", "FLOAT", "BOOLEAN"],
        kunci: 3 // Indeks ke-3 yaitu BOOLEAN
    }
];

// PENTING: Gunakan objek window agar variabel lembarJawabanSiswa bersifat global dan bisa diakses antar-fungsi
window.lembarJawabanSiswa = {};

function muatKuis() {
    const wadahKuis = document.getElementById('quiz-container');
    if (!wadahKuis) return; // Pengaman jika elemen HTML belum siap

    let htmlKuis = `<p class="text-sm text-slate-400 mb-4">Selesaikan semua tantangan dasar di bawah ini untuk melewati gerbang logika memori!</p>`;

    kuisData.forEach((item, indexNo) => {
        htmlKuis += `
        <div class="bg-slate-900/80 p-4 border border-slate-700/60 rounded-xl space-y-3">
            <p class="text-xs font-bold text-cyan-400 font-mono">TANTANGAN SENSOR #0${indexNo + 1}</p>
            <p class="text-sm font-medium text-slate-200 leading-relaxed">${item.tanya}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        `;
        
        item.pilihan.forEach((opsi, opsiIdx) => {
            htmlKuis += `
                <button onclick="pilihJawaban(${indexNo}, ${opsiIdx}, this)" 
                    class="opsi-btn-${indexNo} text-left bg-slate-950 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-lg text-xs font-mono transition-colors text-slate-300">
                    [${String.fromCharCode(65 + opsiIdx)}] ${opsi}
                </button>
            `;
        });

        htmlKuis += `
            </div>
            <p id="hasil-soal-${indexNo}" class="hidden text-xs font-bold font-mono pt-1"></p>
        </div>
        `;
    });

    htmlKuis += `
        <div class="text-center pt-4">
            <button onclick="hitungSkorTotal()" class="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg transition-transform active:scale-95 shadow-md">
                ⚡ VERIFIKASI JAWABAN (LIHAT SKOR)
            </button>
            <div id="skor-akhir-box" class="hidden mt-4 p-4 bg-slate-950 border-2 border-emerald-500 rounded-xl max-w-xs mx-auto">
                <span class="text-[10px] text-slate-500 block uppercase font-mono">SKOR KELULUSAN MISI</span>
                <span id="skor-angka" class="text-3xl font-black text-emerald-400 font-mono">0 / 100</span>
            </div>
        </div>
    `;
    wadahKuis.innerHTML = htmlKuis;
}

function pilihJawaban(soalIdx, opsiIdx, tombolElemen) {
    // Simpan ke objek global window agar datanya tidak hilang/ter-reset
    window.lembarJawabanSiswa[soalIdx] = opsiIdx;
    
    // Reset status tombol pilihan lain pada nomor soal yang sama
    document.querySelectorAll(`.opsi-btn-${soalIdx}`).forEach(btn => {
        btn.classList.remove('border-cyan-500', 'bg-cyan-950/40', 'text-cyan-300');
        btn.classList.add('border-slate-800', 'bg-slate-950', 'text-slate-300');
    });

    // Beri efek aktif pada tombol yang baru saja diklik
    tombolElemen.classList.remove('border-slate-800', 'bg-slate-950', 'text-slate-300');
    tombolElemen.classList.add('border-cyan-500', 'bg-cyan-950/40', 'text-cyan-300');
}

function hitungSkorTotal() {
    let soalBenar = 0;
    
    kuisData.forEach((item, indexNo) => {
        const jawabanSiswa = window.lembarJawabanSiswa[indexNo];
        const indicatorText = document.getElementById(`hasil-soal-${indexNo}`);
        
        if (indicatorText) {
            indicatorText.classList.remove('hidden');

            if (jawabanSiswa === item.kunci) {
                soalBenar++;
                indicatorText.innerText = "✔ BERHASIL: Jawaban Tepat!";
                indicatorText.className = "text-emerald-400 text-xs font-bold font-mono pt-1";
            } else {
                indicatorText.innerText = `❌ KORUP: Kurang Tepat! Kunci: [${String.fromCharCode(65 + item.kunci)}] ${item.pilihan[item.kunci]}`;
                indicatorText.className = "text-rose-500 text-xs font-bold font-mono pt-1";
            }
        }
    });

    const skorFinal = Math.round((soalBenar / kuisData.length) * 100);
    
    const skorBox = document.getElementById('skor-akhir-box');
    const skorAngka = document.getElementById('skor-angka');
    
    if (skorAngka) skorAngka.innerText = `${skorFinal} / 100`;
    if (skorBox) skorBox.classList.remove('hidden');

    // Memicu perubahan status Misi 2 di index.html jika fungsi tersedia
    // Di dalam file kuis.js fungsi hitungSkorTotal() bagian paling bawah:
    if (typeof window.triggerMisi2Selesai === "function") { 
        window.triggerMisi2Selesai(); 
    } else if (typeof triggerMisi2Selesai === "function") {
        triggerMisi2Selesai();
    }
}

// Menjalankan fungsi muat kuis saat halaman selesai di-load browser
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", muatKuis);
} else {
    muatKuis();
}