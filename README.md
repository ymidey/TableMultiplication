# TP : Table de multiplication / Angular



## Présentation

Développement d'une application Web à l'aide du framework Angular.

Niveau : Deuxième année de BTS SIO SLAM

Projet effectué du lundi 15 novembre 2021, au mardi 16 novembre 2021 par Yannick MIDEY.

## Liens dépôts 

Présentation du projet : https://slam-vinci-melun.github.io/sio22/phase2/TP-3.2-Angular-Multiplication.pdf

Dépôts GitHub : https://github.com/ymidey/TableMultiplication

### Prérequis : 

-  Environnement de travail opérationnel

-  Savoir créer un projet Angular avec des composants.
-   Avoir réalisé les TD jusqu’à 2.3
- Avoir compris les modes d’échanges entre Parent et Enfant d’élément du DOM Voir : https://angular.io/guide/inputs-outputs

### Matériels utilisés : 

- OS :  Windows 10
- Version NodeJS : v16.13.0
- Version Angular CLI : 13.0.2
- Version Visual Studio Code : 1.62.2

<div style="page-break-after: always"></div>

## Objectifs : 

#### Première partie :

Conception d’une application web qui affiche une table de multiplication allant de 1 à 10 selon une valeur soumise par l’utilisateur.

### Seconde partie :

En utilisant l'application web créer dans la première partie, il faudra en plus afficher toutes les tables entre 1 et le nombre de table que l'utilisateur souhaite afficher (10 par défaut).



## Présentations des composants du projets

![](https://cdn.discordapp.com/attachments/356833358262697986/910273357562413126/DiagrammeUML.png)

<div style="page-break-after: always"></div>

## <u>Projets</u>

### Mise en place du projet

Tout d'abord on crée le projet avec la commande:

```
ng new TableMultiplication --style=css --routing=false
```

Ensuite nous allons utiliser le framework Bulma pour notre projet, nous allons donc l'installer avec la commande suivante : 

```
npm install bulma --save
```

Puis nous allons l'initialiser dans notre projet en rajouter cette ligne dans le fichier <code>angular.json</code> dans la première catégorie style.

```json
"styles": [
              "node_modules/bulma/css/bulma.min.css", // ici
              "src/styles.css"
            ],
```

<div style="page-break-after: always"></div>

### Première partie : table de multiplication du nombre choisi

Pour commencer, on doit créer un dossier <code>components</code> dans le dossier <code>app\src</code>.

Suite à ceci, on doit créer un nouveau composant TableMultiplication. Pour ce faire, on utilise cette commande:

```
ng generate component components/TableMultiplication
```

Pour la première partie, il nous est demandé de demander à l'utilisateur d'entrer un nombre puis avec ce nombre, générer sa table de multiplication jusqu'à 10.

Nous devons, donc tout d'abord créer un formulaire "parent" dans le fichier <code>app.component.html</code>.

```html
<form [formGroup]="tableForm" (ngSubmit)="multiplication()">
                    <div ng-controller="mainCtrl">
                        <p>Nombre à multiplier : <input class="input is-primary" type="number" 										class="button" formControlName="nombre">
                            <button class="button is-link is-hovered">Multiplier</button>
                        </p>
                    </div>
                </form>
```

Lorsque l'utilisateur cliquera sur le bouton Multiplier, le formulaire exécutera la méthode <code>multiplication</code> situé dans  le fichier <code>app.component.ts</code> avec comme paramètre la valeur de l'input <code>nombre</code>.



Méthode multiplication() : 

```typescript
multiplication() {
    this.isSubmitted1 = true;
    if (this.tableForm.value.nombre != null) {
      this.nombre = this.tableForm.get('nombre')?.value;
    }
    else {
      this.nombre = 1;
    }
  }
```

Cette méthode aura pour but de rendre l'argument <code>isSubmitted1</code> en true, ainsi que de vérifier si la valeur reçu dans la variable <code>nombre</code> du formulaire est non nul. Si, la valeur n'est pas nul, l'argument <code>nombre</code> prend la valeur envoyé sinon il prend la valeur par défaut 1.

```html
<div *ngIf="isSubmitted1">
	<app-table-multiplication [nombre]="nombre"></app-table-multiplication>
</div>
```

Suite au changement de l'argument <code>isSubmitted1</code> en true,  on appelle l'enfant <code>app-table-multiplication</code> en lui donnant comme paramètre la valeur de <code>nombre</code>.

Voici le code de <code>table-multiplication.component.ts</code> : 

```typescript
export class TableMultiplicationComponent implements OnInit {
  @Input() nombre!: number;
  tabChiffres: number[] = [];
  constructor() { }

  ngOnInit(): void {
  this.tabChiffres = this.remplissageTableau();    
  }

  remplissageTableau() {
    let table = [];
    let num = 10;
    let i = 1;
    while (i < (num+1)) {
      table.push(i);
      i++;
    }
    return table;
  }

}

```

La variable <code>nombre</code> du fichier <code>table-multiplication.component.ts</code> reçoit comme valeur la variable <code>nombre</code> (la valeur choisir par l'utilisateur) du component parent <code>app.component.ts</code>.

Le tableau <code>tabChiffres</code> sera d'abord initialiser vide, puis quand la page sera complètement charger, la méthode <code>ngOnInit</code> lui donnera comme valeur, le tableau que retourne la méthode <code>remplissageTableau</code>.

Suite à cela la page html <code>table-multiplication.component.html</code> va être lu.

```html
<table>
    <thead>
        <tr>
            <th>Table de {{nombre}}</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let number of tabChiffres">
            <td>{{ nombre }} * {{ number }} = {{ number * nombre }}</td>
        </tr>
    </tbody>
</table>
```

Avec la boucle <code>*ngFor</code> nous allons lire toute les valeurs du tableau <code>tabChiffres</code> puis pour chaque valeur, nous allons l'afficher (<code>number</code>) et nous allons la multiplier par la variable <code>nombre</code>

Si par exemple, l'utilisateur choisi le chiffre 5, la table de 5 s'affichera de 1x5 jusqu'à 1x10.

![](https://cdn.discordapp.com/attachments/356833358262697986/910277224383533086/Capture.PNG)

<div style="page-break-after: always"></div>

### Seconde partie : table de multiplication de 1 à x (valeur choisi par l'utilisateur)

Pour la seconde partie, on doit créer un nouveau composant TablesMultiplication. Pour ce faire, on utilise cette commande:

```
ng generate component components/TablesMultiplication
```

La seconde partie consiste à affiche les tables de multiplication de 1 à x, selon une valeur choisi par l’utilisateur, la valeur est de 10 par défaut.

Le principe entre les deux parties est assez similaires, nous allons tout d'abord récupérer dans un formulaire "parent" situé dans le  fichier  <code>app.component.html</code> une valeur donné dans un input dans notre cas l'input aura comme nom <code>nombreTables</code> par l'utilisateur puis grâce à un bouton "submit", nous allons envoyé le formulaire ce qui fera appelle à la méthode <code>tablesMultiplication</code> avec comme paramètre la valeur de <code>nombreTables</code>.

```html
<form [formGroup]="tableForm" (ngSubmit)="tablesMultiplication()">
	<p>Nombre de table à afficher :
		<input type="number" class="button" formControlName="nombreTables">
		<button class="button is-link is-hovered">Afficher</button>
 	</p>
</form>
```

Méthode tablesMultiplication() : 

```typescript
tablesMultiplication() {
    this.isSubmitted2 = true;
    console.log(this.tableForm.value.nombreTables);
    if (this.tableForm.value.nombreTables != null) {
      this.nombreTables = this.tableForm.get('nombreTables')?.value;
    }
    else {
      this.nombreTables = 10;
    }
  }
```

Cette méthode aura pour but de rendre l'argument <code>isSubmitted2</code> en true, ainsi que de vérifier si la valeur reçu dans la variable <code>nombreTables</code> du formulaire est non nul. Si, la valeur n'est pas nul, l'argument <code>nombreTables</code> prend la valeur envoyé sinon il prend la valeur par défaut 10.

```html
<div *ngIf="isSubmitted2">
	<app-tables-multiplication [nombreTables]="nombreTables"></app-tables-multiplication>
</div>
```

Suite au changement de l'argument <code>isSubmitted2</code> en true,  on appelle l'enfant <code>app-tables-multiplication</code> en lui donnant comme paramètre la valeur de <code>nombreTables</code>.

Voici le code de <code>tables-multiplication.component.ts</code> : 

```typescript
export class TablesMultiplicationComponent implements OnChanges {
  @Input() nombreTables!: number;
  tableMultiplication: number[] = [];
  constructor() { }

  ngOnChanges(): void {
    this.tableMultiplication = this.remplissageTableauMultiplication();
  }

  remplissageTableauMultiplication() {
    let table = [];
    let num = this.nombreTables;
    let i = 1;
    while (i < (num +1)) {
      table.push(i);
      i++;
    }
    return table;
  }
}
```

La variable <code>tableMultiplication</code> du fichier <code>table-multiplication.component.ts</code> reçoit comme valeur la variable <code>nombreTables</code> (la valeur choisir par l'utilisateur) du component parent <code>app.component.ts</code>.

Le tableau <code>tabMultiplication</code> sera d'abord initialiser vide, puis quand la page sera complètement charger, la méthode <code>ngOnChange</code> lui donnera comme valeur, le tableau que retourne la méthode <code>remplissageTableau</code>.

<u>Explication de la méthode <code>remplissageTableauMultiplication</code> :</u> 

- D'abord nous initialisons un tableau vide <code>table</code>,
- Ensuite, nous créons une variable <code>num</code> avec comme valeur, la valeur de l'argument <code>nombreTables</code> 
- Ensuite, nous créons une variable <code>i</code> avec comme valeur par défaut 1, cette variable va nous permettre de faire notre boucle en l'incrémentant à chaque tour.
- Ensuite, nous créons une boucle <code>while</code> qui sera lu tant que <code>i</code> sera supérieur à <code>(num+1)</code>
- A chaque tour de boucle, la valeur de <code>i</code> sera ajouter au tableau <code>table</code> grâce à la commande <code>table.push(i);</code> puis 

​	Suite à cela la page html <code>table-multiplication.component.html</code> va être lu. Puis, nous allons post-incrementé <code>i</code>.



Suite à cela la page html <code>tables-multiplication.component.html</code> va être lu.

```html
<div>
    <header>
        <p>
            Les tables de multiplication de 1 à {{nombreTables}}
        </p>
    </header>
    <article class="is-multiline columns">
        <div class="column is-3 mb-4" *ngFor="let number of tableMultiplication">
            <app-table-multiplication [nombre]="number"></app-table-multiplication>
        </div>
    </article>
</div>
```

Avec la boucle <code>*ngFor = "let number of tableMultiplication"</code> nous allons lire toute les valeurs du tableau <code>tableMultiplication</code> puis pour chaque valeur, nous allons appeler, l'enfant <code>app-table-multiplication</code> et nous allons donner comme paramètre <code>number</code>. Cette boucle, aura donc pour but d'appeler x fois, l'enfant <code>app-table-multiplication</code> en changeant uniquement le paramètre envoyé.

Si par exemple, l'utilisateur choisi d'afficher toute les tables de 1 à 7, la table de 1 sera affiché de 1x1 jusqu'à 1x10, la table de 2 sera affiché de 2x1 jusqu'à 2x10, jusqu'à arrivé à la table de 7.

![](https://cdn.discordapp.com/attachments/356833358262697986/910286170796199977/Captur2e.PNG)

<div style="page-break-after: always"></div>

## Conclusion

Ce projet ma permis de bien appréhender le framework Angular ainsi que le langage de programmation TypeScript. Je n'ai pas eu trop de difficulté à effectué ce projet, car je n'ai eu quasiment aucune grosse erreur qui m'a beaucoup ralenti.

