# 🕵️‍♀️ TP DevSecOps : Projet Node.js vulnérable

## Bienvenue !

Cet exercice vous place dans la peau d’une équipe DevSecOps : votre mission est de scanner, détecter, corriger et documenter les vulnérabilités d’un petit projet Node.js volontairement vulnérable.
Important : le dépôt contient des secrets factices (fichiers .env, private_key.pem) uniquement à des fins pédagogiques. Ne publiez jamais de vraies clés dans un dépôt public.

---

## 🎯 Objectifs du TP

Identifier toutes les vulnérabilités présentes (dépendances, fuites de secrets, mauvaises pratiques dans le code, etc.).

Corriger le projet pour que les scans automatiques (GitHub Actions : Trivy, Snyk, Gitleaks) ne remontent plus de findings critiques.

Produire et rendre un tableau récapitulant, pour chaque vulnérabilité détectée : l’identifiant CVE/advisory (ou référence), le correctif appliqué (commande / version), la gravité et le mapping OWASP Top-10 (2021).

Justifier vos choix et fournir les preuves (logs / captures) avant / après correction.

---

## 🧑‍💻 1. Démarrage - fork / clone / run

Forkez ce dépôt sur votre compte GitHub.

Clonez votre fork en local :

```
git clone git@github.com:<votre-username>/BTS_DEVSECOPS_CYBER_1.git
cd BTS_DEVSECOPS_CYBER_1
```

Créez une branche pour votre travail :

```
git checkout -b fix/security-<votre-nom>
```

Installer les dépendances :

```
npm ci
```

Lancer l’application (tester localement) :

```
npm start
```

Puis ouvrir http://localhost:3000

---

## 🔍 2. Scans (locaux et CI)

Vous devrez exécuter les scans localement et vérifier les runs GitHub Actions sur vos PRs.

Trivy | Snyk | Gitleaks

Les workflows GitHub Actions (Trivy / Snyk / Gitleaks) sont configurés pour s’exécuter sur un push. Poussez vos commits et observez les résultats. Vos corrections doivent permettre aux jobs de sécurité de passer.

---

## 🪲 3. Consignes d’exercice

Scanner tout le projet et lister tous les findings : vulnérabilités SCA, vulnérabilités de code, secrets committés, patterns dangereux.

Analyser chaque finding : expliquer le risque, l’impact potentiel et pourquoi l’outil le signale.

Corriger le projet : appliquer les correctifs appropriés (mise à jour des dépendances, modification du code, suppression/rotation des secrets, etc.).

Valider localement puis via GitHub Actions que les résultats sont conformes (scans propres pour les niveaux de sévérité demandés).

Documenter vos travaux (voir section livrables).

---

## 🛠️ 4. Livrables obligatoires (à déposer dans votre fork / PR)

Votre dépôt rendu doit contenir au minimum :

1. Une branche contenant tous vos correctifs (ex : fix/security-<votre-nom>).

2. Les fichiers sources corrigés (code, package.json / package-lock.json si modifiés).

3. .gitignore mis à jour si nécessaire (les secrets ne doivent plus être suivis).

4. CVE_TABLE.md à la racine - obligatoire - contenant pour chaque vulnérabilité :

   - nom / description courte
   - identifiant CVE ou advisory (ou référence)
   - correctif appliqué (commande exacte et version cible)
   - niveau de gravité (CVSS / label)
   - correspondance OWASP Top-10 (2021)
   - preuve de la correction (log CI ou capture)

   Un commit séparé montrant la suppression des secrets du suivi Git (ex : git rm --cached .env private_key.pem) et un message de commit explicite.

5. Il faut les fichiers de votre CI (présents dans .github/workflows/):
   - gitleaks.yml
   - snyk-scan.yml
   - trivy-scan.yml
     Ces fichiers devront être exécutés à chaque push et devront scanner votre projet.

---

## 🧠 5. Format et contenu du CVE_TABLE.md

Créez CVE_TABLE.md avec un tableau clair. Exemple (à compléter par vos soins) :

| Vulnérabilité Référence (CVE/advisory) | Correctif appliqué (commande / version) | Gravité (CVSS / label) | OWASP Top-10 (2021) |
| -------------------------------------- | --------------------------------------- | ---------------------- | ------------------- |
|                                        |                                         |                        |                     |
|                                        |                                         |                        |                     |

Chaque ligne doit être renseignée.

## 🗂️ 6. Checklist avant soumission

J’ai forké le dépôt et créé une branche pour mes corrections.

Tous les secrets factices ne sont plus suivis dans Git.

J’ai mis à jour / modifié le code et les dépendances selon mes choix de sécurité.

J’ai exécuté les scans locaux et les ai sauvegardés dans ./evidence/.

CVE_TABLE.md est complet et sourcé.

J’ai ouvert une PR / fourni le lien vers mon fork + branche au professeur.

---

## 🌱 8. Règles importantes et bonnes pratiques

Ne publiez jamais de vraies clés ou secrets. Ici les clés sont factices.

Si, par accident, une vraie clé avait été exposée : révoquez-la immédiatement et documentez l’action.

Justifiez toujours vos décisions.

Travaillez en branches et faites des commits lisibles.

---

### 🎖️ Bon travail - soyez curieux, méthodiques et rigoureux. Montrez-moi vos talents d’auditeur de sécurité ! 🛡️
