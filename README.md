# Handelingsperspectief security posture voor gemeenten

Een praktisch, herbruikbaar geheel om als gemeente je security posture **evidence-based** te verhogen, dus geen aanname maar gebasseerd op feiten.
Vertrekpunt is het doorlopen van 1 aanvalsvorm: ClickFix. Maar de aanpak is breder toepasbaar: van de werkplek tot het netwerk.

Dit document is deels **managerial** (regie, strategie, besluitvorming) en deels **technisch**
(analyses op het Microsoft-platform, configuratie-analyse van firewalls en core-routers, herbruikbare query's).

> Gegeneraliseerd uit een concrete gemeentelijke casus. Pas de voorbeelden aan op je eigen gemeente, leverandiers,
> en tenant. Let bij maatregelen die verkeer of gebruik inzichtelijk maken
> (zoals TLS-decryptie of script-logging) op privacy, BIO2 en eventuele OR-/medezeggenschapstrajecten.

## Drie uitgangspunten

1. **Meet voordat je ingrijpt.** Stel het feitelijke gebruik vast voordat je iets beperkt. Dat voorkomt
   uitval én laat zien hoe groot de impact werkelijk is (meestal kleiner dan gedacht).
2. **Vertrouw op data, niet op tekeningen.** Een netwerktekening of een "we hebben het aanstaan" is een
   aanname. Toets de werkelijkheid: rule-hits, configuratie-export, telemetrie.
3. **Aangezet is niet hetzelfde als beheerd.** Een tool met standaardconfiguratie die niemand bijhoudt,
   beschermt niet aantoonbaar. Leg bestaan, opzet, werking en eigenaarschap vast.

## Inhoud

| Bestand | Voor wie | Onderwerp |
|---|---|---|
| [00-managementsamenvatting.md](00-managementsamenvatting.md) | Bestuur, CISO | Kernboodschap, lagenmodel, strategie in het kort |
| [01-methode-evidence-based.md](01-methode-evidence-based.md) | Allen | De werkwijze: IST→SOLL, meten, aantoonbaarheid |
| [02-werkplek-analyse-e5.md](02-werkplek-analyse-e5.md) | Security, beheer | Analyses op het Microsoft-platform (E5) met KQL |
| [03-identiteit-en-email.md](03-identiteit-en-email.md) | Security, beheer | MDO, MDI, Conditional Access, PIM, app-consent |
| [04-netwerk-firewall-config-analyse.md](04-netwerk-firewall-config-analyse.md) | Security, netwerk | Firewalls en core-routers analyseren uit dáta |
| [05-killchain-chokepoints.md](05-killchain-chokepoints.md) | Security | ClickFix-killchain en chokepoints (MITRE) |
| [06-regie-en-accountability.md](06-regie-en-accountability.md) | Management, CISO | Regie, resultaatverplichting, RACI, leveranciers |
| [07-veilig-faciliteren.md](07-veilig-faciliteren.md) | Bestuur, CISO | Langetermijnstrategie i.p.v. reguleren (lockdown) |
| [queries/](queries/) | Beheer, security | Herbruikbare KQL voor Advanced Hunting |

## Gebruik in AI

Deze repo is bedoeld als basis om mee te werken in je favoriete LLM, die van ons Claude Code (ja hyperscaler):
> Heb je een betere lokale LLM op deftige hardware doe het dan daar in. Gaan AI gebruiken omdat je alles 100% zelf
> kan en weet, helemaal top ! Kan je het niet 100% zelf en moet je AI gebruiken en niet de beschikking over deftige hardware
> maak een risicoafweging. Wat is het risico op het niet gebruiken van een US AI (met het zetten van de juiste vinkjes) tov
> niet gebruik vanwege mogelijk misbruik van de data door de US AI. 

1. Clone of importeer de repo en open hem in Claude Code.
2. Gebruik de bestanden in [`queries/`](queries/) als startpunt voor je eigen Advanced Hunting-analyses;
   pas de parent-processen en uitsluitingen aan op je omgeving.
3. Vul de IST→SOLL- en RACI-sjablonen uit hoofdstuk 01 en 06 in met je eigen bevindingen.
4. Houd de bestanden onder versiebeheer, zodat de posture-verbetering aantoonbaar en herhaalbaar wordt.

## Volgorde van aanpak (kort)

1. Meet de werkplek (hoofdstuk 02): wat draait er echt, wie gebruikt wat.
2. Toets de Microsoft-configuratie (02, 03): staat aan ≠ is gekoppeld en actief.
3. Analyseer netwerk en firewall uit data (04): brede regels, beheertoegang, zicht, segmentatie.
4. Leg de killchain naast je controls (05): waar knijp je, waar zit een gat.
5. Beleg regie en resultaatverplichting (06) en kies een strategie (07).

## Licentie

Dit project is gelicentieerd onder de [EUPL-1.2](LICENSE) (European Union Public Licence v1.2).

### Gebruikte software en afhankelijkheden

| Software / afhankelijkheid | Gebruik | Licentie |
|---|---|---|
| — | Deze repository bevat uitsluitend documentatie (Markdown) en KQL-query's; er zijn geen software­afhankelijkheden | n.v.t. |

De KQL-query's zijn bedoeld voor uitvoering in Microsoft Defender Advanced Hunting; daarvoor gelden de licentievoorwaarden van je eigen Microsoft-tenant.
