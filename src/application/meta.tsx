import favicon114 from './assets/favicons/114.png';
import favicon120 from './assets/favicons/120.png';
import favicon144 from './assets/favicons/144.png';
import favicon152 from './assets/favicons/152.png';
import favicon16 from './assets/favicons/16.png';
import favicon160 from './assets/favicons/160.png';
import favicon180 from './assets/favicons/180.png';
import favicon192 from './assets/favicons/192.png';
import favicon32 from './assets/favicons/32.png';
import favicon57 from './assets/favicons/57.png';
import favicon60 from './assets/favicons/60.png';
import favicon76 from './assets/favicons/76.png';
import favicon96 from './assets/favicons/96.png';

export function getFavicons() {
  return [
    <link rel="apple-touch-icon" type="image/png" sizes="57x57" href={favicon57} key={1} />,
    <link rel="apple-touch-icon" type="image/png" sizes="114x114" href={favicon114} key={2} />,
    <link rel="apple-touch-icon" type="image/png" sizes="144x144" href={favicon144} key={3} />,
    <link rel="apple-touch-icon" type="image/png" sizes="60x60" href={favicon60} key={4} />,
    <link rel="apple-touch-icon" type="image/png" sizes="76x76" href={favicon76} key={5} />,
    <link rel="apple-touch-icon" type="image/png" sizes="120x120" href={favicon120} key={6} />,
    <link rel="apple-touch-icon" type="image/png" sizes="152x152" href={favicon152} key={7} />,
    <link rel="apple-touch-icon" type="image/png" sizes="180x180" href={favicon180} key={8} />,
    <link rel="icon" type="image/png" sizes="57x57" href={favicon192} key={9} />,
    <link rel="icon" type="image/png" sizes="160x160" href={favicon160} key={10} />,
    <link rel="icon" type="image/png" sizes="96x96" href={favicon96} key={12} />,
    <link rel="icon" type="image/png" sizes="16x16" href={favicon16} key={13} />,
    <link rel="icon" type="image/png" sizes="32x32" href={favicon32} key={14} />,
  ];
}

export function getWebsiteName() {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        name: 'TSUM Collect',
        url: 'https://collect.tsum.ru/',
      })}
    </script>
  );
}