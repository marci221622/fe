import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $appIsShort } from '@/shared/configs';

import { Typography } from '@/ui/index';

import st from './styles.module.scss';

export default function BrandsList() {
  const appIsShort = useUnit($appIsShort);

  return (
    <>
      <Typography.PageTitle
        className={cn(st.pageTitle, {
          [st.navigationDisabled]: appIsShort,
        })}
      >
        Список брендов
      </Typography.PageTitle>

      <article className={st.textWrapper}>
        <p>
          TSUM Collect принимает только подлинные брендовые товары: женскую и мужскую одежду, обувь и сумки. Вещи должны
          быть новыми с этикетками или в отличном состоянии (без значительных следов эксплуатации, не требующие ремонта
          и химчистки).
        </p>
        <p>
          TSUM Collect оставляет за собой право отказать в приеме товара, если он не соответствует подлинности и всем
          критериям качества или не обладает необходимым коммерческим потенциалом.
        </p>
        <p>Полный список брендов:</p>
        <ul>
          <li>08sircus</li>
          <li>10 Crosby Derek Lam</li>
          <li>1017 ALYX 9SM</li>
          <li>10sei0otto</li>
          <li>11 by Boris Bidjan Saberi</li>
          <li>16Arlington</li>
          <li>3.1 Phillip Lim</li>
          <li>A-COLD-WALL*</li>
          <li>A.F. Vandervorst</li>
          <li>A.F.Vandevorst</li>
          <li>A.L.C.</li>
          <li>A.W.A.K.E. MODE</li>
          <li>Acne Studios</li>
          <li>Adam Lippes</li>
          <li>Add</li>
          <li>adidas by Raf Simons</li>
          <li>adidas by Rick Owens</li>
          <li>Agent Provocateur</li>
          <li>AGL</li>
          <li>Agolde</li>
          <li>Alaia</li>
          <li>Alanui</li>
          <li>Alberta Ferretti</li>
          <li>Aleksander Siradekian</li>
          <li>Alessandra Rich</li>
          <li>Alexachung</li>
          <li>Alexander McQueen</li>
          <li>Alexander Wang</li>
          <li>Alexandre Birman</li>
          <li>Alexandre Vauthier</li>
          <li>Allude</li>
          <li>Altuzarra</li>
          <li>AMBUSH</li>
          <li>Ami Paris</li>
          <li>Amina Muaddi</li>
          <li>Amiri</li>
          <li>Andrea Campagna</li>
          <li>Ann Demeulemeester</li>
          <li>Anouki</li>
          <li>Anthony Vaccarello</li>
          <li>Anya Hindmarch</li>
          <li>Aperlai</li>
          <li>Aquazzura</li>
          <li>Arc&apos;teryx</li>
          <li>Area</li>
          <li>Armani Collezioni</li>
          <li>Artselab</li>
          <li>ASHISH</li>
          <li>Aviu</li>
          <li>Balenciaga</li>
          <li>Bally</li>
          <li>Balmain</li>
          <li>Balmain Hair Couture</li>
          <li>Band Of Outsiders</li>
          <li>Bao Bao ISSEY MIYAKE</li>
          <li>Barrett</li>
          <li>Ben Tavernity Unravel Project</li>
          <li>Berluti</li>
          <li>Billionaire</li>
          <li>Blancha</li>
          <li>Blumarine</li>
          <li>Bogner</li>
          <li>Bottega Veneta</li>
          <li>Brioni</li>
          <li>Brunello Cucinelli</li>
          <li>Burberry</li>
          <li>Burberry Prorsum</li>
          <li>Buscemi</li>
          <li>Buttero</li>
          <li>By Far</li>
          <li>C.P. Company</li>
          <li>CALVIN KLEIN 205W39NYC</li>
          <li>Canada Goose</li>
          <li>Canali</li>
          <li>Carol Christian Poell</li>
          <li>Carolina Herrera</li>
          <li>Carrera</li>
          <li>Cartier</li>
          <li>Carven</li>
          <li>Casablanca</li>
          <li>Casadei</li>
          <li>Cav Empt</li>
          <li>Cedric Charlier</li>
          <li>Celine</li>
          <li>CERRUTI 1881</li>
          <li>Chanel</li>
          <li>Charlotte Olympia</li>
          <li>Chiara Ferragni</li>
          <li>Chloe</li>
          <li>Chopard</li>
          <li>Chopova Lowena</li>
          <li>Christian Louboutin</li>
          <li>Christophe Lemaire</li>
          <li>Christopher Esber</li>
          <li>Christopher Kane</li>
          <li>Chrome Hearts</li>
          <li>Cinzia Araia</li>
          <li>Coach</li>
          <li>Collina strada</li>
          <li>Comme des Garcons</li>
          <li>Coperni</li>
          <li>Cote&Ciel</li>
          <li>Craig Green</li>
          <li>Damir Doma</li>
          <li>David Koma</li>
          <li>Denim X Alexander Wang</li>
          <li>Derek Lam</li>
          <li>Deveaux New York</li>
          <li>Diane Von Furstenberg</li>
          <li>Dice Kayek</li>
          <li>Diemme</li>
          <li>Diesel Black Gold</li>
          <li>Dior</li>
          <li>Dita</li>
          <li>Dolce&Gabbana</li>
          <li>Donna Karan</li>
          <li>Dorothee Schumacher</li>
          <li>Doublet</li>
          <li>Doucal&apos;s</li>
          <li>Dries Van Noten</li>
          <li>DRKSHDW</li>
          <li>DROMe</li>
          <li>Dsquared2</li>
          <li>Duvetica</li>
          <li>Eleventy</li>
          <li>Eleventy UOMO</li>
          <li>Elie Saab</li>
          <li>Elie Tahari</li>
          <li>Elisabetta Franchi</li>
          <li>Ellery</li>
          <li>Emilia Wickstead</li>
          <li>Emilio Pucci</li>
          <li>Enfants Riches Deprimes</li>
          <li>Equipment</li>
          <li>Erdem</li>
          <li>Erika Cavallini</li>
          <li>Ermanno Ermanno Scervino</li>
          <li>Ermanno Scervino</li>
          <li>Ermenegildo Zegna Couture</li>
          <li>Esteban Cortazar</li>
          <li>Etro</li>
          <li>Etudes</li>
          <li>Eytys</li>
          <li>Fabiana Filippi</li>
          <li>Faith Connexion</li>
          <li>Fausto Puglisi</li>
          <li>Fay</li>
          <li>Fear Of God</li>
          <li>Fendi</li>
          <li>Filles A Papa</li>
          <li>Forte Couture</li>
          <li>FTC</li>
          <li>Gabriela Hearst</li>
          <li>Gallery Dept.</li>
          <li>Galliano</li>
          <li>Ganni</li>
          <li>Gareth Pugh</li>
          <li>GCDS</li>
          <li>Gentle Monster</li>
          <li>Gerard Darel</li>
          <li>Ghoud</li>
          <li>Gia Couture</li>
          <li>Giacomorelli</li>
          <li>Giamba</li>
          <li>Giambattista Valli</li>
          <li>Gianfranco Ferre</li>
          <li>Gianmarco Lorenzi</li>
          <li>Gianvito Rossi</li>
          <li>Gienchi</li>
          <li>Giorgio Armani</li>
          <li>Giorgio Brato</li>
          <li>Giuseppe di Morabito</li>
          <li>Giuseppe Zanotti Design</li>
          <li>Givenchy</li>
          <li>GmbH</li>
          <li>Golden Goose Deluxe Brand</li>
          <li>Goyard</li>
          <li>Graviteight</li>
          <li>Greg Lauren</li>
          <li>Grunge John Orchestra. Explosion</li>
          <li>Gucci</li>
          <li>Haider Ackermann</li>
          <li>Helmut Lang</li>
          <li>Hermes</li>
          <li>Herno</li>
          <li>Heron Preston</li>
          <li>Homme Plissé Issey Miyake</li>
          <li>Hood by Air</li>
          <li>House Of Holland</li>
          <li>HTC</li>
          <li>HYKE</li>
          <li>IENKI IENKI</li>
          <li>If Six Was Nine</li>
          <li>Ilaria Nistri</li>
          <li>INUIKII</li>
          <li>Iro</li>
          <li>Isaac Sellam</li>
          <li>Isaac Sellam Experience</li>
          <li>Isabel Benenato</li>
          <li>Isabel Marant</li>
          <li>Isabel Marant Etoile</li>
          <li>Issey Miyake</li>
          <li>J. Kim</li>
          <li>J.Mendel</li>
          <li>Jacquemus</li>
          <li>Jacques Marie Mage</li>
          <li>Jean Paul Gaultier</li>
          <li>Jenny Packham</li>
          <li>Jessie Western</li>
          <li>Jil Sander</li>
          <li>Jimmy Choo</li>
          <li>John Galliano</li>
          <li>Joseph</li>
          <li>Joyrich</li>
          <li>Julien Macdonald</li>
          <li>Julius</li>
          <li>Junya Watanabe</li>
          <li>Juun.J</li>
          <li>JW Anderson</li>
          <li>Kenzo</li>
          <li>Khaite</li>
          <li>Khrisjoy</li>
          <li>KIKO KOSTADINOV</li>
          <li>Kiton</li>
          <li>Kiton Donna</li>
          <li>Kjus</li>
          <li>Kolor</li>
          <li>Kris Van Assche</li>
          <li>Ktz</li>
          <li>Kub0raum</li>
          <li>L.G.B.</li>
          <li>Laneus</li>
          <li>Lanvin</li>
          <li>LaQuan Smith</li>
          <li>Le Silla</li>
          <li>Lemaire</li>
          <li>Lempelius</li>
          <li>Linda Farrow</li>
          <li>Loewe</li>
          <li>Loro Piana</li>
          <li>Lost&Found</li>
          <li>Louis Vuitton</li>
          <li>Mach & Mach</li>
          <li>Magda Butrym</li>
          <li>Maison Bohemique</li>
          <li>Maison Margiela</li>
          <li>Maison Michel</li>
          <li>Maison Ullens</li>
          <li>Manolo Blahnik</li>
          <li>Mansur Gavriel</li>
          <li>Manu Atelier</li>
          <li>MARC JACOBS</li>
          <li>Marc Jacobs Runway</li>
          <li>Marchesa</li>
          <li>Marni</li>
          <li>Martine Rose</li>
          <li>Mary Katrantzou</li>
          <li>Massimo Sforza</li>
          <li>Mastermind</li>
          <li>Matsuda</li>
          <li>Matthew Williamson</li>
          <li>Max Mara</li>
          <li>MCM</li>
          <li>Missoni</li>
          <li>Miu Miu</li>
          <li>Mm6</li>
          <li>MM6 Maison Margiela Paris</li>
          <li>Moncler</li>
          <li>Moschino</li>
          <li>Mother Of Pearl</li>
          <li>MRZ</li>
          <li>MSGM</li>
          <li>Mugler</li>
          <li>Mykita</li>
          <li>Nanushka</li>
          <li>Neil Barrett</li>
          <li>Neous</li>
          <li>Nicholas Kirkwood</li>
          <li>Nick Fouquet</li>
          <li>Nike</li>
          <li>Nina Ricci</li>
          <li>Nuè</li>
          <li>Oamc</li>
          <li>Off-White</li>
          <li>Olympia Le-Tan</li>
          <li>Oscar de la Renta</li>
          <li>Overcome</li>
          <li>Palm Angels</li>
          <li>PATRICK HELLMANN</li>
          <li>Peter Do</li>
          <li>Peter Pilotto</li>
          <li>Philipp Plein</li>
          <li>Philosophy di Lorenzo Serafini</li>
          <li>Pierre Hardy</li>
          <li>Prada</li>
          <li>Prada Linea Rossa</li>
          <li>PREEN by Thornton Bregazzi</li>
          <li>Premiata</li>
          <li>Proenza Schouler</li>
          <li>PRPS</li>
          <li>R.E.D. Valentino</li>
          <li>R13</li>
          <li>Raf Simons</li>
          <li>Rag&Bone</li>
          <li>Ralph Lauren</li>
          <li>Rasario</li>
          <li>RBRSL</li>
          <li>Re/Done</li>
          <li>Rejina Pyo</li>
          <li>Rene Caovilla</li>
          <li>René Caovilla</li>
          <li>Rhude</li>
          <li>Richard Quinn</li>
          <li>Rick Owens</li>
          <li>Rick Owens Lilies</li>
          <li>Rimowa</li>
          <li>RinDi</li>
          <li>ROA</li>
          <li>ROBERT CLERGERIE</li>
          <li>Roberto Cavalli</li>
          <li>Rochas</li>
          <li>Rodarte</li>
          <li>Roksanda</li>
          <li>Roland Mouret</li>
          <li>ROTATE Birger Christensen</li>
          <li>RTA</li>
          <li>Ruslan Baginskiy</li>
          <li>SA SU PHI</li>
          <li>Sacai</li>
          <li>Saint Laurent</li>
          <li>Salvatore Ferragamo</li>
          <li>Sand</li>
          <li>Santoni</li>
          <li>Sara Battaglia</li>
          <li>Sashaverse</li>
          <li>Seraphin</li>
          <li>Serapian</li>
          <li>Sergio Rossi</li>
          <li>Shanghai Tang</li>
          <li>Sies Marjan</li>
          <li>Simone Rocha</li>
          <li>Simonetta Ravizza</li>
          <li>Sonia Rykiel</li>
          <li>Sophia Webster</li>
          <li>Sophie Hulme</li>
          <li>SPORTMAX</li>
          <li>Stefano Ricci</li>
          <li>Stella Jean</li>
          <li>Stella McCartney</li>
          <li>Stone Island</li>
          <li>Supreme</li>
          <li>Tak.Ori</li>
          <li>Tegin</li>
          <li>Ten C</li>
          <li>The Attico</li>
          <li>The Beautiful Mind</li>
          <li>The Elder Statesman</li>
          <li>THE MANNEI</li>
          <li>The Row</li>
          <li>The Viridi-anne</li>
          <li>The Volon</li>
          <li>Thierry Lasry</li>
          <li>Thom Browne</li>
          <li>Tibi</li>
          <li>Tod’s</li>
          <li>Toga Pulla</li>
          <li>Tom Ford</li>
          <li>Totême</li>
          <li>Transit</li>
          <li>True Religion</li>
          <li>Ulyana Sergeenko</li>
          <li>Uma Wang</li>
          <li>Umit Benan</li>
          <li>Undercover</li>
          <li>Valentino</li>
          <li>Valentino Garavani</li>
          <li>Valextra</li>
          <li>Versace</li>
          <li>Versus Versace</li>
          <li>Vetements</li>
          <li>Vic Matie</li>
          <li>Vicini</li>
          <li>Victoria Beckham</li>
          <li>Visvim</li>
          <li>Vivienne Westwood</li>
          <li>VTMNTS</li>
          <li>Walter Van Beirendonck</li>
          <li>Woolrich</li>
          <li>Y&apos;s</li>
          <li>Y/Project</li>
          <li>Yang Li</li>
          <li>Yeezy</li>
          <li>Yohji Yamamoto</li>
          <li>YS ARMY Paris</li>
          <li>Yves Salomon</li>
          <li>Zegna Couture</li>
          <li>Ziggy Chen</li>
          <li>Zilli</li>
          <li>Zimmermann</li>
          <li>Zuhair Murad</li>
        </ul>
      </article>
    </>
  );
}
