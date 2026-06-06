# 05 · Killchain en chokepoints (ClickFix)

Leg je controls naast de aanvalsketen. Per fase is er een chokepoint: een plek waar je de aanval kunt
knijpen of zichtbaar maken. Niet elke fase hoeft preventief afgedekt; detectie + herstel kan volstaan voor de
restrisico's. Maak bewust zichtbaar wat je (nog) niet afdekt.

De keten hieronder volgt ClickFix → infostealer/RAT → exfiltratie, met MITRE ATT&CK-fasen. Per fase: het
chokepoint, en of het om preventie of detectie gaat.

| Fase (MITRE) | Voorbeeld | Chokepoint | Preventie / detectie |
|---|---|---|---|
| Initial Access | ClickFix via e-mail/website | Webproxy/SWG (URL-filter, Mark-of-the-Web), e-mailfilter | Preventie |
| Execution | `powershell -enc`, `mshta` via Win+R | EDR · AMSI · script-block-logging · PowerShell CLM · Win+R uit | Beide |
| Persistence (endpoint) | Run-key, scheduled task, startup-folder | EDR/autoruns · Sysmon (EID 13) | Detectie |
| Persistence (M365) | OAuth-consent, mailbox-forwarding | App-consent beperken · MDCA · Entra audit | Beide |
| Privilege Escalation | UAC-bypass (fodhelper/sdclt), loaders | EDR · LSA protection · ASR LSASS-regel | Preventie |
| Defense Evasion | Obfuscatie, LOLBins (regsvr32, msbuild, mshta) | ASR-regels · EDR LOLBin-detectie | Beide |
| Credential Access | Browser-SQLite, DPAPI, LSASS | ASR LSASS · browser-hardening · beheerde password manager | Beide |
| Discovery (AD) | `net group /domain`, BloodHound-collectie | Defender for Identity (AD-recon-detectie) | Detectie |
| Lateral Movement | SMB/WMI/RDP met gestolen creds, cookie-replay | Segmentatie · LAPS · Conditional Access (token binding) · SIEM | Beide |
| Collection | Browser-profielen, fileshare-mount | Audit-logging op shares (EID 4663) · DLP/UEBA | Detectie |
| Exfiltration | HTTPS POST naar C2, WebDAV-variant | Firewall-egress · TLS-inspectie · ASR 'block WebDAV' | Beide |
| Command & Control | Dead-drop resolvers, HTTPS C2 | DNS-filter · domain-reputation in SIEM | Detectie |
| Impact | Datadiefstal + leaksite | Immutable back-up · geteste restore (incl. DC) · IR-runbook · crisisplan | Herstel |

## Preventie versus detectie

- **Preventie** stopt de stap (ASR, CLM, segmentatie, egress-block).
- **Detectie** ziet de stap en maakt opvolging mogelijk (SIEM-regels, EDR, MDI, DNS-reputatie).
- **Herstel** vangt op wat doorkomt (back-up/restore, runbook).

Een gezonde posture heeft op het kritieke pad **meerdere** chokepoints, zodat het uitvallen van één laag niet
meteen de hele keten opent.

## Restrisico's die je bewust accepteert

Niet alles is realistisch af te dekken. Maak deze expliciet in plaats van ze te verzwijgen:

- **Geavanceerde C2/exfiltratie via DNS** is lastig volledig te blokkeren; leun hier op detectie en reputatie.
- **Oost-west-verkeer binnen het datacenter** valt vaak buiten de scope van een NDR rond de campus/access-laag.
  Beleg expliciet wie dit afdekt.

## Impact-anker

Het scenario dat je wilt voorkomen is publiek geïllustreerd door de aanval op een Nederlandse gemeente in
maart 2026: na een ClickFix-uitvoering werden binnen twee dagen honderdduizenden bestanden geëxfiltreerd. Eén
geslaagde keten kan dus een groot incident worden — de business case voor deze maatregelen is risicogebaseerd,
niet gebaseerd op het aantal incidenten.

## Bronnen (publiek)

- MITRE ATT&CK: T1204.004 (Malicious Copy and Paste), T1059.001 (PowerShell), T1219 (Remote Access Software),
  T1566.002 (Spearphishing Link).
- Publieke threat-intelligence over ClickFix en infostealers (o.a. Microsoft Threat Intelligence).
- Publieke berichtgeving over de gemeentelijke ClickFix-casus (maart 2026).
