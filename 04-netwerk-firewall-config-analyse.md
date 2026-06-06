# 04 · Netwerk, firewall en core-routers analyseren uit data

Het kernprincipe van dit hoofdstuk: **vertrouw niet op de tekening, maar op de configuratie en het verkeer.**
Een netwerkdiagram toont de bedoeling. Of het netwerk werkelijk segmenteert, of beheertoegang werkelijk
beperkt is, en welke regels werkelijk gebruikt worden, blijkt uit de data — niet uit het plaatje.

Dit is defensieve configuratie-analyse: je zoekt naar te brede toegang, ontbrekend zicht en ontbrekende
beperking, om die te verkleinen. De aanpak is vendor-neutraal; voorbeelden zijn indicatief.

## Wat je exporteert en analyseert

### 1. Regels op feitelijk gebruik (hit-counts)
Exporteer de regelset met **hit-counters** en, indien beschikbaar, applicatie-identificatie
(bijv. App-ID / Apps-Seen). Doel: vind brede of "any"-achtige regels en rangschik ze op gebruik.

- Zoek naar regels met zeer hoge hit-counts en brede bron/bestemming/poort (een "full-access"- of any-any-regel
  is een klassiek voorbeeld). Die is bijna altijd te breed ontworpen.
- Indicatief: Palo Alto `show rule-hit-count`, traffic-logs met App-ID; Cisco `show access-list` met
  hit-counts, NetFlow/IPFIX voor het werkelijke verkeer.

### 2. Werkplek → datacenter: beweegt verkeer langs de firewall?
Toets of oost-west-verkeer (dat is verkeer in je interne netwerk, bijvoorbeeld tussen onderdelen in he datacenter 
of tussen locaties) tussen netwerkdelen daadwerkelijk **langs** de firewall gaat, of er onderling omheen beweegt. 
Vergelijk de **routeringstabellen** en flow-/sessielogs met de bedoelde segmentatie. Verkeerdat niet langs de
firewall komt, kan de firewall niet zien of tegenhouden — dat is het pad waarover lateral movement na een besmetting verloopt.
**Citrix nog in gebruik** directe aandacht of in het datacenter deze als een onvetrouwde securityzone is ingericht,
helaas komt het 9/10 keer voor dat deze omgeving direct toegang heeft tot applicatieservers, **levensgevaarlijk**.

>Dus: een kantoor-/Citrix-omgeving die niet met een firewall is gescheiden is een grote rode vlag. Maar
>let op, een Citrix omgeving die met een **L4**-firewall >(poort/protocol) van de servers is gescheiden
> in plaats van **L7** (applicatie/identiteit) is ook een risico. Toets dit; ga niet uit van "het is
>gescheiden".

### 3. Beheertoegang tot firewall en core
- **MFA op beheeraccounts.** Tel de beheeraccounts en controleer of álle een MFA-/SAML-/RADIUS-koppeling
  hebben. Het komt voor dat alle beheeraccounts zónder MFA werken — dat is een directe, eenvoudig te dichten
  bevinding. MFA kan ook geregeld worden met persoonlijke certificaten (netwerkapparatuur werken hier mee en daar
  wil je ook niet een afhankelijkheid van een Authenticatorapp)
- **Out-of-band (OoB) beheer.** Loopt beheer van firewall en core-interfaces via een apart beheernetwerk, of
  via het productienetwerk? Ook wel, kan je vanaf een gewone werkplek direct bij de firewall dan heb je een
  giga probleem. Ook technisch maar nog meer in de cultuur bij de beheerders!
- **Superuser-/break-glass-accounts**, 4-ogen op regelwijzigingen, en een audit-log naar een onafhankelijke
  bestemming.

### 4. Zicht op versleuteld verkeer
Is er **TLS-decryptie/IPS** op de uitgaande werkplek en server verkeer? Zonder decryptie blijft veel moderne malware-
en C2-verkeer (versleuteld over 443) onzichtbaar. Overleg waar nodig met de Privacyafdeling hoe dit in te zetten want er 
wordt geaumtatiseerd gekeken in de data. Dit moet onderbouwd zijn met een DPIA waarin met name het doel duidelijk moet 
zijn, namelijk geen controle op de inhoudelijke data maar bescherming van oa persoonsgegevens tegen cyberaanvallen, de 
AP heeft hier meerdere opinies over gepubliceerd.

### 5. Core-routers en switches (vaak een blinde vlek)
Deze laag wordt in analyses vaak op "te bevestigen" gelaten. Toets actief:
- firmware/OS-versies en bekende kwetsbaarheden van switch en router;
- exposure van de beheer/management-netwrken vanuit werkplek netwerken;
- poortbeveiliging en technieken zoals **802.1X**, en of routering verkeer langs de firewall dwingt.

### 6. Egress-hygiëne richting derden
Brede uitgaande regels naar keten- en leveranciersnetwerken. Het eigen risico is vaak laag, maar het is
slordig ontwerp; versmal , in eigen tempo, in dialoog met de ketenpartners.

### 7. Onbeheerde paden
Let op werkplekken of VPN-/extern-toegangsroutes die wél routering naar het datacenter kennen maar niet in
beheer zijn. Stel de bewegingsvrijheid vast met een gerichte scan vanaf zo'n device; neem het niet aan. Zorg
dat laverancier voor regulier beheer **altijd** via een PAM oplossing gaan. Accepteer **nooit** een directe
RDP via een eigen VPN zonder restricties!

## Hoe je brede regels veilig versmalt

Hetzelfde principe als bij de werkplek: **meet voordat je ingrijpt.** Zet brede regels niet blind dicht.

1. Lees per brede regel uit wat er werkelijk overheen gaat (App-ID/Apps-Seen, flow-logs).
2. Bouw **schaduwregels** (specifieker, log-only) naast de brede regel.
3. Monitor of de schaduwregels het verkeer dekken.
4. Knijp daarna pas de brede regel dicht, met een terugrolplan en in een onderhoudsvenster.

Houd het **break-risk** per wijziging expliciet. Brede regels waar productie overheen rijdt, hebben een hoog
break-risk; beheer-/zicht-maatregelen (MFA op beheer, decryptie-besluit) zijn meestal onafhankelijk door te
voeren met laag risico.

## Volgorde

1. **Nu, laag risico:** MFA/passkey op alle beheeraccounts; OoB-beheer; besluit over TLS-decryptie.
2. **Nu, hoog break-risk, data-gedreven:** brede/any-regels versmallen via meten en schaduwregels.
3. **Parallel:** core/switch-laag in beeld brengen (firmware, MGT-VLAN, 802.1X).
4. **Langere termijn:** segmentatiebeleid vaststellen; L7 tussen de meest kritische segmenten.
