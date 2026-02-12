(function() {
   const ads = [
    {
        title: "Netiqui Tech",
        image: "https://picsum.photos/id/1/300/200", // Image d'exemple
        link: "https://votre-blog.com/tech",
        description: "Optimisez votre smartphone en 5 étapes simples."
    },
    {
        title: "Eco-Hébergement",
        image: "https://picsum.photos/id/2/300/200",
        link: "https://votre-blog.com/eco",
        description: "Des serveurs verts pour un web plus durable."
    },
    // ... Ajoute les autres ici en suivant le même modèle
    {
        title: "Podcast Tech",
        image: "https://picsum.photos/id/12/300/200",
        link: "https://votre-blog.com/podcast",
        description: "Écoutez les dernières nouvelles du numérique."
    }
];

    let currentAdIndex = 0;

    const renderAd = () => {
        const ad = ads[currentAdIndex];
        const container = document.getElementById('netiqui-floating-ad');
        if (!container) return;

        // On met à jour le contenu avec une petite transition
        const content = container.querySelector('.ad-content');
        content.style.opacity = 0;
        
        setTimeout(() => {
            content.innerHTML = `
                <small style="color: #999; font-size: 10px; text-transform: uppercase;">${ad.title}</small>
                <a href="${ad.link}" target="_blank" style="text-decoration: none; color: inherit; display: block; margin-top: 8px;">
                    <img src="${ad.image}" style="width: 100%; border-radius: 6px; height: 120px; object-fit: cover; margin-bottom: 8px;">
                    <p style="font-size: 13px; margin: 0; font-weight: bold; color: #222; line-height: 1.2;">${ad.description}</p>
                </a>
            `;
            content.style.opacity = 1;
        }, 300);

        // Passer à la pub suivante
        currentAdIndex = (currentAdIndex + 1) % ads.length;
    };

    const init = () => {
        const adContainer = document.createElement('div');
        adContainer.id = 'netiqui-floating-ad';
        
        Object.assign(adContainer.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '250px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            borderRadius: '12px',
            padding: '15px',
            zIndex: '9999',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            border: '1px solid #eee',
            transition: 'all 0.3s ease'
        });

        adContainer.innerHTML = `
            <button id="close-ad" style="position: absolute; top: -10px; right: -10px; background: #ee4444; color: #fff; border: none; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">✕</button>
            <div class="ad-content" style="transition: opacity 0.3s ease;"></div>
            <div style="margin-top: 10px; display: flex; justify-content: center; gap: 5px;">
                ${ads.map((_, i) => `<div class="dot" style="width: 6px; height: 6px; border-radius: 50%; background: #ddd;"></div>`).join('')}
            </div>
        `;

        document.body.appendChild(adContainer);
        
        // Afficher la première pub
        renderAd();

        // Changer de pub toutes les 5 secondes
        setInterval(renderAd, 5000);

        document.getElementById('close-ad').addEventListener('click', () => {
            adContainer.remove();
        });
    };

    window.addEventListener('load', init);
})();
