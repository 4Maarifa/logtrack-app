
const EBrand = Object.freeze({
  ARDOR: 'ARDOR',
  ASTRA: 'ASTRA',
  CARRIER: 'CARRIER',
  CHASSIS_KING: 'CHASSIS_KING',
  CHEETAH: 'CHEETAH',
  CITROEN: 'CITROEN',
  CONTRAL: 'CONTRAL',
  CUMMINS: 'CUMMINS',
  DAF: 'DAF',
  DENNISON: 'DENNISON',
  DHOLLANDIA: 'DHOLLANDIA',
  DOEPKER: 'DOEPKER',
  DOONAN: 'DOONAN',
  DORSEY: 'DORSEY',
  EAGER_BEAVER: 'EAGER_BEAVER',
  EAST: 'EAST',
  ELITE_TRAILERS: 'ELITE_TRAILERS',
  FAYMONVILLE: 'FAYMONVILLE',
  FELLING: 'FELLING',
  FERREE: 'FERREE',
  FIAT: 'FIAT',
  FONTAINE: 'FONTAINE',
  FORD: 'FORD',
  FREIGHTLINER: 'FREIGHTLINER',
  FRUEHAUF: 'FRUEHAUF',
  FUSO: 'FUSO',
  GOLDHOFER: 'GOLDHOFER',
  GREAT_DANE: 'GREAT_DANE',
  GT_SEMITRAILER: 'GT_SEMITRAILER',
  HEIL: 'HEIL',
  HERCULES_CHASSIS: 'HERCULES_CHASSIS',
  HINO_MOTORS: 'HINO_MOTORS',
  HOET: 'HOET',
  HYUNDAI: 'HYUNDAI',
  ISUZU: 'ISUZU',
  IVECO: 'IVECO',
  J_J_BODIES: 'J_J_BODIES',
  KASSBOHRER: 'KASSBOHRER',
  KENTUCKY_TRAILER: 'KENTUCKY_TRAILER',
  KOGEL: 'KOGEL',
  LAMBERET: 'LAMBERET',
  KAMAZ: 'KAMAZ',
  KENWORTH: 'KENWORTH',
  KRONE: 'KRONE',
  LANDOLL: 'LANDOLL',
  LANDSPORT: 'LANDSPORT',
  LAWRENCE_DAVID: 'LAWRENCE_DAVID',
  MAC_TRAILER: 'MAC_TRAILER',
  MAX_TRAILER: 'MAX_TRAILER',
  MACK: 'MACK',
  MAGYAR: 'MAGYAR',
  MAN: 'MAN',
  MANAC: 'MANAC',
  MANITOU: 'MANITOU',
  MAXITRANS: 'MAXITRANS',
  MAZ: 'MAZ',
  MAZ_MAN: 'MAZ_MAN',
  MC_CAULEY_TRAILERS: 'MC_CAULEY_TRAILERS',
  MERCEDES: 'MERCEDES',
  MONTRACON: 'MONTRACON',
  NAVISTAR: 'NAVISTAR',
  NIKOLA: 'NIKOLA',
  NISSAN: 'NISSAN',
  OPEL: 'OPEL',
  PACCAR: 'PACCAR',
  PETERBILT: 'PETERBILT',
  PEUGEOT: 'PEUGEOT',
  PITTS: 'PITTS',
  POLAR_TANK: 'POLAR_TANK',
  PRATT: 'PRATT',
  PREMIER_TRAILER: 'PREMIER_TRAILER',
  REINKE: 'REINKE',
  REITNOUER: 'REITNOUER',
  RENAULT: 'RENAULT',
  SCANIA: 'SCANIA',
  SCHMITZ_CARGOBULL: 'SCHMITZ_CARGOBULL',
  SCHWARZMUELLER: 'SCHWARZMUELLER',
  SDC_TRAILERS: 'SDC_TRAILERS',
  STAS: 'STAS',
  STERLING_TRUCKS: 'STERLING_TRUCKS',
  STOUGHTON: 'STOUGHTON',
  STRICK: 'STRICK',
  SUZUKI: 'SUZUKI',
  TARAS_PORT_TRAILERS: 'TARAS_PORT_TRAILERS',
  TATA: 'TATA',
  TEREX: 'TEREX',
  TESLA: 'TESLA',
  THERMO_KING: 'THERMO_KING',
  TIGER: 'TIGER',
  TIMPTE: 'TIMPTE',
  TRAIL_EZE: 'TRAIL_EZE',
  TRAIL_KING_IND: 'TRAIL_KING_IND',
  TRANSCRAFT: 'TRANSCRAFT',
  TRAVIS_BODY_TRAILERS: 'TRAVIS_BODY_TRAILERS',
  TRI_TANK_CORP: 'TRI_TANK_CORP',
  TRINITY: 'TRINITY',
  UTM_CORPORATE: 'UTM_CORPORATE',
  VANGUARD: 'VANGUARD',
  VOLKSWAGEN: 'VOLKSWAGEN',
  VOLVO: 'VOLVO',
  WABASH: 'WABASH',
  WARREN: 'WARREN',
  WESTERN_TRAILERS: 'WESTERN_TRAILERS',
  WESTERN_STAR_TRUCKS: 'WESTERN_STAR_TRUCKS',
  WILSON_TRAILER: 'WILSON_TRAILER',
  XL_SPECIALIZED_TRAILERS: 'XL_SPECIALIZED_TRAILERS',
  XPO_TRAILERS: 'XPO_TRAILERS'
});

export const EBrandDetails = {
  [EBrand.ARDOR]: {
    name: 'Ardor',
    website: 'https://www.th-group.eu/en/trailers/brands/ardor',
    color: '#FF4A40',
    icons: {
      mono: 'ARDOR/mono.svg',
      color: 'ARDOR/color.svg',
      symbol: 'ARDOR/symbol.svg'
    }
  },
  [EBrand.ASTRA]: {
    name: 'Astra',
    website: 'https://www.iveco-astra.com/',
    color: '#1A171B',
    icons: {
      mono: 'ASTRA/mono.svg',
      color: 'ASTRA/color.svg',
      symbol: 'ASTRA/symbol.svg'
    }
  },
  [EBrand.CARRIER]: {
    name: 'Carrier',
    website: 'https://www.carrier.com/',
    color: '#152C73',
    icons: {
      mono: 'CARRIER/mono.svg',
      color: 'CARRIER/color.svg'
    }
  },
  [EBrand.CHASSIS_KING]: {
    name: 'Chassis King',
    slogan: 'Ride like a king',
    website: 'http://www.chassisking.com/',
    color: '#B51A12',
    icons: {
      mono: 'CHASSIS_KING/mono.svg',
      color: 'CHASSIS_KING/color.svg'
    }
  },
  [EBrand.CHEETAH]: {
    name: 'Cheetah Chassis',
    slogan: 'Run with the best',
    website: 'https://www.cheetahchassis.com/',
    color: '#0087E6',
    icons: {
      mono: 'CHEETAH/mono.svg',
      color: 'CHEETAH/color.svg',
      symbol: 'CHEETAH/symbol.svg'
    }
  },
  [EBrand.CITROEN]: {
    name: 'Citroën',
    website: 'https://www.citroen.fr/',
    color: '#6E6E6E',
    icons: {
      mono: 'CITROEN/mono.svg',
      color: 'CITROEN/color.svg',
      symbol: 'CITROEN/symbol.svg'
    }
  },
  [EBrand.CONTRAL]: {
    name: 'Contral',
    slogan: 'The original chain drive',
    website: 'https://thechaindrive.com/',
    color: '#890000',
    icons: {
      mono: 'CONTRAL/mono.svg',
      color: 'CONTRAL/color.svg'
    }
  },
  [EBrand.CUMMINS]: {
    name: 'Cummins',
    website: 'https://www.cummins.com/',
    color: '#000000',
    icons: {
      mono: 'CUMMINS/mono.svg',
      color: 'CUMMINS/color.svg'
    }
  },
  [EBrand.DAF]: {
    name: 'DAF',
    slogan: 'DAF offers you industry-leading trucks and services for highest transport efficiency.',
    website: 'https://www.daf.com/',
    color: '#00529b',
    icons: {
      mono: 'DAF/mono.svg',
      color: 'DAF/color.svg'
    }
  },
  [EBrand.DENNISON]: {
    name: 'Dennison',
    slogan: 'We\'re right behind you',
    website: 'https://dennisontrailers.com/',
    color: '#BD252C',
    icons: {
      mono: 'DENNISON/mono.svg',
      color: 'DENNISON/color.svg'
    }
  },
  [EBrand.DHOLLANDIA]: {
    name: 'Dhollandia',
    website: 'http://www.dhollandia.co.uk/GB/en',
    color: '#FD7E3C',
    icons: {
      mono: 'DHOLLANDIA/mono.svg',
      color: 'DHOLLANDIA/color.svg',
      symbol: 'DHOLLANDIA/symbol.svg'
    }
  },
  [EBrand.DOEPKER]: {
    name: 'Doepker',
    website: 'https://www.doepker.com/',
    color: '#FB3129',
    icons: {
      mono: 'DOEPKER/mono.svg',
      color: 'DOEPKER/color.svg'
    }
  },
  [EBrand.DOONAN]: {
    name: 'Doonan Spedialized Trailer',
    slogan: 'Built tough to haul your specialized loads',
    website: 'http://www.doonan.com/',
    color: '#CF2221',
    icons: {
      mono: 'DOONAN/mono.svg',
      color: 'DOONAN/color.svg',
      symbol: 'DOONAN/symbol.svg'
    }
  },
  [EBrand.DORSEY]: {
    name: 'Dorsey Trailers',
    website: 'http://www.dorseytrailer.net/',
    color: '#EC1C2D',
    icons: {
      mono: 'DORSEY/mono.svg',
      color: 'DORSEY/color.svg'
    }
  },
  [EBrand.EAGER_BEAVER]: {
    name: 'Eager Beaver Trailers',
    website: 'https://www.eagerbeavertrailers.com/',
    color: '#F0B510',
    icons: {
      mono: 'EAGER_BEAVER/mono.svg',
      color: 'EAGER_BEAVER/color.svg'
    }
  },
  [EBrand.EAST]: {
    name: 'East Manufacturing',
    website: 'https://www.eastmfg.com/',
    color: '#0A58A6',
    icons: {
      mono: 'EAST/mono.svg',
      color: 'EAST/color.svg',
      symbol: 'EAST/symbol.svg'
    }
  },
  [EBrand.ELITE_TRAILERS]: {
    name: 'Elite Trailers',
    slogan: 'Explore the elite difference',
    website: 'https://elitetrailers.com/',
    color: '#6C6C6C',
    icons: {
      mono: 'ELITE_TRAILERS/mono.svg',
      color: 'ELITE_TRAILERS/color.svg',
      symbol: 'ELITE_TRAILERS/symbol.svg'
    }
  },
  [EBrand.FAYMONVILLE]: {
    name: 'Faymonville',
    slogan: 'Trailers to the max',
    website: 'https://www.faymonville.com/',
    color: '#E30613',
    icons: {
      mono: 'FAYMONVILLE/mono.svg',
      color: 'FAYMONVILLE/color.svg',
      symbol: 'FAYMONVILLE/symbol.svg'
    }
  },
  [EBrand.FELLING]: {
    name: 'Felling Trailers',
    website: 'https://www.felling.com/',
    color: '#C62026',
    icons: {
      mono: 'FELLING/mono.svg',
      color: 'FELLING/color.svg'
    }
  },
  [EBrand.FERREE]: {
    name: 'Ferree',
    slogan: 'Connect with confidence',
    website: 'http://www.ferreetrailers.com/',
    color: '#B42016',
    icons: {
      mono: 'FERREE/mono.svg',
      color: 'FERREE/color.svg',
      symbol: 'FERREE/symbol.svg'
    }
  },
  [EBrand.FIAT]: {
    name: 'Fiat',
    website: 'https://www.fiat.com/',
    color: '#AD0C33',
    icons: {
      mono: 'FIAT/mono.svg',
      color: 'FIAT/color.svg'
    }
  },
  [EBrand.FONTAINE]: {
    name: 'Fontaine',
    website: 'https://fontainetrailer.com/',
    color: '#CC1042',
    icons: {
      mono: 'FONTAINE/mono.svg',
      color: 'FONTAINE/color.svg',
      symbol: 'FONTAINE/symbol.svg'
    }
  },
  [EBrand.FORD]: {
    name: 'Ford',
    website: 'https://www.ford.com/',
    color: '#003479',
    icons: {
      mono: 'FORD/mono.svg',
      color: 'FORD/color.svg',
      symbol: 'FORD/symbol.svg'
    }
  },
  [EBrand.FREIGHTLINER]: {
    name: 'Freightliner',
    slogan: 'Trucks that mean business',
    website: 'https://freightliner.com/',
    color: '#000000',
    icons: {
      mono: 'FREIGHTLINER/mono.svg',
      color: 'FREIGHTLINER/color.svg',
      symbol: 'FREIGHTLINER/symbol.svg'
    }
  },
  [EBrand.FRUEHAUF]: {
    name: 'Fruehauf',
    slogan: 'Lengendary excellence',
    website: 'http://www.fruehauf.co.uk/',
    color: '#EC1B24',
    icons: {
      mono: 'FRUEHAUF/mono.svg',
      color: 'FRUEHAUF/color.svg',
      symbol: 'FRUEHAUF/symbol.svg'
    }
  },
  [EBrand.FUSO]: {
    name: 'Fuso',
    slogan: 'A canter for every challenge',
    website: 'https://www.fuso-trucks.com/',
    color: '#ED1C24',
    icons: {
      mono: 'FUSO/mono.svg',
      color: 'FUSO/color.svg',
      symbol: 'FUSO/symbol.svg'
    }
  },
  [EBrand.GOLDHOFER]: {
    name: 'Goldhofer',
    website: 'https://www.goldhofer.com/',
    color: '#333333',
    icons: {
      mono: 'GOLDHOFER/mono.svg',
      color: 'GOLDHOFER/color.svg'
    }
  },
  [EBrand.GREAT_DANE]: {
    name: 'Great Dane',
    website: 'https://greatdane.com/',
    color: '#BC0029',
    icons: {
      mono: 'GREAT_DANE/mono.svg',
      color: 'GREAT_DANE/color.svg',
      symbol: 'GREAT_DANE/symbol.svg'
    }
  },
  [EBrand.GT_SEMITRAILER]: {
    name: 'GT semitrailer',
    website: 'https://www.trailersgt.com/',
    color: '#D6031E',
    icons: {
      mono: 'GT_SEMITRAILER/mono.svg',
      color: 'GT_SEMITRAILER/color.svg',
      symbol: 'GT_SEMITRAILER/symbol.svg'
    }
  },
  [EBrand.HEIL]: {
    name: 'Heil Trailer',
    slogan: 'Solutions built for you',
    website: 'https://www.heiltrailer.com/',
    color: '#CB2627',
    icons: {
      mono: 'HEIL/mono.svg',
      color: 'HEIL/color.svg',
      symbol: 'HEIL/symbol.svg'
    }
  },
  [EBrand.HERCULES_CHASSIS]: {
    name: 'Hercules Chassis',
    slogan: 'Strength in our reputation, engineering and quality for over 50 years',
    website: 'https://www.herculeschassis.com/',
    color: '#F1EB1C',
    icons: {
      mono: 'HERCULES_CHASSIS/mono.svg',
      color: 'HERCULES_CHASSIS/color.svg',
      symbol: 'HERCULES_CHASSIS/symbol.svg'
    }
  },
  [EBrand.HINO_MOTORS]: {
    name: 'Hino Motors',
    slogan: 'Trucks and buses that do more',
    website: 'https://www.hino-global.com/',
    color: '#FB0000',
    icons: {
      mono: 'HINO_MOTORS/mono.svg',
      color: 'HINO_MOTORS/color.svg',
      symbol: 'HINO_MOTORS/symbol.svg'
    }
  },
  [EBrand.HOET]: {
    name: 'Hoet',
    website: 'https://www.th-group.eu/en/trailers/brands/hoet-trailers',
    color: '#0070BE',
    icons: {
      mono: 'HOET/mono.svg',
      color: 'HOET/color.svg',
      symbol: 'HOET/symbol.svg'
    }
  },
  [EBrand.HYUNDAI]: {
    name: 'Hyundai',
    website: 'http://www.hyundai.com/',
    color: '#003082',
    icons: {
      mono: 'HYUNDAI/mono.svg',
      color: 'HYUNDAI/color.svg',
      symbol: 'HYUNDAI/symbol.svg'
    }
  },
  [EBrand.ISUZU]: {
    name: 'Isuzu',
    website: 'http://isuzu.com/',
    color: '#ED1F24',
    icons: {
      mono: 'ISUZU/mono.svg',
      color: 'ISUZU/color.svg'
    }
  },
  [EBrand.IVECO]: {
    name: 'Iveco',
    website: 'https://www.iveco.com/',
    color: '#043671',
    icons: {
      mono: 'IVECO/mono.svg',
      color: 'IVECO/color.svg'
    }
  },
  [EBrand.J_J_BODIES]: {
    name: 'J & J trucks bodies and trailers',
    slogan: 'Build for the long haul',
    website: 'https://www.jjbodies.com/',
    color: '#070101',
    icons: {
      mono: 'J_J_BODIES/mono.svg',
      color: 'J_J_BODIES/color.svg',
      symbol: 'J_J_BODIES/symbol.svg'
    }
  },
  [EBrand.KAMAZ]: {
    name: 'Kamaz',
    website: 'https://kamaz.ru/',
    color: '#0D53A0',
    icons: {
      mono: 'KAMAZ/mono.svg',
      color: 'KAMAZ/color.svg',
      symbol: 'KAMAZ/symbol.svg'
    }
  },
  [EBrand.KASSBOHRER]: {
    name: 'Kässbohrer',
    website: 'https://www.kaessbohrer.com/',
    color: '#FF0000',
    icons: {
      mono: 'KASSBOHRER/mono.svg',
      color: 'KASSBOHRER/color.svg',
      symbol: 'KASSBOHRER/symbol.svg'
    }
  },
  [EBrand.KENTUCKY_TRAILER]: {
    name: 'Kentucky Trailer',
    slogan: 'A servant leader company',
    website: 'https://www.kytrailer.com/',
    color: '#00477F',
    icons: {
      mono: 'KENTUCKY_TRAILER/mono.svg',
      color: 'KENTUCKY_TRAILER/color.svg',
      symbol: 'KENTUCKY_TRAILER/symbol.svg'
    }
  },
  [EBrand.KENWORTH]: {
    name: 'Kenworth',
    slogan: 'The world\'s best',
    website: 'https://www.kenworth.com/',
    color: '#DF002B',
    icons: {
      mono: 'KENWORTH/mono.svg',
      color: 'KENWORTH/color.svg',
      symbol: 'KENWORTH/symbol.svg'
    }
  },
  [EBrand.KOGEL]: {
    name: 'Kögel',
    slogan: 'Novum: light & strong',
    website: 'https://www.koegel.com/',
    color: '#E3051C',
    icons: {
      mono: 'KOGEL/mono.svg',
      color: 'KOGEL/color.svg',
      symbol: 'KOGEL/symbol.svg'
    }
  },
  [EBrand.KRONE]: {
    name: 'Krone',
    slogan: 'We deliver the future',
    website: 'https://www.krone-trailer.com/',
    color: '#0064A3',
    icons: {
      mono: 'KRONE/mono.svg',
      color: 'KRONE/color.svg',
      symbol: 'KRONE/symbol.svg'
    }
  },
  [EBrand.LAMBERET]: {
    name: 'Lamberet',
    slogan: 'The strong link in the cold chain',
    website: 'http://www.lamberet.fr/',
    color: '#00458A',
    icons: {
      mono: 'LAMBERET/mono.svg',
      color: 'LAMBERET/color.svg',
      symbol: 'LAMBERET/symbol.svg'
    }
  },
  [EBrand.LANDOLL]: {
    name: 'Landoll',
    website: 'https://landoll.com/',
    color: '#FCD700',
    icons: {
      mono: 'LANDOLL/mono.svg',
      color: 'LANDOLL/color.svg'
    }
  },
  [EBrand.LANDSPORT]: {
    name: 'Landsport',
    slogan: 'Serving our customers with integrity since 1987',
    website: 'http://www.landsport.com/',
    color: '#282A74',
    icons: {
      mono: 'LANDSPORT/mono.svg',
      color: 'LANDSPORT/color.svg',
      symbol: 'LANDSPORT/symbol.svg'
    }
  },
  [EBrand.LAWRENCE_DAVID]: {
    name: 'Lawrence David',
    slogan: 'The UK\'s premium commercial trailer and rigid truck body manufacturer',
    website: 'https://www.lawrencedavid.co.uk/',
    color: '#EA0000',
    icons: {
      mono: 'LAWRENCE_DAVID/mono.svg',
      color: 'LAWRENCE_DAVID/color.svg',
      symbol: 'LAWRENCE_DAVID/symbol.svg'
    }
  },
  [EBrand.MAC_TRAILER]: {
    name: 'Mac Trailer',
    website: 'https://www.mactrailer.com/',
    color: '#A52E44',
    icons: {
      mono: 'MAC_TRAILER/mono.svg',
      color: 'MAC_TRAILER/color.svg'
    }
  },
  [EBrand.MACK]: {
    name: 'Mack',
    website: 'https://www.macktrucks.com/',
    color: '#231F20',
    icons: {
      mono: 'MACK/mono.svg',
      color: 'MACK/color.svg',
      symbol: 'MACK/symbol.svg'
    }
  },
  [EBrand.MAGYAR]: {
    name: 'Magyar',
    slogan: 'A passion for quality',
    website: 'http://www.gmagyar.com/',
    color: '#E3001B',
    icons: {
      mono: 'MAGYAR/mono.svg',
      color: 'MAGYAR/color.svg',
      symbol: 'MAGYAR/symbol.svg'
    }
  },
  [EBrand.MAN]: {
    name: 'MAN',
    website: 'https://www.mantruckandbus.com/',
    color: '#303C49',
    icons: {
      mono: 'MAN/mono.svg',
      color: 'MAN/color.svg'
    }
  },
  [EBrand.MANAC]: {
    name: 'Manac',
    website: 'https://www.manac.com/',
    color: '#ED3423',
    icons: {
      mono: 'MANAC/mono.svg',
      color: 'MANAC/color.svg',
      symbol: 'MANAC/symbol.svg'
    }
  },
  [EBrand.MANITOU]: {
    name: 'Manitou',
    slogan: 'Handling your world',
    website: 'https://www.manitou.com/',
    color: '#F70000',
    icons: {
      mono: 'MANITOU/mono.svg',
      color: 'MANITOU/color.svg',
      symbol: 'MANITOU/symbol.svg'
    }
  },
  [EBrand.MAX_TRAILER]: {
    name: 'MAX Trailer',
    website: 'https://www.maxtrailer.eu/',
    color: '#E30613',
    icons: {
      mono: 'MAX_TRAILER/mono.svg',
      color: 'MAX_TRAILER/color.svg',
      symbol: 'MAX_TRAILER/symbol.svg'
    }
  },
  [EBrand.MAXITRANS]: {
    name: 'MaxiTRANS',
    website: 'https://www.maxitrans.com/',
    color: '#042242',
    icons: {
      mono: 'MAXITRANS/mono.svg',
      color: 'MAXITRANS/color.svg',
      symbol: 'MAXITRANS/symbol.svg'
    }
  },
  [EBrand.MAZ]: {
    name: 'MAZ',
    website: 'http://maz.by/',
    color: '#E81C2C',
    icons: {
      mono: 'MAZ/mono.svg',
      color: 'MAZ/color.svg'
    }
  },
  [EBrand.MAZ_MAN]: {
    name: 'MAZ MAN',
    website: 'http://en.maz-man.by/',
    color: '#2D2B2B',
    icons: {
      mono: 'MAZ_MAN/mono.svg',
      color: 'MAZ_MAN/color.svg',
      symbol: 'MAZ_MAN/symbol.svg'
    }
  },
  [EBrand.MC_CAULEY_TRAILERS]: {
    name: 'McCAULEY Trailers',
    website: 'https://www.mccauleys.co.uk/',
    color: '#AE2726',
    icons: {
      mono: 'MC_CAULEY_TRAILERS/mono.svg',
      color: 'MC_CAULEY_TRAILERS/color.svg'
    }
  },
  [EBrand.MERCEDES]: {
    name: 'Mercedes Benz',
    website: 'https://www.mercedes-benz.com/',
    color: '#74777C',
    icons: {
      mono: 'MERCEDES/mono.svg',
      color: 'MERCEDES/color.svg',
      symbol: 'MERCEDES/symbol.svg'
    }
  },
  [EBrand.MONTRACON]: {
    name: 'Montracon',
    slogan: 'The trailer for road transport',
    website: 'https://www.montracon.com/',
    color: '#EE3B38',
    icons: {
      mono: 'MONTRACON/mono.svg',
      color: 'MONTRACON/color.svg',
      symbol: 'MONTRACON/symbol.svg'
    }
  },
  [EBrand.NAVISTAR]: {
    name: 'Navistar',
    slogan: 'Driven by uptime',
    website: 'https://www.navistar.com/',
    color: '#3377AB',
    icons: {
      mono: 'NAVISTAR/mono.svg',
      color: 'NAVISTAR/color.svg'
    }
  },
  [EBrand.NIKOLA]: {
    name: 'Nikola',
    website: 'https://nikolamotor.com/',
    color: '#00AEEF',
    icons: {
      mono: 'NIKOLA/mono.svg',
      color: 'NIKOLA/color.svg',
      symbol: 'NIKOLA/symbol.svg'
    }
  },
  [EBrand.NISSAN]: {
    name: 'Nissan',
    website: 'https://www.nissan-global.com/',
    color: '#231F20',
    icons: {
      mono: 'NISSAN/mono.svg',
      color: 'NISSAN/color.svg',
      symbol: 'NISSAN/symbol.svg'
    }
  },
  [EBrand.OPEL]: {
    name: 'Opel',
    website: 'https://www.opel.com/',
    color: '#F7DA0D',
    icons: {
      mono: 'OPEL/mono.svg',
      color: 'OPEL/color.svg',
      symbol: 'OPEL/symbol.svg'
    }
  },
  [EBrand.PACCAR]: {
    name: 'PACCAR',
    website: 'https://www.paccar.com/',
    color: '#005098',
    icons: {
      mono: 'PACCAR/mono.svg',
      color: 'PACCAR/color.svg'
    }
  },
  [EBrand.PETERBILT]: {
    name: 'Peterbilt',
    slogan: 'Customization. Craftmanship. Class.',
    website: 'https://www.peterbilt.com/',
    color: '#C00102',
    icons: {
      mono: 'PETERBILT/mono.svg',
      color: 'PETERBILT/color.svg'
    }
  },
  [EBrand.PEUGEOT]: {
    name: 'Peugeot',
    slogan: 'Motion & Emotion',
    website: 'http://www.peugeot.com/',
    color: '#231F20',
    icons: {
      mono: 'PEUGEOT/mono.svg',
      color: 'PEUGEOT/color.svg',
      symbol: 'PEUGEOT/symbol.svg'
    }
  },
  [EBrand.PITTS]: {
    name: 'Pitts Trailers',
    slogan: 'You\'re ahead with a pitts behind',
    website: 'https://pittstrailers.com/',
    color: '#EA1D2D',
    icons: {
      mono: 'PITTS/mono.svg',
      color: 'PITTS/color.svg',
      symbol: 'PITTS/symbol.svg'
    }
  },
  [EBrand.POLAR_TANK]: {
    name: 'Polar Tank',
    slogan: 'Stake your calm',
    website: 'https://polartank.com/',
    color: '#004B85',
    icons: {
      mono: 'POLAR_TANK/mono.svg',
      color: 'POLAR_TANK/color.svg'
    }
  },
  [EBrand.PRATT]: {
    name: 'Pratt Industries Inc',
    slogan: 'Advanced designs. Lasting quality... Every time',
    website: 'https://prattinc.com/',
    color: '#0C428A',
    icons: {
      mono: 'PRATT/mono.svg',
      color: 'PRATT/color.svg',
      symbol: 'PRATT/symbol.svg'
    }
  },
  [EBrand.PREMIER_TRAILER]: {
    name: 'Premier Trailers',
    website: 'http://www.premiertrailers.net/',
    color: '#000000',
    icons: {
      mono: 'PREMIER_TRAILER/mono.svg',
      color: 'PREMIER_TRAILER/color.svg'
    }
  },
  [EBrand.REINKE]: {
    name: 'Reinke',
    slogan: 'Quality service & innovation',
    website: 'https://rdss.reinke.com/',
    color: '#222222',
    icons: {
      mono: 'REINKE/mono.svg',
      color: 'REINKE/color.svg',
      symbol: 'REINKE/symbol.svg'
    }
  },
  [EBrand.REITNOUER]: {
    name: 'Reitnouer',
    slogan: 'Nothing works as hard as a reitnouer',
    website: 'https://reitnouer-trailers.com/',
    color: '#DB271F',
    icons: {
      mono: 'REITNOUER/mono.svg',
      color: 'REITNOUER/color.svg'
    }
  },
  [EBrand.RENAULT]: {
    name: 'Renault',
    website: 'https://group.renault.com/',
    color: '#FFCC33',
    icons: {
      mono: 'RENAULT/mono.svg',
      color: 'RENAULT/color.svg',
      symbol: 'RENAULT/symbol.svg'
    }
  },
  [EBrand.SCANIA]: {
    name: 'Scania',
    website: 'https://www.scania.com/',
    color: '#09285B',
    icons: {
      mono: 'SCANIA/mono.svg',
      color: 'SCANIA/color.svg',
      symbol: 'SCANIA/symbol.svg'
    }
  },
  [EBrand.SCHMITZ_CARGOBULL]: {
    name: 'Schmitz Cargobull',
    slogan: 'Strong. Safe. Fast.',
    website: 'https://www.cargobull.com/',
    color: '#164194',
    icons: {
      mono: 'SCHMITZ_CARGOBULL/mono.svg',
      color: 'SCHMITZ_CARGOBULL/color.svg',
      symbol: 'SCHMITZ_CARGOBULL/symbol.svg'
    }
  },
  [EBrand.SCHWARZMUELLER]: {
    name: 'Schwarzmueller',
    slogan: 'Intelligente fahrzeuge',
    website: 'https://www.schwarzmueller.com/',
    color: '#E31B2E',
    icons: {
      mono: 'SCHWARZMUELLER/mono.svg',
      color: 'SCHWARZMUELLER/color.svg',
      symbol: 'SCHWARZMUELLER/symbol.svg'
    }
  },
  [EBrand.SDC_TRAILERS]: {
    name: 'SDC Trailers',
    slogan: 'Cutting edge trailer technology',
    website: 'https://www.sdctrailers.com/',
    color: '#D70812',
    icons: {
      mono: 'SDC_TRAILERS/mono.svg',
      color: 'SDC_TRAILERS/color.svg'
    }
  },
  [EBrand.STAS]: {
    name: 'Stas',
    slogan: 'Trailer Excellence',
    website: 'https://www.stas.be/',
    color: '#1C2F55',
    icons: {
      mono: 'STAS/mono.svg',
      color: 'STAS/color.svg',
      symbol: 'STAS/symbol.svg'
    }
  },
  [EBrand.STERLING_TRUCKS]: {
    name: 'Sterling Trucks',
    color: '#89C1E3',
    icons: {
      mono: 'STERLING_TRUCKS/mono.svg',
      color: 'STERLING_TRUCKS/color.svg',
      symbol: 'STERLING_TRUCKS/symbol.svg'
    }
  },
  [EBrand.STOUGHTON]: {
    name: 'Stoughton',
    slogan: 'It\'s in the details',
    website: 'https://www.stoughtontrailers.com/',
    color: '#0079C2',
    icons: {
      mono: 'STOUGHTON/mono.svg',
      color: 'STOUGHTON/color.svg',
      symbol: 'STOUGHTON/symbol.svg'
    }
  },
  [EBrand.STRICK]: {
    name: 'Strick Trailers',
    slogan: 'Customerization and beyond',
    website: 'https://www.stricktrailers.com/',
    color: '#174E7E',
    icons: {
      mono: 'STRICK/mono.svg',
      color: 'STRICK/color.svg'
    }
  },
  [EBrand.SUZUKI]: {
    name: 'Suzuki',
    website: 'https://www.globalsuzuki.com/',
    color: '#E1261C',
    icons: {
      mono: 'SUZUKI/mono.svg',
      color: 'SUZUKI/color.svg',
      symbol: 'SUZUKI/symbol.svg'
    }
  },
  [EBrand.TARAS_PORT_TRAILERS]: {
    name: 'TarasPort Trailers',
    website: 'http://www.tarasport.com/',
    color: '#0F0D9E',
    icons: {
      mono: 'TARAS_PORT_TRAILERS/mono.svg',
      color: 'TARAS_PORT_TRAILERS/color.svg',
      symbol: 'TARAS_PORT_TRAILERS/symbol.svg'
    }
  },
  [EBrand.TATA]: {
    name: 'Tata',
    website: 'https://www.tata.com/',
    color: '#466AAF',
    icons: {
      mono: 'TATA/mono.svg',
      color: 'TATA/color.svg',
      symbol: 'TATA/symbol.svg'
    }
  },
  [EBrand.TEREX]: {
    name: 'Terex',
    website: 'http://www.terextrucks.com/',
    color: '#D3171F',
    icons: {
      mono: 'TEREX/mono.svg',
      color: 'TEREX/color.svg',
      symbol: 'TEREX/symbol.svg'
    }
  },
  [EBrand.TESLA]: {
    name: 'Tesla',
    website: 'https://www.tesla.com/',
    color: '#E22026',
    icons: {
      mono: 'TESLA/mono.svg',
      color: 'TESLA/color.svg',
      symbol: 'TESLA/symbol.svg'
    }
  },
  [EBrand.THERMO_KING]: {
    name: 'Thermo King',
    website: 'https://www.thermoking.com/',
    color: '#00B3E6',
    icons: {
      mono: 'THERMO_KING/mono.svg',
      color: 'THERMO_KING/color.svg',
      symbol: 'THERMO_KING/symbol.svg'
    }
  },
  [EBrand.TIGER]: {
    name: 'Tiger Trailers',
    website: 'https://www.tigertrailers.co.uk/',
    color: '#F15424',
    icons: {
      mono: 'TIGER/mono.svg',
      color: 'TIGER/color.svg',
      symbol: 'TIGER/symbol.svg'
    }
  },
  [EBrand.TIMPTE]: {
    name: 'Timpte',
    website: 'https://timpte.com/',
    color: '#EA6A2A',
    icons: {
      mono: 'TIMPTE/mono.svg',
      color: 'TIMPTE/color.svg'
    }
  },
  [EBrand.TRAIL_EZE]: {
    name: 'Trail EZE',
    slogan: 'A trailer for any job',
    website: 'http://traileze.com/',
    color: '#002A61',
    icons: {
      mono: 'TRAIL_EZE/mono.svg',
      color: 'TRAIL_EZE/color.svg',
      symbol: 'TRAIL_EZE/symbol.svg'
    }
  },
  [EBrand.TRAIL_KING_IND]: {
    name: 'Trail King',
    slogan: 'We don\'t just build trailers, we design hauling solutions',
    website: 'https://www.trailking.com/',
    color: '#C0C0C0',
    icons: {
      mono: 'TRAIL_KING_IND/mono.svg',
      color: 'TRAIL_KING_IND/color.svg'
    }
  },
  [EBrand.TRANSCRAFT]: {
    name: 'Transcraft',
    website: 'https://www.wabashnational.com/brands/transcraft',
    color: '#B20837',
    icons: {
      mono: 'TRANSCRAFT/mono.svg',
      color: 'TRANSCRAFT/color.svg'
    }
  },
  [EBrand.TRAVIS_BODY_TRAILERS]: {
    name: 'Travis Body & Trailer Inc',
    slogan: 'In a world of trailers, Travis leads',
    website: 'https://travistrailers.com/',
    color: '#D72C27',
    icons: {
      mono: 'TRAVIS_BODY_TRAILERS/mono.svg',
      color: 'TRAVIS_BODY_TRAILERS/color.svg',
      symbol: 'TRAVIS_BODY_TRAILERS/symbol.svg'
    }
  },
  [EBrand.TRI_TANK_CORP]: {
    name: 'Tri Tank Corp',
    slogan: 'Explore the tri tank difference',
    website: 'https://www.tritank.com/',
    color: '#FE0000',
    icons: {
      mono: 'TRI_TANK_CORP/mono.svg',
      color: 'TRI_TANK_CORP/color.svg'
    }
  },
  [EBrand.TRINITY]: {
    name: 'Trinity Trailer',
    slogan: 'Trusted. Proven. Hardworking.',
    website: 'https://trinitytrailer.com/',
    color: '#0D4B81',
    icons: {
      mono: 'TRINITY/mono.svg',
      color: 'TRINITY/color.svg',
      symbol: 'TRINITY/symbol.svg'
    }
  },
  [EBrand.UTM_CORPORATE]: {
    name: 'Utility Trailer',
    website: 'https://www.utilitytrailer.com/',
    color: '#0C5291',
    icons: {
      mono: 'UTM_CORPORATE/mono.svg',
      color: 'UTM_CORPORATE/color.svg',
      symbol: 'UTM_CORPORATE/symbol.svg'
    }
  },
  [EBrand.VANGUARD]: {
    name: 'Vanguard Trailer',
    website: 'http://www.vanguardtrailer.com/',
    color: '#0068B3',
    icons: {
      mono: 'VANGUARD/mono.svg',
      color: 'VANGUARD/color.svg'
    }
  },
  [EBrand.VOLKSWAGEN]: {
    name: 'Volkswagen',
    website: 'https://volkswagen.com/',
    color: '#001E50',
    icons: {
      mono: 'VOLKSWAGEN/mono.svg',
      color: 'VOLKSWAGEN/color.svg',
      symbol: 'VOLKSWAGEN/symbol.svg'
    }
  },
  [EBrand.VOLVO]: {
    name: 'Volvo',
    website: 'https://www.volvo.com/',
    color: '#00105D',
    icons: {
      mono: 'VOLVO/mono.svg',
      color: 'VOLVO/color.svg',
      symbol: 'VOLVO/symbol.svg'
    }
  },
  [EBrand.WABASH]: {
    name: 'Wabash National',
    website: 'https://www.wabashnational.com/',
    color: '#A51E36',
    icons: {
      mono: 'WABASH/mono.svg',
      color: 'WABASH/color.svg',
      symbol: 'WABASH/symbol.svg'
    }
  },
  [EBrand.WARREN]: {
    name: 'Warren Inc',
    website: 'http://www.dumptrucks.com/',
    color: '#0070AC',
    icons: {
      mono: 'WARREN/mono.svg',
      color: 'WARREN/color.svg',
      symbol: 'WARREN/symbol.svg'
    }
  },
  [EBrand.WESTERN_TRAILERS]: {
    name: 'Western Trailers',
    slogan: 'Build the best, then keep making it better',
    website: 'http://www.westerntrailer.com/',
    color: '#D10000',
    icons: {
      mono: 'WESTERN_TRAILERS/mono.svg',
      color: 'WESTERN_TRAILERS/color.svg'
    }
  },
  [EBrand.WESTERN_STAR_TRUCKS]: {
    name: 'Western Star Trucks',
    slogan: 'The world is tough. Be tougher.',
    website: 'https://www.westernstartrucks.com/',
    color: '#EE2027',
    icons: {
      mono: 'WESTERN_STAR_TRUCKS/mono.svg',
      color: 'WESTERN_STAR_TRUCKS/color.svg',
      symbol: 'WESTERN_STAR_TRUCKS/symbol.svg'
    }
  },
  [EBrand.WILSON_TRAILER]: {
    name: 'Wilson Trailer',
    slogan: 'Since 1890... A good name to have behind you',
    website: 'http://www.wilsontrailer.com/',
    color: '#F23F2D',
    icons: {
      mono: 'WILSON_TRAILER/mono.svg',
      color: 'WILSON_TRAILER/color.svg',
      symbol: 'WILSON_TRAILER/symbol.svg'
    }
  },
  [EBrand.XL_SPECIALIZED_TRAILERS]: {
    name: 'XL Specialized Trailers',
    slogan: 'Heavy Haul & Specialized Trailers',
    website: 'https://www.xlspecializedtrailer.com/',
    color: '#E21E3C',
    icons: {
      mono: 'XL_SPECIALIZED_TRAILERS/mono.svg',
      color: 'XL_SPECIALIZED_TRAILERS/color.svg',
      symbol: 'XL_SPECIALIZED_TRAILERS/symbol.svg'
    }
  },
  [EBrand.XPO_TRAILERS]: {
    name: 'XPO Trailers',
    website: 'https://full-truckload.xpo.com/',
    color: '#CC0000',
    icons: {
      mono: 'XPO_TRAILERS/mono.svg',
      color: 'XPO_TRAILERS/color.svg'
    }
  }
};

export default EBrand;
