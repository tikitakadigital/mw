import sharp from 'sharp';
import { existsSync, readdirSync } from 'fs';
import { join, extname } from 'path';

const SRC = 'public/img';

// Map: [sourceFile, destFile, maxWidth, altText]
const images = [
  // ── Son Marroig ──────────────────────────────────────────────────────────
  // son-marroig-2 is the homepage hero — use the most dramatic wide shot
  ['wedding-mallorca-son-marroig-dinner.webp',                                             'son-marroig-2.webp',  1920, 'Son Marroig wedding dinner reception at sunset, Deià coast, Mallorca'],
  ['mallorca-wedding-venues-02-2200x1467-1.jpg',                                           'son-marroig-1.webp',  1600, 'Son Marroig estate and gardens overlooking the Mediterranean, Deià, Mallorca'],
  ['SonMarroig_Mallorca_Weddingdaymanager_Wedding_Weddingphotos_Muenchen_Bayern_BrideBrideWedding_Weddingplanner_Hochzeitsplanung_Hochzeitsplanerin_Muenchen-4-1536x864-1.jpg', 'son-marroig-3.webp', 1400, 'Son Marroig wedding ceremony at the marble rotunda, Mallorca'],
  ['son-marroig-mallorca-wedding21.jpg',                                                   'son-marroig-4.webp',  1400, 'Son Marroig cliffside wedding, Deià, Mallorca'],
  ['son-marroig-inspo-photos-07508.webp',                                                  'son-marroig-5.webp',  1400, 'Son Marroig wedding venue, Deià, Mallorca'],
  ['son-marroig-mallorca-wedding-cover.jpg',                                               'son-marroig-6.webp',  1400, 'Son Marroig wedding couple portrait, Deià coast, Mallorca'],
  ['Ilona_Antina_Photography-1674-1.jpg',                                                  'son-marroig-7.webp',  1400, 'Son Marroig rotunda ceremony by Ilona Antina Photography, Mallorca'],
  ['boda-en-son-marroig-deia-25.jpg',                                                      'son-marroig-8.webp',  1400, 'Boda en Son Marroig, Deià, Mallorca'],
  ['wedding-mallorca-son-marroig-ceremony.webp',                                           'son-marroig-9.webp',  1400, 'Son Marroig outdoor wedding ceremony above the Mediterranean, Mallorca'],
  ['Son+Marroig+Destination+Wedding.webp',                                                 'son-marroig-10.webp', 1400, 'Son Marroig destination wedding, Mallorca'],

  // ── Finca Comassema ──────────────────────────────────────────────────────
  ['65ae30e35e65b545f492ac71_weddings-comassema.jpg',                                      'comassema-1.webp',  1400, 'Finca Comassema wedding venue, Orient, Tramuntana mountains, Mallorca'],
  ['Finca-Comassema-wedding-266-scaled.jpg',                                               'comassema-2.webp',  1400, 'Finca Comassema wedding reception, Mallorca'],
  ['Finca-Comassema-wedding-269-scaled.jpg',                                               'comassema-3.webp',  1400, 'Finca Comassema wedding ceremony with Tramuntana mountain backdrop, Mallorca'],
  ['Finca-Comassema-wedding-271.jpg',                                                      'comassema-4.webp',  1400, 'Finca Comassema finca estate, Tramuntana, Mallorca'],
  ['Paula-Chris-highlights-by-Laura-Mazzello-Photography-13.webp',                        'comassema-5.webp',  1400, 'Finca Comassema wedding highlights by Laura Mazzello Photography, Mallorca'],
  ['VP-Wedding-40-of-1044_websize.webp',                                                   'comassema-6.webp',  1400, 'Finca Comassema wedding celebrations, Mallorca'],
  ['VP-Wedding-198-of-1044_websize.webp',                                                  'comassema-7.webp',  1400, 'Finca Comassema long table dinner under string lights, Mallorca'],
  ['thumb_132_1920x1080_0_0_crop.jpg',                                                     'comassema-8.webp',  1400, 'Finca Comassema venue overview, Tramuntana, Mallorca'],
  ['Aimee-K-Photography-Hollie-Tom-362.webp',                                              'comassema-9.webp',  1400, 'Hollie and Tom wedding at Finca Comassema by Aimee K Photography'],

  // ── Finca Son Mir ────────────────────────────────────────────────────────
  ['hochzeitsplaner-mallorca-fincasonmir_0001.jpg',                                        'son-mir-1.webp',  1400, 'Finca Son Mir wedding venue gardens, Algaida, Mallorca'],
  ['Finca-Son-Mir-ALAGO-EVENTS-000c-1.jpg',                                               'son-mir-2.webp',  1400, 'Finca Son Mir courtyard and architecture, Mallorca'],
  ['Finca-Son-Mir-ALAGO-EVENTS-018-1.jpg',                                                'son-mir-3.webp',  1400, 'Finca Son Mir wedding ceremony, Algaida, Mallorca'],
  ['finca_son_mir_mallorca_spain_by_lilly_red_creative-20.jpg',                            'son-mir-4.webp',  1400, 'Finca Son Mir wedding by Lilly Red Creative, Mallorca'],
  ['4bc573ab3c2b728c51e805f9daa7bd12.jpg',                                                 'son-mir-5.webp',  1400, 'Finca Son Mir estate, Mallorca'],
  ['2-A7401717-scaled.jpg',                                                                'son-mir-6.webp',  1400, 'Finca Son Mir wedding reception detail, Mallorca'],
  ['99f5996cfab541e2b8c22218bc62aab2_LARGE!_!fd0e569f26632f6134ec68d965b7eed1.webp',     'son-mir-7.webp',  1400, 'Finca Son Mir wedding, Algaida, Mallorca'],

  // ── Son Togores ──────────────────────────────────────────────────────────
  ['000a-Mallorca-wedding-Son-Togores.jpg',                                                'togores-1.webp',  1400, 'Son Togores wedding venue, Esporles, Mallorca'],
  ['098-Mallorca-wedding-Son-Togores-800x1200.jpg',                                        'togores-2.webp',  1200, 'Son Togores Mallorca wedding, courtyard ceremony'],
  ['Finca-Son-Togores-wedding-326-1.jpg',                                                  'togores-3.webp',  1400, 'Son Togores wedding reception dinner, Mallorca'],
  ['Finca-Son-Togores-wedding-329-1.jpg',                                                  'togores-4.webp',  1400, 'Son Togores wedding celebrations, Esporles, Mallorca'],
  ['Son-Togores-Mallorca-wedding-venue4.jpg',                                              'togores-5.webp',  1400, 'Son Togores venue and historic estate, Mallorca'],
  ['b9f755_66d21b19265448c6aa572c35eb268870~mv2.jpg',                                     'togores-6.webp',  1400, 'Son Togores wedding ceremony under the cork oaks, Mallorca'],
  ['Milly-Ryan-251.jpg',                                                                   'togores-7.webp',  1400, 'Milly and Ryan wedding at Son Togores, Mallorca'],
  ['0809-MarissaConnor-by-Chris-and-Ruth-Photography-404A5382.jpg',                       'togores-8.webp',  1400, 'Wedding at Son Togores by Chris and Ruth Photography, Mallorca'],
  ['thumb_132_1920x1080_0_0_crop (1).jpg',                                                'togores-9.webp',  1400, 'Son Togores estate wedding overview, Mallorca'],

  // ── Couple & editorial ───────────────────────────────────────────────────
  ['Anina-Alex-Wedding-590-of-1071_websize.webp',                                         'couple-portrait.webp', 1200, 'Couple portrait at a destination wedding in Mallorca'],
  ['Finca-Son-Togores-wedding-326-1.jpg',                                                  'couple-dancing.webp',  1200, 'Couple dancing at their Mallorca finca wedding reception'],
  ['Finca-Comassema-wedding-266-scaled.jpg',                                               'couple-hills.webp',    1200, 'Couple in the Tramuntana hills, Mallorca wedding'],
  ['wedding-mallorca-son-marroig-ceremony.webp',                                           'couple-veil.webp',     1200, 'Bride with veil at a cliffside wedding ceremony in Mallorca'],
  ['Aimee-K-Photography-Hollie-Tom-362.webp',                                              'couple-bouquet.webp',  1200, 'Wedding bouquet at a Mallorca finca wedding'],
  ['VP-Wedding-198-of-1044_websize.webp',                                                  'wedding-detail.webp',  1200, 'Wedding table styling and floral detail at a Mallorca wedding'],
];

let ok = 0, missing = 0, errors = 0;

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  Mallorca Wedding · Image Pipeline  ');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

for (const [src, dest, maxW, alt] of images) {
  const srcPath = join(SRC, src);
  const destPath = join(SRC, dest);

  if (!existsSync(srcPath)) {
    console.log(`  ⚠  MISSING  ${src}`);
    missing++;
    continue;
  }

  try {
    const img = sharp(srcPath);
    const meta = await img.metadata();

    // Only resize if image is wider than maxW
    const pipeline = (meta.width && meta.width > maxW)
      ? img.resize({ width: maxW, withoutEnlargement: true })
      : img;

    await pipeline
      .webp({ quality: 82, effort: 4 })
      .withMetadata({ exif: { IFD0: { ImageDescription: alt, Copyright: '© Mallorca Wedding' } } })
      .toFile(destPath);

    const { size } = await import('fs').then(fs => fs.promises.stat(destPath));
    const kb = Math.round(size / 1024);
    console.log(`  ✓  ${dest.padEnd(28)} ${kb}KB   ${alt.slice(0, 60)}`);
    ok++;
  } catch (e) {
    console.log(`  ✗  ERROR  ${dest}: ${e.message}`);
    errors++;
  }
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`  ✓ Converted: ${ok}   ⚠ Missing: ${missing}   ✗ Errors: ${errors}`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

if (ok > 0) {
  console.log(`All WebP files saved to public/img/`);
  console.log(`\nOriginal source files are unchanged — delete them once you're happy.\n`);
}
