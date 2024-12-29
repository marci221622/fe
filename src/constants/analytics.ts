import { runtimeConfig } from './runtimeConfig';

// Такое кол-во товаров отдаем с SSR в аналитику
export const ANALYTICS_PRODUCT_LEN_SSR = 4;

export const connectGTMScripts = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PTZQHH');</script>`;

export const noScriptTag = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTZQHH"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

export const digineticaInitiator = `<script type="text/javascript"> var digiScript = document.createElement('script');
digiScript.src = '//cdn.diginetica.net/3324/client.js';
digiScript.defer = true;
digiScript.async = true;
document.body.appendChild(digiScript);
</script>`;

export const mindboxSDK = `<script>
mindbox = window.mindbox || function() { mindbox.queue.push(arguments); };
mindbox.queue = mindbox.queue || [];
mindbox('create', {
    endpointId: "${runtimeConfig.MINDBOXID}",
});
</script>
<script src="https://api.mindbox.ru/scripts/v1/tracker.js" async></script>`;
