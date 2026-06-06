# 01 · De methode: evidence-based posture verhogen

Deze aanpak is opzettelijk nuchter. Geen catchy oneliners, wel toetsbare stappen.

## Drie principes

### 1. Meet voordat je ingrijpt
Voordat je een maatregel afdwingt (Win+R uit, PowerShell beperken, een firewallregel versmallen), stel je het
feitelijke gebruik vast. Dat doet twee dingen: het laat de werkelijke impact zien (meestal kleiner dan gevreesd)
en het voorkomt dat je legitiem werk of beheer breekt. Een voorbeeld uit de praktijk: van miljoenen
PowerShell-starts in een maand bleek bijna 99% machine-automatisering — waaronder de eigen sensor van de
endpointbescherming. Een botte blokkade had de eigen beveiliging gebroken.

### 2. Vertrouw op data, niet op tekeningen
Een netwerktekening toont de bedoeling, niet de werkelijkheid. "We hebben ASR aanstaan" is een aanname totdat
je de koppeling aan een gebruikersgroep hebt geverifieerd. Toets met:
- telemetrie (Advanced Hunting, logs);
- configuratie-export (firewallregels, hit-counts, routeringstabellen);
- de daadwerkelijke koppeling/scope van een beleidsregel.

### 3. Aangezet is niet hetzelfde als beheerd
Toets elke maatregel op vier niveaus van oplopende zekerheid:

| Niveau | Vraag |
|---|---|
| **Bestaan** | Is de maatregel aanwezig? |
| **Opzet** | Is hij correct ingericht volgens norm? |
| **Werking** | Is hij aantoonbaar effectief in de praktijk? |
| **Config beschikbaar** | Kunnen wíj de instelling zelf inzien? |

Een "managed" dienst omvat gedurende de hele levenscyclus: bijhouden (updates, dreigingsinfo), beheren
(configuratie, afwijkingen, prestaties), optimaliseren, functionaliteit aanpassen, en verantwoorden
(rapportage, eigenaarschap). Een tool installeren met standaardinstellingen is daarvan alleen de eerste stap.

## IST → SOLL als werkvorm

Beschrijf per component de huidige stand (IST) en de gewenste stand (SOLL), met een statuskleur en een
actiehouder. Houd de SOLL-ambitie expliciet: een verdedigbare ondergrens (richting BIO2 en audit) is iets
anders dan "goede praktijk". Maak die keuze bewust, anders overvraag je de organisatie.

Sjabloon:

| Component | IST (stand + bewijs) | SOLL | Statuskleur | Actiehouder |
|---|---|---|---|---|
| _bijv. ASR-regels_ | _2 regels, niet gekoppeld_ | _block-modus, juiste groep, incl. LSASS_ | rood | _beheerpartner werkplek_ |

Statuskleuren: groen = ingericht · oranje = deels/aandacht · rood = nog niet ingericht · grijs = te bevestigen.

## Volgorde

1. **Meet de werkplek** (hoofdstuk 02). Daar is de meeste telemetrie en de meeste laaghangende winst.
2. **Toets de Microsoft-configuratie** (02, 03). Onderscheid "aan" van "gekoppeld en actief".
3. **Analyseer netwerk en firewall uit data** (04). Brede regels, beheertoegang, zicht op verkeer, segmentatie.
4. **Leg de killchain naast je controls** (05). Waar knijp je de aanval, waar zit nog een gat.
5. **Beleg regie** (06) en **kies een strategie** (07).

## Aantoonbaarheid en herijking

Leg vast wat je hebt gemeten en wanneer. Een maatregel die ooit aanstond kan weer afvallen (drift). Plan
periodieke herijking en, waar mogelijk, een gecontroleerde aanvalssimulatie om detectie en preventie te
toetsen — niet aannemen dat het werkt, maar het laten zien.
