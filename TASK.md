# Zadanie rekrutacyjne — QA Automation Engineer (Cypress, React, TypeScript)

## Kontekst

W naszym zespole pracujemy z aplikacjami budowanymi w React + TypeScript, dlatego zależy nam nie tylko na znajomości Cypressa, ale również na rozumieniu kodu frontendowego, integracji z API i jakości architektury testów.

Otrzymujesz gotową aplikację `Product Explorer` opartą o React, Vite i TypeScript. Aplikacja korzysta z publicznego API `DummyJSON`.

## Cel zadania

Pokaż, że potrafisz:

- czytać i rozumieć kod React + TypeScript,
- pisać testy E2E, component tests i API tests w Cypressie,
- projektować testy stabilne, czytelne i sensownie utrzymywalne,
- pracować z requestami sieciowymi oraz asercjami na UI i API.

## Zakres zadania

Frontend aplikacji jest gotowy. Twoim zadaniem jest przygotowanie testów automatycznych dla istniejących funkcjonalności.

### Funkcjonalności dostępne w aplikacji

- wyszukiwanie produktów,
- filtrowanie po kategorii,
- łączenie wyszukiwania z filtrem kategorii,
- otwieranie szczegółów produktu w modalu,
- obsługa ładowania i podstawowych błędów,
- dodawanie i usuwanie produktów z ulubionych,
- persistencja ulubionych w `localStorage` po odświeżeniu strony.

## Testy — wymagania minimalne

### 1. E2E
Napisz co najmniej **2 testy E2E**.

Przykładowe scenariusze:
- wyszukiwanie produktu + otwarcie szczegółów + asercje UI i API,
- filtrowanie po kategorii + weryfikacja wyników,
- dodanie do ulubionych + reload strony + weryfikacja persistencji.

**Wymagania:**
- użyj stabilnych selektorów,
- pokaż sensowne asercje nie tylko na UI, ale też na sieci,
- unikaj niepotrzebnych `cy.wait(<ms>)`.

### 2. API
Napisz co najmniej **2 testy API** w Cypressie.

Przykłady:
- walidacja odpowiedzi dla listy produktów,
- walidacja odpowiedzi dla wyszukiwania,
- walidacja listy kategorii,
- walidacja szczegółów produktu,
- walidacja obsługi błędu dla niepoprawnego produktu.

### 3. Component tests
Napisz co najmniej **2 component tests**.

Przykłady:
- `SearchBar`,
- `CategoryFilter`,
- `ProductCard`,
- `ProductDetailsModal`,
- `ErrorState`.

## Dobre praktyki, na które zwracamy uwagę

- czytelna struktura projektu,
- sensowny podział odpowiedzialności,
- TypeScript użyty świadomie,
- brak nadmiarowej abstrakcji,
- testy odporne na flaky behaviour,
- sensowne nazewnictwo,
- przejrzysty README.

## Czego nie wymagamy

- zmian w UI lub rozbudowy aplikacji,
- pełnego pokrycia testami,
- backendu po Twojej stronie.

## Mile widziane

- custom commands lub helpery tam, gdzie mają sens,
- sensowne mockowanie tam, gdzie uznasz je za uzasadnione,
- dodatkowe edge case'y,
- krótki opis decyzji technicznych w README.

## Czas

Sugerowany czas: **2,5–4 godziny**.

## Dostarczenie rozwiązania

- publiczne repozytorium GitHub / GitLab lub archiwum `.zip` bez `node_modules`,
- README z instrukcją uruchomienia,
- krótka informacja o założeniach lub kompromisach, jeśli jakieś przyjąłeś/przyjęłaś.

## Uwaga

W repozytorium mogą znajdować się przykładowe starterowe specy. Nie traktujemy ich jako docelowego rozwiązania zadania.
