# carte-calorique-multilangage
Exercice multilangage TypeScript, Python et C++ : utiliser les fonctions map pour rapprocher stocks, recettes et carte d’un restaurant, puis rendre accessible la valeur calorique brute des produits. Application pédagogique des principes du modèle fractal universel étendu.

# Carte calorique multilangage

> Utiliser `map` en TypeScript, Python et C++ pour rapprocher les informations d'un restaurant et rendre la valeur calorique brute de ses produits plus facilement accessible.

## Le problème

Un restaurant possède déjà une grande partie des informations nécessaires pour connaître la composition de ce qu'il sert.

D'un côté se trouvent les **stocks** :

* ingrédients ;
* quantités disponibles ;
* valeur calorique unitaire.

De l'autre se trouve la **carte** :

* produits proposés ;
* recettes ;
* ingrédients nécessaires à chaque produit.

Ces informations existent, mais elles sont séparées.

Pour l'équipe du restaurant, cela oblige à passer mentalement d'un ensemble de données à l'autre.

Pour le client, le résultat de ces calculs reste généralement invisible : il connaît le nom et le prix du produit, mais pas nécessairement sa valeur calorique brute.

Le défi de ce projet est donc simple :

> **Comment rapprocher automatiquement ces informations pour transmettre une donnée supplémentaire utile, sans mélanger les données sources ?**

---

# 🎯 Mission

Vous devez construire une petite chaîne de transformation capable de partir :

```text
STOCKS                        CARTE
──────                        ─────
Bœuf                          Burger
Pain                          Salade
Tomate                        ...
Salade
...
```

et d'obtenir :

```text
STOCKS + RECETTES
        │
        ▼
   produits réalisables
        │
        ▼
 composition des produits
        │
        ▼
 valeur calorique brute
        │
        ▼
      CARTE
```

Par exemple :

```text
Burger
12,00 €
≈ 650 kcal
```

L'objectif n'est pas de produire une recommandation nutritionnelle personnalisée.

Il s'agit de rendre accessible une **information quantitative supplémentaire**, afin que le consommateur qui souhaite suivre ses apports puisse utiliser cette donnée directement sur son téléphone et l'intégrer à ses propres calculs et à l'organisation de son après-repas.

La valeur calorique ne permet cependant pas, à elle seule, de déterminer un temps de digestion individuel : celui-ci dépend notamment de la composition du repas et de facteurs propres à chaque personne.

---

# 🧩 Niveau 1 — Simplifier avant de généraliser

Cette première démonstration impose volontairement une règle simplificatrice :

> **Un ingrédient donné n'intervient qu'une seule fois dans la recette d'un produit.**

Une recette peut donc être représentée comme :

```text
Burger
├── pain       1 unité
├── bœuf       150 g
├── tomate      40 g
└── salade      20 g
```

et non :

```text
Burger
├── tomate      20 g
├── bœuf       150 g
├── tomate      20 g
└── ...
```

Cette contrainte n'est pas une règle de restauration.

C'est une **règle du niveau 1 de l'exercice**, destinée à isoler le mécanisme de cartographie avant d'introduire des cas plus complexes.

---

# 🗺️ Pourquoi `map` ?

Nous disposons initialement d'une collection d'ingrédients :

```text
Ingredient[]
```

Nous voulons obtenir une nouvelle représentation :

```text
Ingredient[]
      │
      │ map
      ▼
StockItem[]
```

Puis exploiter les relations entre plusieurs collections :

```text
StockItem[]          Product[]
     │                   │
     └─────────┬─────────┘
               │
               ▼
        produits disponibles
               │
               ▼
          ProductInfo[]
```

Le même raisonnement sera implémenté dans plusieurs langages.

---

# 💻 Trois langages, un même problème

Le projet sert principalement d'exercice pour comparer les mécanismes de transformation de collections.

## TypeScript

```ts
const stockItems = ingredients.map(
    ingredient => ({
        ingredient,
        availableQuantity: ingredient.quantity
    })
);
```

## Python

Python permet notamment d'exprimer cette transformation avec une compréhension de liste :

```python
stock_items = [
    {
        "ingredient": ingredient,
        "available_quantity": ingredient["quantity"]
    }
    for ingredient in ingredients
]
```

## C++

La même opération peut être exprimée avec les algorithmes de la bibliothèque standard :

```cpp
std::transform(
    ingredients.begin(),
    ingredients.end(),
    std::back_inserter(stockItems),
    [](const Ingredient& ingredient)
    {
        return StockItem{
            ingredient,
            ingredient.quantity
        };
    }
);
```

La syntaxe change.

Le processus reste le même :

```text
collection A
    │
transformation
    │
    ▼
collection B
```

---

# 🍽️ Exemple

Supposons que le restaurant dispose des données suivantes :

```text
Bœuf
quantité : 5 000 g
2,5 kcal/g

Tomate
quantité : 2 000 g
0,18 kcal/g
```

Une recette utilise :

```text
Burger
├── Bœuf     150 g
└── Tomate    50 g
```

La valeur calorique brute associée à ces deux ingrédients est :

```text
Bœuf
150 × 2,5
= 375 kcal

Tomate
50 × 0,18
= 9 kcal
```

Soit :

```text
384 kcal
```

pour les ingrédients considérés dans cet exemple simplifié.

Le programme ne modifie ni la recette ni les données sources.

Il **produit une information dérivée**.

---

# 📱 Du système interne à l'information client

L'intérêt du problème apparaît lorsque la même information traverse plusieurs échelles.

### Échelle interne

```text
stocks
  +
recettes
  +
disponibilités
```

### Échelle produit

```text
produit
  +
composition
  +
valeur calorique calculée
```

### Échelle client

```text
Nom du produit
Prix
Valeur calorique brute
```

Une information initialement dispersée dans le système interne devient ainsi une ligne lisible sur une fiche produit.

Le client n'a pas besoin de connaître la structure informatique qui a permis de l'obtenir.

---

# 🔎 Adapter le facteur d'échelle de l'information

Cette idée constitue le lien entre l'exercice et le **modèle fractal universel étendu**.

Le projet applique certains principes structurels développés dans le repository de référence :

**modele-fractal-universel-etendu**
E1LaeTID/modele-fractal-universel-etendu

Le moteur d'origine travaille notamment sur des mécanismes de transformation, de substitution et de changement d'échelle appliqués à des structures géométriques.

Ici, ces principes sont utilisés de manière simplifiée pour réfléchir à la transformation de l'information.

Il ne s'agit donc pas d'affirmer que les stocks ou les recettes sont des fractales.

L'idée est plutôt de conserver une séparation explicite entre :

```text
SOURCE
  │
  ├── données de stock
  └── données produit

TRANSFORMATION
  │
  └── opérations de cartographie

INFORMATION DÉRIVÉE
  │
  └── valeur calorique

DESTINATION
  │
  └── information lisible
```

Le **facteur d'échelle de l'information** désigne ici le changement de représentation nécessaire pour passer d'un ensemble de données techniques détaillées à une information adaptée à son destinataire.

```text
INFORMATION DÉTAILLÉE
stocks + ingrédients + recettes
              │
              │ changement d'échelle
              ▼
       INFORMATION PRODUIT
              │
              │ changement d'échelle
              ▼
       INFORMATION CLIENT
             kcal
```

Une donnée peut donc conserver sa signification tout en changeant de niveau de représentation.

---

# 🧱 Architecture

La version TypeScript introduit plusieurs groupes conceptuels.

```text
src/
│
├── Container/
│
├── Entity/
│
├── Exercises/
│
├── Path/
│
├── Restaurant/
│
└── Source/
```

### `Source`

Décrit l'origine et le contexte des informations.

### `Entity`

Représente les objets identifiables manipulés par le modèle.

### `Path`

Décrit les relations et transformations permettant de passer d'une information à une autre.

### `Container`

Représente les ensembles sur lesquels les opérations sont réalisées.

### `Restaurant`

Applique ces abstractions au problème concret :

```text
ingrédients
stocks
pertes
produits préparés
calories
```

### `Exercises`

Contient les exercices destinés à pratiquer progressivement les transformations de collections.

---

# 🔄 Ne pas confondre les deux ensembles

Une contrainte importante du projet consiste à conserver distincts :

```text
STOCK                         CARTE PRODUIT
─────                         ─────────────
ce qui existe                 ce qui peut être proposé
```

Le programme établit des relations entre eux sans les transformer prématurément en une structure unique.

```text
        STOCK
          │
          │
          ▼
       relation
          ▲
          │
          │
       PRODUIT
```

Les informations calculées constituent alors un troisième niveau :

```text
STOCK ──────┐
            │
            ├──► INFORMATION DÉRIVÉE
            │
PRODUIT ────┘
```

Cette séparation facilite la compréhension de l'origine de chaque donnée et limite les confusions lorsque de nouvelles transformations sont ajoutées.

---

# 🧠 Progression des exercices

Le projet peut être parcouru comme une succession de niveaux.

```text
NIVEAU 1
Ingredient[]
     │
     │ map
     ▼
StockItem[]
```

Puis :

```text
NIVEAU 2
StockItem[]
     │
     ▼
états de disponibilité
```

Puis :

```text
NIVEAU 3

StockItem[] ─────┐
                 ├──► produits réalisables
Product[] ───────┘
```

Puis :

```text
NIVEAU 4

recette
  +
calories des ingrédients
  │
  ▼
calories du produit
```

Enfin :

```text
NIVEAU 5

données internes
      │
      ▼
information produit
      │
      ▼
information client
```

L'objectif n'est donc pas seulement de mémoriser une syntaxe.

Il s'agit de comprendre **quelle transformation est effectuée**, puis d'être capable de la retrouver dans différents langages.

---

# 🔬 Au-delà de `map`

Le cas d'étude permet ensuite d'introduire naturellement d'autres opérations.

```text
MAP
Transformer une collection.

FILTER
Sélectionner les éléments répondant à une condition.

REDUCE
Produire une valeur agrégée.
```

Par exemple :

```text
map
→ transformer les ingrédients en éléments de stock

filter
→ identifier les ingrédients disponibles

map + relations
→ déterminer les produits réalisables

map + reduce
→ calculer leur valeur calorique brute
```

Ces extensions pourront constituer des niveaux supplémentaires.

---

# 🚧 Limites de la démonstration

Cette version est volontairement pédagogique.

Elle ne constitue pas :

* un logiciel professionnel de gestion de restaurant ;
* un système réglementaire d'information nutritionnelle ;
* un outil médical ;
* un calculateur personnalisé de digestion ;
* une représentation exhaustive des pertes et transformations culinaires.

Les valeurs obtenues dépendent directement de la qualité des données fournies au programme.

Le **niveau 1** suppose également qu'un ingrédient n'apparaît qu'une fois dans une même recette.

Les versions suivantes pourront progressivement lever ces simplifications.

---

# 🌱 Finalité

Ce repository part d'un exercice de programmation volontairement concret :

> **Peut-on apprendre à mieux manipuler les collections en programmation tout en construisant une information qui devient réellement lisible pour quelqu'un ?**

Le restaurant fournit un terrain d'expérimentation particulièrement adapté.

Les données existent à plusieurs endroits.

`map` permet de commencer à les transformer.

Les relations permettent de les rapprocher.

Le changement d'échelle permet enfin de transformer un ensemble technique détaillé en une information simple :

```text
Produit
Prix
Calories brutes
```

TypeScript, Python et C++ deviennent alors trois façons d'exprimer le même raisonnement.

---

## Repository de référence

Ce projet applique de manière simplifiée certains concepts développés dans :

**E1LaeTID / modele-fractal-universel-etendu**

Moteur de substitution géométrique récursive combinant motifs ouverts, contours fermés, réduction de contours et rétrogradation des niveaux de récursion.

Le repository présent transpose une partie de cette réflexion vers un exercice de **cartographie et de changement d'échelle de l'information**.
