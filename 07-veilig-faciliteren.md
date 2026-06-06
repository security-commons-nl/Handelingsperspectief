# 07 · Veilig faciliteren als langetermijnstrategie

## De keuze

Er zijn grofweg twee richtingen om het aanvalsoppervlak van de werkplek te verkleinen:

- **Dichttimmeren / reguleren** — het apparaat zoveel mogelijk beperken: geen local admin, geen BYOD, een
  vaste set software, een dichtgetimmerde laptop.
- **Veilig faciliteren** — de bescherming in het platform leggen en de grens verschuiven van het apparaat naar
  data en identiteit, terwijl je de gebruiker zoveel mogelijk blijft faciliteren.

Beide zijn verdedigbaar. Voor een politiek-ambtelijke organisatie is veilig faciliteren vaak duurzamer, omdat
het minder leunt op "nee" en daardoor minder uitzonderingen en schaduw-IT uitlokt. Belangrijk inhoudelijk punt:
een dichtgetimmerde laptop stopt ClickFix **niet**, omdat die aanval in gebruikerscontext draait en geen
installatie of adminrechten nodig heeft. De maatregelen die ClickFix wél raken (ASR, CLM, Conditional Access,
EDR, segmentatie) zitten in beide modellen — het verschil zit in hoeveel vrijheid je de gebruiker laat.

## Zes pijlers van veilig faciliteren

1. **Bescherming in het platform, niet in gebruikersdiscipline.** Dwing af via configuratie (ASR, PowerShell
   CLM, Win+R uit). Normaal werk blijft werken; de aanvalscapaciteit verdwijnt automatisch.
2. **Grens van apparaat naar data en identiteit.** Toegang op basis van device-compliance en identiteitsrisico.
   Zo wordt BYOD veilig zónder het hele apparaat te bezitten.
3. **De veilige weg is de makkelijkste weg.** Self-service softwarecatalogus, een beheerde browser en een
   password manager, zodat omzeilen niet nodig is. Dit haalt de motivatie tot schaduw-IT weg.
4. **Uitzonderingen als beheerd product.** Just-in-time elevatie in plaats van staande rechten: tijdgebonden,
   gelogd, automatisch vervallend, zichtbaar in een register. "Ja, mits" in plaats van "nee".
5. **Managed = actief beheerd, met eigenaar en bewijs.** Elke maatregel heeft een eigenaar en aantoonbare
   werking, inclusief strakke aansturing van de partners.
6. **Detecteer en herstel de rest.** Niet alles is te blokkeren. Meerdere chokepoints, detectie, en geteste
   recovery (inclusief domain controller).

## BYOD: doe het modern

BYOD kan veilig, maar **niet** met verouderde middelen. Windows Information Protection (WIP) is door Microsoft
uitgefaseerd; bouw daar niet op. Gebruik in plaats daarvan:

- **App Protection Policies (MAM)** voor mobiel — corporate data leeft in een beheerde app-context, los van het
  privé-apparaat.
- **Conditional Access** met device-compliance en, voor onbeheerde Windows, app-/sessiebeheer (bijv. via een
  cloud-app-securityoplossing) in plaats van het hele device over te nemen.

## De eerlijke voorwaarde

Veilig faciliteren is operationeel **zwaarder** dan dichttimmeren, niet lichter. Het ruilt eenmalige restrictie
in voor continu beheer. Het is duurzaam zolang de regiecapaciteit er werkelijk is. Een goede indicator of die
capaciteit er is: staan basismaatregelen die je "hebt" ook echt aantoonbaar aan (bijvoorbeeld ASR-regels die
gekoppeld zijn aan de juiste groep)? Zo niet, dan is dat een signaal dat de regie de bottleneck is.

Lukt die regie niet, dan verdient een striktere lockdown een serieuze afweging — die keuze hoort expliciet op
tafel, niet impliciet te ontstaan.

## Positionering ten opzichte van een lockdown-model

Geen zwart-wit. Neem de **verdedigbare basis** uit een lockdown-model over: een beheerd device, geen staande
local-adminrechten, een beheerde browser, en beheerde tijdelijke uitzonderingen. Dat is geen "zware regulering"
maar basishygiëne die BIO2 en de Cyberbeveiligingswet feitelijk afdwingbaar en auditbaar verwachten. Het
verschil zit in BYOD (houd dit mogelijk via MAM/Conditional Access in plaats van het te beëindigen) en in de
mate waarin je vrijheid weghaalt waar dat geen risico verkleint.

De kernvraag is niet "dicht of open", maar: **welke controls dwing je centraal af, welke laat je aan
gebruikersoordeel over, en is elke keuze uitlegbaar aan een auditor.**
