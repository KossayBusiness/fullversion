/**
 * Service de stockage sécurisé pour les données sensibles
 */

// Classe pour gérer le stockage sécurisé
class SecureStorageService {
  // Stocker une valeur de manière sécurisée
  setItem(key: string, value: any): void {
    try {
      // Convertir les objets complexes en JSON
      const valueToStore = typeof value === 'object' ? JSON.stringify(value) : String(value);

      // Utiliser localStorage pour la démo
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(`Erreur lors du stockage de "${key}":`, error);
    }
  }

  // Récupérer une valeur stockée
  getItem(key: string): any {
    try {
      const value = localStorage.getItem(key);

      if (!value) return null;

      // Essayer de parser en JSON, sinon retourner la valeur telle quelle
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération de "${key}":`, error);
      return null;
    }
  }

  // Supprimer une entrée
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erreur lors de la suppression de "${key}":`, error);
    }
  }

  // Vider tout le stockage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Erreur lors du nettoyage du stockage:", error);
    }
  }
}

// Exporter une instance unique du service
export const secureStorageService = new SecureStorageService();

export default secureStorageService;