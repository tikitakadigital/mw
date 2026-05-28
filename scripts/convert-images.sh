#!/bin/bash
# Converts, renames and optimises all wedding images to WebP
# Uses macOS built-in sips — no extra installs needed
# Run from: /Users/philippenders/Documents/mallorcawedding.co.uk
# Usage: bash scripts/convert-images.sh

set -e
SRC="public/img"
OUT="public/img"

convert() {
  local src="$SRC/$1"
  local dest="$OUT/$2"
  local maxdim="${3:-1920}"

  if [ ! -f "$src" ]; then
    echo "  ⚠  MISSING: $1"
    return
  fi

  sips -Z "$maxdim" -s format webp "$src" --out "$dest" \
    --setProperty description "$4" \
    --setProperty copyright "© Mallorca Wedding" \
    > /dev/null 2>&1

  # Get final file size in KB
  size=$(du -k "$dest" | cut -f1)
  echo "  ✓  $2  (${size}KB)"
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Mallorca Wedding · Image Pipeline  "
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "── Son Marroig (hero + gallery) ──"
# son-marroig-2 is the homepage hero — use the most dramatic wide shot
convert "wedding-mallorca-son-marroig-dinner.webp"                             "son-marroig-2.webp"  1920 "Son Marroig wedding dinner reception, Deià, Mallorca"
convert "mallorca-wedding-venues-02-2200x1467-1.jpg"                           "son-marroig-1.webp"  1600 "Son Marroig estate and gardens, Deià coast, Mallorca"
convert "SonMarroig_Mallorca_Weddingdaymanager_Wedding_Weddingphotos_Muenchen_Bayern_BrideBrideWedding_Weddingplanner_Hochzeitsplanung_Hochzeitsplanerin_Muenchen-4-1536x864-1.jpg" "son-marroig-3.webp" 1400 "Son Marroig wedding ceremony rotunda, Mallorca"
convert "son-marroig-mallorca-wedding21.jpg"                                   "son-marroig-4.webp"  1400 "Son Marroig cliffside ceremony, Deià, Mallorca"
convert "son-marroig-inspo-photos-07508.webp"                                  "son-marroig-5.webp"  1400 "Son Marroig wedding venue overview, Mallorca"
convert "son-marroig-mallorca-wedding-cover.jpg"                               "son-marroig-6.webp"  1400 "Son Marroig wedding couple, Deià, Mallorca"
convert "Ilona_Antina_Photography-1674-1.jpg"                                  "son-marroig-7.webp"  1400 "Son Marroig rotunda wedding ceremony by Ilona Antina Photography"
convert "boda-en-son-marroig-deia-25.jpg"                                      "son-marroig-8.webp"  1400 "Boda en Son Marroig, Deià, Mallorca"
convert "wedding-mallorca-son-marroig-ceremony.webp"                           "son-marroig-9.webp"  1400 "Son Marroig outdoor wedding ceremony, Mallorca"
convert "Son+Marroig+Destination+Wedding.webp"                                 "son-marroig-10.webp" 1400 "Son Marroig destination wedding, Mediterranean view"

echo ""
echo "── Finca Comassema ──"
convert "65ae30e35e65b545f492ac71_weddings-comassema.jpg"                      "comassema-1.webp"  1400 "Finca Comassema wedding venue, Orient, Tramuntana, Mallorca"
convert "Finca-Comassema-wedding-266-scaled.jpg"                               "comassema-2.webp"  1400 "Finca Comassema wedding reception, Mallorca"
convert "Finca-Comassema-wedding-269-scaled.jpg"                               "comassema-3.webp"  1400 "Finca Comassema wedding ceremony, Tramuntana mountains, Mallorca"
convert "Finca-Comassema-wedding-271.jpg"                                      "comassema-4.webp"  1400 "Finca Comassema finca estate wedding, Mallorca"
convert "Paula-Chris-highlights-by-Laura-Mazzello-Photography-13.webp"        "comassema-5.webp"  1400 "Finca Comassema wedding highlights, Mallorca"
convert "VP-Wedding-40-of-1044_websize.webp"                                   "comassema-6.webp"  1400 "Finca Comassema wedding celebrations, Mallorca"
convert "VP-Wedding-198-of-1044_websize.webp"                                  "comassema-7.webp"  1400 "Finca Comassema long table dinner, Mallorca"
convert "thumb_132_1920x1080_0_0_crop.jpg"                                     "comassema-8.webp"  1400 "Finca Comassema venue overview, Mallorca"
convert "Aimee-K-Photography-Hollie-Tom-362.webp"                              "comassema-9.webp"  1400 "Hollie and Tom wedding at Finca Comassema by Aimee K Photography"

echo ""
echo "── Finca Son Mir ──"
convert "hochzeitsplaner-mallorca-fincasonmir_0001.jpg"                        "son-mir-1.webp"  1400 "Finca Son Mir wedding venue, Algaida, Mallorca"
convert "Finca-Son-Mir-ALAGO-EVENTS-000c-1.jpg"                               "son-mir-2.webp"  1400 "Finca Son Mir gardens and courtyard, Mallorca"
convert "Finca-Son-Mir-ALAGO-EVENTS-018-1.jpg"                                "son-mir-3.webp"  1400 "Finca Son Mir wedding ceremony, Algaida, Mallorca"
convert "finca_son_mir_mallorca_spain_by_lilly_red_creative-20.jpg"            "son-mir-4.webp"  1400 "Finca Son Mir wedding by Lilly Red Creative, Mallorca"
convert "4bc573ab3c2b728c51e805f9daa7bd12.jpg"                                 "son-mir-5.webp"  1400 "Finca Son Mir estate, Mallorca"
convert "2-A7401717-scaled.jpg"                                                "son-mir-6.webp"  1400 "Finca Son Mir wedding reception, Mallorca"
convert "99f5996cfab541e2b8c22218bc62aab2_LARGE!_!fd0e569f26632f6134ec68d965b7eed1.webp" "son-mir-7.webp" 1400 "Finca Son Mir wedding detail, Mallorca"

echo ""
echo "── Son Togores ──"
convert "000a-Mallorca-wedding-Son-Togores.jpg"                                "togores-1.webp"  1400 "Son Togores wedding venue, Esporles, Mallorca"
convert "098-Mallorca-wedding-Son-Togores-800x1200.jpg"                        "togores-2.webp"  1200 "Son Togores Mallorca wedding, courtyard ceremony"
convert "Finca-Son-Togores-wedding-326-1.jpg"                                  "togores-3.webp"  1400 "Son Togores wedding reception dinner, Mallorca"
convert "Finca-Son-Togores-wedding-329-1.jpg"                                  "togores-4.webp"  1400 "Son Togores wedding celebrations, Mallorca"
convert "Son-Togores-Mallorca-wedding-venue4.jpg"                              "togores-5.webp"  1400 "Son Togores venue gardens, Esporles, Mallorca"
convert "b9f755_66d21b19265448c6aa572c35eb268870~mv2.jpg"                      "togores-6.webp"  1400 "Son Togores wedding ceremony, Mallorca"
convert "Milly-Ryan-251.jpg"                                                   "togores-7.webp"  1400 "Milly and Ryan wedding at Son Togores, Mallorca"
convert "0809-MarissaConnor-by-Chris-and-Ruth-Photography-404A5382.jpg"        "togores-8.webp"  1400 "Wedding at Son Togores by Chris and Ruth Photography, Mallorca"
convert "thumb_132_1920x1080_0_0_crop (1).jpg"                                 "togores-9.webp"  1400 "Son Togores estate wedding, Mallorca"

echo ""
echo "── Couple & editorial shots ──"
convert "Anina-Alex-Wedding-590-of-1071_websize.webp"                          "couple-portrait.webp" 1400 "Couple portrait at Mallorca destination wedding"
convert "Finca-Son-Togores-wedding-326-1.jpg"                                  "couple-dancing.webp"  1400 "Couple dancing at Mallorca finca wedding"
convert "Finca-Comassema-wedding-266-scaled.jpg"                               "couple-hills.webp"    1400 "Couple in Tramuntana hills at Mallorca wedding"
convert "wedding-mallorca-son-marroig-ceremony.webp"                           "couple-veil.webp"     1400 "Bride with veil at Mallorca coastal wedding ceremony"
convert "Aimee-K-Photography-Hollie-Tom-362.webp"                              "couple-bouquet.webp"  1400 "Wedding bouquet at Mallorca finca wedding"
convert "VP-Wedding-198-of-1044_websize.webp"                                  "wedding-detail.webp"  1400 "Wedding table detail with florals at Mallorca wedding"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. Checking output..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Summary: list all webp files with sizes
echo "WebP files in public/img:"
ls -lh public/img/*.webp 2>/dev/null | awk '{print "  " $5 "  " $9}' | sed 's|public/img/||'

echo ""
echo "Total original JPGs/PNGs still present (can be deleted after verification):"
ls public/img/*.jpg public/img/*.png public/img/*.jpeg 2>/dev/null | wc -l | xargs echo " "
echo ""
