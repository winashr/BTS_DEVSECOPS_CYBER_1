# Audit de vulnérabilités npm

## 1️⃣ Identification des vulnérabilités avec npm

Durant l'installation de dépendance avec 
```
npm ci
```
on peut voir dès le début le présence de 3 vulnéraiblités :

```
added 72 packages, and audited 73 packages in 10s

14 packages are looking for funding
  run `npm fund` for details

3 high severity vulnerabilities

```

on peut détecter précisément les vulnérabilités avec les références avec la commande :
```
npm audit report
```

On obtient donc :

| Dépendance                     | Gravité | Référence / Advisory                                                                                                                               | Description                                                               | OWAS TOP-10(2021)                                                                                                                                                                                                  |
| ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `lodash <=4.17.20`             | High    | [GHSA-35jh-r3h4-6jhm](https://github.com/advisories/GHSA-35jh-r3h4-6jhm), [GHSA-29mw-wpgm-hmr9](https://github.com/advisories/GHSA-29mw-wpgm-hmr9) | Command injection + ReDoS                                                 | **-A03:2021 – Injection** : Injection de code malveillant dans l'application  <br>-**A05:2021 – Security Misconfiguration** : Mauvaise configuration ou utilisation d'une librairie vulnérable                     |
| `node-forge <=1.2.1`           | High    | [GHSA-5rrq-pxf6-6jx5](https://github.com/advisories/GHSA-5rrq-pxf6-6jx5), multiples                                                                | Prototype pollution, open redirect, mauvaise vérification cryptographique | -**A06:2021 – Vulnerable and Outdated Components** : Utilisation de composants obsolètes ou vulnérables  <br>-**A05:2021 – Security Misconfiguration** : Mauvaise configuration ou usage dangereux de la librairie |
| `serialize-javascript <=3.0.0` | High    | [GHSA-h9rv-jmmf-4pgx](https://github.com/advisories/GHSA-h9rv-jmmf-4pgx), [GHSA-hxcc-f52p-wc94](https://github.com/advisories/GHSA-hxcc-f52p-wc94) | XSS et RCE via sérialisation                                              | -**A03:2021 – Injection** : Injection de code malveillant via des entrées non sécurisées  <br>-**A07:2021 – Identification and Authentication Failures**                                                           |

---

## 2️⃣ Correction des vulnérabilités détectés avec npm

Commandes recommandées pour corriger chaque vulnérabilité :

```bash
# Mettre à jour lodash
npm install lodash@4.17.21

# Mettre à jour node-forge
npm install node-forge@1.3.1

# Mettre à jour serialize-javascript
npm install serialize-javascript@2.1.2

OU 

#Corriger toutes les dépendances avec des vulnérabilités
npm audit fix --force

```


---


## 1️⃣ Identification des vulnérabilités détectés avec Trivy


# Audit des vulnérabilités avec Trivy

## Installation de Trivy dans son répertoire local : 
```
#Installation
scoop/choco(selon son installateur de dépendances) install trivy

#Détecté toutes les vulnérabilités de son répertoire 
trivy fs .
```

# Source:
![Résultat du scan Trivy](trivyscan.png)

## 2️⃣ Résumé du scan

| Target               | Type | Vulnérabilités | Secrets | Remarques |
|---------------------|------|----------------|---------|-----------|
| `package-lock.json`  | npm  | 10             | -       | Vulnérabilités dans les dépendances npm |
| `private-node.pem`   | text | -              | 1       | Clé privée détectée, HIGH |

---

## 3️⃣ Détails des vulnérabilités npm

| Library                | Vulnerability       | Severity | Installed Version | Fixed Version | Référence / Title                                                                                          | OWASP TOP 10 (2021)                           |
| ---------------------- | ------------------- | -------- | ----------------- | ------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `lodash`               | CVE-2021-23337      | HIGH     | 4.17.20           | 4.17.21       | Command injection via template [Link](https://avd.aquasec.com/nvd/cve-2021-23337)                          | A03:2021 – Injection                          |
| `lodash`               | CVE-2020-28500      | MEDIUM   | 4.17.20           | 4.17.21       | ReDoS via toNumber, trim and trimEnd [Link](https://avd.aquasec.com/nvd/cve-2020-28500)                    | A03:2021 – Injection                          |
| `node-forge`           | CVE-2022-24771      | HIGH     | 0.10.0            | 1.3.0         | Signature verification leniency [Link](https://avd.aquasec.com/nvd/cve-2022-24771)                         | A06:2021 – Vulnerable and Outdated Components |
| `node-forge`           | CVE-2022-24772      | HIGH     | 0.10.0            | 1.3.0         | Signature verification failing to check tailing garbage [Link](https://avd.aquasec.com/nvd/cve-2022-24772) | A06:2021 – Vulnerable and Outdated Components |
| `node-forge`           | CVE-2022-0122       | MEDIUM   | 0.10.0            | 1.0.0         | Open Redirect [Link](https://avd.aquasec.com/nvd/cve-2022-0122)                                            | A05:2021 – Security Misconfiguration          |
| `node-forge`           | CVE-2022-24773      | HIGH     | 0.10.0            | 1.3.0         | Signature verification leniency in DigestInfo [Link](https://avd.aquasec.com/nvd/cve-2022-24773)           | A06:2021 – Vulnerable and Outdated Components |
| `node-forge`           | GHSA-5rrq-pxf6-6jx5 | LOW      | 0.10.0            | 1.0.0         | Prototype Pollution in debug API [Link](https://github.com/advisories/GHSA-5rrq-pxf6-6jx5)                 | A06:2021 – Vulnerable and Outdated Components |
| `node-forge`           | GHSA-gf8q-jrpm-jvxq | LOW      | 0.10.0            | 1.0.0         | URL parsing could lead to undesired behavior [Link](https://github.com/advisories/GHSA-gf8q-jrpm-jvxq)     | A05:2021 – Security Misconfiguration          |
| `serialize-javascript` | CVE-2020-7660       | HIGH     | 2.1.0             | 3.1.0         | Allows remote attackers to inject arbitrary code [Link](https://avd.aquasec.com/nvd/cve-2020-7660)         | A03:2021 – Injection                          |
| `serialize-javascript` | CVE-2019-16769      | MEDIUM   | 2.1.1             | 3.1.0         | XSS via unsafe characters in serialized regex [Link](https://avd.aquasec.com/nvd/cve-2019-16769)           | A03:2021 – Injection                          |

---

## 4️⃣ Détails des secrets détectés

| Fichier            | Type de secret         | Gravité | Remarques                                                                      |
| ------------------ | ---------------------- | ------- | ------------------------------------------------------------------------------ |
| `private-node.pem` | Asymmetric Private Key | HIGH    | Clé privée SSH détectée, doit être retirée du dépôt et ajoutée à `.gitignore`. |

**Action corrective pour le secret :**

```bash
git rm --cached private-node.pem
echo "private-node.pem" >> .gitignore
```

Actions corrective pour les dépendances npm :
```
# Mettre à jour lodash
npm install lodash@4.17.21

# Mettre à jour node-forge
npm install node-forge@1.3.1

# Mettre à jour serialize-javascript
npm install serialize-javascript@3.1.0

# Vérifier les vulnérabilités
npm ci
npm audit
```


---


## 1️⃣ Identification des vulnérabilités détectés avec Snyk 

# Audit des vulnérabilités avec Snyk

## Installation de snyk :
```
#Installation de la dépendance
npm install -g snyk

#Connection à l'API de Snyk
snyk auth (se connecter avec github ou google via le lien donné)

#Test des vulnérabilités dans le répertoire
snyk test
```

# Source :
![Résultat du scan Snyk](snykscan.png)


## 2️⃣ Résumé du scan

| Dépendance                   | Vulnérabilités détectées | Gravité       | Correctif recommandé                            | OWASP TOP 10 (2021)                                                                                                                                                                                                |
| ---------------------------- | ------------------------ | ------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `lodash@4.17.20`             | 2                        | High / Medium | Mettre à jour vers `lodash@4.17.21`             | **-A03:2021 – Injection** : Injection de code malveillant dans l'application  <br>-**A05:2021 – Security Misconfiguration** : Mauvaise configuration ou utilisation d'une librairie vulnérable                     |
| `node-forge@0.10.0`          | 6                        | High / Medium | Mettre à jour vers `node-forge@1.3.0`           | -**A06:2021 – Vulnerable and Outdated Components** : Utilisation de composants obsolètes ou vulnérables  <br>-**A05:2021 – Security Misconfiguration** : Mauvaise configuration ou usage dangereux de la librairie |
| `serialize-javascript@2.1.0` | 5                        | High / Medium | Mettre à jour vers `serialize-javascript@6.0.2` | -**A03:2021 – Injection** : Injection de code malveillant via des entrées non sécurisées  <br>-**A07:2021 – Identification and Authentication Failures**                                                           |
|                              |                          |               |                                                 |                                                                                                                                                                                                                    |

---

## 3️⃣ Détails des vulnérabilités Snyk

### **Lodash**

| Vulnerability | Gravité | Référence / Lien |
|---------------|---------|-----------------|
| Regular Expression Denial of Service (ReDoS) | Medium | [SNYK-JS-LODASH-1018905](https://security.snyk.io/vuln/SNYK-JS-LODASH-1018905) |
| Code Injection | High | [SNYK-JS-LODASH-1040724](https://security.snyk.io/vuln/SNYK-JS-LODASH-1040724) |

**Correctif :**

```bash
npm install lodash@4.17.21
```

### **Node-forge**

| Vulnerability                                    | Gravité | Référence / Lien                                                                     |
| ------------------------------------------------ | ------- | ------------------------------------------------------------------------------------ |
| Improper Verification of Cryptographic Signature | Medium  | [SNYK-JS-NODEFORGE-2430337](https://security.snyk.io/vuln/SNYK-JS-NODEFORGE-2430337) |
| Improper Verification of Cryptographic Signature | Medium  | [SNYK-JS-NODEFORGE-2430341](https://security.snyk.io/vuln/SNYK-JS-NODEFORGE-2430341) |
| Open Redirect                                    | Medium  | [SNYK-JS-NODEFORGE-2330875](https://security.snyk.io/vuln/SNYK-JS-NODEFORGE-2330875) |
| Prototype Pollution                              | Medium  | [SNYK-JS-NODEFORGE-2331908](https://security.snyk.io/vuln/SNYK-JS-NODEFORGE-2331908) |
| Improper Verification of Cryptographic Signature | High    | [SNYK-JS-NODEFORGE-2430339](https://security.snyk.io/vuln/SNYK-JS-NODEFORGE-2430339) |
Correctif :

```bash
npm install node-forge@1.3.0
```


### **Serialize-javascript**

| Vulnerability              | Gravité | Référence / Lien                                                                                         |
| -------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| Cross-site Scripting (XSS) | Medium  | [SNYK-JS-SERIALIZEJAVASCRIPT-6147607](https://security.snyk.io/vuln/SNYK-JS-SERIALIZEJAVASCRIPT-6147607) |
| Arbitrary Code Injection   | High    | [SNYK-JS-SERIALIZEJAVASCRIPT-570062](https://security.snyk.io/vuln/SNYK-JS-SERIALIZEJAVASCRIPT-570062)   |
| Cross-site Scripting (XSS) | High    | [SNYK-JS-SERIALIZEJAVASCRIPT-536840](https://security.snyk.io/vuln/SNYK-JS-SERIALIZEJAVASCRIPT-536840)   |
| Cross-site Scripting (XSS) | High    | [SNYK-JS-SERIALIZEJAVASCRIPT-6056521](https://security.snyk.io/vuln/SNYK-JS-SERIALIZEJAVASCRIPT-6056521) |

Correctif : 
```bash
npm install serialize-javascript@6.0.2
```

Vérifier les correctif
`npm ci 
`npm audit snyk test`

- Vérifie que toutes les vulnérabilités HIGH et MEDIUM sont résolues.
- Teste l'application avec `npm start` pour s'assurer qu'il n'y a pas de régressions.



# 1️⃣ Identification des vulnérabilités avec Gitleaks 

## Installation de Gitleaks : 
```
#Installer la dépendance
choco/scoop (selon son installateur de dépendances) install gitleaks

#Pour avoir un audit complet, ajouter le .env
git add .env
git commit -m 'Ajout du .env pour test avec gitleaks'


#Utilisation de gitleak pour parcourir le répertoire source et détecter les vulnérabilités, et créer un fichier exrès pour l'audit 


gitleaks detect --source . --report-path ./evidence/gitleaks-report.json
```

# Source:
![Résultat du scan GitLeaks](gitleakscan.png)

| Fichier / Target | Type de secret        | Description courte                                                       | Gravité | Preuve / Référence                                                                                                                   | OWASP TOP10(2021)                                                                             |
| ---------------- | --------------------- | ------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| private-node.pem | Private Key           | Clé privée SSH identifiée, peut compromettre la sécurité cryptographique | HIGH    | [Lien commit](https://github.com/winashr/BTS_DEVSECOPS_CYBER_1/blob/8fb6ac30c1e4ab45860531f36841b7bfd815633f/private-node.pem#L1-L5) | **A06 – Vulnerable and Outdated Components**  <br>ou  <br>**A05 – Security Misconfiguration** |
| .env             | AWS_ACCESS_KEY_ID     | Clé d’accès AWS factice utilisée pour tests                              | HIGH    | Contenu présent dans `.env` local, non détecté automatiquement par Gitleaks                                                          | A05 – Security Misconfiguration                                                               |
| .env             | AWS_SECRET_ACCESS_KEY | Clé secrète AWS factice pour tests                                       | HIGH    | Contenu présent dans `.env` local, non détecté automatiquement par Gitleaks                                                          | A05 – Security Misconfiguration                                                               |
| .env             | JWT_SECRET            | Clé JWT factice pour tests                                               | HIGH    | Contenu présent dans `.env` local, non détecté automatiquement par Gitleaks                                                          | A05 – Security Misconfiguration                                                               |

## Rajouter le .env dans le .gitignore

-> Ouvrir le .gitignore et ajouter la ligne de code .env et ajouter evidence/ pour ne pas rendre visible les fichiers de scans

## Ne pas oublier de supprimer le cache avant le push
```
git rm --cached .env
git add . (vérifier qu'il n'y a pas le .env ni le dossier evidence)
git commit -m "Adaptation du .gitignore"
git push
```


## 4️⃣ Conclusion DevSecOps

### 1. Analyse des dépendances et vulnérabilités

- **npm audit** a permis de détecter des vulnérabilités connues dans les packages installés (`lodash`, `node-forge`, `serialize-javascript`) avec des niveaux de sévérité variés (MEDIUM à HIGH).
    
- **Trivy** a complété cette analyse en scannant le système de fichiers, détectant à la fois les vulnérabilités dans les dépendances et les secrets exposés (clé privée SSH).
    
- **Snyk** a fourni un aperçu similaire, en ajoutant la possibilité de suivre et de monitorer les vulnérabilités dans le temps, ce qui permet un suivi proactif des dépendances.
    

### 2. Détection de secrets et informations sensibles

- **Gitleaks** a permis d’identifier les secrets exposés dans le dépôt, notamment la clé privée SSH.
    
- Le TP a montré l’importance de ne pas versionner les fichiers sensibles (`.env`) et d’utiliser le `.gitignore` pour protéger les informations critiques.
    

### 3. Intégration de la sécurité dans le CI/CD

- Nous avons mis en place des **workflows GitHub Actions** pour automatiser les scans de sécurité à chaque push :
    
    - `gitleaks.yml` pour détecter les secrets.
        
    - `trivy-scan.yml` pour détecter les vulnérabilités dans le code et les dépendances.
        
    - `snyk-scan.yml` pour monitorer les vulnérabilités et générer des rapports.
        
- Cette intégration illustre l’approche DevSecOps : la sécurité est continue et intégrée dans le pipeline de développement.
### 4. Enseignements et bonnes pratiques

- La sécurité ne se limite pas à la correction des vulnérabilités après coup ; elle doit être **intégrée dès le développement**.
    
- Les outils automatisés (Trivy, Snyk, Gitleaks) permettent une surveillance continue et facilitent la détection précoce.
    
- Les secrets et clés doivent **toujours être externalisés** et protégés par des mécanismes sécurisés (ex : variables d’environnement et secrets GitHub).
    
- La gestion des dépendances est cruciale : garder les packages à jour réduit considérablement les risques de vulnérabilités.


