// QUESTO FILE CONTIENE SOLO I DATI DEGLI EVENTI.
// Per aggiungere un evento: copia un blocco { ... }, incollalo prima della riga ];
// e cambia i valori. Ricordati la virgola dopo la parentesi graffa } di chiusura.
//
// Campi di ogni evento:
//   id          -> numero unico, mai usato prima
//   titolo      -> nome dell'evento
//   data        -> quando è successo
//   luogo       -> dove è successo
//   lat, lon    -> coordinate GPS (numeri col punto, es. 41.8902)
//   descrizione -> una o due frasi; se c'è un apostrofo usa le virgolette doppie "..."
//   fonte       -> link a una pagina di Wikipedia (per il "Fonte" nel dettaglio)
//   curiosita   -> (facoltativo) un "Lo sapevi che...?" legato all'evento; se manca, non appare

const eventi = [
  {
    id: 1,
    titolo: 'Inaugurazione del Colosseo',
    data: '25 maggio 80 d.C.',
    luogo: 'Colosseo, Roma',
    lat: 41.8902,
    lon: 12.4922,
    descrizione: "L'imperatore Tito inaugura solennemente l'Anfiteatro Flavio dopo 8 anni di costruzione.",
    fonte: 'https://it.wikipedia.org/wiki/Colosseo',
    curiosita: "Il Colosseo aveva 80 ingressi numerati che permettevano di svuotarlo in pochi minuti: gli stessi 'vomitoria' che ancora oggi ispirano gli stadi moderni."
  },
  {
    id: 2,
    titolo: 'Assassinio di Giulio Cesare',
    data: '15 marzo 44 a.C.',
    luogo: 'Curia di Pompeo, Roma',
    lat: 41.8956,
    lon: 12.4769,
    descrizione: 'Giulio Cesare viene assassinato da un gruppo di senatori durante la seduta del Senato.',
    fonte: 'https://it.wikipedia.org/wiki/Cesaricidio',
    curiosita: "Gli storici antichi non concordano sulle ultime parole di Cesare: la celebre 'Tu quoque, Brute?' deve la sua fama soprattutto a Shakespeare."
  },
  {
    id: 3,
    titolo: 'Ultima Cena di Leonardo',
    data: '1495-1498',
    luogo: 'Santa Maria delle Grazie, Milano',
    lat: 45.4659,
    lon: 9.1706,
    descrizione: 'Leonardo da Vinci dipinge il Cenacolo nel refettorio del convento domenicano.',
    fonte: 'https://it.wikipedia.org/wiki/Ultima_Cena_(Leonardo)',
    curiosita: "Leonardo dipinse a secco invece che ad affresco: per questo l'opera iniziò a rovinarsi già mentre lui era ancora in vita."
  },
  {
    id: 4,
    titolo: 'Le Cinque Giornate di Milano',
    data: '18-22 marzo 1848',
    luogo: 'Centro storico, Milano',
    lat: 45.4642,
    lon: 9.1900,
    descrizione: 'I milanesi insorgono contro il dominio austriaco e cacciano le truppe di Radetzky dalla città.',
    fonte: 'https://it.wikipedia.org/wiki/Cinque_giornate_di_Milano',
    curiosita: "In pochi giorni i milanesi eressero oltre 1600 barricate, usando mobili, carrozze rovesciate e persino i banchi delle chiese."
  },
  {
    id: 5,
    titolo: 'Editto di Milano',
    data: '313 d.C.',
    luogo: 'Palazzo Imperiale, Milano (Mediolanum)',
    lat: 45.4638,
    lon: 9.1781,
    descrizione: "Gli imperatori Costantino e Licinio concedono libertà di culto ai cristiani in tutto l'Impero romano.",
    fonte: 'https://it.wikipedia.org/wiki/Editto_di_Milano',
    curiosita: "Non fu un vero editto scritto a Milano: fu un accordo tra Costantino e Licinio, poi diffuso con lettere ai governatori delle province."
  },
  {
    id: 6,
    titolo: 'Congiura dei Pazzi',
    data: '26 aprile 1478',
    luogo: 'Cattedrale di Santa Maria del Fiore, Firenze',
    lat: 43.7731,
    lon: 11.2560,
    descrizione: "Durante la messa nel Duomo, Giuliano de' Medici viene assassinato; il fratello Lorenzo il Magnifico resta ferito ma si salva.",
    fonte: 'https://it.wikipedia.org/wiki/Congiura_dei_Pazzi',
    curiosita: "Botticelli fu incaricato di dipingere i congiurati impiccati sulla facciata del palazzo del Bargello, come monito pubblico."
  },
  {
    id: 7,
    titolo: 'Rogo di Girolamo Savonarola',
    data: '23 maggio 1498',
    luogo: 'Piazza della Signoria, Firenze',
    lat: 43.7696,
    lon: 11.2558,
    descrizione: 'Il frate domenicano Savonarola viene impiccato e bruciato in piazza insieme a due confratelli, dopo la condanna per eresia.',
    fonte: 'https://it.wikipedia.org/wiki/Girolamo_Savonarola',
    curiosita: "Nel punto esatto del rogo una lapide rotonda, incassata nel selciato di Piazza della Signoria, lo ricorda ancora oggi."
  },
  {
    id: 8,
    titolo: 'Rivolta di Masaniello',
    data: '7 luglio 1647',
    luogo: 'Piazza Mercato, Napoli',
    lat: 40.8478,
    lon: 14.2665,
    descrizione: "Il pescatore Masaniello guida la rivolta popolare napoletana contro le tasse imposte dal governo spagnolo.",
    fonte: 'https://it.wikipedia.org/wiki/Masaniello',
    curiosita: "Masaniello guidò Napoli per appena dieci giorni: fu ucciso da alcuni suoi ex sostenitori, ma il giorno dopo la folla lo pianse come un eroe."
  },
  {
    id: 9,
    titolo: 'Eruzione del Vesuvio',
    data: '79 d.C.',
    luogo: 'Pompei',
    lat: 40.7491,
    lon: 14.4869,
    descrizione: "L'eruzione del Vesuvio seppellisce sotto cenere e lapilli le città di Pompei, Ercolano e Stabia.",
    fonte: 'https://it.wikipedia.org/wiki/Eruzione_del_Vesuvio_del_79',
    curiosita: "I celebri calchi delle vittime sono cavità lasciate dai corpi nella cenere indurita: gli archeologi dell'Ottocento le riempirono di gesso."
  },
  {
    id: 10,
    titolo: 'Inizio della costruzione della Torre di Pisa',
    data: '1173',
    luogo: 'Piazza dei Miracoli, Pisa',
    lat: 43.7230,
    lon: 10.3966,
    descrizione: 'Iniziano i lavori del campanile del Duomo; la torre comincia a pendere già durante la costruzione per il cedimento del terreno.',
    fonte: 'https://it.wikipedia.org/wiki/Torre_di_Pisa',
    curiosita: "I lavori furono interrotti per quasi un secolo a causa delle guerre: quella lunga pausa fece assestare il terreno e probabilmente salvò la torre dal crollo."
  },
  {
    id: 11,
    titolo: "Fondazione dell'Università di Bologna",
    data: '1088',
    luogo: 'Bologna',
    lat: 44.4949,
    lon: 11.3426,
    descrizione: "Nasce lo Studium di Bologna, considerato la più antica università del mondo occidentale ancora in attività.",
    fonte: "https://it.wikipedia.org/wiki/Università_di_Bologna",
    curiosita: "Il suo motto è 'Alma Mater Studiorum': da qui viene l'espressione 'alma mater' usata in tutto il mondo per indicare la propria università."
  },
  {
    id: 12,
    titolo: 'Vespri siciliani',
    data: '31 marzo 1282',
    luogo: 'Chiesa di Santo Spirito, Palermo',
    lat: 38.0940,
    lon: 13.3772,
    descrizione: "All'ora dei vespri scoppia a Palermo la rivolta contro il dominio angioino francese, che si estende a tutta la Sicilia.",
    fonte: 'https://it.wikipedia.org/wiki/Vespri_siciliani',
    curiosita: "Secondo la tradizione la scintilla fu un soldato francese che importunò una giovane sposa davanti alla chiesa, proprio all'ora dei vespri."
  },
  {
    id: 13,
    titolo: "Proclamazione del Regno d'Italia",
    data: '17 marzo 1861',
    luogo: 'Palazzo Carignano, Torino',
    lat: 45.0672,
    lon: 7.6858,
    descrizione: "Il primo Parlamento italiano, riunito a Torino, proclama Vittorio Emanuele II re d'Italia.",
    fonte: "https://it.wikipedia.org/wiki/Proclamazione_del_Regno_d'Italia",
    curiosita: "Vittorio Emanuele II mantenne il numero 'II' invece di diventare 'I d'Italia': una scelta che molti patrioti criticarono come un'occasione persa."
  },
  {
    id: 14,
    titolo: 'Breccia di Porta Pia',
    data: '20 settembre 1870',
    luogo: 'Porta Pia, Roma',
    lat: 41.9110,
    lon: 12.5040,
    descrizione: "I bersaglieri entrano a Roma attraverso una breccia presso Porta Pia: finisce lo Stato Pontificio e Roma diventa capitale d'Italia.",
    fonte: 'https://it.wikipedia.org/wiki/Presa_di_Roma',
    curiosita: "Roma divenne davvero capitale solo nel 1871: prima lo erano state Torino e poi Firenze, che dovette 'restituire' il ruolo dopo pochi anni."
  },
  {
    id: 15,
    titolo: 'Battaglia di Magenta',
    data: '4 giugno 1859',
    luogo: 'Magenta, Milano',
    lat: 45.46282,
    lon: 8.87702,
    descrizione: "L'esercito franco-piemontese, guidato da Napoleone III, sconfigge l'esercito imperiale austriaco, aprendo la strada verso Milano.",
    fonte: 'https://it.wikipedia.org/wiki/Battaglia_di_Magenta',
    curiosita: "Il colore 'magenta', un rosso-violaceo appena inventato in quegli anni, prese il nome proprio da questa battaglia."
  },
  {
    id: 16,
    titolo: 'Battaglia di Legnano',
    data: '29 maggio 1176',
    luogo: 'Legnano, Milano',
    lat: 45.5931,
    lon: 8.9186,
    descrizione: "I Comuni della Lega Lombarda sconfiggono l'esercito dell'imperatore Federico Barbarossa, difendendo la loro autonomia.",
    fonte: 'https://it.wikipedia.org/wiki/Battaglia_di_Legnano',
    curiosita: "'Dovunque è Legnano', recita l'inno di Mameli: è l'unica battaglia citata nell'inno nazionale italiano."
  },
  {
    id: 17,
    titolo: 'Editto di Rotari',
    data: '22 novembre 643',
    luogo: 'Pavia',
    lat: 45.1847,
    lon: 9.1582,
    descrizione: "Il re longobardo Rotari promulga a Pavia la prima raccolta scritta delle leggi del suo popolo, in lingua latina.",
    fonte: 'https://it.wikipedia.org/wiki/Editto_di_Rotari',
    curiosita: "Fu scritto in latino, non in lingua longobarda: i Longobardi non usavano una propria scrittura per le leggi."
  },
  {
    id: 18,
    titolo: 'Incoronazione di Carlo Magno',
    data: '25 dicembre 800',
    luogo: 'Basilica di San Pietro, Roma',
    lat: 41.9022,
    lon: 12.4539,
    descrizione: "Papa Leone III incorona Carlo Magno imperatore dei Romani durante la messa di Natale, dando vita al Sacro Romano Impero.",
    fonte: 'https://it.wikipedia.org/wiki/Carlo_Magno',
    curiosita: "Il suo biografo Eginardo racconta che Carlo Magno disse che non sarebbe entrato in chiesa se avesse saputo delle intenzioni del papa."
  },
  {
    id: 19,
    titolo: 'Fondazione leggendaria di Venezia',
    data: '25 marzo 421',
    luogo: 'Rialto, Venezia',
    lat: 45.4380,
    lon: 12.3358,
    descrizione: "La tradizione fissa in questa data la nascita di Venezia, con la dedicazione della chiesa di San Giacomo di Rialto.",
    fonte: 'https://it.wikipedia.org/wiki/Storia_di_Venezia',
    curiosita: "La data è simbolica: Venezia nacque in realtà nel corso di secoli, mentre gli abitanti della terraferma si rifugiavano in laguna dalle invasioni."
  },
  {
    id: 20,
    titolo: 'Rogo di Giordano Bruno',
    data: '17 febbraio 1600',
    luogo: "Campo de' Fiori, Roma",
    lat: 41.8955,
    lon: 12.4722,
    descrizione: "Il filosofo Giordano Bruno viene arso vivo per eresia; nel 1889 gli viene dedicata la statua che ancora domina la piazza.",
    fonte: 'https://it.wikipedia.org/wiki/Giordano_Bruno',
    curiosita: "La statua in Campo de' Fiori è rivolta di proposito verso il Vaticano; fu inaugurata nel 1889 tra le proteste della Chiesa."
  },
  {
    id: 21,
    titolo: 'Disfida di Barletta',
    data: '13 febbraio 1503',
    luogo: 'Barletta',
    lat: 41.3193,
    lon: 16.2820,
    descrizione: "Tredici cavalieri italiani guidati da Ettore Fieramosca sconfiggono in duello altrettanti cavalieri francesi.",
    fonte: 'https://it.wikipedia.org/wiki/Disfida_di_Barletta',
    curiosita: "L'episodio ispirò a Massimo d'Azeglio il romanzo 'Ettore Fieramosca' (1833), uno dei libri simbolo del Risorgimento."
  },
  {
    id: 22,
    titolo: 'Sacco di Roma',
    data: '6 maggio 1527',
    luogo: "Castel Sant'Angelo, Roma",
    lat: 41.9031,
    lon: 12.4663,
    descrizione: "Le truppe imperiali di Carlo V, in gran parte lanzichenecchi, saccheggiano Roma per mesi; papa Clemente VII si rifugia in Castel Sant'Angelo.",
    fonte: 'https://it.wikipedia.org/wiki/Sacco_di_Roma_(1527)',
    curiosita: "Quel giorno morirono 147 Guardie Svizzere su 189 per proteggere il papa: da allora le nuove reclute giurano proprio il 6 maggio."
  },
  {
    id: 23,
    titolo: 'Battaglia di Pavia',
    data: '24 febbraio 1525',
    luogo: 'Parco Visconteo, Pavia',
    lat: 45.2028,
    lon: 9.1503,
    descrizione: "L'esercito di Carlo V sconfigge i francesi e cattura il re Francesco I, che scrive: \"Tutto è perduto fuorché l'onore\".",
    fonte: 'https://it.wikipedia.org/wiki/Battaglia_di_Pavia_(1525)',
    curiosita: "Per liberare Francesco I, portato prigioniero in Spagna, servì un trattato e la consegna dei suoi due figli come ostaggi."
  },
  {
    id: 24,
    titolo: 'Concilio di Trento',
    data: '1545-1563',
    luogo: 'Cattedrale di San Vigilio, Trento',
    lat: 46.0679,
    lon: 11.1211,
    descrizione: "Il concilio che avvia la Controriforma cattolica si riunisce a più riprese a Trento per quasi vent'anni.",
    fonte: 'https://it.wikipedia.org/wiki/Concilio_di_Trento',
    curiosita: "Durò 18 anni ma si riunì davvero solo per circa quattro: fu più volte sospeso per pesti, guerre e liti tra papa e imperatore."
  },
  {
    id: 25,
    titolo: 'Abiura di Galileo Galilei',
    data: '22 giugno 1633',
    luogo: 'Convento di Santa Maria sopra Minerva, Roma',
    lat: 41.8983,
    lon: 12.4779,
    descrizione: "Processato dall'Inquisizione per aver sostenuto che la Terra gira intorno al Sole, Galileo è costretto ad abiurare le sue idee.",
    fonte: 'https://it.wikipedia.org/wiki/Processo_a_Galileo_Galilei',
    curiosita: "La Chiesa cattolica riconobbe ufficialmente l'errore di quel processo solo nel 1992, con una commissione voluta da Giovanni Paolo II."
  },
  {
    id: 26,
    titolo: "Incoronazione di Napoleone a re d'Italia",
    data: '26 maggio 1805',
    luogo: 'Duomo di Milano',
    lat: 45.4641,
    lon: 9.1919,
    descrizione: "Napoleone Bonaparte si cinge il capo con la Corona Ferrea dicendo: \"Dio me l'ha data, guai a chi la tocca\".",
    fonte: "https://it.wikipedia.org/wiki/Regno_d'Italia_(1805-1814)",
    curiosita: "La Corona Ferrea prende il nome da un sottile cerchio di ferro all'interno, che secondo la tradizione fu ricavato da un chiodo della croce di Cristo."
  },
  {
    id: 27,
    titolo: 'Partenza dei Mille da Quarto',
    data: '5 maggio 1860',
    luogo: 'Quarto, Genova',
    lat: 44.3866,
    lon: 9.0353,
    descrizione: "Giuseppe Garibaldi salpa con circa mille volontari su due piroscafi per liberare il Regno delle Due Sicilie.",
    fonte: 'https://it.wikipedia.org/wiki/Spedizione_dei_Mille',
    curiosita: "I due piroscafi, il Piemonte e il Lombardo, furono presi 'in prestito' alla compagnia Rubattino di Genova con la complicità dei suoi dirigenti."
  },
  {
    id: 28,
    titolo: 'Sbarco dei Mille a Marsala',
    data: '11 maggio 1860',
    luogo: 'Marsala',
    lat: 37.7986,
    lon: 12.4360,
    descrizione: "I Mille di Garibaldi sbarcano in Sicilia dando inizio alla spedizione che porterà alla caduta dei Borbone.",
    fonte: 'https://it.wikipedia.org/wiki/Spedizione_dei_Mille',
    curiosita: "Due navi da guerra britanniche erano ormeggiate nel porto: la marina borbonica esitò a sparare e i Mille sbarcarono quasi indisturbati."
  },
  {
    id: 29,
    titolo: 'Battaglia di Solferino e San Martino',
    data: '24 giugno 1859',
    luogo: 'Solferino, Mantova',
    lat: 45.3719,
    lon: 10.5686,
    descrizione: "Franco-piemontesi e austriaci si scontrano in una battaglia sanguinosissima; il ricordo dei feriti abbandonati ispira a Henry Dunant la Croce Rossa.",
    fonte: 'https://it.wikipedia.org/wiki/Battaglia_di_Solferino_e_San_Martino',
    curiosita: "Lo svizzero Henry Dunant, sconvolto dalle migliaia di feriti lasciati senza cure, scrisse un libro che portò alla nascita della Croce Rossa."
  },
  {
    id: 30,
    titolo: 'Incontro di Teano',
    data: '26 ottobre 1860',
    luogo: 'Teano, Caserta',
    lat: 41.2497,
    lon: 14.0653,
    descrizione: "Garibaldi consegna a Vittorio Emanuele II le terre conquistate nel Sud, salutandolo come re d'Italia.",
    fonte: 'https://it.wikipedia.org/wiki/Incontro_di_Teano',
    curiosita: "Il luogo esatto dell'incontro è ancora discusso: alcuni storici lo collocano non a Teano ma nella vicina Vairano Patenora."
  },
  {
    id: 31,
    titolo: 'Terremoto di Messina',
    data: '28 dicembre 1908',
    luogo: 'Messina',
    lat: 38.1938,
    lon: 15.5540,
    descrizione: "Un terremoto seguito da un maremoto distrugge Messina e Reggio Calabria, causando decine di migliaia di vittime.",
    fonte: 'https://it.wikipedia.org/wiki/Terremoto_di_Messina_del_1908',
    curiosita: "Fu uno dei primi disastri soccorsi via mare da più nazioni: navi russe, britanniche e statunitensi arrivarono già nei giorni successivi."
  },
  {
    id: 32,
    titolo: 'Battaglia di Vittorio Veneto',
    data: '24 ottobre - 3 novembre 1918',
    luogo: 'Vittorio Veneto, Treviso',
    lat: 45.9950,
    lon: 12.3000,
    descrizione: "L'offensiva finale dell'esercito italiano sfonda il fronte austro-ungarico e porta all'armistizio del 4 novembre 1918.",
    fonte: 'https://it.wikipedia.org/wiki/Battaglia_di_Vittorio_Veneto',
    curiosita: "Il 4 novembre, data della vittoria, è ancora oggi festa nazionale: la Giornata dell'Unità Nazionale e delle Forze Armate."
  },
  {
    id: 33,
    titolo: 'Nascita della Repubblica Italiana',
    data: '2 giugno 1946',
    luogo: 'Roma',
    lat: 41.9000,
    lon: 12.4790,
    descrizione: "Con un referendum gli italiani, per la prima volta anche le donne, scelgono la repubblica al posto della monarchia.",
    fonte: 'https://it.wikipedia.org/wiki/Nascita_della_Repubblica_Italiana',
    curiosita: "Fu il primo voto nazionale delle donne italiane: erano state ammesse al voto solo pochi mesi prima, nelle elezioni comunali del marzo 1946."
  },
  {
    id: 34,
    titolo: 'Alluvione di Firenze',
    data: '4 novembre 1966',
    luogo: 'Firenze',
    lat: 43.7700,
    lon: 11.2560,
    descrizione: "L'Arno straripa e sommerge la città; da tutto il mondo arrivano volontari, gli \"angeli del fango\", per salvare libri e opere d'arte.",
    fonte: 'https://it.wikipedia.org/wiki/Alluvione_di_Firenze_del_4_novembre_1966',
    curiosita: "Gli 'angeli del fango' arrivarono da tutta Europa, spesso giovanissimi, e lavorarono per settimane nelle cantine e negli archivi allagati."
  },
  {
    id: 35,
    titolo: 'Disastro del Vajont',
    data: '9 ottobre 1963',
    luogo: 'Diga del Vajont, Longarone',
    lat: 46.2673,
    lon: 12.3289,
    descrizione: "Una frana dal monte Toc precipita nel bacino artificiale: l'ondata scavalca la diga e distrugge Longarone e i paesi vicini.",
    fonte: 'https://it.wikipedia.org/wiki/Disastro_del_Vajont',
    curiosita: "La diga è ancora in piedi e intatta: la tragedia non fu causata da un suo cedimento, ma dall'onda che la scavalcò dopo la frana."
  }
];

export default eventi;
