// utils/serializer.js
// Sérialisation sécurisée : empêche l'injection de code et gère les références circulaires.
// Retourne une chaîne JSON.

function safeSerialize(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, function (_key, value) {
    // On ignore les fonctions et symboles pour éviter l'exécution de code malveillant
    if (typeof value === 'function' || typeof value === 'symbol') return undefined;

    // On gère les objets pour éviter les références circulaires
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  });
}

module.exports = { safeSerialize };