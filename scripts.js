// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Navigation
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Experience Timeline Data
const experienceData = [
    // Organisasi
    {
        category: 'Organisasi',
        title: 'OSIS',
        organization: 'SMP Negeri 2 Brebes',
        period: '2017/2018 - 2018/2019',
        description: 'Bidang Teknologi Informasi & Komunikasi',
        photo: 'image/experience/osis.jpg'
    },
    {
        category: 'Organisasi',
        title: 'Media Center',
        organization: 'Pesantren Bina Insan Mulia',
        period: '2021/2022',
        description: 'Mengabadikan momen-momen terbaik santri.',
        photo: 'image/experience/bima.jpg'
    },
    {
        category: 'Organisasi',
        title: 'Staff PSDM',
        organization: 'Himpunan Mahasiswa Teknik Komputer',
        period: '2024/2025',
        description: 'Mengelola pengembangan sumber daya mahasiswa dan program pelatihan.',
        photo: 'image/experience/himaskom.JPG'
    },
    {
        category: 'Organisasi',
        title: 'Koordinator Pesantren',
        organization: 'Pesantren Al-Anwar Pakijangan',
        period: 'Sekarang',
        description: 'Mengkoordinasikan kegiatan dan program pesantren.',
        photo: 'image/experience/koor.JPG'
    },
    // Kepanitiaan
    {
        category: 'Kepanitiaan',
        title: 'Dokumentasi MPLS & Perpisahan',
        organization: 'SMA Negeri 1 Brebes',
        period: '2022/2023',
        description: 'Mengabadikan momen siswa baru dan siswa yang akan lulus.',
        photo: 'image/experience/pdd.JPG'
    },
    {
        category: 'Kepanitiaan',
        title: 'Ketua PKKMB',
        organization: 'Teknik Komputer Universitas Diponegoro',
        period: '12-16 Agustus 2024',
        description: 'Memimpin dan mengorganisir kegiatan Pengenalan Kehidupan Kampus Mahasiswa Baru.',
        photo: 'image/experience/pkkmb.JPG'
    }
    // Tambahkan pengalaman lainnya jika diperlukan
];

// Fungsi untuk mengubah periode menjadi objek Date
function parsePeriod(period) {
    const currentYear = new Date().getFullYear();
    let endDate;

    if (period.includes('Sekarang')) {
        endDate = new Date();
    } else if (period.includes('/')) {
        // Format tahun seperti '2017/2018' atau '2024/2025'
        const years = period.split('/');
        if (years.length === 2) {
            endDate = new Date(`${years[1]}-12-31`);
        } else if (years.length === 1) {
            endDate = new Date(`${years[0]}-12-31`);
        }
    } else if (period.includes('-')) {
        // Format tanggal spesifik seperti '12-16 Agustus 2024'
        const [startDay, endDayMonthYear] = period.split('-').map(s => s.trim());
        const [endDay, endMonth, endYear] = endDayMonthYear.split(' ');
        endDate = new Date(`${endMonth} ${endDay}, ${endYear}`);
    } else {
        // Format lain jika diperlukan
        endDate = new Date();
    }

    return endDate;
}

// Fungsi untuk mengurutkan data berdasarkan periode
function sortExperienceData(data) {
    return data.sort((a, b) => parsePeriod(a.period) - parsePeriod(b.period));
}

// Mengurutkan data
const sortedExperienceData = sortExperienceData([...experienceData]);

// Mengelompokkan data berdasarkan kategori
const groupedExperienceData = sortedExperienceData.reduce((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
}, {});

// Render Timeline
const timeline = document.querySelector('.timeline');

for (const category in groupedExperienceData) {
    // Menambahkan subjudul kategori
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'timeline-category-title';
    categoryTitle.textContent = category;
    categoryTitle.setAttribute('data-aos', 'fade-up');
    timeline.appendChild(categoryTitle);

    groupedExperienceData[category].forEach((experience, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
        
        timelineItem.innerHTML = `
            <div class="timeline-date">${experience.period}</div>
            <div class="timeline-content">
                <img src="${experience.photo}" alt="${experience.title}">
                <div class="timeline-text">
                    <h3>${experience.title}</h3>
                    <h4>${experience.organization}</h4>
                    <p>${experience.description}</p>
                </div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}
