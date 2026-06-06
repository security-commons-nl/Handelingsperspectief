# 07 · Veilig faciliteren als langetermijnstrategie

## Twee richtingen

Er zijn grofweg twee manieren om het aanvalsoppervlak van de werkplek te verkleinen:

- **Reguleren (lockdown)** — het apparaat beperken: geen local admin, geen BYOD, een vaste
  set software.
- **Veilig faciliteren** — de bescherming in het platform leggen en toegang sturen op data en
  identiteit in plaats van op het apparaat.

Beide modellen komen in de praktijk voor en zijn verdedigbaar; de keuze hangt af van de
organisatie en de beschikbare beheercapaciteit (zie hieronder). Voor de ClickFix-casus is één
technisch punt van belang: een vergrendelde laptop beschermt op zichzelf niet tegen ClickFix,
omdat die aanval in gebruikerscontext draait en geen installatie of adminrechten nodig heeft.
De maatregelen die ClickFix wél raken (ASR, PowerShell CLM, Conditional Access, EDR,
segmentatie) passen in beide modellen. Het verschil tussen de modellen zit dus in de mate van
gebruikersvrijheid, niet in de bescherming tegen deze aanvalsvorm.

## Uitgangspunten van veilig faciliteren

1. **Afdwingen via configuratie, niet via gebruikersdiscipline.** Maatregelen zoals
   ASR-regels, PowerShell Constrained Language Mode en het uitschakelen van Win+R werken
   onafhankelijk van het gedrag van de gebruiker.
2. **Toegang op basis van data en identiteit.** Device-compliance en identiteitsrisico bepalen
   de toegang. Daarmee is BYOD mogelijk zonder het volledige apparaat te beheren.
3. **Bruikbare alternatieven bieden.** Een self-service softwarecatalogus, een beheerde
   browser en een password manager verkleinen de aanleiding om beperkingen te omzeilen en
   daarmee het risico op schaduw-IT.
4. **Uitzonderingen tijdelijk en gelogd.** Just-in-time elevatie in plaats van staande
   rechten: tijdgebonden, gelogd, automatisch vervallend en vastgelegd in een register.
5. **Elke maatregel heeft een eigenaar en aantoonbare werking.** Bestaan, opzet en werking
   zijn vastgelegd (configuratie-export, telemetrie), inclusief de afspraken met leveranciers.
6. **Detectie en herstel voor wat overblijft.** Niet alles is te blokkeren. Daarom meerdere
   chokepoints in de killchain, detectie, en geteste recovery (inclusief domain controllers).

## BYOD

BYOD is te beveiligen, maar niet met uitgefaseerde middelen. Windows Information Protection
(WIP) is door Microsoft deprecated; bouw daar geen nieuw beleid op. Bruikbare alternatieven:

- **App Protection Policies (MAM)** voor mobiel — corporate data blijft binnen een beheerde
  app-context, gescheiden van het privé-apparaat.
- **Conditional Access** met device-compliance en, voor onbeheerde Windows-apparaten,
  app-/sessiebeheer (bijvoorbeeld via een cloud-app-securityoplossing) in plaats van beheer
  van het volledige device.

## Randvoorwaarde: beheercapaciteit

Veilig faciliteren vraagt meer doorlopend beheer dan een lockdown-model. Het vervangt
eenmalige restrictie door continue configuratie, monitoring en uitzonderingsbeheer. Het model
werkt alleen als die regiecapaciteit er aantoonbaar is.

Een bruikbare toets: staan basismaatregelen die op papier "aan" staan ook werkelijk aan,
gekoppeld aan de juiste groepen (bijvoorbeeld ASR-regels)? Zo niet, dan is de regie de
bottleneck. In dat geval hoort een striktere lockdown als alternatief expliciet op tafel —
als bewuste keuze, niet als situatie die stilzwijgend ontstaat.

## Verhouding tot een lockdown-model

De modellen sluiten elkaar niet uit. Ook bij veilig faciliteren geldt een verdedigbare basis
die uit het lockdown-model bekend is: een beheerd device, geen staande local-adminrechten,
een beheerde browser en beheerde tijdelijke uitzonderingen. Dat is basishygiëne die BIO2 en
de Cyberbeveiligingswet afdwingbaar en auditbaar verwachten.

Het verschil zit in twee punten: BYOD blijft mogelijk via MAM en Conditional Access in plaats
van te worden beëindigd, en vrijheid wordt alleen weggenomen waar dat aantoonbaar risico
verkleint. Per control is de afweging: centraal afdwingen of aan het oordeel van de gebruiker
laten — en is die keuze uitlegbaar aan een auditor.
