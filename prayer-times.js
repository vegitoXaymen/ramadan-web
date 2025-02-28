window.addEventListener('load', () => {
    if (typeof PrayTimes === 'undefined') {
        console.error("PrayTimes library not loaded!");
        document.getElementById('prayerTimes').textContent = "تعذر تحميل مواقيت الصلاة.";
        return;
    }

    // Date formatting
    const formatToday = (date) => date.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Initialize
    const prayTimes = new PrayTimes('MWL');
    const latitude = 36.18306282206111; 
    const longitude =5.312116401566275;
    const timezone = 1;         // Timezone remains UTC+1
    const dst = 0;              // No daylight saving time
    const now = new Date();
    
    // Set today's date
    document.getElementById('todayDate').textContent = "تاريخ اليوم: " + formatToday(now);

    // Calculate prayer times
    const times = prayTimes.getTimes(now, [latitude, longitude], timezone, dst);
    const prayers = ['isha', 'maghrib', 'asr', 'dhuhr', 'sunrise', 'fajr']; // عكس الترتيب

    const prayerNames = {
        'fajr': 'الفجر',
        'sunrise': 'الشروق',
        'dhuhr': 'الظهر',
        'asr': 'العصر',
        'maghrib': 'المغرب',
        'isha': 'العشاء'
    };

    // Create prayer boxes (inside #prayerTimes container)
    const container = document.getElementById('prayerTimes');
    prayers.forEach(prayer => {
        const box = document.createElement('div');
        box.className = 'prayer-box';
        box.setAttribute('data-prayer', prayer);
        
        box.innerHTML = `
            <div class="prayer-name">${prayerNames[prayer]}</div>
            <div class="prayer-time">${times[prayer] || "N/A"}</div>
            <div class="prayer-countdown"></div>
        `;
        
        container.appendChild(box);
    });

    // Countdown helper function
    const formatTimeDiff = (diff) => {
        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const updateCountdowns = () => {
        const now = new Date();
        let nextPrayerDiff = Infinity;
        let nextPrayerName = null;

        // Only loop through prayer boxes inside #prayerTimes
        document.querySelectorAll('#prayerTimes .prayer-box').forEach(box => {
            const prayer = box.getAttribute('data-prayer');
            const prayerTimeStr = times[prayer];
            if (!prayerTimeStr) return;

            const [hours, minutes] = prayerTimeStr.split(':').map(Number);
            const prayerDate = new Date(now);
            prayerDate.setHours(hours, minutes, 0, 0);
            
            let diff = prayerDate - now;
            // If the prayer time has passed today, mark as ended
            if (diff < 0) {
                diff = -1;
            }

            const countdownEl = box.querySelector('.prayer-countdown');
            countdownEl.textContent = diff > 0 ? formatTimeDiff(diff) : "انتهت";

            // For the next prayer display, only consider upcoming prayers (diff > 0)
            if (diff > 0 && diff < nextPrayerDiff) {
                nextPrayerDiff = diff;
                nextPrayerName = prayerNames[prayer];
            }
        });

        const nextPrayerEl = document.getElementById('nextPrayer');
        if (nextPrayerName) {
            nextPrayerEl.textContent = `الصلاة القادمة: ${nextPrayerName} بعد: ${formatTimeDiff(nextPrayerDiff)}`;
        } else {
            // No more prayers left for today; don't show tomorrow's prayer
            nextPrayerEl.textContent = "انتهت صلوات اليوم";
        }
    };

    // Initial update and update every second
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
});
