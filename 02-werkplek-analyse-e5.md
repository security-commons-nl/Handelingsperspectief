# 02 · Werkplekanalyse op het Microsoft-platform (E5)

Vrijwel elke gemeente heeft Microsoft 365 E5 en daarmee Defender for Endpoint (MDE) en Advanced Hunting.
Dit hoofdstuk beschrijft welke analyses je daarmee kunt doen, en hoe je "aan" onderscheidt van "actief".

De query's staan in [`queries/`](queries/). Pas de parent-processen en uitsluitingen aan op je eigen omgeving.

Je werkplekken moeten natuurlijk wel via Intune beheerst zijn zodat de telemetrie in het defender portal land.
Sta je nog onbeheerde BYOD zonder enige vorm van regelset toe (zogenaamde MaM en CA) dan is er echt nog heel veel
werk aan de winkel. Start dan zeker hier, maar besef je dat je een groot blind gat hebt.

## A. Configuratie verifiëren (aan ≠ gekoppeld en actief)

Loop deze punten langs. Het zijn veelvoorkomende blinde vlekken in Endpoint Detection.

- **ASR (Attack Surface Reduction).** Bestaan er regels, staan ze in **block**-modus, en zijn ze gekoppeld aan
  de **juiste gebruikersgroep**? Het komt voor dat er regels bestaan die aan geen of een verkeerde groep hangen
  en dus niets doen. Controleer specifiek of er een regel is tegen *credential stealing from LSASS*. De
  configuratiestatus is per device zichtbaar via `DeviceTvmSecureConfigurationAssessment` in het security portal.
- **AMSI.** Script scanning staat standaard aan, maar wordt vaak niet bewust ingericht of geverifieerd.
  Bevestig en leg vast.
- **LSA protection.** Vaak niet geconfigureerd. Zet aan en zorg dat misbruik een signaal oplevert.
- **Script-block-logging (EID 4104).** Vaak niet ingericht. Voeg toe als aanvullende bron naar de SIEM; MDE
  heeft bekende blinde vlekken die je hiermee afdekt.
- **Autorun/autoplay op endpoints.** Controleer de feitelijke stand (niet de aanname). Op servers is dit vaak
  uit via een hardening-baseline; op endpoints staat het regelmatig nog op default=aan.

## B. PowerShell — meet voordat je beperkt

PowerShell wil je beheersen, niet bot blokkeren. De reden blijkt vaak uit de data.

1. Draai [`queries/powershell-totaal-categorisatie.kql`](queries/powershell-totaal-categorisatie.kql). Dit geeft
   de **exacte** verhouding automatisering vs. interactief (server-side geaggregeerd, dus zonder exportlimiet).
   Verwacht beeld: het overgrote deel is automatisering — Intune/remediation, de eigen Defender-sensor, overige
   SYSTEM-processen. Interactief mensgebruik is doorgaans een fractie van een procent.
2. Draai [`queries/powershell-interactief.kql`](queries/powershell-interactief.kql) om de ruis weg te filteren en
   te zien wíe interactief gebruikt. Vaak is dat een kleine groep ontwikkelaars met moderne tooling
   (terminals, editors, AI-assistenten) die op de achtergrond PowerShell aanroepen.

**Advies:** beheers PowerShell met **Constrained Language Mode (CLM), afgedwongen via WDAC**, in plaats van een
procesblokkade. CLM laat PowerShell draaien maar ontneemt scripts de bouwstenen (reflectie, willekeurige code
laden, directe API-aanroepen) die aanvalspayloads nodig hebben. Een trustmodel (ondertekening + WDAC) beslist
automatisch of een script volledig of beperkt draait, in plaats van een handmatige uitzonderingenlijst. Geef de
ontwikkelaarsgroep één afgebakende, tijdelijke uitzondering. Begin in **auditmodus**.

## C. Win+R (Run-dialoog/het utivoeren venster)

Draai [`queries/winr-runmru-top.kql`](queries/winr-runmru-top.kql) en
[`queries/winr-categorisatie.kql`](queries/winr-categorisatie.kql). Deze lezen de RunMRU-registersleutel uit:
wat typen gebruikers werkelijk in Win+R.

Verwacht beeld: een laag volume, vrijwel uitsluitend beheer- en power-usergebruik (beheerconsoles,
netwerkshares, applicaties). Veel van de gebruikers zullen het niet leuk vinden maar er breekt vaak niets
als je het uitzet maar het **voorkomt** een essentiele stap die ClickFix nodig heeft om voeten aan de grond
te krijgen.

**Advies:** schakel Win+R uit via beleid (NoRun, via Intune of GPO). Stem vooraf af met beheer of er
workflows zijn die op Win+R leunen (bijvoorbeeld het springen naar uitrol-/softwaremappen).

## D. mshta

Draai [`queries/mshta-gebruik.kql`](queries/mshta-gebruik.kql). mshta is een veelgebruikt ClickFix-kanaal en in
moderne kantooromgevingen zelden nog nodig. Vaak vind je nul of een handvol goedaardige events.

**Advies:** blokkeer mshta via AppLocker of WDAC (beide paden, 32- en 64-bits), met een detectieregel als
achtervang. De impact is doorgaans verwaarloosbaar.

## E. Detectie op ClickFix

Draai [`queries/clickfix-detectie.kql`](queries/clickfix-detectie.kql). Deze correleert een verdacht commando in
de Run-dialoog met een kort daarna gestart proces (PowerShell, mshta, cmd, curl) vanuit explorer.exe.

Let op de bewuste beperkingen: de detectie ziet alleen het Win+R-pad, alleen de genoemde binaries en alleen
een explorer-parent. Verbreed de binary-lijst (rundll32, regsvr32, wscript/cscript, certutil, bitsadmin) en
overweeg een lichtere variant die alléén op de verdachte RunMRU-waarde alarmeert, als aanvulling.

## Interpretatiehulp

- **Filter automatisering weg voordat je conclusies trekt.** Intune/remediation-scripts, de Defender-sensor en
  installers domineren het beeld. Zonder filtering lijkt er veel "interactief" gebruik dat er niet is.
- **Ontwikkeltooling veroorzaakt veel tellingen, weinig personen.** Een AI-assistent of editor die elke
  handeling met een korte PowerShell-controle valideert, telt zwaar maar betreft een handvol gebruikers.
