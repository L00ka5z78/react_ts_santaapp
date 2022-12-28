prrzerobiony na ts projekt koncowy z baz danych

projekt koncowy z baz danych

pierwsza czesc to przypomnienie expressa, a druga to polaczenie z baza danych.
mozna zrobic zarowna z relacyjna jak i nierelacyjna baza danych.

ZAKRES PROJEKTU
***********************************************
Zarzadzanie prezentami dla sw mikolaja ********
***********************************************
wyglad

widok dzieci == strona głowna ************

Lista dzieci i przypisany prezent. dzieci wyswietlamy alfabetycznie.
na ten moment wpisujemy prezent jako 'brak'. Dziecko wyswietlamy jako tekst
a prezent jako select oraz przycisk zapisz.

U dolu, jest mozliwosc dodanie kolejnego dziecka.

widok prezentow ******************

prezenty to prosta lista. nazwa i ilosc
na dole jest formularz dodawania prezentow- wpisuje sie nazwe i ilosc dostepnego
prezentu.

Wyswietlanie prezentow **********************

w seletach przy dzieciach wyswietlamy na pierwszym miejscu 'brak', a potem alfabetycznie
wszystkie prezenty.

powiazania prezentow  **************************

podczas zapisywania prezentu najpierw sprawdzamy czy jest dostepny == stan magazynowy
to wiecej niz zero
Stan magazynowy to ilosc prezentow minus to ile razy prezent jest wykorzystany.

uyjemy na poczatku mock === cos co bedzie udawalo dane przykladowe


JEZELI HANDLEBARSY NIE DZIALAJA PRZY requiere hbs
WYSTARCZY ZMIENIS NA {engine}.



