// =====================
// SLIDER FUNCTIONALITY
// =====================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    resetAutoSlide();
}

function previousSlide() {
    currentSlide--;
    showSlide(currentSlide);
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

startAutoSlide();

// =====================
// MOBILE MENU
// =====================
function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
}

// =====================
// SMOOTH SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.getElementById('mobileMenu').classList.add('hidden');
        }
    });
});

// =====================
// SCROLL REVEAL
// =====================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// =====================
// TEACHER FILTER
// =====================
function filterTeachers(event, category) {
    const cards = document.querySelectorAll('.teacher-card');
    const btns = document.querySelectorAll('.filter-btn');
    
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    cards.forEach((card, i) => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

// =====================
// TEACHER DATA & MODAL
// =====================
const teacherData = {
    1: { 
        name: 'Drs. Supriyanto, M.Pd', 
        position: 'Kepala Sekolah', 
        education: 'S2 Manajemen Pendidikan - UNY', 
        experience: '25 Tahun', 
        bio: 'Memimpin SD Negeri 2 Kepuk sejak 2018 dengan visi menciptakan sekolah unggul dalam prestasi dan karakter.', 
        achievements: ['Kepala Sekolah Berprestasi Tingkat Kabupaten 2022', 'Sertifikasi Kepala Sekolah Nasional', 'Pelatihan Manajemen Berbasis Sekolah', 'Workshop Pengembangan Kurikulum Merdeka'], 
        contact: { email: 'supriyanto@sdn2kepuk.sch.id', phone: '(0274) 123-4567' } 
    },
    2: { 
        name: 'Siti Maryam, S.Pd', 
        position: 'Guru Kelas 1A', 
        education: 'S1 PGSD - UNY', 
        experience: '15 Tahun', 
        bio: 'Spesialis pembelajaran anak usia dini dengan metode fun learning yang menyenangkan dan efektif.', 
        achievements: ['Guru Berprestasi Kecamatan 2024', 'Juara 1 Lomba Inovasi Pembelajaran 2023', 'Sertifikasi Pendidik Profesional', 'Pelatihan Pembelajaran Abad 21'], 
        contact: { email: 'siti.maryam@sdn2kepuk.sch.id', phone: '-' } 
    },
    3: { 
        name: 'Budi Wijaya, S.Pd', 
        position: 'Guru Kelas 2A', 
        education: 'S1 PGSD - UNY', 
        experience: '12 Tahun', 
        bio: 'Ahli pengembangan kreativitas siswa melalui pembelajaran berbasis proyek dan seni.', 
        achievements: ['Pembina Ekstrakurikuler Seni Terbaik 2023', 'Pelatihan Project Based Learning', 'Workshop Kreativitas Anak', 'Sertifikasi Pendidik Profesional'], 
        contact: { email: 'budi.wijaya@sdn2kepuk.sch.id', phone: '-' } 
    },
    4: { 
        name: 'Rina Anggraini, S.Pd', 
        position: 'Guru Bahasa Inggris', 
        education: 'S1 Pendidikan Bahasa Inggris - UNS', 
        experience: '10 Tahun', 
        bio: 'Berpengalaman mengajar dengan metode komunikatif dan interaktif untuk anak.', 
        achievements: ['TOEFL Score: 550', 'Pelatihan Teaching English for Young Learners', 'Workshop Multimedia Learning', 'Sertifikasi Pendidik Profesional'], 
        contact: { email: 'rina.anggraini@sdn2kepuk.sch.id', phone: '-' } 
    },
    5: { 
        name: 'Ahmad Hidayat, S.Pd', 
        position: 'Guru Penjasorkes', 
        education: 'S1 Pendidikan Jasmani - UNY', 
        experience: '8 Tahun', 
        bio: 'Pelatih olahraga yang membawa siswa meraih prestasi di berbagai turnamen olahraga.', 
        achievements: ['Pelatih Futsal Bersertifikat Lisensi C', 'Wasit Atletik Tingkat Kabupaten', 'Guru Olahraga Berprestasi 2023', 'Sertifikasi Pendidik Profesional'], 
        contact: { email: 'ahmad.hidayat@sdn2kepuk.sch.id', phone: '-' } 
    },
    6: { 
        name: 'Dewi Lestari', 
        position: 'Staf Tata Usaha', 
        education: 'SMK Administrasi Perkantoran', 
        experience: '7 Tahun', 
        bio: 'Mengelola administrasi sekolah dengan profesional, teliti, dan ramah dalam melayani.', 
        achievements: ['Pelatihan Administrasi Sekolah Tingkat Provinsi', 'Sertifikasi Komputer Perkantoran', 'Workshop Pelayanan Prima', 'Pelatihan Sistem Informasi Manajemen Sekolah'], 
        contact: { email: 'dewi.lestari@sdn2kepuk.sch.id', phone: '-' } 
    }
};

function openModal(id) {
    const t = teacherData[id];
    document.getElementById('modalName').textContent = t.name;
    document.getElementById('modalContent').innerHTML = `
        <div class="text-center mb-6">
            <h4 class="text-2xl font-bold text-blue-600 mb-2">${t.position}</h4>
            <p class="text-gray-600">${t.education}</p>
        </div>
        <div class="space-y-6">
            <div class="bg-gray-50 rounded-xl p-6">
                <h5 class="font-bold text-gray-900 mb-2 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Pengalaman Mengajar
                </h5>
                <p class="text-gray-700">${t.experience} mengajar di bidang pendidikan</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-6">
                <h5 class="font-bold text-gray-900 mb-2 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Profil
                </h5>
                <p class="text-gray-700">${t.bio}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-6">
                <h5 class="font-bold text-gray-900 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                    Prestasi & Sertifikasi
                </h5>
                <ul class="space-y-2">
                    ${t.achievements.map(a => `
                        <li class="text-gray-700 flex items-start">
                            <svg class="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            ${a}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="bg-blue-50 rounded-xl p-6">
                <h5 class="font-bold text-gray-900 mb-2 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Informasi Kontak
                </h5>
                <div class="space-y-2">
                    <p class="text-gray-700"><span class="font-semibold">Email:</span> ${t.contact.email}</p>
                    ${t.contact.phone !== '-' ? `<p class="text-gray-700"><span class="font-semibold">Telepon:</span> ${t.contact.phone}</p>` : ''}
                </div>
            </div>
        </div>
    `;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handleModalClick(event) {
    if (event.target.id === 'modal') {
        closeModal();
    }
}

// =====================
// GALLERY DATA & FILTER
// =====================
const galleryData = [
    { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', title: 'Kegiatan Belajar di Kelas', description: 'Suasana pembelajaran interaktif di ruang kelas', category: 'pembelajaran' },
    { img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800', title: 'Praktikum Sains', description: 'Siswa belajar melalui eksperimen langsung', category: 'pembelajaran' },
    { img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', title: 'Lab Komputer', description: 'Pembelajaran teknologi informasi', category: 'pembelajaran' },
    { img: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800', title: 'Juara Lomba Akademik', description: 'Prestasi gemilang di tingkat kabupaten', category: 'prestasi' },
    { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', title: 'Juara Olahraga', description: 'Tim futsal meraih medali emas', category: 'prestasi' },
    { img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', title: 'Penghargaan Sekolah', description: 'Sekolah berprestasi tingkat provinsi', category: 'prestasi' },
    { img: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800', title: 'Upacara Bendera', description: 'Pembiasaan disiplin setiap hari Senin', category: 'kegiatan' },
    { img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', title: 'Kegiatan Pramuka', description: 'Membentuk karakter kepemimpinan', category: 'kegiatan' },
    { img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800', title: 'Pentas Seni', description: 'Menampilkan kreativitas siswa', category: 'kegiatan' },
    { img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', title: 'Ruang Kelas Modern', description: 'Ruang kelas ber-AC dengan LCD proyektor', category: 'fasilitas' },
    { img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800', title: 'Perpustakaan', description: 'Koleksi buku lengkap dan ruang baca nyaman', category: 'fasilitas' },
    { img: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800', title: 'Lapangan Olahraga', description: 'Lapangan multifungsi untuk berbagai olahraga', category: 'fasilitas' }
];

let currentImageIndex = 0;

function filterGallery(event, category) {
    const items = document.querySelectorAll('.gallery-item');
    const btns = document.querySelectorAll('.gallery-category-btn');
    
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    items.forEach((item, i) => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, i * 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => item.style.display = 'none', 300);
        }
    });
}

// =====================
// LIGHTBOX
// =====================
function openLightbox(index) {
    currentImageIndex = index;
    const data = galleryData[index];
    document.getElementById('lightboxImage').src = data.img;
    document.getElementById('lightboxTitle').textContent = data.title;
    document.getElementById('lightboxDescription').textContent = data.description;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryData.length - 1;
    } else if (currentImageIndex >= galleryData.length) {
        currentImageIndex = 0;
    }
    const data = galleryData[currentImageIndex];
    document.getElementById('lightboxImage').src = data.img;
    document.getElementById('lightboxTitle').textContent = data.title;
    document.getElementById('lightboxDescription').textContent = data.description;
}

function handleLightboxClick(event) {
    if (event.target.id === 'lightbox') {
        closeLightbox();
    }
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});
