# 00 · Managementsamenvatting

## Waarom dit onderwerp

ClickFix is een social-engineering-aanval waarbij de gebruiker zélf — misleid via een nep-melding of
nep-CAPTCHA — een geplakt commando uitvoert, vrijwel altijd via de Windows Run-dialoog (Win+R) en
PowerShell. Dat leidt tot tot een nieuwe ransomware, vaak een infostealers, remote-access-tools en in het 
ergste geval ransomware en datalekken.

Een publiek voorbeeld is de aanval op een Nederlandse gemeente in maart 2026, waarbij na een ClickFix-uitvoering
binnen twee dagen honderdduizenden bestanden werden weggesluisd / geëxfiltreerd.

Het punt is breder dan ClickFix: de werkplek is de primaire ingang, maar één maatregel houdt een aanvaller
niet tegen. De lagen sámen wel.

## Het lagenmodel (defense-in-depth)

Gebruik dit als kapstok. Elke laag vangt op wat de vorige doorlaat.

1. **Werkplek & e-mail** — waar de aanval binnenkomt.
2. **Identiteit & toegang** — wie mag wat.
3. **Netwerk** — beweging tussen werkplek en datacenter.
4. **Servers & applicaties** — het hart van de systemen.
5. **Data & detectie** — back-up, herstel en meekijken.

## De terugkerende bevinding

In de praktijk is het probleem zelden dat de middelen ontbreken. Vrijwel elke gemeente heeft Microsoft 365 E5,
endpointbescherming, firewalls en een of meer beheerpartners. Het gat zit in **inrichting, afdwinging en
eigenaarschap**:

- een beveiligingsregel die wel bestaat maar niet aan de juiste groep is gekoppeld (en dus niet werkt);
- een tool met standaardconfiguratie die niemand bijhoudt;
- een netwerktekening die niet overeenkomt met het verkeer dat de firewall daadwerkelijk ziet.
- een IT-Gap in de IT-afdeling zelf omdat "ze van het management luisteren" of "ze van de techniek neit begrijpen
  compromissen erbij horen"

De boodschap voor besluitvorming: **eerst afmaken en aantoonbaar maken wat er al is, daarna uitbreiden.**

## Strategische keuze: dichttimmeren of veilig faciliteren

Er zijn grofweg twee richtingen. Dichttimmeren (het apparaat zoveel mogelijk beheersen/beperken) en veilig faciliteren
(de bescherming in het platform leggen en de grens verschuiven van het apparaat naar data en identiteit).

Voor een politiek-ambtelijke organisatie is veilig faciliteren vaak duurzamer, omdat het minder leunt op
"nee" en daardoor minder uitzonderingen en schaduw-IT uitlokt. Tegen ClickFix is het, mits goed ingericht,
ook gerichter — **een dichtgetimmerde laptop stopt ClickFix niet**, omdat de aanval in gebruikerscontext draait.

De eerlijke voorwaarde: veilig faciliteren is operationeel **zwaarder**, niet lichter. Het ruilt eenmalige
restrictie in voor continu beheer. Het is alleen duurzaam als de eigen capaciteit of regiecapaciteit (bij uitbestede ICT)
er werkelijk is. Ontbreekt die, dan verdient een striktere aanpak een serieuze afweging.
Zie [07-veilig-faciliteren.md](07-veilig-faciliteren.md).

## Regie en resultaatverplichting

De analyse moet landen in eigenaarschap. Beleg per onderwerp wie binnen de organisatie de regie voert en
accountable is voor het resultaat. Werk met een **resultaatverplichting**, geen inspanningsverplichting:
een onderwerp is pas klaar als de maatregel aantoonbaar werkt. Zie
[06-regie-en-accountability.md](06-regie-en-accountability.md).
