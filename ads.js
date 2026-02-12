(function() {
    // 1. LISTE DES PUBLICITÉS AVEC DATES (Format: YYYY-MM-DD HH:MM)
    const adsData = [
        { 
            title: "Netiqui Tech", 
            image: "https://picsum.photos/id/1/300/200", 
            link: "https://netiqui.blogspot.com", 
            description: "Contrat actif jusqu'au 20 février.",
            start: "2026-02-10 08:00", 
            end: "2026-02-20 23:59" 
        },
        { 
            title: "Promo Flash", 
            image: "https://picsum.photos/id/5/300/200", 
            link: "https://netiqui.blogspot.com", 
            description: "Ceci ne s'affichera que le 15 février.",
            start: "2026-02-1 00:00", 
            end: "2026-02-15 23:59" 
        },
        // Ajoute tes autres clients ici...
    ];

    // FILTRAGE : On ne garde que les publicités valides à l'instant T
    const now = new Date();
    const ads = adsData.filter(ad => {
        const startDate = new Date(ad.start);
        const endDate = new Date(ad.end);
        return now >= startDate && now <= endDate;
    });

    let currentAdIndex = 0;
    let isInitialized = false;

    // Si aucune publicité n'est valide, on arrête tout proprement
    if (ads.length === 0) {
        console.log("Netiqui Ads : Aucune publicité active pour le moment.");
        return;
    }

    const renderAd = () => {
        const container = document.getElementById('netiqui-floating-ad');
        if (!container) return;

        const ad = ads[currentAdIndex];
        const content = container.querySelector('.ad-content');
        const dots = container.querySelectorAll('.dot');
        
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.innerHTML = `
                <small style="color: #999; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">${ad.title}</small>
                <a href="${ad.link}" target="_blank" style="text-decoration: none; color: inherit; display: block; margin-top: 8px;">
                    <img src="${ad.image}" style="width: 100%; border-radius: 8px; height: 120px; object-fit: cover; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <p style="font-size: 13px; margin: 0; font-weight: bold; color: #333; line-height: 1.3;">${ad.description}</p>
                </a>
            `;
            content.style.opacity = '1';

            dots.forEach((dot, index) => {
                dot.style.background = (index === currentAdIndex) ? '#007bff' : '#ddd';
                dot.style.transform = (index === currentAdIndex) ? 'scale(1.2)' : 'scale(1)';
            });
        }, 300);

        currentAdIndex = (currentAdIndex + 1) % ads.length;
    };

    const init = () => {
        if (isInitialized || document.getElementById('netiqui-floating-ad')) return;
        isInitialized = true;

        const adContainer = document.createElement('div');
        adContainer.id = 'netiqui-floating-ad';
        
        Object.assign(adContainer.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '260px',
            backgroundColor: '#fff',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            borderRadius: '15px',
            padding: '15px',
            zIndex: '2147483647',
            fontFamily: 'Segoe UI, Roboto, sans-serif',
            border: '1px solid #f0f0f0',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            display: 'block'
        });

        adContainer.innerHTML = `
            <button id="close-ad" style="position: absolute; top: -10px; right: -10px; background: #333; color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); z-index: 100;">✕</button>
            <div class="ad-content" style="transition: opacity 0.3s ease;">Chargement...</div>
            <div style="margin-top: 12px; display: flex; justify-content: center; gap: 6px;">
                ${ads.map(() => `<div class="dot" style="width: 6px; height: 6px; border-radius: 50%; background: #ddd; transition: all 0.3s ease;"></div>`).join('')}
            </div>
        `;

        document.body.appendChild(adContainer);
        renderAd();
        setInterval(renderAd, 5000);

        const closeBtn = document.getElementById('close-ad');
        
        const showAd = () => {
            adContainer.style.display = 'block';
            setTimeout(() => {
                adContainer.style.opacity = '1';
                adContainer.style.transform = 'scale(1)';
            }, 10);
        };

        const hideAd = () => {
            adContainer.style.opacity = '0';
            adContainer.style.transform = 'scale(0.8)';
            setTimeout(() => {
                adContainer.style.display = 'none';
                setTimeout(showAd, 120000); // 2 minutes
            }, 500);
        };

        closeBtn.onclick = hideAd;
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        window.addEventListener('load', init);
        setTimeout(init, 1500);
    }
})();