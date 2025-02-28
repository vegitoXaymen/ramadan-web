document.addEventListener('DOMContentLoaded', () => {
    const daysContainer = document.getElementById('daysContainer');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const planButtons = document.querySelectorAll('.btn-plan');
    
    // Quran configuration
    const PLANS = {
        monthly: {
            days: 30,
            pagesPerPrayer: 4,
            totalPages: 604,
            prayers: ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء']
        },
        last10: {
            days: 10,
            pagesPerPrayer: 12,
            totalPages: 604,
            prayers: ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء']
        }
    };

    // Generate prayer-based plan
    function generateDays(planType) {
        daysContainer.innerHTML = '';
        const config = PLANS[planType];
        let currentPage = 1;
        
        for(let day = 1; day <= config.days; day++) {
            const dayBox = document.createElement('div');
            dayBox.className = 'col-md-6 col-lg-4 day-box';
            
            let prayerHTML = '';
            for(const prayer of config.prayers) {
                const startPage = currentPage;
                let endPage = currentPage + config.pagesPerPrayer - 1;
                
                // Handle final pages
                if(endPage > config.totalPages) endPage = config.totalPages;
                if(currentPage > config.totalPages) break;

                prayerHTML += `
                    <div class="prayer-time">
                        <h5>بعد ${prayer}: 
                            <span>صفحة ${startPage} - ${endPage}</span>
                        </h5>
                    </div>
                `;
                
                currentPage = endPage + 1;
            }

            dayBox.innerHTML = `
                <div class="day-header">
                    <h4>اليوم ${day}</h4>
                    <small>${config.pagesPerPrayer} صفحات بعد كل صلاة</small>
                </div>
                ${prayerHTML}
                <div class="completion-check">
                    <input type="checkbox" id="day${day}" class="form-check-input">
                    <label for="day${day}" class="form-check-label">تم الإكمال</label>
                </div>
            `;

            // Add click handlers
            dayBox.querySelectorAll('span').forEach(span => {
                span.style.cursor = 'pointer';
                span.addEventListener('click', (e) => {
                    const page = e.target.textContent.match(/\d+/)[0];
                    showQuranPage(page);
                });
            });

            daysContainer.appendChild(dayBox);
        }
    }

    function showQuranPage(page) {
        const frame = document.getElementById('quranFrame');
        frame.src = `https://quran.com/page/${page}?translations=21`;
        new bootstrap.Modal('#quranModal').show();
    }

    function updateProgress() {
        const completed = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const total = document.querySelectorAll('input[type="checkbox"]').length;
        const percentage = (completed / total * 100).toFixed(1);
        
        progressBar.style.width = percentage + '%';
        progressBar.setAttribute('aria-valuenow', percentage);
        progressText.textContent = `التقدم: ${percentage}%`;
        
        localStorage.setItem('quranProgress', percentage);
    }

    // Event Listeners
    planButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            planButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            generateDays(btn.dataset.plan);
        });
    });

    document.addEventListener('change', (e) => {
        if(e.target.matches('input[type="checkbox"]')) {
            updateProgress();
        }
    });

    // Initial load
    generateDays('monthly');
    const savedProgress = localStorage.getItem('quranProgress') || 0;
    progressBar.style.width = savedProgress + '%';
    progressText.textContent = `التقدم: ${savedProgress}%`;
});