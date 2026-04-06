/**
 * Base de données des appareils mobiles courants
 * Compatibilité Zoom Virtual Background
 * 
 * Sources :
 *  - Zoom official requirements : https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060007
 *  - GSMArena chipset specs : https://www.gsmarena.com
 * 
 * Exigences GPU Zoom (Android) :
 *  - Qualcomm Adreno : 540 (Snapdragon 835) ou supérieur à 615 (QCS605/SDM710)
 *  - Mali : série G, version G72 ou supérieure
 *  - Processeur : supérieur à Exynos 9810, Exynos 990, Kirin 980 ou Dimensity 1000
 * 
 * Statuts :
 *  - "ok"      : compatible selon les exigences officielles Zoom
 *  - "partial" : marque listée par Zoom mais modèle non confirmé individuellement
 *  - "no"      : chipset inférieur aux seuils Zoom documentés
 *  - "unknown" : modèle non répertorié, vérification manuelle recommandée
 */

const DEVICE_DB = {

  // ─────────────────────────────────────────────
  // SAMSUNG
  // ─────────────────────────────────────────────
  samsung: {
    label: "Samsung",
    models: [
      // ── Galaxy S (haut de gamme) ──────────────
      { pattern: /s8\+|s8 plus/i,       year: 2017, chipset: "Snapdragon 835 / Exynos 8895", gpu: "Adreno 540 / Mali-G71 MP20", status: "partial", note: "Adreno 540 = seuil minimum Zoom. Exynos 8895 (Mali-G71) est en dessous du seuil Mali G72." },
      { pattern: /s9\+|s9 plus/i,       year: 2018, chipset: "Snapdragon 845 / Exynos 9810", gpu: "Adreno 630 / Mali-G72 MP18", status: "ok",      note: "Exynos 9810 = seuil minimum Zoom. Adreno 630 compatible." },
      { pattern: /s9(?!\+| plus)/i,     year: 2018, chipset: "Snapdragon 845 / Exynos 9810", gpu: "Adreno 630 / Mali-G72 MP18", status: "ok",      note: "Exynos 9810 = seuil minimum Zoom. Adreno 630 compatible." },
      { pattern: /s10e/i,               year: 2019, chipset: "Snapdragon 855 / Exynos 9820", gpu: "Adreno 640 / Mali-G76 MP12", status: "ok",      note: "Exynos 9820 et Snapdragon 855 dépassent les seuils Zoom." },
      { pattern: /s10\+|s10 plus/i,     year: 2019, chipset: "Snapdragon 855 / Exynos 9820", gpu: "Adreno 640 / Mali-G76 MP12", status: "ok",      note: "Exynos 9820 et Snapdragon 855 dépassent les seuils Zoom." },
      { pattern: /s10(?!\+| plus|e)/i,  year: 2019, chipset: "Snapdragon 855 / Exynos 9820", gpu: "Adreno 640 / Mali-G76 MP12", status: "ok",      note: "Exynos 9820 et Snapdragon 855 dépassent les seuils Zoom." },
      { pattern: /s20 fe/i,             year: 2020, chipset: "Snapdragon 865 / Exynos 990",  gpu: "Adreno 650 / Mali-G77 MP11", status: "ok",      note: "Exynos 990 et Snapdragon 865 dépassent les seuils Zoom." },
      { pattern: /s20\+|s20 plus/i,     year: 2020, chipset: "Snapdragon 865 / Exynos 990",  gpu: "Adreno 650 / Mali-G77 MP11", status: "ok",      note: "Compatible." },
      { pattern: /s20(?!\+| plus| fe)/i,year: 2020, chipset: "Snapdragon 865 / Exynos 990",  gpu: "Adreno 650 / Mali-G77 MP11", status: "ok",      note: "Compatible." },
      { pattern: /s21|s22|s23|s24|s25/i,year: 2021, chipset: "Snapdragon 888+ / Exynos 2100+",gpu: "Adreno 660+ / Mali-G78+",  status: "ok",      note: "Gamme haut de gamme, largement compatible." },
      { pattern: /s8(?!\+| plus)/i,     year: 2017, chipset: "Snapdragon 835 / Exynos 8895", gpu: "Adreno 540 / Mali-G71 MP20", status: "partial", note: "Adreno 540 = seuil minimum Zoom. Exynos 8895 (Mali-G71) est en dessous du seuil Mali G72." },

      // ── Galaxy Note ───────────────────────────
      { pattern: /note 8/i,             year: 2017, chipset: "Snapdragon 835 / Exynos 8895", gpu: "Adreno 540 / Mali-G71 MP20", status: "partial", note: "Adreno 540 = seuil minimum. Exynos 8895 (Mali-G71) en dessous du seuil G72." },
      { pattern: /note 9/i,             year: 2018, chipset: "Snapdragon 845 / Exynos 9810", gpu: "Adreno 630 / Mali-G72 MP18", status: "ok",      note: "Compatible. Exynos 9810 = seuil minimum Zoom." },
      { pattern: /note 10/i,            year: 2019, chipset: "Snapdragon 855 / Exynos 9825", gpu: "Adreno 640 / Mali-G76 MP12", status: "ok",      note: "Compatible." },
      { pattern: /note 20/i,            year: 2020, chipset: "Snapdragon 865+ / Exynos 990", gpu: "Adreno 650 / Mali-G77 MP11", status: "ok",      note: "Compatible." },

      // ── Galaxy Z ──────────────────────────────
      { pattern: /z fold|z flip/i,      year: 2019, chipset: "Snapdragon 855+",              gpu: "Adreno 640",                  status: "ok",      note: "Compatible." },

      // ── Galaxy A (milieu/entrée de gamme) ─────
      { pattern: /a10(?!s)/i,           year: 2019, chipset: "Exynos 7884",                  gpu: "Mali-G71 MP2",                status: "no",      note: "Mali-G71 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a10s/i,               year: 2019, chipset: "Exynos 7884B",                 gpu: "Mali-G71 MP2",                status: "no",      note: "Mali-G71 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a12/i,                year: 2020, chipset: "Exynos 850",                   gpu: "Mali-G52 MP1",                status: "no",      note: "Mali-G52 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a13/i,                year: 2022, chipset: "Exynos 850",                   gpu: "Mali-G52 MP1",                status: "no",      note: "Mali-G52 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a14/i,                year: 2023, chipset: "Exynos 1330",                  gpu: "Mali-G68 MP2",                status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a15/i,                year: 2024, chipset: "Exynos 1330 / Dimensity 6100+",gpu: "Mali-G68 MP2",                status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a16/i,                year: 2024, chipset: "Exynos 1330",                  gpu: "Mali-G68 MP2",                status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a22/i,                year: 2021, chipset: "Helio G80 / Dimensity 700",    gpu: "Mali-G52 MC2",                status: "no",      note: "Mali-G52 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a32/i,                year: 2021, chipset: "Helio G80",                    gpu: "Mali-G52 MC2",                status: "no",      note: "Mali-G52 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a33/i,                year: 2022, chipset: "Exynos 1280",                  gpu: "Mali-G68 MP4",                status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a34/i,                year: 2023, chipset: "Exynos 1280",                  gpu: "Mali-G68 MP4",                status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a35/i,                year: 2024, chipset: "Exynos 1380",                  gpu: "Mali-G68 MP5",                status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a52(?!s)/i,           year: 2021, chipset: "Snapdragon 720G",              gpu: "Adreno 618",                  status: "no",      note: "Adreno 618 est inférieur au seuil Adreno 540 (Snapdragon 835) requis par Zoom." },
      { pattern: /a52s/i,               year: 2021, chipset: "Snapdragon 778G",              gpu: "Adreno 642L",                 status: "partial", note: "Adreno 642L dépasse le seuil Adreno 540. Compatibilité probable mais non confirmée individuellement par Zoom." },
      { pattern: /a53/i,                year: 2022, chipset: "Exynos 1280",                  gpu: "Mali-G68 MP4",                status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a54/i,                year: 2023, chipset: "Exynos 1380",                  gpu: "Mali-G68 MP5",                status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /a55/i,                year: 2024, chipset: "Exynos 1480",                  gpu: "Xclipse 530",                 status: "partial", note: "Xclipse 530 (AMD RDNA2) est une architecture récente. Compatibilité non confirmée individuellement par Zoom." },
      { pattern: /a56/i,                year: 2025, chipset: "Exynos 1580",                  gpu: "Xclipse 540",                 status: "partial", note: "Architecture récente. Compatibilité non confirmée individuellement par Zoom." },

      // ── Galaxy M ──────────────────────────────
      { pattern: /m\d+/i,               year: 0,    chipset: "Variable (Exynos/Helio)",       gpu: "Variable",                   status: "no",      note: "La gamme Galaxy M utilise généralement des chipsets d'entrée/milieu de gamme dont le GPU est inférieur aux seuils Zoom." },

      // ── Galaxy Tab (tablettes) ─────────────────
      { pattern: /tab s[6-9]|tab s1[0-9]/i, year: 2019, chipset: "Snapdragon 855+",         gpu: "Adreno 640+",                 status: "ok",      note: "Galaxy Tab S6 et supérieur : compatible." },
      { pattern: /tab a/i,              year: 0,    chipset: "Variable",                      gpu: "Variable",                   status: "no",      note: "La gamme Galaxy Tab A utilise des chipsets d'entrée de gamme généralement incompatibles avec les fonds virtuels Zoom." },
    ]
  },

  // ─────────────────────────────────────────────
  // XIAOMI / REDMI / POCO
  // ─────────────────────────────────────────────
  xiaomi: {
    label: "Xiaomi / Redmi / POCO",
    models: [
      // ── Xiaomi Mi / 12 / 13 / 14 ─────────────
      { pattern: /mi 8|mi 9|mi 10|mi 11|mi 12|mi 13|mi 14/i, year: 2018, chipset: "Snapdragon 845+", gpu: "Adreno 630+", status: "ok", note: "Gamme Mi/Xiaomi haut de gamme : Snapdragon 845 et supérieur, compatible." },
      { pattern: /xiaomi 12|xiaomi 13|xiaomi 14|xiaomi 15/i,  year: 2022, chipset: "Snapdragon 8 Gen 1+", gpu: "Adreno 730+", status: "ok", note: "Compatible." },

      // ── Redmi Note ────────────────────────────
      { pattern: /redmi note 7|redmi note 8/i,  year: 2019, chipset: "Snapdragon 660 / Helio G85", gpu: "Adreno 512 / Mali-G52 MC2", status: "no",      note: "Adreno 512 et Mali-G52 sont inférieurs aux seuils Zoom." },
      { pattern: /redmi note 9/i,               year: 2020, chipset: "Helio G85 / Snapdragon 720G", gpu: "Mali-G52 MC2 / Adreno 618", status: "no",      note: "Mali-G52 et Adreno 618 sont inférieurs aux seuils Zoom." },
      { pattern: /redmi note 10(?! pro)/i,      year: 2021, chipset: "Snapdragon 678 / Helio G88",  gpu: "Adreno 612 / Mali-G52 MC2", status: "no",      note: "Adreno 612 et Mali-G52 sont inférieurs aux seuils Zoom." },
      { pattern: /redmi note 10 pro/i,          year: 2021, chipset: "Snapdragon 732G",             gpu: "Adreno 618",                status: "no",      note: "Adreno 618 est inférieur au seuil Adreno 540 (Snapdragon 835) requis par Zoom." },
      { pattern: /redmi note 11(?! pro)/i,      year: 2022, chipset: "Snapdragon 680 / Helio G96",  gpu: "Adreno 610 / Mali-G57 MC2", status: "no",      note: "Adreno 610 et Mali-G57 sont inférieurs aux seuils Zoom." },
      { pattern: /redmi note 11 pro/i,          year: 2022, chipset: "Helio G96",                   gpu: "Mali-G57 MC2",              status: "no",      note: "Mali-G57 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /redmi note 12(?! pro)/i,      year: 2023, chipset: "Snapdragon 685 / Helio G99",  gpu: "Adreno 610 / Mali-G57 MC2", status: "no",      note: "Adreno 610 et Mali-G57 sont inférieurs aux seuils Zoom." },
      { pattern: /redmi note 12 pro/i,          year: 2023, chipset: "Dimensity 1080",              gpu: "Mali-G68 MC4",              status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /redmi note 13(?! pro)/i,      year: 2024, chipset: "Helio G91 Ultra / Snapdragon 685", gpu: "Mali-G52 MC2 / Adreno 610", status: "no", note: "Mali-G52 et Adreno 610 sont inférieurs aux seuils Zoom." },
      { pattern: /redmi note 13 pro/i,          year: 2024, chipset: "Dimensity 1080",              gpu: "Mali-G68 MC4",              status: "no",      note: "Mali-G68 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /redmi note 14(?! pro)/i,      year: 2025, chipset: "Helio G91 Ultra",             gpu: "Mali-G52 MC2",              status: "no",      note: "Mali-G52 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /redmi note 14 pro/i,          year: 2025, chipset: "Dimensity 7300 Ultra",        gpu: "Mali-G615 MC2",             status: "partial", note: "Mali-G615 dépasse le seuil G72. Compatibilité probable mais non confirmée individuellement par Zoom." },
      { pattern: /redmi note 15(?! pro)/i,      year: 2026, chipset: "Helio G91 Ultra",             gpu: "Mali-G52 MC2",              status: "no",      note: "Mali-G52 est inférieur au seuil Mali G72 requis par Zoom. C'est la raison pour laquelle l'option n'apparaît pas dans Zoom." },
      { pattern: /redmi note 15 pro/i,          year: 2026, chipset: "Dimensity 7300 Ultra",        gpu: "Mali-G615 MC2",             status: "partial", note: "Mali-G615 dépasse le seuil G72. Compatibilité probable mais non confirmée individuellement par Zoom." },

      // ── POCO ──────────────────────────────────
      { pattern: /poco x3|poco x4/i,    year: 2020, chipset: "Snapdragon 732G / 695",        gpu: "Adreno 618 / 619",            status: "no",      note: "Adreno 618/619 sont inférieurs au seuil Adreno 540 requis par Zoom." },
      { pattern: /poco x5(?! pro)/i,    year: 2023, chipset: "Snapdragon 695",               gpu: "Adreno 619",                  status: "no",      note: "Adreno 619 est inférieur au seuil Adreno 540 requis par Zoom." },
      { pattern: /poco x5 pro/i,        year: 2023, chipset: "Snapdragon 778G",              gpu: "Adreno 642L",                 status: "partial", note: "Adreno 642L dépasse le seuil. Compatibilité probable mais non confirmée individuellement par Zoom." },
      { pattern: /poco x6|poco x7/i,    year: 2024, chipset: "Dimensity 8300 / 8400",       gpu: "Mali-G615 MC6",               status: "partial", note: "Mali-G615 dépasse le seuil G72. Compatibilité probable mais non confirmée individuellement par Zoom." },
      { pattern: /poco f\d/i,           year: 2021, chipset: "Snapdragon 870+",              gpu: "Adreno 650+",                 status: "ok",      note: "Snapdragon 870 et supérieur : compatible." },
    ]
  },

  // ─────────────────────────────────────────────
  // HUAWEI
  // ─────────────────────────────────────────────
  huawei: {
    label: "Huawei",
    models: [
      { pattern: /p20|p30|p40|p50|p60/i,       year: 2018, chipset: "Kirin 970+",            gpu: "Mali-G72 MP12+",              status: "ok",      note: "Kirin 970+ (P20) et supérieur : Mali-G72 compatible. Kirin 980+ dépasse le seuil Zoom." },
      { pattern: /mate 20|mate 30|mate 40|mate 50|mate 60/i, year: 2018, chipset: "Kirin 980+", gpu: "Mali-G76 MP10+",          status: "ok",      note: "Compatible. Kirin 980 = seuil minimum Zoom." },
      { pattern: /p10|p9|p8/i,                 year: 2016, chipset: "Kirin 960 / 955",        gpu: "Mali-G71 MP8",               status: "no",      note: "Mali-G71 est inférieur au seuil Mali G72 requis par Zoom." },
      { pattern: /y\d+|nova [1-5]/i,            year: 0,    chipset: "Kirin 710 ou inférieur", gpu: "Mali-G51 MP4 ou inférieur",  status: "no",      note: "Les gammes Y et Nova (jusqu'à Nova 5) utilisent des chipsets dont le GPU est inférieur aux seuils Zoom." },
      { pattern: /nova [6-9]|nova 1[0-9]/i,     year: 2019, chipset: "Kirin 990+",            gpu: "Mali-G76 MP16+",             status: "ok",      note: "Nova 6 et supérieur avec Kirin 990+ : compatible." },
    ]
  },

  // ─────────────────────────────────────────────
  // GOOGLE PIXEL
  // ─────────────────────────────────────────────
  google: {
    label: "Google Pixel",
    models: [
      { pattern: /pixel [1-3]/i,  year: 2016, chipset: "Snapdragon 821 / 835 / 845", gpu: "Adreno 530 / 540 / 630", status: "partial", note: "Pixel 1-2 : Adreno 530 en dessous du seuil. Pixel 3 : Adreno 630 compatible." },
      { pattern: /pixel [4-9]|pixel pro/i, year: 2019, chipset: "Snapdragon 855+ / Tensor", gpu: "Adreno 640+ / Tensor GPU", status: "ok", note: "Pixel 4 et supérieur : compatible." },
    ]
  },

  // ─────────────────────────────────────────────
  // ONEPLUS
  // ─────────────────────────────────────────────
  oneplus: {
    label: "OnePlus",
    models: [
      { pattern: /oneplus [1-5]/i,  year: 2014, chipset: "Snapdragon 801 / 820 / 835", gpu: "Adreno 330 / 530 / 540", status: "partial", note: "OnePlus 5 (Snapdragon 835, Adreno 540) = seuil minimum Zoom. Modèles antérieurs incompatibles." },
      { pattern: /oneplus [6-9]|oneplus 1[0-9]|oneplus nord/i, year: 2018, chipset: "Snapdragon 845+", gpu: "Adreno 630+", status: "ok", note: "OnePlus 6 et supérieur : compatible." },
    ]
  },

  // ─────────────────────────────────────────────
  // OPPO / REALME
  // ─────────────────────────────────────────────
  oppo: {
    label: "Oppo / Realme",
    models: [
      { pattern: /oppo find x[3-9]|oppo reno [5-9]|oppo reno 1[0-9]/i, year: 2021, chipset: "Snapdragon 888+", gpu: "Adreno 660+", status: "ok", note: "Gamme Find X3+ et Reno 5+ haut de gamme : compatible." },
      { pattern: /oppo a\d+|realme [1-9](?! pro)|realme c\d+/i, year: 0, chipset: "Helio G ou Snapdragon 6xx", gpu: "Mali-G52 / Adreno 610", status: "no", note: "Les gammes Oppo A et Realme C/numérotées utilisent des chipsets dont le GPU est généralement inférieur aux seuils Zoom." },
      { pattern: /realme [1-9] pro|realme gt/i, year: 2021, chipset: "Snapdragon 778G+", gpu: "Adreno 642L+", status: "partial", note: "Realme GT et Pro avec Snapdragon 778G+ : Adreno 642L dépasse le seuil. Compatibilité probable mais non confirmée individuellement par Zoom." },
    ]
  },

  // ─────────────────────────────────────────────
  // VIVO
  // ─────────────────────────────────────────────
  vivo: {
    label: "Vivo",
    models: [
      { pattern: /vivo x[6-9]|vivo x[1-9][0-9]|vivo v2[0-9]/i, year: 2021, chipset: "Snapdragon 888+", gpu: "Adreno 660+", status: "ok", note: "Gamme X haut de gamme : compatible." },
      { pattern: /vivo y\d+/i, year: 0, chipset: "Helio G ou Snapdragon 6xx", gpu: "Mali-G52 / Adreno 610", status: "no", note: "La gamme Vivo Y utilise des chipsets dont le GPU est généralement inférieur aux seuils Zoom." },
    ]
  },

  // ─────────────────────────────────────────────
  // IPHONE
  // ─────────────────────────────────────────────
  iphone: {
    label: "iPhone (Apple)",
    models: [
      { pattern: /iphone [1-7](?!\d| plus| pro)/i, year: 2007, chipset: "A4 à A11",  gpu: "Apple GPU",  status: "no",  note: "iPhone 7 et antérieurs ne sont pas supportés par Zoom pour les fonds virtuels. iPhone 8 minimum requis (source officielle Zoom)." },
      { pattern: /iphone 7 plus/i,                  year: 2016, chipset: "A10 Fusion", gpu: "Apple GPU", status: "no",  note: "iPhone 7 Plus non supporté. iPhone 8 minimum requis (source officielle Zoom)." },
      { pattern: /iphone (8|9|x|se)/i,              year: 2017, chipset: "A11+",       gpu: "Apple GPU", status: "ok",  note: "iPhone 8, X, SE (2e/3e gen) et supérieur : supportés (source officielle Zoom)." },
      { pattern: /iphone 1[0-9]|iphone [2-9][0-9]/i,year: 2019, chipset: "A13+",      gpu: "Apple GPU", status: "ok",  note: "Compatible." },
    ]
  },

  // ─────────────────────────────────────────────
  // IPAD
  // ─────────────────────────────────────────────
  ipad: {
    label: "iPad (Apple)",
    models: [
      { pattern: /ipad pro/i,  year: 2015, chipset: "A9X+", gpu: "Apple GPU", status: "ok", note: "Tous les iPad Pro sont supportés (source officielle Zoom)." },
      { pattern: /ipad air [1-3]/i, year: 2013, chipset: "A7 à A12", gpu: "Apple GPU", status: "partial", note: "iPad Air 1-3 : vérifiez avec la documentation officielle Zoom. iPad Air 4 et supérieur : compatibles." },
      { pattern: /ipad air [4-9]/i, year: 2020, chipset: "A14+", gpu: "Apple GPU", status: "ok", note: "iPad Air 4 et supérieur : compatible." },
      { pattern: /ipad mini [1-4]/i, year: 2012, chipset: "A5 à A8", gpu: "Apple GPU", status: "no", note: "iPad mini 1-4 non supportés. iPad mini 5 et supérieur requis (source officielle Zoom)." },
      { pattern: /ipad mini [5-9]/i, year: 2019, chipset: "A12+", gpu: "Apple GPU", status: "ok", note: "iPad mini 5 et supérieur : compatible (source officielle Zoom)." },
      { pattern: /ipad(?! pro| air| mini)/i, year: 2017, chipset: "A9+", gpu: "Apple GPU", status: "partial", note: "iPad 9.7\" 5e/6e gen (A9/A10) et iPad 10.2\" 7e gen+ sont listés par Zoom. Vérifiez votre génération exacte." },
    ]
  }
};

/**
 * Recherche un appareil dans la base de données
 * @param {string} brand - Marque de l'appareil
 * @param {string} model - Modèle de l'appareil
 * @returns {object|null} - Résultat de compatibilité ou null si non trouvé
 */
function lookupDevice(brand, model) {
  const brandKey = brand.toLowerCase().trim();
  let brandData = null;

  // Correspondance de marque
  if (brandKey.includes('samsung'))       brandData = DEVICE_DB.samsung;
  else if (brandKey.includes('xiaomi') || brandKey.includes('redmi') || brandKey.includes('poco')) brandData = DEVICE_DB.xiaomi;
  else if (brandKey.includes('huawei'))   brandData = DEVICE_DB.huawei;
  else if (brandKey.includes('google') || brandKey.includes('pixel')) brandData = DEVICE_DB.google;
  else if (brandKey.includes('oneplus'))  brandData = DEVICE_DB.oneplus;
  else if (brandKey.includes('oppo') || brandKey.includes('realme')) brandData = DEVICE_DB.oppo;
  else if (brandKey.includes('vivo'))     brandData = DEVICE_DB.vivo;
  else if (brandKey.includes('iphone') || brandKey.includes('apple') || model.toLowerCase().includes('iphone')) brandData = DEVICE_DB.iphone;
  else if (brandKey.includes('ipad') || model.toLowerCase().includes('ipad')) brandData = DEVICE_DB.ipad;

  if (!brandData) return null;

  const modelLower = model.toLowerCase().trim();

  // Recherche du modèle dans la liste
  for (const entry of brandData.models) {
    if (entry.pattern.test(modelLower) || entry.pattern.test(brand.toLowerCase() + ' ' + modelLower)) {
      return {
        brand: brandData.label,
        model: model,
        chipset: entry.chipset,
        gpu: entry.gpu,
        status: entry.status,
        note: entry.note,
        year: entry.year
      };
    }
  }

  // Modèle non trouvé dans la marque listée
  return {
    brand: brandData.label,
    model: model,
    chipset: "Non répertorié",
    gpu: "Non répertorié",
    status: "unknown",
    note: `Le modèle "${model}" n'est pas répertorié dans notre base de données. ${brandData.label} est listé par Zoom comme fabricant supporté, mais la compatibilité dépend du chipset spécifique de chaque modèle.`
  };
}
