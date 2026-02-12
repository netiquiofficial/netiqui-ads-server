(function() {
    

    let currentAdIndex = 0;

    const renderAd = () => {
        const ad = ads[currentAdIndex];
        const container = document.getElementById('netiqui-floating-ad');
        if (!container) return;

        const content = container.querySelector('.ad-content');
        const dots = container.querySelectorAll('.dot');
        
        content.style.opacity = 0;
        
        setTimeout(() => {
            content.innerHTML = `
                <small style="color: #999; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">${ad.title}</small>
                <a href="${ad.link}" target="_blank" style="text-decoration: none; color: inherit; display: block; margin-top: 8px;">
                    <img src="${ad.image}" style="width: 100%; border-radius: 8px; height: 120px; object-fit: cover; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <p style="font-size: 13px; margin: 0; font-weight: bold; color: #333; line-height: 1.3;">${ad.description}</p>
                </a>
            `;
            content.style.opacity = 1;

            // Mise à jour visuelle des points indicateurs
            dots.forEach((dot, index) => {
                dot.style.background = (index === currentAdIndex) ? '#007bff' : '#ddd';
                dot.style.transform = (index === currentAdIndex) ? 'scale(1.2)' : 'scale(1)';
            });
        }, 300);

        currentAdIndex = (currentAdIndex + 1) % ads.length;
    };

    const init = () => {
        const adContainer = document.createElement('div');
        adContainer.id = 'netiqui-floating-ad';
        
        Object.assign(adContainer.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '260px',
            backgroundColor: '#fff',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            borderRadius: '15px',
            padding: '15px',
            zIndex: '99999',
            fontFamily: 'Segoe UI, Roboto, sans-serif',
            border: '1px solid #f0f0f0',
            transition: 'transform 0.3s ease'
        });

        adContainer.innerHTML = `
            <button id="close-ad" style="position: absolute; top: -10px; right: -10px; background: #333; color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">✕</button>
            <div class="ad-content" style="transition: opacity 0.3s ease;"></div>
            <div style="margin-top: 12px; display: flex; justify-content: center; gap: 6px;">
                ${ads.map(() => `<div class="dot" style="width: 6px; height: 6px; border-radius: 50%; background: #ddd; transition: all 0.3s ease;"></div>`).join('')}
            </div>
        `;

        document.body.appendChild(adContainer);
        renderAd();
        setInterval(renderAd, 5000);

        document.getElementById('close-ad').addEventListener('click', () => {
            adContainer.style.transform = 'scale(0)';
            setTimeout(() => adContainer.remove(), 300);
        });
    };

    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
})();
