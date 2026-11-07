# Guide de contribution — Unedy

Ce document est la **base commune de tous les projets Unedy**. Il dit comment on travaille ensemble sur le code. À lire avant ton premier commit sur un nouveau projet.

Ce qui est propre à un projet (technologies, commandes de lancement, scopes de commits, responsable, définition de « terminé ») est dans le `README.md` du dépôt. En cas de conflit, le `README.md` du projet gagne sur ce guide pour les détails techniques, et la charte d'Unedy gagne sur tout le reste.

---

## 1. Avant de commencer

- **Accès** : tu vois un dépôt seulement si tu es dans l'équipe GitHub du projet (`proj-<nom>`). Si tu n'y es pas alors que tu devrais, demande au responsable de projet.
- **Installation** : suis le `README.md` du projet. Si elle ne marche pas après 15 minutes, **écris dans le groupe Projets** (message qui commence par `[Projet]`) au lieu de perdre du temps seul.
- **Variables secrètes** : copie `.env.example` en `.env` et remplis-le. Le fichier `.env` ne va **jamais** sur GitHub (voir section 6).

---

## 2. Branches

- **`main` est la version qui marche.** Personne n'y envoie du code directement, pas même le responsable de projet. Tout passe par une Pull Request (PR).
- Une branche par tâche (Issue), jamais une branche fourre-tout.
- **Nommage : `prénom/ce-que-tu-fais`**, en minuscules, sans accent, avec des tirets. Le prénom de celui qui travaille, puis 2 à 4 mots maximum.
  - Exemples : `mariano/panier`, `eckson/menu-mobile`, `adler/traduction-anglais`.
  - Le type (`feat`, `fix`…) n'est pas dans le nom de la branche : il va dans les commits et dans le titre de la PR (section 3).
  - Une branche = une tâche courte. Si tu as du mal à la nommer en 4 mots, elle est trop grosse : découpe-la.
- Pars toujours de `main` à jour : `git pull origin main` puis `git switch -c mariano/panier` (avec ton prénom).
- **Durée de vie courte** : une branche ouverte depuis plus de 2 jours est un signal d'alerte. Découpe la tâche en plus petit.
- Après la fusion : supprime la branche.

**Pourquoi** : une personne qui casse `main` bloque toute l'équipe derrière elle. La PR est le moment où quelqu'un d'autre relit, c'est ton seul filet contre les erreurs de logique que l'auteur ne voit plus.

> **Vérification à faire une fois par dépôt** : la protection de `main` (interdire les envois directs) est un réglage GitHub. Sur un dépôt privé d'une organisation gratuite, il se peut qu'elle ne soit pas disponible. Le responsable de projet le vérifie dans *Settings → Branches*. Si elle est indisponible, la règle reste valable : c'est une règle d'équipe, et le responsable contrôle l'historique.

---

## 3. Commits

On utilise les **Conventional Commits**, **en anglais**.

```
<type>(<scope>): <description courte, à l'impératif, en minuscules, sans point final>

[corps optionnel : explique le pourquoi]

[pied optionnel : Closes #14]
```

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `refactor` | Réorganisation sans changer le comportement |
| `docs` | Documentation seulement |
| `test` | Tests |
| `chore` | Configuration, dépendances, outils |
| `style` | Formatage pur |
| `perf` | Performance |

**Les scopes** (`auth`, `cart`, `admin`…) sont listés dans le `README.md` de chaque projet.

Règles :
1. Impératif présent : `add`, pas `added`.
2. **Une idée = un commit.** Ne mélange pas `feat` et `fix`.
3. Renvoie à la tâche : `Closes #14` en pied de message.
4. Si quelqu'un d'autre ou un agent a écrit une partie : `Co-authored-by: Nom <e-mail>`.

Exemples :
```
feat(cart): add quantity selector
fix(menu): stop horizontal scroll on 360px screens
chore(deps): bump vite to latest patch
```

---

## 4. Pull Requests

1. Ouvre la PR dès que ta branche a du contenu. Si ce n'est pas prêt, mets `[WIP]` dans le titre.
2. **Description minimale** : la tâche résolue (`Closes #X`), ce que tu as testé à la main, et ce que le relecteur doit regarder en premier.
3. **Les vérifications automatiques passent** (tests, linting) avant la fusion.
4. **Une relecture minimum, par quelqu'un qui n'a pas écrit le code** (charte, article 7).
5. **Fusion : *Squash and merge* uniquement.** Un commit sur `main` = une fonctionnalité complète. L'auteur de la PR fusionne après l'approbation.

### Liste « terminé » de chaque PR
- [ ] Je comprends chaque ligne que j'envoie, y compris celles écrites par un agent IA.
- [ ] Rien de secret dans le code ni dans les fichiers ajoutés (clés, mots de passe, données de clients).
- [ ] Sur mobile (360 px) : pas de défilement horizontal, le bouton principal est visible.
- [ ] Aucun fichier inutile : captures de tests, dossiers de build, sauvegardes.
- [ ] Si j'ajoute une dépendance : je dis pourquoi (poids, maintenance, licence).
- [ ] Si le projet a un journal (`docs/JOURNAL.md`) : le changement important y est noté.

---

## 5. Relectures

- **Délai** : une PR en attente de relecture depuis plus de **24 heures** se signale dans le groupe Projets. Une relecture oubliée bloque quelqu'un d'autre.
- **Celui qui relit teste** : si le changement touche une logique métier, il le lance en local au lieu de lire le diff des yeux.
- **L'équipe Sécurité relit obligatoirement** toute PR qui touche : l'authentification, les permissions et les rôles, le paiement, les secrets, les données personnelles, les migrations de base de données. Elle passe avant les autres relectures.
- Une relecture critique le code, jamais la personne. Une remarque dit ce qui ne va pas **et pourquoi**.

---

## 6. Secrets et données

**Règle** : une clé, un mot de passe ou une donnée de client ne va jamais dans Git. Même supprimée ensuite, elle reste lisible dans l'historique.

- Secrets = variables d'environnement. `.env` est dans `.gitignore`. Le modèle `.env.example` contient les **noms** des variables, jamais les valeurs.
- **Pas de valeur de secours en dur** : écris `process.env.MA_CLE` sans ajouter `|| "vraie-cle"`.
- Clés de **test** pour développer. Les clés réelles n'existent qu'en production.
- Avant de pousser un projet existant : vérifie son historique (`gitleaks detect`).
- **Si une clé fuit** : 1. **révoque-la** chez le fournisseur, tout de suite. 2. préviens le responsable de projet et la Sécurité. 3. note l'incident dans le journal. Retirer le fichier de Git ne suffit pas.
- Aucune donnée de client réelle dans les dépôts ni dans les captures d'écran (charte, article 11).

---

## 7. Travailler avec des agents IA

On utilise beaucoup d'agents (Claude Code, Antigravity, KernTrame…). Ils sont traités comme un membre de l'équipe qui n'a jamais le dernier mot :

1. **Tu es responsable de ce que l'agent écrit.** Si tu ne peux pas l'expliquer, tu ne l'envoies pas.
2. **Même procédure qu'un humain** : branche, PR, vérifications, relecture. **Aucune fusion automatique**, même si tout est vert.
3. **Coder peu, coder bien** : pour corriger un bug, cherche d'abord la cause réelle. Une correction qui change 500 lignes pour un problème d'une ligne est un signal d'alerte.
4. **Interdit** de modifier un test, un seuil de qualité ou une règle de vérification pour faire passer un changement.
5. **Les fichiers de travail de l'agent** (captures de tests, journaux, essais) restent hors de Git : ajoute-les à `.gitignore`.
6. Les fichiers d'instructions (par exemple `CLAUDE.md`) peuvent être dans le dépôt, **sans secret**.
7. **Ne donne jamais à l'agent une clé réelle.** Clés de test seulement.

---

## 8. Suivre le travail

- **Issues** : une tâche = une Issue, avec un préfixe de domaine : `[Front] …`, `[Back] …`. Tu t'assignes une Issue avant de commencer, pour que deux personnes ne fassent pas la même.
- **Tableau** (GitHub Projects) : `Backlog` → `En cours` → `En relecture` → `Testé` → `Fait`.
- **Point de situation** : chaque jour de travail, trois lignes dans le groupe Projets : `[Projet] Hier : … / Aujourd'hui : … / Blocage : …`. Les meet-ups du jeudi et du samedi servent aux décisions, pas à lire cette liste.
- **Journal du projet** (`docs/JOURNAL.md`) : une entrée à chaque décision ou changement important, avec le pourquoi. Il alimente le **bilan de fin de projet** (charte, article 4).

---

## 9. Déploiement et versions

- On déploie **depuis `main` uniquement**, et c'est le **responsable de projet** qui décide.
- Chaque livraison reçoit une **étiquette de version** : `git tag v1.0.0`.
- Avant de livrer à un client : l'audit de l'équipe Sécurité est fait, et quelqu'un qui n'a pas écrit le code a testé les parcours principaux (charte, article 7).
- Si un déploiement casse quelque chose : **retour à la version précédente d'abord**, enquête ensuite.

---

## 10. Quand ça tourne mal

- **Bug en production** : branche `prénom/fix-…` depuis `main`, PR accélérée (relecture par une personne, pas d'attente des 24 h), déploiement, puis note dans le journal.
- **Un conflit de fusion que tu ne sais pas résoudre** : demande de l'aide dans le groupe Projets avant de forcer quoi que ce soit.
- **Jamais** `git push --force` sur `main`.

---

## Annexe : modèle de PR

À copier dans `.github/pull_request_template.md`.

```
## Ce que fait cette PR
Closes #

## Comment je l'ai testée

## Le relecteur doit regarder en premier

## Liste « terminé »
- [ ] Je comprends chaque ligne, y compris celles écrites par un agent
- [ ] Aucun secret ni donnée de client
- [ ] Mobile 360 px vérifié
- [ ] Pas de fichiers inutiles (captures, builds)
- [ ] Dépendance ajoutée : justifiée
- [ ] Journal mis à jour si nécessaire
- [ ] Relecture Sécurité demandée si : auth, permissions, paiement, secrets, données personnelles
```
