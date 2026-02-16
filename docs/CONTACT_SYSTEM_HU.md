# Kapcsolati Űrlap és Email Rendszer Működése

Ez a dokumentum részletesen leírja, hogyan működik a weboldal kapcsolatfelvételi rendszere, a frontend űrlaptól kezdve a backend feldolgozáson át az emailek kiküldéséig.

## 1. Frontend: Az Űrlap (`ContactForm`)

**Helye:** `src/components/forms/contact-form.component.tsx`

A látogató ezen keresztül lép kapcsolatba veled. A rendszer a következőket végzi el:

- **Lokalizáció:** Az űrlap mezői (Név, Email, Üzenet stb.) és a hibaüzenetek a felhasználó által választott nyelven (`hu` vagy `en`) jelennek meg.
- **Validáció:** A böngészőben azonnal ellenőrizzük, hogy minden kötelező mező ki van-e töltve és az email cím formátuma helyes-e (Zod séma segítségével).
- **Adatgyűjtés:** A kitöltött adatok mellé a rendszer automatikusan csatolja az **aktuális nyelvet (`locale`)** is, hogy tudjuk, milyen nyelven kell válaszolni.

## 2. Backend: Server Action (`submitContactAction`)

**Helye:** `src/actions/contact.action.tsx`

Amikor a felhasználó a "Küldés" gombra kattint, az adatok közvetlenül egy szerver oldali függvényhez (Server Action) érkeznek. Ez a modern Next.js megoldás API route-ok helyett. A folyamat lépései:

1.  **Validálás (Szerver oldalon):** Újra ellenőrizzük az adatokat, hogy biztosan helyesek legyenek (biztonsági okokból).
2.  **Spam Szűrés (Honeypot):** A rendszer megnézi a rejtett `confirmEmail` mezőt. Ha ez ki van töltve (amit csak robotok tesznek meg), akkor a hívást sikeresnek hazudja, de nem ment semmit, így védve téged a spam-től.
3.  **Mentés az Adatbázisba (Sanity CMS):**
    - Minden érvényes megkeresés elmentésre kerül a Sanity-be egy `inquiry` típusú dokumentumként.
    - Így az összes üzenet egy helyen, biztonságosan tárolódik és visszakereshető.

## 3. Email Küldés (Resend)

A rendszer kétféle emailt küld ki a **Resend** szolgáltatáson keresztül:

### A. Értesítés Neked (Tulajdonosnak)

- **Címzett:** A `CONTACT_TO_EMAIL` környezeti változóban megadott cím (pl. a te email címed).
- **Tartalom:** Az összes beküldött adat (Név, Email, Szolgáltatás típusa, Üzenet, stb.) egy átlátható formátumban.
- **Komponens:** `src/components/emails/contact-notification.tsx`

### B. Visszaigazolás az Ügyfélnek

- **Címzett:** A kitöltő által megadott email cím.
- **Lokalizáció (A lényeg!):**
  - Az API megnézi, milyen nyelven (`locale`) érkezett a kérés.
  - Lekéri a szerverről a megfelelő nyelvű szövegeket (`messages/hu.json` vagy `messages/en.json`).
  - Ezeket a lefordított szövegeket (Tárgy, Megszólítás, Szövegtörzs) adja át az email sablonnak.
- **Eredmény:** Ha magyar oldalon töltötték ki, magyarul kapják a visszaigazolást. Ha angolon, angolul.
- **Komponens:** `src/components/emails/contact-confirmation.tsx`

## Összefoglalva

A rendszer **teljesen automatizált és kétnyelvű**. A felhasználó élménye (UX) végig konzisztens marad: ha magyarul kezdte a böngészést, magyarul tölti ki az űrlapot, és magyarul is kap választ. Te pedig mindenről azonnal értesülsz, és az adatok biztonságban vannak a CMS-ben is.
