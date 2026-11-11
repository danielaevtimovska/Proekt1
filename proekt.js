var ceni = [800, 900, 850, 1100, 550, 750, 1200, 600];
var iminja = ["Рим", "Милано", "Барселона", "Париз", "Сплит", "Дубровник", "Лондон", "Прага"];
var sliki = [
    ["Rim1.jpg", "Rim2.jpg", "Rim3.jpg", "Rim4.jpg"],
    ["Milano1.jpg", "Milano2.jpg", "Milano3.jpg", "Milano4.jpg"],
    ["Barselona1.jpg", "Barselona2.jpg", "Barselona3.jpg", "Barselona4.jpg"],
    ["Paris1.jpg", "Paris2.jpg", "Paris3.jpg", "Paris4.jpg"],
    ["Split1.jpg", "Split2.jpg", "Split3.jpg", "Split4.jpg"],
    ["Dubrovnik1.jpg", "Dubrovnik2.jpg", "Dubrovnik3.jpg", "Dubrovnik4.jpg"],
    ["London1.jpg", "London2.jpg", "London3.jpg", "London4.jpg"],
    ["Praga1.jpg", "Praga2.jpg", "Praga3.jpg", "Praga4.jpg"]
];
var lajk = [];
var dislajk = [];
var komentari = [];
var tekovenGrad = 0;
for (var i = 0; i < 32; i++) {
    lajk[i] = 0;
    dislajk[i] = 0;
    komentari[i] = [];
}

var siteKarticki = [];
var pocetniKarticki = document.getElementsByClassName("destinacija");
for (var i = 0; i < pocetniKarticki.length; i++) {
    siteKarticki[i] = pocetniKarticki[i];
}


function najaviSe() {
    var ime = document.getElementById("korisnickoIme").value;
    var lozinka = document.getElementById("lozinka").value;

    if (ime === "" || lozinka === "") {
        alert("Внесете корисничко име и лозинка!");
        return;
    }

    document.getElementById("formaNajava").style.display = "none";
    document.getElementById("porakaNajava").textContent = "Добредојде, " + ime + "!";
    document.getElementById("kopceOdjava").style.display = "block";
    document.getElementById("lozinka").value = "";
}

function odjaviSe() {
    document.getElementById("formaNajava").style.display = "block";
    document.getElementById("porakaNajava").textContent = "";
    document.getElementById("kopceOdjava").style.display = "none";
    document.getElementById("korisnickoIme").value = "";
}


function otvoriGrad(i) {
     if (siteKarticki[i] === null) {
        i = -1;
        for (var j = 0; j < siteKarticki.length; j++) {
            if (siteKarticki[j] !== null) {
                i = j;
                break;
            }
        }
        if (i === -1) {
            alert("Нема достапни дестинации!");
            return;
        }
    }
    tekovenGrad = i;

    document.getElementById("galerija").style.display = "block";
    document.getElementById("imeGrad").innerHTML = iminja[i];

    for (var j = 0; j < 4; j++) {
        var pozicija = i * 4 + j;

        document.getElementById("slika" + j).src = sliki[i][j];
        document.getElementById("likes" + j).innerHTML = lajk[pozicija];
        document.getElementById("dislikes" + j).innerHTML = dislajk[pozicija];

        document.getElementById("tekst" + j).value = "";

        var lista = document.getElementById("komentari" + j);
        lista.innerHTML = "";

        for (var k = 0; k < komentari[pozicija].length; k++) {
            var li = document.createElement("li");
            var tekst = document.createTextNode(komentari[pozicija][k]);

            li.appendChild(tekst);
            lista.appendChild(li);
        }
    }
}

function glasaj(slika, tip) {
    var pozicija = tekovenGrad * 4 + slika;

    if (tip === "like") {
        lajk[pozicija]++;
        document.getElementById("likes" + slika).innerHTML = lajk[pozicija];
    }
    else {
        dislajk[pozicija]++;
        document.getElementById("dislikes" + slika).innerHTML = dislajk[pozicija];
    }
}

function dodajKomentar(slika) {
    var tekst = document.getElementById("tekst" + slika).value;

    if (tekst === "") {
        alert("Внеси коментар!");
    }
    else {
        var pozicija = tekovenGrad * 4 + slika;
        komentari[pozicija][komentari[pozicija].length] = tekst;
        var li = document.createElement("li");
        var tekstKomentar = document.createTextNode(tekst);
        li.appendChild(tekstKomentar);
        document.getElementById("komentari" + slika).appendChild(li);
        document.getElementById("tekst" + slika).value = "";
    }
}

function dodajVoPlan() {
    var grad = document.getElementById("grad").value;
    if (grad === "") {
    alert("Нема достапни дестинации!");
    return;
    }
    var denovi = document.getElementById("denovi").value;
    var budzet = document.getElementById("budzet").value;
    var prevoz = document.getElementById("prevoz").value;
    var dnevno = document.getElementById("dnevno").value;
    
    if (budzet<200 || budzet>2000 || budzet==="") {
        alert("Буџетот мора да биде меѓу 200 и 2000 евра");
    }

    else if(denovi<4 || denovi>10 || denovi==="") {
        alert("Бројот на денови мора да биде меѓу 4 и 10");
    }

    else if (prevoz === "" || prevoz < 0) {
        alert("Внеси валидна цена за превоз!");
    }

    else if (dnevno === "" || dnevno < 0) {
        alert("Внеси валидни дневни трошоци!");
    }

    else {
        var vkupno = Number(prevoz) + Number(dnevno)*Number(denovi);

        if(vkupno>budzet) {
            alert("Патувањето го надминува буџетот!");
        }
        
        else {
            var Plan = document.createElement("li");
            var Text = document.createTextNode(grad + " - " + denovi + " дена - Буџет: " + budzet + " € - Трошоци: " + vkupno + " €");            
            Plan.appendChild(Text);
            document.getElementById("mojPlan").appendChild(Plan);

            var Kopce=document.createElement("button");
            var Value=document.createTextNode("Избриши");
            Kopce.appendChild(Value);
            Plan.appendChild(Kopce);
            Kopce.className="izbrisi";

            

            Kopce.onclick=function() {
                document.getElementById("mojPlan").removeChild(Plan);
            }
        }
    }    
}

function filtriraj() {
    var kategorija = document.getElementById("kategorii").value;
    var budzet = document.getElementById("filterBudzet").value;

    for (var i = 0; i < siteKarticki.length; i++) {
        var karticka = siteKarticki[i];

        if (karticka !== null) {
            if ((karticka.className.indexOf(kategorija) !=-1 || kategorija === "site") &&
                (budzet === "" || ceni[i] <= Number(budzet))) {
                karticka.style.display = "";
            }
            else {
                karticka.style.display = "none";
            }
        }
    }
}

function prikaziCena() {
    for (var i = 0; i<siteKarticki.length; i++) {
        if (siteKarticki[i] !== null) {
            var pole = siteKarticki[i].getElementsByClassName("cena")[0];
            pole.innerHTML = "Проценета цена за 6 дена: " + ceni[i] + " €";
        }
    }
}
prikaziCena();

function izbrisiDestinacija(i) {
    var karticka = siteKarticki[i];

    if (karticka === null) {
        return;
    }

    karticka.parentNode.removeChild(karticka);
    siteKarticki[i] = null;

    var opcii = document.getElementById("grad").getElementsByTagName("option");

    for (var j = 0; j < opcii.length; j++) {
        if (opcii[j].value === iminja[i]) {
            opcii[j].parentNode.removeChild(opcii[j]);
            break;
        }
    }

    if (tekovenGrad === i) {
        document.getElementById("galerija").style.display = "none";
    }
}

function dodajDestinacija() {
    var ime = document.getElementById("novoIme").value;
    var opis = document.getElementById("novOpis").value;
    var kategorija = document.getElementById("novaKategorija").value;
    var cena = document.getElementById("novaCena").value;

    var slika1 = document.getElementById("novaSlika1").value;
    var slika2 = document.getElementById("novaSlika2").value;
    var slika3 = document.getElementById("novaSlika3").value;
    var slika4 = document.getElementById("novaSlika4").value;

    if (ime === "" || opis === "" || cena === "" || slika1 === "" || Number(cena) < 0) {
        alert("Пополнете ги задолжителните полиња!");
        return;
    }

    for (var i = 0; i < siteKarticki.length; i++) {
        if (siteKarticki[i] !== null && iminja[i] === ime) {
            alert("Овој град веќе постои!");
            return;
        }
    }

    if (slika2 === "") {
        slika2 = slika1;
    }

    if (slika3 === "") {
        slika3 = slika1;
    }

    if (slika4 === "") {
        slika4 = slika1;
    }

    var indeks = iminja.length;

    iminja[indeks] = ime;
    ceni[indeks] = Number(cena);
    sliki[indeks] = [slika1, slika2, slika3, slika4];

    for (var j = 0; j < 4; j++) {
        var pozicija = indeks * 4 + j;

        lajk[pozicija] = 0;
        dislajk[pozicija] = 0;
        komentari[pozicija] = [];
    }

    var novaKarticka = document.createElement("div");
    novaKarticka.className = "col-md-6 destinacija " + kategorija;

    var card = document.createElement("div");
    card.className = "card";

    var slika = document.createElement("img");
    slika.src = slika1;
    slika.alt = ime;
    slika.className = "card-img-top";

    var telo = document.createElement("div");
    telo.className = "card-body";

    var naslov = document.createElement("h3");
    naslov.className = "card-title";
    naslov.appendChild(document.createTextNode(ime));

    var opisGrad = document.createElement("p");
    opisGrad.className = "card-text";
    opisGrad.appendChild(document.createTextNode(opis));

    var cenaGrad = document.createElement("p");
    cenaGrad.className = "cena";

    var istrazi = document.createElement("a");
    istrazi.href = "#galerija";
    istrazi.className = "btn kopce";
    istrazi.appendChild(document.createTextNode("Истражи"));

    istrazi.onclick = function() {
        otvoriGrad(indeks);
    };

    var izbrisi = document.createElement("button");
    izbrisi.className = "izbrisiGrad";
    izbrisi.appendChild(document.createTextNode("Избриши"));

    izbrisi.onclick = function() {
        izbrisiDestinacija(indeks);
    };

    telo.appendChild(naslov);
    telo.appendChild(opisGrad);
    telo.appendChild(cenaGrad);
    telo.appendChild(istrazi);
    telo.appendChild(izbrisi);

    card.appendChild(slika);
    card.appendChild(telo);
    novaKarticka.appendChild(card);

    document.getElementById("listaDestinacii").appendChild(novaKarticka);

    siteKarticki[indeks] = novaKarticka;

    var opcija = document.createElement("option");
    opcija.value = ime;
    opcija.appendChild(document.createTextNode(ime));
    document.getElementById("grad").appendChild(opcija);

    prikaziCena();
    filtriraj();

    document.getElementById("novaForma").style.display = "none";

    alert("Дестинацијата е успешно додадена!");
}

function dodajObjava() {
    var avtor = document.getElementById("avtorObjava").value;
    var grad = document.getElementById("gradObjava").value;
    var naslov = document.getElementById("naslovObjava").value;
    var tekst = document.getElementById("tekstObjava").value;

    if (avtor === "" || naslov === "" || tekst === "") {
        alert("Пополнете ги сите полиња!");
        return;
    }

    var objava = document.createElement("article");
    objava.className = "objava";

    var naslovElement = document.createElement("h4");
    naslovElement.appendChild(document.createTextNode(naslov));

    var podatoci = document.createElement("p");
    podatoci.appendChild(document.createTextNode("Автор: " + avtor + " | Град: " + grad));

    var tekstElement = document.createElement("p");
    tekstElement.appendChild(document.createTextNode(tekst));

    objava.appendChild(naslovElement);
    objava.appendChild(podatoci);
    objava.appendChild(tekstElement);

    document.getElementById("listaObjavi").appendChild(objava);
    document.getElementById("avtorObjava").value = "";
    document.getElementById("naslovObjava").value = "";
    document.getElementById("tekstObjava").value = "";

    alert("Објавата е успешно додадена!");
}


function zemiRadio(ime) {
    var opcii = document.getElementsByName(ime);

    for (var i = 0; i < opcii.length; i++) {
        if (opcii[i].checked) {
            return opcii[i].value;
        }
    }

    return "Не е избрано";
}

function ispratiAnketa() {
    var ime = document.getElementById("imeAnketa").value;
    var email = document.getElementById("emailAnketa").value;

    if (ime === "" || email === "") {
        alert("Внесете име и е-пошта!");
        return;
    }

    if (email.indexOf("@") === -1) {
        alert("Внесете правилна е-пошта!");
        return;
    }

    var ocena = zemiRadio("ocena");
    var lesno = zemiRadio("lesno");
    var preporaka = zemiRadio("preporaka");

    var omilen = document.getElementById("omilenDel").value;
    var podobruvanje = document.getElementById("podobruvanje").value;
    var komentar = document.getElementById("komentarAnketa").value;

    if (omilen === "") {
        omilen = "Не е избрано";
    }

    if (podobruvanje === "") {
        podobruvanje = "Не е избрано";
    }

    if (komentar === "") {
        komentar = "Нема коментар";
    }

    document.getElementById("rezultatAnketa").textContent =
        "Благодариме, " + ime + "! " +
        "Оцена: " + ocena +
        " | Лесна за користење: " + lesno +
        " | Препорака: " + preporaka +
        " | Омилен дел: " + omilen +
        " | Подобрување: " + podobruvanje +
        " | Коментар: " + komentar;

    document.getElementById("formaAnketa").reset();
}
document.getElementById("kopceAnketa").addEventListener("click", ispratiAnketa, false);

