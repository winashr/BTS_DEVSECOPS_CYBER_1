# TP DevSecOps : Projet Node.js volontairement vulnérable

Bienvenue !
Cet exercice vous place dans la peau d’une équipe DevSecOps : votre mission est de scanner, détecter, corriger et documenter les vulnérabilités d’un petit projet Node.js volontairement vulnérable.
Important : le dépôt contient des secrets factices (fichiers .env, private_key.pem) uniquement à des fins pédagogiques. Ne publiez jamais de vraies clés dans un dépôt public.

Objectifs du TP

Identifier toutes les vulnérabilités présentes (dépendances, fuites de secrets, mauvaises pratiques dans le code, etc.).

Corriger le projet pour que les scans automatiques (GitHub Actions : Trivy, Snyk, Gitleaks) ne remontent plus de findings critiques.

Produire et rendre un tableau récapitulant, pour chaque vulnérabilité détectée : l’identifiant CVE/advisory (ou référence), le correctif appliqué (commande / version), la gravité et le mapping OWASP Top-10 (2021).

Justifier vos choix et fournir les preuves (logs / captures) avant / après correction.

1. Démarrage — fork / clone / run

Forkez ce dépôt sur votre compte GitHub.

Clonez votre fork en local :

git clone git@github.com:<votre-username>/vuln-node-project.git
cd vuln-node-project

(Fortement recommandé) créez une branche pour votre travail :

git checkout -b fix/security-<votre-nom>

Installer les dépendances :

npm ci

Lancer l’application (tester localement) :

npm start

# puis ouvrir http://localhost:3000

2. Scans (locaux et CI)

Vous devrez exécuter les scans localement et vérifier les runs GitHub Actions sur vos PRs.

Commandes utiles (exemples)

Trivy (filesystem / SCA) :

trivy fs --severity HIGH,CRITICAL .

Snyk :

npm install -g snyk
snyk test --all-projects --severity-threshold=high

Gitleaks :

gitleaks detect --source . --report-format=text

Les workflows GitHub Actions (Trivy / Snyk / Gitleaks) sont configurés pour s’exécuter sur PR. Poussez vos commits et observez les résultats. Vos corrections doivent permettre aux jobs de sécurité de passer (selon les seuils définis).

3. Consignes d’exercice (ce que vous devez faire — sans solutions fournies)

Scanner tout le projet et lister tous les findings : vulnérabilités SCA, vulnérabilités de code, secrets committés, patterns dangereux.

Analyser chaque finding : expliquer le risque, l’impact potentiel et pourquoi l’outil le signale.

Corriger le projet : appliquer les correctifs appropriés (mise à jour des dépendances, modification du code, suppression/rotation des secrets, etc.).

Ne laissez aucune correction fournie par le README — le but est que vous trouviez et appliquiez les corrections vous-mêmes.

Valider localement puis via GitHub Actions que les résultats sont conformes (scans propres pour les niveaux de sévérité demandés).

Documenter vos travaux (voir section livrables).

4. Livrables obligatoires (à déposer dans votre fork / PR)

Votre dépôt rendu doit contenir au minimum :

Une branche contenant tous vos correctifs (ex : fix/security-<votre-nom>).

Les fichiers sources corrigés (code, package.json / package-lock.json si modifiés).

.gitignore mis à jour si nécessaire (les secrets ne doivent plus être suivis).

CVE_TABLE.md (ou CVE_TABLE.csv) à la racine — obligatoire — contenant pour chaque vulnérabilité :

nom / description courte,

identifiant CVE ou advisory (ou référence),

correctif appliqué (commande exacte et version cible),

niveau de gravité (CVSS / label),

correspondance OWASP Top-10 (2021),

preuve de la correction (log CI ou capture).

Un dossier evidence/ contenant les captures/outputs (avant/après) des scans (Trivy, Snyk, Gitleaks).

Un commit séparé montrant la suppression des secrets du suivi Git (ex : git rm --cached .env private_key.pem) et un message de commit explicite.

Pull Request ouverte (ou lien vers le fork/branche demandé par l’enseignant).

5. Format et contenu du CVE_TABLE.md

Créez CVE_TABLE.md avec un tableau clair. Exemple (à compléter par vos soins) :

# Vulnérabilité Référence (CVE/advisory) Correctif appliqué (commande / version) Gravité (CVSS / label) OWASP Top-10 (2021) Preuve (lien fichier/screenshot)

1 ... ... ... ... ... ./evidence/trivy-before.txt → ./evidence/trivy-after.txt

Chaque ligne doit être renseignée et accompagnée d’une preuve montrant l’état avant et après correction.

6. Checklist avant soumission

J’ai forké le dépôt et créé une branche pour mes corrections.

Tous les secrets factices ne sont plus suivis dans Git.

J’ai mis à jour / modifié le code et les dépendances selon mes choix de sécurité.

J’ai exécuté les scans locaux et les ai sauvegardés dans ./evidence/.

CVE_TABLE.md est complet et sourcé.

J’ai ouvert une PR / fourni le lien vers mon fork + branche au professeur.

7. Critères d’évaluation (pour information)

Identification & exhaustivité (35%) : avez-vous trouvé toutes les vulnérabilités majeures ?

Correctifs techniques (35%) : qualité et pertinence des correctifs appliqués.

Preuve & validation (20%) : captures / logs avant-après, état des GitHub Actions.

Documentation & qualité du rendu (10%) : clarté du CVE_TABLE.md, commits propres et PR bien présentée.

8. Règles importantes et bonnes pratiques

Ne publiez jamais de vraies clés ou secrets. Ici les clés sont factices.

Si, par accident, une vraie clé avait été exposée : révoquez-la immédiatement et documentez l’action.

Justifiez toujours vos décisions : si vous choisissez de conserver une dépendance non corrigée (pour raison valable), documentez la mitigation et les risques résiduels.

Travaillez en branches et faites des commits atomiques et lisibles.

9. Support & contact

Pour toute question technique pendant le TP, postez sur le canal de support du cours ou envoyez un message au responsable du TP en indiquant :

lien vers votre fork,

nom de la branche,

copie d’écran / log des erreurs CI.

Bon travail — soyez curieux, méthodiques et rigoureux. Montrez-moi vos talents d’auditeur et de correcteur de sécurité ! 🔍🛡️
