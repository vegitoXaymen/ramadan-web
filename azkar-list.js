document.addEventListener('DOMContentLoaded', () => {
    const azkarContainer = document.getElementById('azkarContainer');
    const azkarSwitcher = document.querySelectorAll('.btn-azkar');
    const searchInput = document.querySelector('.search-box input');

    // Complete Authentic Azkar Data
    const AZKAR = {
        morning: [
            {
                text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لا إِلَـٰهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
                repetition: "مرة واحدة"
            },
            {
                text: "اللّهُـمَّ بِكَ أَصْـبَحْنا، وَبِكَ أَمْسَـينا، وَبِكَ نَحْـيا، وَبِكَ نَمُـوتُ، وَإِلَـيْكَ النُّـشُورُ",
                repetition: "مرة واحدة"
            },
            {
                text: "سُبْحـانَ اللَّهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه، وَرِضـا نَفْسِـه، وَزِنَـةَ عَـرْشِـه، وَمِـدادَ كَلِمـاتِـه",
                repetition: "3 مرات"
            },
            {
                text: "اللّهُـمَّ عافِـني في بَدَنـي، اللّهُـمَّ عافِـني في سَمْـعي، اللّهُـمَّ عافِـني في بَصَـري، لا إلهَ إلاّ أَنْـتَ",
                repetition: "3 مرات"
            },
            {
                text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم",
                repetition: "7 مرات"
            },
            {
                text: "اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في الدُّنْـيا وَالآخِـرَة، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في ديني وَدُنْـيايَ وَأهْـلي وَمالـي، اللّهُـمَّ اسْتُـرْ عـوْراتي وَآمِـنْ رَوْعاتـي، اللّهُـمَّ احْفَظْـني مِن بَـينِ يَدَيَّ وَمِن خَلْفـي وَعَن يَمـيني وَعَن شِمـالي، وَمِن فَوْقـي، وَأَعـوذُ بِعَظَمَـتِكَ أَن أُغْـتالَ مِن تَحْتـي",
                repetition: "مرة واحدة"
            },
            {
                text: "اللّهُـمَّ عالِـمَ الغَـيْبِ وَالشّـهادَةِ فاطِـرَ السّماواتِ وَالأرْضِ رَبَّ كـلِّ شَـيءٍ وَمَليـكَه، أَشْهَـدُ أَنْ لا إِلـهَ إِلاّ أَنْت، أَعـوذُ بِكَ مِن شَـرِّ نَفْسـي وَمِن شَـرِّ الشَّيْـطانِ وَشِـرْكِه، وَأَنْ أَقْتَـرِفَ عَلـى نَفْسـي سوءاً أَوْ أَجُـرَّهُ إِلـى مُسْـلِم",
                repetition: "مرة واحدة"
            }
        ],
        evening: [
            {
                text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لا إِلَـٰهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
                repetition: "مرة واحدة"
            },
            {
                text: "اللّهُـمَّ بِكَ أَمْسَـينا، وَبِكَ أَصْـبَحْنا، وَبِكَ نَحْـيا، وَبِكَ نَمُـوتُ، وَإِلَـيْكَ الْمَصِيرُ",
                repetition: "مرة واحدة"
            },
            {
                text: "سُبْحـانَ اللَّهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه، وَرِضـا نَفْسِـه، وَزِنَـةَ عَـرْشِـه، وَمِـدادَ كَلِمـاتِـه",
                repetition: "3 مرات"
            },
            {
                text: "اللّهُـمَّ إِنّـي أَمسيتُ أُشْـهِدُك، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك، وَمَلَائِكَتَكَ، وَجَمـيعَ خَلْـقِك، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك",
                repetition: "4 مرات"
            },
            {
                text: "اللّهُـمَّ ما أَمسى بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر",
                repetition: "مرة واحدة"
            },
            {
                text: "اللّهُـمَّ إِنِّـي أَمسيتُ أُشْـهِدُك، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك، وَمَلَائِكَتَكَ، وَجَمـيعَ خَلْـقِك، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك",
                repetition: "4 مرات"
            },
            {
                text: "أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق",
                repetition: "3 مرات"
            }
        ]
    };

    // Load Azkar
    function loadAzkar(type) {
        azkarContainer.innerHTML = '';
        AZKAR[type].forEach((dhikr, index) => {
            const col = document.createElement('div');
            col.className = 'col-12 mb-4';
            col.innerHTML = `
                <div class="dhikr-item">
                    <div class="dhikr-text">${dhikr.text}</div>
                    <div class="repetition">التكرار: ${dhikr.repetition}</div>
                </div>
            `;
            azkarContainer.appendChild(col);
        });
    }

    // Search Functionality
    function searchAzkar(query) {
        const currentType = document.querySelector('.btn-azkar.active').dataset.type;
        const filtered = AZKAR[currentType].filter(dhikr => 
            dhikr.text.includes(query)
        );
        
        azkarContainer.innerHTML = '';
        filtered.forEach(dhikr => {
            const col = document.createElement('div');
            col.className = 'col-12 mb-4';
            col.innerHTML = `
                <div class="dhikr-item">
                    <div class="dhikr-text">${dhikr.text}</div>
                    <div class="repetition">التكرار: ${dhikr.repetition}</div>
                </div>
            `;
            azkarContainer.appendChild(col);
        });
    }

    // Event Listeners
    azkarSwitcher.forEach(btn => {
        btn.addEventListener('click', () => {
            azkarSwitcher.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadAzkar(btn.dataset.type);
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchAzkar(e.target.value);
    });

    // Initial Load
    const urlParams = new URLSearchParams(window.location.search);
    const initialType = urlParams.get('type') || 'morning';
    
    // Activate correct button
    document.querySelectorAll('.btn-azkar').forEach(btn => {
        if(btn.dataset.type === initialType) {
            btn.classList.add('active');
        }
    });
    
    loadAzkar(initialType);
});