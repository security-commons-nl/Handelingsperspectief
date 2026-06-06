# 06 · Regie en accountability

De analyse heeft pas waarde als ze landt in eigenaarschap. Dit hoofdstuk beschrijft hoe je de regie belegt en
hoe je leveranciers stuurt op resultaat.

## Resultaatverplichting, geen inspanningsverplichting

Het uitgangspunt: een onderwerp is pas afgerond als de maatregel **aantoonbaar werkt** — niet als de
leverancier "ermee bezig is geweest". Dat verandert hoe je opdrachten formuleert en afsluit.

### De regie-discipline (geldt voor elk onderwerp)

1. **Definition of Done vooraf.** De leverancier levert per change een meetbaar eindresultaat. De regievoerder
   accepteert die DoD voordat de change start.
2. **Resultaat controleren, niet aannemen.** "Klaar" volgens de leverancier is niet hetzelfde als aantoonbaar
   werkend. De regievoerder verifieert zelf, met bewijs (telemetrie, config-export, een test).
3. **Post-change check.** Na het doorvoeren: werkt de maatregel én is er niets gebroken? Leg het bewijs vast.
4. **Aantoonbaarheid en herijking.** Bestaan, opzet, werking en config-beschikbaarheid vastgelegd, en periodiek
   herijkt — een maatregel die ooit aanstond kan weer afvallen.

## Regie beleggen (voorbeeldindeling)

Beleg de regie intern; de uitvoering ligt doorgaans bij beheerpartners. Een werkbare indeling:

| Onderwerp | Interne regie (accountable) | Uitvoering (voorbeeld) |
|---|---|---|
| Werkplek en e-mail (MDO) | Servicemanagement + technisch applicatiebeheer (M365-beheer) | Beheerpartner werkplek |
| Identiteit en toegang | Security + M365-beheer | Beheerpartner |
| Netwerk en firewall | Security + architectuur | Beheerpartner netwerk |
| Servers en hardening | Security + architectuur | Beheerpartner datacenter |
| SOC/SIEM en detectie | Security | SOC-partner |
| Recovery en back-up | Security + architectuur | Beheerpartner datacenter |

Pas dit aan op je eigen organisatie. Markeer wat nog niet formeel belegd is expliciet als voorstel, en laat het
bevestigen door de CISO/het MT — dat maakt de accountability sluitend.

## RACI- en resultaat-sjabloon

| Onderwerp | Regie (accountable) | Uitvoering | Resultaatverplichting (concreet) |
|---|---|---|---|
| _bijv. werkplek_ | _M365-beheer_ | _beheerpartner_ | _ASR actief op alle endpoints, CLM in productie met dev-uitzondering, aantoonbaar_ |

Formuleer de resultaatverplichting altijd als een toetsbare eindtoestand, niet als een activiteit.

## Leveranciers en de naad ertussen

In veel gemeenten is security verdeeld over meerdere partijen: bijvoorbeeld een partij voor het datacenter en
de server-endpointdetectie, en een andere voor de SOC/SIEM en de netwerk-/campusdetectie (NDR). Dat is werkbaar,
maar er ontstaat een **naad** die je actief moet beheren:

- **Continuïteit bij overdracht.** Gaat de SOC/SIEM over naar een andere partij, borg dan dat bestaande
  detectieregels meegaan en getest worden — neem het niet aan.
- **Dekking over de naad.** Zorg dat geen enkel gebied tussen wal en schip valt (bijvoorbeeld oost-west-verkeer
  in het datacenter dat buiten de campus-NDR valt).
- **Concentratie versus regie.** Eén partij die meerdere rollen vervult (bijvoorbeeld firewallbeheer én SOC) is
  acceptabel **mits** je strak regie voert: functiescheiding waar mogelijk, break-glass, 4-ogen op wijzigingen,
  audit-logging naar een onafhankelijke bestemming, periodieke access-reviews, KPI's en een exit-scenario.

## Sturen op de managed-norm

Vraag van een SOC-/beheerpartner expliciet de vijf elementen van een managed dienst: bijhouden, beheren,
optimaliseren, functionaliteit aanpassen en verantwoorden (rapportage). Toets met een periodieke
aanvalssimulatie of detectie en preventie werkelijk dekken wat is afgesproken — laat het zien, neem het niet aan.
