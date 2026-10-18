'use strict';
// Rysowanie układu okresowego (Mendelejewa) wspólne dla atoms.html i mendelejew.html.
const ROWS = [
 ['H',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'He'],
 ['Li','Be',null,null,null,null,null,null,null,null,null,null,'B','C','N','O','F','Ne'],
 ['Na','Mg',null,null,null,null,null,null,null,null,null,null,'Al','Si','P','S','Cl','Ar'],
 ['K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr'],
 ['Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe'],
 ['Cs','Ba','57–71','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At','Rn'],
 ['Fr','Ra','89–103','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og']
];
const SYMBOLS='H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const NAMES='wodór hel lit beryl bor węgiel azot tlen fluor neon sód magnez glin krzem fosfor siarka chlor argon potas wapń skand tytan wanad chrom mangan żelazo kobalt nikiel miedź cynk gal german arsen selen brom krypton rubid stront itr cyrkon niob molibden technet ruten rod pallad srebro kadm ind cyna antymon tellur jod ksenon cez bar lantan cer prazeodym neodym promet samar europ gadolin terb dysproz holm erb tul iterb lutet hafn tantal wolfram ren osm iryd platyna złoto rtęć tal ołów bizmut polon astat radon frans rad aktyn tor protaktyn uran neptun pluton ameryk kiur berkel kaliforn einstein ferm mendelew nobel lorens rutherford dubn seaborg bohr has meitner darmsztadt rentgen kopernik nihon flerow moskow liwermor tenes oganeson'.split(' ');
// Single-bond covalent reference radii in pm, atomic numbers 1-118.
// Pyykko/Atsumi; r1 column in the public-domain periodictable dataset:
// https://raw.githubusercontent.com/pkienzle/periodictable/master/periodictable/covalent_radius.py
// These atomic references also guide ion drawings; they are not ionic radii.
const ATOM_REFERENCE_RADII_PM=Object.freeze(Object.fromEntries(SYMBOLS.map((symbol,i)=>[symbol,[
 32,46,133,102,85,75,71,63,64,67,
 155,139,126,116,111,103,99,96,196,171,
 148,136,134,122,119,116,111,110,112,118,
 124,121,121,116,114,117,210,185,163,154,
 147,138,128,125,125,120,128,136,142,140,
 140,136,133,131,232,196,180,163,176,174,
 173,172,168,169,168,167,166,165,164,170,
 162,152,146,137,131,129,122,123,124,133,
 144,144,151,145,147,142,223,201,186,175,
 169,170,171,172,166,166,166,168,165,167,
 173,176,161,157,149,143,141,134,129,128,
 121,122,136,143,162,175,165,157
][i]])));
const COLORS={nonmetal:'#dbeafe',s:'#f4e5b9',transition:'#e2eaf5',metal:'#e9e3f4',metalloid:'#f5ddd3',noble:'#dceff2',f:'#f0e4df'};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plainFormula=s=>s.replace(/\d/g,n=>'₀₁₂₃₄₅₆₇₈₉'[n]);
const nameOf=s=>NAMES[SYMBOLS.indexOf(s)];
// PubChem periodic table snapshot, 2026-10-18. Temperatures in kelvin; null means unavailable.
// https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON
// He/C/As transitions are qualified in elementTemperature using RSC data.
const ELEMENT_PROPERTIES=Object.freeze({
 "H":{"en":2.2,"melt":13.81,"boil":20.28,"metal":"nonmetal","phase":"gas","estimated":false},
 "He":{"en":null,"melt":0.95,"boil":4.22,"metal":"nonmetal","phase":"gas","estimated":false},
 "Li":{"en":0.98,"melt":453.65,"boil":1615.0,"metal":"metal","phase":"solid","estimated":false},
 "Be":{"en":1.57,"melt":1560.0,"boil":2744.0,"metal":"metal","phase":"solid","estimated":false},
 "B":{"en":2.04,"melt":2348.0,"boil":4273.0,"metal":"metalloid","phase":"solid","estimated":false},
 "C":{"en":2.55,"melt":3823.0,"boil":4098.0,"metal":"nonmetal","phase":"solid","estimated":false},
 "N":{"en":3.04,"melt":63.15,"boil":77.36,"metal":"nonmetal","phase":"gas","estimated":false},
 "O":{"en":3.44,"melt":54.36,"boil":90.2,"metal":"nonmetal","phase":"gas","estimated":false},
 "F":{"en":3.98,"melt":53.53,"boil":85.03,"metal":"nonmetal","phase":"gas","estimated":false},
 "Ne":{"en":null,"melt":24.56,"boil":27.07,"metal":"nonmetal","phase":"gas","estimated":false},
 "Na":{"en":0.93,"melt":370.95,"boil":1156.0,"metal":"metal","phase":"solid","estimated":false},
 "Mg":{"en":1.31,"melt":923.0,"boil":1363.0,"metal":"metal","phase":"solid","estimated":false},
 "Al":{"en":1.61,"melt":933.437,"boil":2792.0,"metal":"metal","phase":"solid","estimated":false},
 "Si":{"en":1.9,"melt":1687.0,"boil":3538.0,"metal":"metalloid","phase":"solid","estimated":false},
 "P":{"en":2.19,"melt":317.3,"boil":553.65,"metal":"nonmetal","phase":"solid","estimated":false},
 "S":{"en":2.58,"melt":388.36,"boil":717.75,"metal":"nonmetal","phase":"solid","estimated":false},
 "Cl":{"en":3.16,"melt":171.65,"boil":239.11,"metal":"nonmetal","phase":"gas","estimated":false},
 "Ar":{"en":null,"melt":83.8,"boil":87.3,"metal":"nonmetal","phase":"gas","estimated":false},
 "K":{"en":0.82,"melt":336.53,"boil":1032.0,"metal":"metal","phase":"solid","estimated":false},
 "Ca":{"en":1.0,"melt":1115.0,"boil":1757.0,"metal":"metal","phase":"solid","estimated":false},
 "Sc":{"en":1.36,"melt":1814.0,"boil":3109.0,"metal":"metal","phase":"solid","estimated":false},
 "Ti":{"en":1.54,"melt":1941.0,"boil":3560.0,"metal":"metal","phase":"solid","estimated":false},
 "V":{"en":1.63,"melt":2183.0,"boil":3680.0,"metal":"metal","phase":"solid","estimated":false},
 "Cr":{"en":1.66,"melt":2180.0,"boil":2944.0,"metal":"metal","phase":"solid","estimated":false},
 "Mn":{"en":1.55,"melt":1519.0,"boil":2334.0,"metal":"metal","phase":"solid","estimated":false},
 "Fe":{"en":1.83,"melt":1811.0,"boil":3134.0,"metal":"metal","phase":"solid","estimated":false},
 "Co":{"en":1.88,"melt":1768.0,"boil":3200.0,"metal":"metal","phase":"solid","estimated":false},
 "Ni":{"en":1.91,"melt":1728.0,"boil":3186.0,"metal":"metal","phase":"solid","estimated":false},
 "Cu":{"en":1.9,"melt":1357.77,"boil":2835.0,"metal":"metal","phase":"solid","estimated":false},
 "Zn":{"en":1.65,"melt":692.68,"boil":1180.0,"metal":"metal","phase":"solid","estimated":false},
 "Ga":{"en":1.81,"melt":302.91,"boil":2477.0,"metal":"metal","phase":"solid","estimated":false},
 "Ge":{"en":2.01,"melt":1211.4,"boil":3106.0,"metal":"metalloid","phase":"solid","estimated":false},
 "As":{"en":2.18,"melt":1090.0,"boil":887.0,"metal":"metalloid","phase":"solid","estimated":false},
 "Se":{"en":2.55,"melt":493.65,"boil":958.0,"metal":"nonmetal","phase":"solid","estimated":false},
 "Br":{"en":2.96,"melt":265.95,"boil":331.95,"metal":"nonmetal","phase":"liquid","estimated":false},
 "Kr":{"en":3.0,"melt":115.79,"boil":119.93,"metal":"nonmetal","phase":"gas","estimated":false},
 "Rb":{"en":0.82,"melt":312.46,"boil":961.0,"metal":"metal","phase":"solid","estimated":false},
 "Sr":{"en":0.95,"melt":1050.0,"boil":1655.0,"metal":"metal","phase":"solid","estimated":false},
 "Y":{"en":1.22,"melt":1795.0,"boil":3618.0,"metal":"metal","phase":"solid","estimated":false},
 "Zr":{"en":1.33,"melt":2128.0,"boil":4682.0,"metal":"metal","phase":"solid","estimated":false},
 "Nb":{"en":1.6,"melt":2750.0,"boil":5017.0,"metal":"metal","phase":"solid","estimated":false},
 "Mo":{"en":2.16,"melt":2896.0,"boil":4912.0,"metal":"metal","phase":"solid","estimated":false},
 "Tc":{"en":1.9,"melt":2430.0,"boil":4538.0,"metal":"metal","phase":"solid","estimated":false},
 "Ru":{"en":2.2,"melt":2607.0,"boil":4423.0,"metal":"metal","phase":"solid","estimated":false},
 "Rh":{"en":2.28,"melt":2237.0,"boil":3968.0,"metal":"metal","phase":"solid","estimated":false},
 "Pd":{"en":2.2,"melt":1828.05,"boil":3236.0,"metal":"metal","phase":"solid","estimated":false},
 "Ag":{"en":1.93,"melt":1234.93,"boil":2435.0,"metal":"metal","phase":"solid","estimated":false},
 "Cd":{"en":1.69,"melt":594.22,"boil":1040.0,"metal":"metal","phase":"solid","estimated":false},
 "In":{"en":1.78,"melt":429.75,"boil":2345.0,"metal":"metal","phase":"solid","estimated":false},
 "Sn":{"en":1.96,"melt":505.08,"boil":2875.0,"metal":"metal","phase":"solid","estimated":false},
 "Sb":{"en":2.05,"melt":903.78,"boil":1860.0,"metal":"metalloid","phase":"solid","estimated":false},
 "Te":{"en":2.1,"melt":722.66,"boil":1261.0,"metal":"metalloid","phase":"solid","estimated":false},
 "I":{"en":2.66,"melt":386.85,"boil":457.55,"metal":"nonmetal","phase":"solid","estimated":false},
 "Xe":{"en":2.6,"melt":161.36,"boil":165.03,"metal":"nonmetal","phase":"gas","estimated":false},
 "Cs":{"en":0.79,"melt":301.59,"boil":944.0,"metal":"metal","phase":"solid","estimated":false},
 "Ba":{"en":0.89,"melt":1000.0,"boil":2170.0,"metal":"metal","phase":"solid","estimated":false},
 "La":{"en":1.1,"melt":1191.0,"boil":3737.0,"metal":"metal","phase":"solid","estimated":false},
 "Ce":{"en":1.12,"melt":1071.0,"boil":3697.0,"metal":"metal","phase":"solid","estimated":false},
 "Pr":{"en":1.13,"melt":1204.0,"boil":3793.0,"metal":"metal","phase":"solid","estimated":false},
 "Nd":{"en":1.14,"melt":1294.0,"boil":3347.0,"metal":"metal","phase":"solid","estimated":false},
 "Pm":{"en":null,"melt":1315.0,"boil":3273.0,"metal":"metal","phase":"solid","estimated":false},
 "Sm":{"en":1.17,"melt":1347.0,"boil":2067.0,"metal":"metal","phase":"solid","estimated":false},
 "Eu":{"en":null,"melt":1095.0,"boil":1802.0,"metal":"metal","phase":"solid","estimated":false},
 "Gd":{"en":1.2,"melt":1586.0,"boil":3546.0,"metal":"metal","phase":"solid","estimated":false},
 "Tb":{"en":null,"melt":1629.0,"boil":3503.0,"metal":"metal","phase":"solid","estimated":false},
 "Dy":{"en":1.22,"melt":1685.0,"boil":2840.0,"metal":"metal","phase":"solid","estimated":false},
 "Ho":{"en":1.23,"melt":1747.0,"boil":2973.0,"metal":"metal","phase":"solid","estimated":false},
 "Er":{"en":1.24,"melt":1802.0,"boil":3141.0,"metal":"metal","phase":"solid","estimated":false},
 "Tm":{"en":1.25,"melt":1818.0,"boil":2223.0,"metal":"metal","phase":"solid","estimated":false},
 "Yb":{"en":null,"melt":1092.0,"boil":1469.0,"metal":"metal","phase":"solid","estimated":false},
 "Lu":{"en":1.27,"melt":1936.0,"boil":3675.0,"metal":"metal","phase":"solid","estimated":false},
 "Hf":{"en":1.3,"melt":2506.0,"boil":4876.0,"metal":"metal","phase":"solid","estimated":false},
 "Ta":{"en":1.5,"melt":3290.0,"boil":5731.0,"metal":"metal","phase":"solid","estimated":false},
 "W":{"en":2.36,"melt":3695.0,"boil":5828.0,"metal":"metal","phase":"solid","estimated":false},
 "Re":{"en":1.9,"melt":3459.0,"boil":5869.0,"metal":"metal","phase":"solid","estimated":false},
 "Os":{"en":2.2,"melt":3306.0,"boil":5285.0,"metal":"metal","phase":"solid","estimated":false},
 "Ir":{"en":2.2,"melt":2719.0,"boil":4701.0,"metal":"metal","phase":"solid","estimated":false},
 "Pt":{"en":2.28,"melt":2041.55,"boil":4098.0,"metal":"metal","phase":"solid","estimated":false},
 "Au":{"en":2.54,"melt":1337.33,"boil":3129.0,"metal":"metal","phase":"solid","estimated":false},
 "Hg":{"en":2.0,"melt":234.32,"boil":629.88,"metal":"metal","phase":"liquid","estimated":false},
 "Tl":{"en":1.62,"melt":577.0,"boil":1746.0,"metal":"metal","phase":"solid","estimated":false},
 "Pb":{"en":2.33,"melt":600.61,"boil":2022.0,"metal":"metal","phase":"solid","estimated":false},
 "Bi":{"en":2.02,"melt":544.55,"boil":1837.0,"metal":"metal","phase":"solid","estimated":false},
 "Po":{"en":2.0,"melt":527.0,"boil":1235.0,"metal":"metalloid","phase":"solid","estimated":false},
 "At":{"en":2.2,"melt":575.0,"boil":null,"metal":"nonmetal","phase":"unknown","estimated":true},
 "Rn":{"en":null,"melt":202.0,"boil":211.45,"metal":"nonmetal","phase":"gas","estimated":false},
 "Fr":{"en":0.7,"melt":300.0,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Ra":{"en":0.9,"melt":973.0,"boil":1413.0,"metal":"metal","phase":"solid","estimated":false},
 "Ac":{"en":1.1,"melt":1324.0,"boil":3471.0,"metal":"metal","phase":"solid","estimated":false},
 "Th":{"en":1.3,"melt":2023.0,"boil":5061.0,"metal":"metal","phase":"solid","estimated":false},
 "Pa":{"en":1.5,"melt":1845.0,"boil":null,"metal":"metal","phase":"solid","estimated":false},
 "U":{"en":1.38,"melt":1408.0,"boil":4404.0,"metal":"metal","phase":"solid","estimated":false},
 "Np":{"en":1.36,"melt":917.0,"boil":4175.0,"metal":"metal","phase":"solid","estimated":false},
 "Pu":{"en":1.28,"melt":913.0,"boil":3501.0,"metal":"metal","phase":"solid","estimated":false},
 "Am":{"en":1.3,"melt":1449.0,"boil":2284.0,"metal":"metal","phase":"solid","estimated":false},
 "Cm":{"en":1.3,"melt":1618.0,"boil":3400.0,"metal":"metal","phase":"solid","estimated":false},
 "Bk":{"en":1.3,"melt":1323.0,"boil":null,"metal":"metal","phase":"solid","estimated":false},
 "Cf":{"en":1.3,"melt":1173.0,"boil":null,"metal":"metal","phase":"solid","estimated":false},
 "Es":{"en":1.3,"melt":1133.0,"boil":null,"metal":"metal","phase":"solid","estimated":true},
 "Fm":{"en":1.3,"melt":1800.0,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Md":{"en":1.3,"melt":1100.0,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "No":{"en":1.3,"melt":1100.0,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Lr":{"en":1.3,"melt":1900.0,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Rf":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Db":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Sg":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Bh":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Hs":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Mt":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Ds":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Rg":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Cn":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Nh":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Fl":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Mc":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Lv":{"en":null,"melt":null,"boil":null,"metal":"metal","phase":"unknown","estimated":true},
 "Ts":{"en":null,"melt":null,"boil":null,"metal":"nonmetal","phase":"unknown","estimated":true},
 "Og":{"en":null,"melt":null,"boil":null,"metal":"nonmetal","phase":"unknown","estimated":true}
});
const TABLE_SCHEMES={
 families:{label:'Rodziny pierwiastków',note:'Kolory oznaczają rodziny pierwiastków. Wyróżnienie przydatnych atomów jest niezależne od wybranego podziału.',groups:{nonmetal:['Niemetale','#dbeafe'],s:['Metale bloku s','#f4e5b9'],transition:['Metale przejściowe','#e2eaf5'],metal:['Pozostałe metale','#e9e3f4'],metalloid:['Półmetale','#f5ddd3'],noble:['Gazy szlachetne','#dceff2'],f:['Lantanowce i aktynowce','#f0e4df']}},
 blocks:{label:'Bloki s, p, d, f',note:'Przyjęto konwencję tablicy RSC: He należy do bloku s, La i Ac do d, a Ce–Lu i Th–Lr do f. Istnieją też inne konwencje granicy bloków d i f.',groups:{s:['Blok s','#dbeafe'],p:['Blok p','#f4e5b9'],d:['Blok d','#e9e3f4'],f:['Blok f','#f5ddd3']}},
 metals:{label:'Metale / niemetale',note:'Półmetale wydzielono jako osobną grupę. Ich granica jest umowna; tutaj przyjęto klasyfikację PubChem. Klasyfikacja najcięższych pierwiastków jest przewidywana.',groups:{metal:['Metale','#dbeafe'],nonmetal:['Niemetale','#f4e5b9'],metalloid:['Półmetale','#e9e3f4']}},
 phase:{label:'Stan skupienia (20°C)',note:'Stan przy 20°C i ciśnieniu około 1 atm. Dla pierwiastków, których stan makroskopowy nie jest potwierdzony, pokazano osobną kategorię.',groups:{solid:['Ciało stałe','#dbeafe'],liquid:['Ciecz','#e9e3f4'],gas:['Gaz','#f4e5b9'],unknown:['Stan niepotwierdzony','#e5e9ef']}},
 radioactivity:{label:'Radioaktywność',note:'Podział dotyczy istnienia stabilnych izotopów, nie aktywności konkretnej próbki. Pierwiastki ze stabilnymi izotopami też mają radioizotopy (np. ¹⁴C). Bi, Tc, Pm i wszystkie pierwiastki cięższe od Bi nie mają stabilnych izotopów.',groups:{stable:['Ma stabilne izotopy','#dbeafe'],radioactive:['Tylko izotopy promieniotwórcze','#f5ddd3']}},
 oxides:{label:'Charakter tlenków',note:'Kolory opisują wybrane typowe tlenki, nie sam pierwiastek. Charakter zależy od stopnia utlenienia i warunków reakcji; przykłady znajdziesz w chmurce. Brak danych nie oznacza, że pierwiastek nie tworzy tlenków.',groups:{acidic:['Kwasowe','#f5ddd3'],basic:['Zasadowe','#dbeafe'],amphoteric:['Amfoteryczne','#e9e3f4'],neutral:['Obojętne','#f4e5b9'],mixed:['Różny charakter','#f0dfef'],none:['Brak typowych tlenków','#f0f3f8'],unknown:['Brak danych w zestawieniu','#dce1e8']}}
};
// Examples, not an exhaustive classification of every oxide or oxidation state.
const OXIDE_EXAMPLES={
 H:[['H2O','neutral']], B:[['B2O3','acidic']], C:[['CO','neutral'],['CO2','acidic']],
 N:[['NO','neutral'],['N2O','neutral'],['N2O5','acidic']], Si:[['SiO2','acidic']],
 P:[['P4O6','acidic'],['P4O10','acidic']], S:[['SO2','acidic'],['SO3','acidic']],
 Cl:[['Cl2O','acidic'],['Cl2O7','acidic']], Se:[['SeO2','acidic']], Br:[['Br2O5','acidic']], I:[['I2O5','acidic']], Xe:[['XeO3','acidic']],
 Li:[['Li2O','basic']], Na:[['Na2O','basic']], K:[['K2O','basic']], Rb:[['Rb2O','basic']], Cs:[['Cs2O','basic']],
 Mg:[['MgO','basic']], Ca:[['CaO','basic']], Sr:[['SrO','basic']], Ba:[['BaO','basic']],
 Be:[['BeO','amphoteric']], Al:[['Al2O3','amphoteric']], Zn:[['ZnO','amphoteric']],
 Ga:[['Ga2O3','amphoteric']], Ge:[['GeO2','amphoteric']], Sn:[['SnO','amphoteric'],['SnO2','amphoteric']], Pb:[['PbO','amphoteric'],['PbO2','amphoteric']],
 As:[['As2O3','amphoteric'],['As2O5','acidic']], Sb:[['Sb2O3','amphoteric']], Te:[['TeO2','amphoteric']],
 Sc:[['Sc2O3','amphoteric']], Ti:[['TiO','basic'],['TiO2','amphoteric']],
 V:[['VO','basic'],['V2O5','acidic']], Cr:[['CrO','basic'],['Cr2O3','amphoteric'],['CrO3','acidic']],
 Mn:[['MnO','basic'],['MnO2','amphoteric'],['Mn2O7','acidic']], Fe:[['FeO','basic'],['Fe2O3','basic']],
 Co:[['CoO','basic']], Ni:[['NiO','basic']], Cu:[['Cu2O','basic'],['CuO','basic']], Ag:[['Ag2O','basic']], Hg:[['HgO','basic']],
 Y:[['Y2O3','basic']], Zr:[['ZrO2','amphoteric']], Hf:[['HfO2','amphoteric']],
 Mo:[['MoO3','acidic']], W:[['WO3','acidic']], Tc:[['Tc2O7','acidic']], Re:[['Re2O7','acidic']],
 La:[['La2O3','basic']], Bi:[['Bi2O3','basic']], In:[['In2O3','amphoteric']],
 ...Object.fromEntries('Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu'.split(' ').map(symbol=>[symbol,[[symbol+'2O3','basic']]]))
};
function oxideCategory(symbol){
 if(['He','Ne','Ar','Kr','O','F'].includes(symbol))return 'none';
 const examples=OXIDE_EXAMPLES[symbol];
 if(!examples)return 'unknown';
 const kinds=new Set(examples.map(([,kind])=>kind));
 return kinds.size===1?[...kinds][0]:'mixed';
}
function elementBlock(symbol){
 const n=SYMBOLS.indexOf(symbol)+1;
 if(['H','He','Li','Be','Na','Mg','K','Ca','Rb','Sr','Cs','Ba','Fr','Ra'].includes(symbol))return 's';
 if((n>=58&&n<=71)||(n>=90&&n<=103))return 'f';
 if((n>=21&&n<=30)||(n>=39&&n<=48)||(n>=72&&n<=80)||(n>=104&&n<=112)||n===57||n===89)return 'd';
 return 'p';
}
function elementClass(symbol,scheme){
 const data=ELEMENT_PROPERTIES[symbol],n=SYMBOLS.indexOf(symbol)+1;
 if(scheme==='blocks')return elementBlock(symbol);
 if(scheme==='metals')return data.metal;
 if(scheme==='phase')return data.phase;
 if(scheme==='radioactivity')return n===43||n===61||n>=83?'radioactive':'stable';
 if(scheme==='oxides')return oxideCategory(symbol);
 return category(symbol);
}
function updateTableColors(){
 const select=$('table-coloring'),key=TABLE_SCHEMES[select.value]?select.value:'families',scheme=TABLE_SCHEMES[key];
 for(const tile of document.querySelectorAll('.element')){
  const group=elementClass(tile.dataset.symbol,key);
  tile.dataset.colorGroup=group;
  tile.style.setProperty('--tile',scheme.groups[group][1]);
 }
 $('periodic-legend').innerHTML=Object.values(scheme.groups).map(([label,color])=>`<span><i style="--color:${color}" aria-hidden="true"></i>${esc(label)}</span>`).join('');
 $('periodic-color-note').textContent=scheme.note;
}
function propertyNumber(value,digits=2){return value===null?'Brak danych':Number(value).toLocaleString('pl-PL',{maximumFractionDigits:digits});}
function elementTemperature(symbol,field){
 if(symbol==='He'&&field==='melt')return 'Nie krzepnie przy 1 atm';
 if(symbol==='C'||symbol==='As')return 'Sublimuje przy 1 atm';
 const data=ELEMENT_PROPERTIES[symbol],value=data[field];
 return value===null?'Brak danych':`≈${propertyNumber(value-273.15)} °C${data.estimated?' (szacunek)':''}`;
}
function elementTooltip(symbol){
 const data=ELEMENT_PROPERTIES[symbol],n=SYMBOLS.indexOf(symbol)+1;
 const row=(label,value)=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
 const examples=OXIDE_EXAMPLES[symbol];
 let oxide=examples?examples.map(([f,kind])=>`${plainFormula(f)} - ${TABLE_SCHEMES.oxides.groups[kind][0].toLocaleLowerCase('pl')}`).join('; '):TABLE_SCHEMES.oxides.groups[oxideCategory(symbol)][0];
 if(symbol==='F')oxide='Związki z tlenem to fluorki tlenu, nie tlenki fluoru.';
 if(symbol==='O')oxide='Tlen jest składnikiem tlenków; O₂ i O₃ nie są tlenkami.';
 return `<strong class="tooltip-name">${esc(nameOf(symbol))} <span>${esc(symbol)}</span></strong><p class="tooltip-subtitle">Liczba atomowa ${n} · blok ${elementBlock(symbol)}</p><dl>${row('Elektroujemność (Pauling)',propertyNumber(data.en))}${row('Promień kowalencyjny (ref.)',ATOM_REFERENCE_RADII_PM[symbol]+' pm')}${row('Temperatura topnienia',elementTemperature(symbol,'melt'))}${row('Temperatura wrzenia',elementTemperature(symbol,'boil'))}${row('Stan przy 20°C',TABLE_SCHEMES.phase.groups[data.phase][0])}${row('Charakter pierwiastka',TABLE_SCHEMES.metals.groups[data.metal][0])}${row('Izotopy',TABLE_SCHEMES.radioactivity.groups[elementClass(symbol,'radioactivity')][0])}${row('Wybrane tlenki',oxide)}</dl><p class="tooltip-footnote">${symbol==='C'?'Grafit sublimuje przy około 3825°C. ':symbol==='As'?'Arsen sublimuje przy około 616°C. ':symbol==='P'?'Temperatury dla fosforu białego. ':''}Temperatury są orientacyjne; zależą od ciśnienia i odmiany pierwiastka. ${data.phase==='unknown'?'Stan makroskopowy nie jest potwierdzony. ':''}Dane: PubChem / RSC.</p>`;
}
function tooltipPosition(anchor,size,viewport){
 const gap=10,margin=8;
 const left=Math.max(margin,Math.min(anchor.left+anchor.width/2-size.width/2,viewport.width-size.width-margin));
 const below=anchor.bottom+gap;
 const top=below+size.height<=viewport.height-margin?below:Math.max(margin,anchor.top-gap-size.height);
 return {left,top};
}
let tooltipTile=null,tooltipTimer=null;
function hideElementTooltip(){
 clearTimeout(tooltipTimer);
 if(tooltipTile)tooltipTile.removeAttribute('aria-describedby');
 tooltipTile=null;$('element-tooltip').hidden=true;
}
function showElementTooltip(tile){
 clearTimeout(tooltipTimer);
 if(tooltipTile&&tooltipTile!==tile)tooltipTile.removeAttribute('aria-describedby');
 tooltipTile=tile;
 const tip=$('element-tooltip');tip.innerHTML=elementTooltip(tile.dataset.symbol);tip.hidden=false;
 tile.setAttribute('aria-describedby','element-tooltip');
 const pos=tooltipPosition(tile.getBoundingClientRect(),tip.getBoundingClientRect(),{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});
 tip.style.left=pos.left+'px';tip.style.top=pos.top+'px';
}
function scheduleTooltipHide(){clearTimeout(tooltipTimer);tooltipTimer=setTimeout(hideElementTooltip,160);}
function category(s){const n=SYMBOLS.indexOf(s)+1;if((n>=57&&n<=71)||(n>=89&&n<=103))return'f';if('He Ne Ar Kr Xe Rn Og'.split(' ').includes(s))return'noble';if('Li Be Na Mg K Ca Rb Sr Cs Ba Fr Ra'.split(' ').includes(s))return's';if('B Si Ge As Sb Te Po'.split(' ').includes(s))return'metalloid';if('H C N O F P S Cl Se Br I At Ts'.split(' ').includes(s))return'nonmetal';if((n>=21&&n<=30)||(n>=39&&n<=48)||(n>=72&&n<=80)||(n>=104&&n<=112))return'transition';return'metal';}
function createTable(tileLabel=(name,s,n)=>`${name}, ${s}, liczba atomowa ${n}`){const root=$('periodic');root.innerHTML='<div class="table-caption"><span class="big-symbol">Układ okresowy pierwiastków</span></div>';const add=(s,row,col)=>{if(!s)return;const el=document.createElement(SYMBOLS.includes(s)?'button':'div');el.style.gridRow=row;el.style.gridColumn=col;if(!SYMBOLS.includes(s)){el.className='group-label';el.textContent=s;}else{el.className='element';el.dataset.symbol=s;el.style.setProperty('--tile',COLORS[category(s)]);el.innerHTML=`<span class="number">${SYMBOLS.indexOf(s)+1}</span><span class="symbol">${s}</span><span class="element-name">${nameOf(s)}</span>`;el.setAttribute('aria-label',tileLabel(nameOf(s),s,SYMBOLS.indexOf(s)+1));}root.append(el);};ROWS.forEach((row,r)=>row.forEach((s,c)=>add(s,r+1,c+1)));SYMBOLS.slice(56,71).forEach((s,i)=>add(s,9,i+4));SYMBOLS.slice(88,103).forEach((s,i)=>add(s,10,i+4));add('Lantanowce',9,2);root.lastChild.style.gridColumn='1 / 4';add('Aktynowce',10,2);root.lastChild.style.gridColumn='1 / 4';}
// Podpina kolorowanie, legendę i chmurki. opts: isDragging() oraz tileLabel(nazwa, symbol, numer).
function setupPeriodicTable(opts={}){
 const isDragging=opts.isDragging||(()=>false);
 createTable(opts.tileLabel);
 try{const saved=localStorage.getItem('atom-po-atomie-table-color-v1');if(Object.hasOwn(TABLE_SCHEMES,saved))$('table-coloring').value=saved;}catch(e){}
 $('table-coloring').onchange=()=>{hideElementTooltip();updateTableColors();try{localStorage.setItem('atom-po-atomie-table-color-v1',$('table-coloring').value);}catch(e){}};
 updateTableColors();
 $('periodic').addEventListener('pointerover',e=>{const tile=e.target.closest('.element');if(tile&&e.pointerType!=='touch'&&!isDragging())showElementTooltip(tile);});
 $('periodic').addEventListener('pointerout',e=>{const tile=e.target.closest('.element');if(tile&&!tile.contains(e.relatedTarget))scheduleTooltipHide();});
 $('periodic').addEventListener('focusin',e=>{const tile=e.target.closest('.element');if(tile)showElementTooltip(tile);});
 $('periodic').addEventListener('focusout',scheduleTooltipHide);
 $('element-tooltip').addEventListener('pointerenter',()=>clearTimeout(tooltipTimer));
 $('element-tooltip').addEventListener('pointerleave',scheduleTooltipHide);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')hideElementTooltip();});
 document.addEventListener('scroll',e=>{if(e.target!==$('element-tooltip'))hideElementTooltip();},true);
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('.element')&&!e.target.closest('#element-tooltip'))hideElementTooltip();});
 if(typeof window!=='undefined')window.addEventListener('resize',hideElementTooltip);
}
