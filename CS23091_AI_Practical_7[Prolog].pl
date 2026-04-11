% -------- FACTS --------

%--------- AMIT TIWARI ----------

% male members
male(john).
male(paul).
male(mike).
male(david).
male(chris).

% female members
female(mary).
female(linda).
female(susan).
female(anna).
female(kate).

% parent relationships
parent(john, paul).
parent(mary, paul).

parent(john, linda).
parent(mary, linda).

parent(paul, mike).
parent(susan, mike).

parent(paul, anna).
parent(susan, anna).

parent(linda, chris).
parent(david, chris).

parent(linda, kate).
parent(david, kate).

% -------- RULES --------

% father
father(X, Y) :-
    male(X),
    parent(X, Y).

% mother
mother(X, Y) :-
    female(X),
    parent(X, Y).

% sibling
sibling(X, Y) :-
    parent(Z, X),
    parent(Z, Y),
    X \= Y.

% brother
brother(X, Y) :-
    male(X),
    sibling(X, Y).

% sister
sister(X, Y) :-
    female(X),
    sibling(X, Y).

% grandparent
grandparent(X, Y) :-
    parent(X, Z),
    parent(Z, Y).

% grandfather
grandfather(X, Y) :-
    male(X),
    grandparent(X, Y).

% grandmother
grandmother(X, Y) :-
    female(X),
    grandparent(X, Y).

% uncle
uncle(X, Y) :-
    brother(X, Z),
    parent(Z, Y).

% aunt
aunt(X, Y) :-
    sister(X, Z),
    parent(Z, Y).

% cousin
cousin(X, Y) :-
    parent(A, X),
    parent(B, Y),
    sibling(A, B),
    X \= Y.


:- initialization(main).

main :-
    nl, write('--- FAMILY RELATION OUTPUT ---'), nl,

    write('Father of Paul: '),
    father(X1, paul), write(X1), nl,

    write('Mother of Linda: '),
    mother(X2, linda), write(X2), nl,

    write('Sibling of Linda: '),
    sibling(X3, linda), write(X3), nl,

    write('Grandfather of Mike: '),
    grandfather(X4, mike), write(X4), nl,

    write('Cousin of Mike: '),
    cousin(X5, mike), write(X5), nl,

    nl, write('--- END ---'), nl,

    halt.