// QUESTO FILE CONTIENE SOLO I DATI DEGLI EVENTI.
// Per aggiungere un evento: copia un blocco { ... }, incollalo prima della riga ];
// e cambia i valori. Ricordati la virgola dopo la parentesi graffa } di chiusura.

const eventi = [
  {
    id: 1,
    titolo: 'Inaugurazione del Colosseo',
    data: '25 maggio 80 d.C.',
    luogo: 'Colosseo, Roma',
    lat: 41.8902,
    lon: 12.4922,
    descrizione: "L'imperatore Tito inaugura solennemente l'Anfiteatro Flavio dopo 8 anni di costruzione."
  },
  {
    id: 2,
    titolo: 'Assassinio di Giulio Cesare',
    data: '15 marzo 44 a.C.',
    luogo: 'Curia di Pompeo, Roma',
    lat: 41.8956,
    lon: 12.4769,
    descrizione: 'Giulio Cesare viene assassinato da un gruppo di senatori durante la seduta del Senato.'
  },
  {
    id: 3,
    titolo: 'Ultima Cena di Leonardo',
    data: '1495-1498',
    luogo: 'Santa Maria delle Grazie, Milano',
    lat: 45.4659,
    lon: 9.1706,
    descrizione: 'Leonardo da Vinci dipinge il Cenacolo nel refettorio del convento domenicano.'
  },
  {
    id: 4,
    titolo: 'Le Cinque Giornate di Milano',
    data: '18-22 marzo 1848',
    luogo: 'Centro storico, Milano',
    lat: 45.4642,
    lon: 9.1900,
    descrizione: 'I milanesi insorgono contro il dominio austriaco e cacciano le truppe di Radetzky dalla città.'
  },
  {
    id: 5,
    titolo: 'Editto di Milano',
    data: '313 d.C.',
    luogo: 'Palazzo Imperiale, Milano (Mediolanum)',
    lat: 45.4638,
    lon: 9.1781,
    descrizione: "Gli imperatori Costantino e Licinio concedono libertà di culto ai cristiani in tutto l'Impero romano."
  },
  {
    id: 6,
    titolo: 'Congiura dei Pazzi',
    data: '26 aprile 1478',
    luogo: 'Cattedrale di Santa Maria del Fiore, Firenze',
    lat: 43.7731,
    lon: 11.2560,
    descrizione: "Durante la messa nel Duomo, Giuliano de' Medici viene assassinato; il fratello Lorenzo il Magnifico resta ferito ma si salva."
  },
  {
    id: 7,
    titolo: 'Rogo di Girolamo Savonarola',
    data: '23 maggio 1498',
    luogo: 'Piazza della Signoria, Firenze',
    lat: 43.7696,
    lon: 11.2558,
    descrizione: 'Il frate domenicano Savonarola viene impiccato e bruciato in piazza insieme a due confratelli, dopo la condanna per eresia.'
  },
  {
    id: 8,
    titolo: 'Rivolta di Masaniello',
    data: '7 luglio 1647',
    luogo: 'Piazza Mercato, Napoli',
    lat: 40.8478,
    lon: 14.2665,
    descrizione: "Il pescatore Masaniello guida la rivolta popolare napoletana contro le tasse imposte dal governo spagnolo."
  },
  {
    id: 9,
    titolo: 'Eruzione del Vesuvio',
    data: '79 d.C.',
    luogo: 'Pompei',
    lat: 40.7491,
    lon: 14.4869,
    descrizione: "L'eruzione del Vesuvio seppellisce sotto cenere e lapilli le città di Pompei, Ercolano e Stabia."
  },
  {
    id: 10,
    titolo: 'Inizio della costruzione della Torre di Pisa',
    data: '1173',
    luogo: 'Piazza dei Miracoli, Pisa',
    lat: 43.7230,
    lon: 10.3966,
    descrizione: 'Iniziano i lavori del campanile del Duomo; la torre comincia a pendere già durante la costruzione per il cedimento del terreno.'
  },
  {
    id: 11,
    titolo: "Fondazione dell'Università di Bologna",
    data: '1088',
    luogo: 'Bologna',
    lat: 44.4949,
    lon: 11.3426,
    descrizione: "Nasce lo Studium di Bologna, considerato la più antica università del mondo occidentale ancora in attività."
  },
  {
    id: 12,
    titolo: 'Vespri siciliani',
    data: '31 marzo 1282',
    luogo: 'Chiesa di Santo Spirito, Palermo',
    lat: 38.0940,
    lon: 13.3772,
    descrizione: "All'ora dei vespri scoppia a Palermo la rivolta contro il dominio angioino francese, che si estende a tutta la Sicilia."
  },
  {
    id: 13,
    titolo: "Proclamazione del Regno d'Italia",
    data: '17 marzo 1861',
    luogo: 'Palazzo Carignano, Torino',
    lat: 45.0672,
    lon: 7.6858,
    descrizione: "Il primo Parlamento italiano, riunito a Torino, proclama Vittorio Emanuele II re d'Italia."
  },
  {
    id: 14,
    titolo: 'Breccia di Porta Pia',
    data: '20 settembre 1870',
    luogo: 'Porta Pia, Roma',
    lat: 41.9110,
    lon: 12.5040,
    descrizione: "I bersaglieri entrano a Roma attraverso una breccia presso Porta Pia: finisce lo Stato Pontificio e Roma diventa capitale d'Italia."
  },
  {
    id: 15,
    titolo: 'Battaglia di Magenta',
    data: '4 giugno 1859',
    luogo: 'Magenta, Milano',
    lat: 45.46282,
    lon: 8.87702,
    descrizione: "L'esercito franco-piemontese, guidato da Napoleone III, sconfigge l'esercito imperiale austriaco, aprendo la strada verso Milano."
  },
  {
    id: 16,
    titolo: 'Battaglia di Legnano',
    data: '29 maggio 1176',
    luogo: 'Legnano, Milano',
    lat: 45.5931,
    lon: 8.9186,
    descrizione: "I Comuni della Lega Lombarda sconfiggono l'esercito dell'imperatore Federico Barbarossa, difendendo la loro autonomia."
  },
  {
    id: 17,
    titolo: 'Editto di Rotari',
    data: '22 novembre 643',
    luogo: 'Pavia',
    lat: 45.1847,
    lon: 9.1582,
    descrizione: "Il re longobardo Rotari promulga a Pavia la prima raccolta scritta delle leggi del suo popolo, in lingua latina."
  },
  {
    id: 18,
    titolo: 'Incoronazione di Carlo Magno',
    data: '25 dicembre 800',
    luogo: 'Basilica di San Pietro, Roma',
    lat: 41.9022,
    lon: 12.4539,
    descrizione: "Papa Leone III incorona Carlo Magno imperatore dei Romani durante la messa di Natale, dando vita al Sacro Romano Impero."
  },
  {
    id: 19,
    titolo: 'Fondazione leggendaria di Venezia',
    data: '25 marzo 421',
    luogo: 'Rialto, Venezia',
    lat: 45.4380,
    lon: 12.3358,
    descrizione: "La tradizione fissa in questa data la nascita di Venezia, con la dedicazione della chiesa di San Giacomo di Rialto."
  },
  {
    id: 20,
    titolo: 'Rogo di Giordano Bruno',
    data: '17 febbraio 1600',
    luogo: "Campo de' Fiori, Roma",
    lat: 41.8955,
    lon: 12.4722,
    descrizione: "Il filosofo Giordano Bruno viene arso vivo per eresia; nel 1889 gli viene dedicata la statua che ancora domina la piazza."
  },
  {
    id: 21,
    titolo: 'Disfida di Barletta',
    data: '13 febbraio 1503',
    luogo: 'Barletta',
    lat: 41.3193,
    lon: 16.2820,
    descrizione: "Tredici cavalieri italiani guidati da Ettore Fieramosca sconfiggono in duello altrettanti cavalieri francesi."
  },
  {
    id: 22,
    titolo: 'Sacco di Roma',
    data: '6 maggio 1527',
    luogo: "Castel Sant'Angelo, Roma",
    lat: 41.9031,
    lon: 12.4663,
    descrizione: "Le truppe imperiali di Carlo V, in gran parte lanzichenecchi, saccheggiano Roma per mesi; papa Clemente VII si rifugia in Castel Sant'Angelo."
  },
  {
    id: 23,
    titolo: 'Battaglia di Pavia',
    data: '24 febbraio 1525',
    luogo: 'Parco Visconteo, Pavia',
    lat: 45.2028,
    lon: 9.1503,
    descrizione: "L'esercito di Carlo V sconfigge i francesi e cattura il re Francesco I, che scrive: \"Tutto è perduto fuorché l'onore\"."
  },
  {
    id: 24,
    titolo: 'Concilio di Trento',
    data: '1545-1563',
    luogo: 'Cattedrale di San Vigilio, Trento',
    lat: 46.0679,
    lon: 11.1211,
    descrizione: "Il concilio che avvia la Controriforma cattolica si riunisce a più riprese a Trento per quasi vent'anni."
  },
  {
    id: 25,
    titolo: 'Abiura di Galileo Galilei',
    data: '22 giugno 1633',
    luogo: 'Convento di Santa Maria sopra Minerva, Roma',
    lat: 41.8983,
    lon: 12.4779,
    descrizione: "Processato dall'Inquisizione per aver sostenuto che la Terra gira intorno al Sole, Galileo è costretto ad abiurare le sue idee."
  },
  {
    id: 26,
    titolo: "Incoronazione di Napoleone a re d'Italia",
    data: '26 maggio 1805',
    luogo: 'Duomo di Milano',
    lat: 45.4641,
    lon: 9.1919,
    descrizione: "Napoleone Bonaparte si cinge il capo con la Corona Ferrea dicendo: \"Dio me l'ha data, guai a chi la tocca\"."
  },
  {
    id: 27,
    titolo: 'Partenza dei Mille da Quarto',
    data: '5 maggio 1860',
    luogo: 'Quarto, Genova',
    lat: 44.3866,
    lon: 9.0353,
    descrizione: "Giuseppe Garibaldi salpa con circa mille volontari su due piroscafi per liberare il Regno delle Due Sicilie."
  },
  {
    id: 28,
    titolo: 'Sbarco dei Mille a Marsala',
    data: '11 maggio 1860',
    luogo: 'Marsala',
    lat: 37.7986,
    lon: 12.4360,
    descrizione: "I Mille di Garibaldi sbarcano in Sicilia dando inizio alla spedizione che porterà alla caduta dei Borbone."
  },
  {
    id: 29,
    titolo: 'Battaglia di Solferino e San Martino',
    data: '24 giugno 1859',
    luogo: 'Solferino, Mantova',
    lat: 45.3719,
    lon: 10.5686,
    descrizione: "Franco-piemontesi e austriaci si scontrano in una battaglia sanguinosissima; il ricordo dei feriti abbandonati ispira a Henry Dunant la Croce Rossa."
  },
  {
    id: 30,
    titolo: 'Incontro di Teano',
    data: '26 ottobre 1860',
    luogo: 'Teano, Caserta',
    lat: 41.2497,
    lon: 14.0653,
    descrizione: "Garibaldi consegna a Vittorio Emanuele II le terre conquistate nel Sud, salutandolo come re d'Italia."
  },
  {
    id: 31,
    titolo: 'Terremoto di Messina',
    data: '28 dicembre 1908',
    luogo: 'Messina',
    lat: 38.1938,
    lon: 15.5540,
    descrizione: "Un terremoto seguito da un maremoto distrugge Messina e Reggio Calabria, causando decine di migliaia di vittime."
  },
  {
    id: 32,
    titolo: 'Battaglia di Vittorio Veneto',
    data: '24 ottobre - 3 novembre 1918',
    luogo: 'Vittorio Veneto, Treviso',
    lat: 45.9950,
    lon: 12.3000,
    descrizione: "L'offensiva finale dell'esercito italiano sfonda il fronte austro-ungarico e porta all'armistizio del 4 novembre 1918."
  },
  {
    id: 33,
    titolo: 'Nascita della Repubblica Italiana',
    data: '2 giugno 1946',
    luogo: 'Roma',
    lat: 41.9000,
    lon: 12.4790,
    descrizione: "Con un referendum gli italiani, per la prima volta anche le donne, scelgono la repubblica al posto della monarchia."
  },
  {
    id: 34,
    titolo: 'Alluvione di Firenze',
    data: '4 novembre 1966',
    luogo: 'Firenze',
    lat: 43.7700,
    lon: 11.2560,
    descrizione: "L'Arno straripa e sommerge la città; da tutto il mondo arrivano volontari, gli \"angeli del fango\", per salvare libri e opere d'arte."
  },
  {
    id: 35,
    titolo: 'Disastro del Vajont',
    data: '9 ottobre 1963',
    luogo: 'Diga del Vajont, Longarone',
    lat: 46.2673,
    lon: 12.3289,
    descrizione: "Una frana dal monte Toc precipita nel bacino artificiale: l'ondata scavalca la diga e distrugge Longarone e i paesi vicini."
  }
];

export default eventi;


