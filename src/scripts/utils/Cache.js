export default class Cache {
  /**
   * Permet d'ajouter une clef et une valeur de la cache
   * * @param {string} key - permet d'identifier la cache globale
   * * @param {string} value - permet d'identifier le type de la cache globale (si +1 option)
   * * @param {bool} force - permet d'écraser l'ancienne valeur de la Cache
   */
  static set(key, value, force) {
    /* Permet de vérifier la présence de valeurs dans les composantes voulant accèder à la cache  */
    if (key === undefined) {
      console.error('Il manque la clef pour le localStorage');
    } else if (value === undefined) {
      console.error('Il manque la valeur pour le localStorage');
    } else if (Cache.isLocalStorageAvailable()) {
      /* Permet de vérifier si la clef n'existe pas */
      if (!Cache.get(key) || force === true) {
        /* Permet de préfixer notre clef */
        key = `RP_${key}`;
        localStorage.setItem(key, value);
      } else {
        console.error(
          'La clef que vous avez fourni est déjà utiliser. Forcer au besoin.'
        );
      }
    }

    console.log('Key = ', key);
    console.log('Value = ', value);
  }

  /**
   * Permet de checher une clef de la cache
   * * @param {string} key - permet d'identifier la cache globale
   * * @param {string} defaultValue - permet d'aller chercher dans un autre JavaScript la valeur par défaut voulu
   */
  static get(key, defaultValue) {
    /* Permet de vérifier la présence de valeurs dans les composantes voulant accéder à la cache  */
    if (key === undefined) {
      console.error('Il manque la clef pour le localStorage');
    } else if (Cache.isLocalStorageAvailable()) {
      /* Permet de préfixer notre clef */
      key = `RP_${key}`;

      /* Condition permettant de prendre une valeur ou l'autre dépendant du résultat de la première ligne */
      return localStorage.getItem(key)
        ? localStorage.getItem(key)
        : defaultValue;
    }
  }

  /**
   * Permet d'enlever une clef de la cache
   * * @param {string} key - permet d'identifier la cache globale
   */
  static remove(key) {
    /* Permet de vérifier la présence de valeurs dans les composantes voulant accèder à la cache  */
    if (key === undefined) {
      console.error('Il manque la clef pour le localStorage');
    } else if (Cache.isLocalStorageAvailable()) {
      /* Permet de préfixer notre clef */
      key = `RP_${key}`;
      localStorage.removeItem(key);
    }
  }

  /**
   * Permet de vérifier si la cache est disponible
   */
  static isLocalStorageAvailable() {
    const test = 'valeur';

    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      console.error("LocalStorage n'est pas disponible sur le navigateur");
    }
  }
}
