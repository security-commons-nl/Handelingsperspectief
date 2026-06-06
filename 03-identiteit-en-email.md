# 03 · Identiteit en e-mail

Twee lagen die met E5 grotendeels afgedekt kunnen worden, maar in de praktijk vaak op standaard of "deels"
staan. Het incidentbeeld onderstreept hun belang: in veel gemeenten komt het merendeel van de incidenten via
e-mail en identiteit binnen, niet via de werkplek-uitvoering zelf.

## E-mail — Defender for Office 365 (MDO)

Controleer of MDO meer doet dan de standaard:

- **Preset security policies (Standard/Strict)** of een gelijkwaardig eigen beleid actief — niet alleen
  defaults met losse Safe Links/Safe Attachments.
- **Anti-phishing** met impersonation- en spoofbescherming.
- **Quarantine-notificaties** ingericht.

Omdat e-mail vaak de grootste instroom van incidenten is, is dit doorgaans de **hoogste hefboom**. Toets de
feitelijke inrichting; "we hebben MDO" zegt niets over het beleid dat actief is.

## Identiteit — Entra ID en Defender for Identity (MDI)

Loop deze punten langs:

- **MFA-dekking.** Voor álle gebruikers, niet "voor sommige". Controleer ook break-glass-accounts.
- **Legacy authentication.** Geblokkeerd, niet alleen "report only".
- **Conditional Access.** Met device-compliance en **token binding**. Dit is de tegenmaatregel tegen
  AitM-cookiereplay (gestolen sessietokens), een veelgebruikte vervolgstap na credential-diefstal.
- **Privileged Identity Management (PIM).** Just-in-time verhoogde rechten in plaats van staande rechten.
  Let op het aantal global admins; staande beheerrechten zonder PIM zijn een veelvoorkomend risico.
- **Defender for Cloud Apps (MDCA).** Minimaal voor OAuth-/app-consentmisbruik en mailbox-forwarding-regels.
- **User-consent voor non-verified apps.** Zet op "do not allow user consent". Dit is een eenvoudige,
  effectieve maatregel tegen illicit consent grants.
- **MDI-sensors.** Op domain controllers, en waar van toepassing op ADCS en ADFS, voor detectie van
  verdachte AD-recon (BloodHound-achtige collectie, complete groepsdumps).

## ADCS (Active Directory Certificate Services)

Detectie van certificaatmisbruik (de ESC1–ESC8-technieken) zit **niet** standaard in MDE/EDR. Ga niet uit van
de aanname dat dit "door de endpointbescherming gedekt is" — verifieer het, en richt aanvullende logging in op
de interne CA als die er is.

## Wat "goed" eruitziet

- E-mailbeleid actief en aantoonbaar effectief, niet op defaults.
- MFA overal, legacy auth dicht, Conditional Access met device-compliance en token binding.
- Privileged access just-in-time (PIM), beperkt aantal vaste beheerders.
- App-consent beperkt; MDCA actief voor consent en forwarding.
- MDI-sensors uitgerold en AD-recon-detectie aantoonbaar.
