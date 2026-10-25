## ChemicalLab

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://november7.github.io/ChemicalLab/)
[![Language-English-success](https://img.shields.io/badge/Language-English-success)](#english)
[![Język-Polski-red](https://img.shields.io/badge/J%C4%99zyk-Polski-red)](#polski)
[![License: GPL-3.0-only](https://img.shields.io/badge/License-GPL--3.0--only-blue)](LICENSE)

## Polski

**Polska wersja README jest wersją źródłową; wersja angielska jest jej tłumaczeniem.** Nie dotyczy to licencji: plik `LICENSE` zawiera oryginalny angielski tekst GNU GPL v3.

ChemicalLab to zbiór pokazowych, interaktywnych wizualizacji chemicznych przygotowanych w HTML, CSS i JavaScript. Moduły działają w przeglądarce, także offline. Strona główna wczytująca ten README wymaga serwera HTTP lub GitHub Pages.

Projekt zawiera laboratorium „Atom po atomie” z losowanymi wyzwaniami, swobodnym dobieraniem atomów, słownikiem substancji i schematami ich budowy oraz samodzielny układ okresowy 118 pierwiastków z właściwościami i różnymi sposobami kolorowania. Interfejs jest w języku polskim. Postęp wyzwań i wybrane ustawienia są zapisywane lokalnie w przeglądarce (`localStorage`); projekt nie ma backendu ani kont użytkowników.

### Charakter i przeznaczenie projektu

**Projekt jest materiałem pokazowym, niezweryfikowanym i nie jest materiałem edukacyjnym.** Ma służyć przede wszystkim jako inspiracja do tworzenia podobnych interaktywnych materiałów, wizualizacji i interfejsów.

Modele, dane pierwiastków, opisy substancji, wzory, geometrie i klasyfikacje mogą zawierać błędy, nieścisłości lub uproszczenia. Projekt nie przeszedł weryfikacji merytorycznej ani dydaktycznej. Nie należy traktować go jako wiarygodnego źródła wiedzy chemicznej, podręcznika, instrukcji doświadczeń ani podstawy do oceny bezpieczeństwa pracy z substancjami.

W module „Atom po atomie” dobierasz skład substancji z przygotowanej biblioteki, nie przeprowadzasz reakcji chemicznej. Schematy Lewisa są rysunkami 2D; nie odwzorowują przestrzennych kątów w skali. Modele jonowe i sieciowe pokazują uproszczone układy lub proporcje składu. Opisy zagrożeń są skrótowe i nie zastępują kart charakterystyki. Odnośniki do źródeł nie oznaczają niezależnej weryfikacji implementacji.

Przed wykorzystaniem pomysłów lub kodu we własnych materiałach edukacyjnych należy niezależnie zweryfikować dane, modele, założenia i opisy. Informacja o pokazowym charakterze projektu opisuje jego przeznaczenie i ograniczenia, nie wprowadza dodatkowych ograniczeń praw przyznanych przez GPL v3.

### Dostępne symulacje (między innymi):

| Moduł | Zakres |
| --- | --- |
| [Atom po atomie](atoms.html) | Dobieranie atomów i budowanie modeli substancji, losowane wyzwania, słownik substancji oraz schematy wiązań i geometrii. |
| [Układ okresowy](mendelejew.html) | 118 pierwiastków, podpowiedzi z właściwościami oraz kolorowanie według rodzin, bloków, metali i niemetali, stanu skupienia, radioaktywności i charakteru wybranych tlenków. |

Wybierz moduł, a następnie dodawaj atomy kliknięciem lub przeciąganiem w laboratorium albo zmieniaj sposób kolorowania układu okresowego i przeglądaj właściwości pierwiastków. Interfejs symulacji jest w języku polskim.

**[Lista symulacji i dostęp do modułów na GitHub Pages](https://november7.github.io/ChemicalLab/)**

### Uruchomienie lokalne

Projekt jest statyczną stroną i nie wymaga instalowania zależności ani kompilacji. Potrzebna jest przeglądarka z włączonym JavaScriptem. Do uruchomienia całej strony lokalnie potrzebny jest również serwer HTTP; poniższy przykład korzysta z Pythona 3.

1. Pobierz repozytorium jako ZIP i rozpakuj je lub sklonuj je za pomocą Git:

   ```sh
   git clone https://github.com/November7/ChemicalLab.git
   cd ChemicalLab
   ```

2. W katalogu projektu uruchom serwer:

   ```sh
   python -m http.server 8000 --bind 127.0.0.1
   ```

3. Otwórz [http://localhost:8000](http://localhost:8000) w przeglądarce. Aby zatrzymać serwer, naciśnij `Ctrl+C` w terminalu.

Na Windows możesz użyć `py` zamiast `python`, a na macOS i Linux — `python3`.

Pliki `atoms.html` i `mendelejew.html` można też otworzyć bezpośrednio z dysku, zachowując `styles.css` i `mendelejew.js` w tym samym katalogu. Dane modeli i pierwiastków są zapisane lokalnie. Strona główna pobiera `README.md` i `simulations.json` przez `fetch`, dlatego wymaga serwera HTTP. Biblioteki strony głównej znajdują się w `vendor/`; zewnętrzne odznaki README oraz odnośniki do źródeł wymagają internetu.

### Struktura projektu

```text
ChemicalLab/
├── vendor/           # Lokalne kopie bibliotek zewnętrznych
├── simulations.json  # Katalog modułów wyświetlany na stronie głównej
├── index.html        # Strona główna, README i lista modułów
├── atoms.html        # Laboratorium i biblioteka modeli substancji
├── mendelejew.html   # Samodzielny widok układu okresowego
├── mendelejew.js     # Dane pierwiastków i wspólna obsługa układu okresowego
├── ...               # Kolejne pliki symulacji
├── styles.css        # Wspólne style modułów
├── .nojekyll         # Wyłączenie przetwarzania Jekyll na GitHub Pages
├── .gitignore        # Reguły ignorowania lokalnego katalogu tests/
├── README.md         # Dokumentacja po polsku i angielsku
└── LICENSE           # Pełny tekst GNU GPL v3
```

### Testy i rozwój

Katalog `tests/` jest przeznaczony na lokalne testy i jest pomijany przez Git zgodnie z `.gitignore`. Nie jest częścią repozytorium pobieranego przez klonowanie lub jako ZIP.

Jeśli masz lokalny plik `tests/atoms.test.cjs`, uruchom testy w katalogu projektu. Korzystają z wbudowanego modułu `node:test` w Node.js i nie wymagają dodatkowych pakietów:

```sh
node --test tests/atoms.test.cjs
```

Testy sprawdzają wybrane dane modeli oraz zachowania interfejsu z uproszczonym modelem DOM. Nie zastępują kontroli działania w przeglądarce ani niezależnej weryfikacji merytorycznej.

Przy dodawaniu modułu uzupełnij `simulations.json`, aby pojawił się na stronie głównej. Po zmianach sprawdź odpowiednie moduły w przeglądarce i uruchom testy, jeśli masz je lokalnie. Dokumentację aktualizuj najpierw po polsku, a następnie w tłumaczeniu angielskim. Opisując błąd, podaj moduł, ustawienia, kroki odtworzenia oraz oczekiwany i rzeczywisty wynik.

### Autorstwo i wykorzystanie AI

Autor projektu: **Marcin Kowalski (November7)**.

README i symulacje są tworzone przy użyciu narzędzi sztucznej inteligencji. Udział autora w tworzeniu i integrowaniu kodu nie oznacza weryfikacji poprawności chemicznej ani dydaktycznej materiałów. Treści i kod wygenerowane z pomocą AI mogą zawierać błędy.

Źródła danych i modeli są wskazane w sekcjach o źródłach w plikach HTML, m.in. PubChem, Royal Society of Chemistry, OpenStax, NIST oraz publikacje dotyczące promieni atomowych i jonowych. Zachowano te odnośniki i informacje o autorach źródeł.

### Licencja

Copyright (c) 2026 Marcin Kowalski.

Własny kod i dokumentacja projektu są udostępniane na licencji **GNU General Public License, wyłącznie w wersji 3**. Identyfikator SPDX: `GPL-3.0-only`.

Pełny, oryginalny angielski tekst licencji znajduje się w pliku [LICENSE](LICENSE). Projekt jest udostępniany bez gwarancji, w zakresie określonym w licencji. Opis w README nie zastępuje jej pełnych warunków.

Komponenty zewnętrzne w `vendor/` zachowują własne licencje i informacje o prawach autorskich: Marked (MIT) oraz github-markdown-css (MIT). Szczegóły i odnośniki do warunków znajdują się w [vendor/README.md](vendor/README.md). Licencja projektu nie zmienia warunków korzystania z zewnętrznych materiałów wskazanych jako źródła.

## English

**The Polish README is the source version; the English version is its translation.** This does not apply to the license: `LICENSE` contains the original English text of GNU GPL v3.

ChemicalLab is a collection of demonstration-only interactive chemistry visualizations built with HTML, CSS, and JavaScript. The modules run in a browser, including offline. The home page that loads this README requires an HTTP server or GitHub Pages.

The project includes the “Atom by atom” laboratory with randomized challenges, free atom selection, a substance dictionary, and structure diagrams, as well as a standalone periodic table of 118 elements with properties and multiple coloring modes. The interface is in Polish. Challenge progress and selected settings are stored locally in the browser (`localStorage`); the project has no backend or user accounts.

### Purpose and limitations

**This project is unverified demonstration material and is not educational material.** Its main purpose is to inspire the creation of similar interactive materials, visualizations, and interfaces.

Models, element data, substance descriptions, formulas, geometries, and classifications may contain errors, inaccuracies, or simplifications. The project has not undergone scientific or educational validation. It should not be treated as a reliable chemistry reference, a textbook, instructions for experiments, or a basis for assessing the safety of handling substances.

In “Atom by atom,” you select the composition of substances from a predefined library; you do not perform chemical reactions. Lewis diagrams are 2D drawings and do not depict spatial angles to scale. Ionic and network models show simplified arrangements or composition ratios. Hazard descriptions are brief and do not replace safety data sheets. Source links do not imply independent verification of the implementation.

Before reusing ideas or code in educational materials, independently verify the data, models, assumptions, and explanations. This statement describes the project's intended purpose and limitations; it does not impose additional restrictions on the rights granted by GPL v3.

### Available simulations (among others):

| Module | Scope |
| --- | --- |
| [Atom by atom](atoms.html) | Selecting atoms and building substance models, randomized challenges, a substance dictionary, and diagrams of bonds and geometry. |
| [Periodic table](mendelejew.html) | 118 elements, property tooltips, and coloring by families, blocks, metals and nonmetals, physical state, radioactivity, and the character of selected oxides. |

Choose a module, then add atoms by clicking or dragging in the laboratory, or change the periodic table's coloring mode and explore element properties. The simulation interface is in Polish.

**[Simulation list and module access on GitHub Pages](https://november7.github.io/ChemicalLab/)**

### Running locally

The project is a static website and requires no dependency installation or build step. A browser with JavaScript enabled is required. Running the entire site locally also requires an HTTP server; the example below uses Python 3.

1. Download the repository as a ZIP archive and extract it, or clone it using Git:

   ```sh
   git clone https://github.com/November7/ChemicalLab.git
   cd ChemicalLab
   ```

2. Start the server from the project directory:

   ```sh
   python -m http.server 8000 --bind 127.0.0.1
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser. To stop the server, press `Ctrl+C` in the terminal.

On Windows, you can use `py` instead of `python`; on macOS and Linux, use `python3`.

You can also open `atoms.html` and `mendelejew.html` directly from disk, keeping `styles.css` and `mendelejew.js` in the same directory. Model and element data are stored locally. The home page loads `README.md` and `simulations.json` using `fetch`, so it requires an HTTP server. Home page libraries are stored in `vendor/`; external README badges and source links require internet access.

### Project structure

```text
ChemicalLab/
├── vendor/           # Local copies of third-party libraries
├── simulations.json  # Module catalog displayed on the home page
├── index.html        # Home page, README, and module list
├── atoms.html        # Laboratory and substance model library
├── mendelejew.html   # Standalone periodic table view
├── mendelejew.js     # Element data and shared periodic table behavior
├── ...               # Additional simulation files
├── styles.css        # Shared module styles
├── .nojekyll         # Disables Jekyll processing on GitHub Pages
├── .gitignore        # Ignore rules for the local tests/ directory
├── README.md         # Polish and English documentation
└── LICENSE           # Complete GNU GPL v3 text
```

### Testing and development

The `tests/` directory is intended for local tests and is ignored by Git according to `.gitignore`. It is not included when cloning the repository or downloading it as a ZIP archive.

If you have the local `tests/atoms.test.cjs` file, run the tests from the project directory. They use Node.js's built-in `node:test` module and require no additional packages:

```sh
node --test tests/atoms.test.cjs
```

The tests check selected model data and interface behaviors using a simplified DOM model. They do not replace browser checks or independent scientific validation.

When adding a module, update `simulations.json` so it appears on the home page. After making changes, check the relevant modules in a browser and run the tests if you have them locally. Update documentation in Polish first, then update the English translation. When reporting a bug, include the module, settings, reproduction steps, and expected and actual results.

### Authorship and AI assistance

Project author: **Marcin Kowalski (November7)**.

The README and simulations are created using AI tools. The author's involvement in creating and integrating the code does not constitute scientific or educational validation of the materials. AI-assisted content and code may contain errors.

Data and model sources are identified in the source sections of the HTML files, including PubChem, the Royal Society of Chemistry, OpenStax, NIST, and publications on atomic and ionic radii. These links and source author attributions have been preserved.

### License

Copyright (c) 2026 Marcin Kowalski.

The project's own code and documentation are licensed under the **GNU General Public License, version 3 only**. SPDX identifier: `GPL-3.0-only`.

The complete, original English license text is in [LICENSE](LICENSE). The project is provided without warranty to the extent described in the license. This README summary does not replace its full terms.

Third-party components in `vendor/` retain their own licenses and copyright notices: Marked (MIT) and github-markdown-css (MIT). Details and links to their terms are in [vendor/README.md](vendor/README.md). The project license does not change the terms applicable to external materials cited as sources.
