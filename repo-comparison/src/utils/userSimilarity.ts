
/**
 * Module de calcul de similarité entre profils d'utilisateurs
 * Ce module contient des fonctions pour calculer la similarité entre des profils utilisateurs
 * dans le but d'améliorer les recommandations basées sur le filtrage collaboratif.
 */

import { UserProfile } from '../types/aiTypes';

/**
 * Calcule la similarité entre deux profils utilisateurs
 * @param profileA Premier profil utilisateur
 * @param profileB Deuxième profil utilisateur 
 * @returns Score de similarité entre 0 et 1 (1 = identique)
 */
export const calculateProfileSimilarity = (profileA: UserProfile, profileB: UserProfile): number => {
  try {
    let similarityScore = 0;
    let factorsCount = 0;
    
    // Comparer les données démographiques basiques
    if (profileA.age && profileB.age) {
      // Plus la différence d'âge est petite, plus le score est élevé
      const ageDifference = Math.abs(profileA.age - profileB.age);
      const ageScore = Math.max(0, 1 - (ageDifference / 50)); // Normalisation sur 50 ans
      similarityScore += ageScore;
      factorsCount++;
    }
    
    // Comparer le genre
    if (profileA.gender && profileB.gender) {
      const genderScore = profileA.gender === profileB.gender ? 1 : 0;
      similarityScore += genderScore;
      factorsCount++;
    }
    
    // Comparer les symptômes
    if (profileA.symptoms && profileB.symptoms) {
      const commonSymptoms = profileA.symptoms.filter(s => profileB.symptoms.includes(s));
      const symptomScore = commonSymptoms.length / Math.max(profileA.symptoms.length, profileB.symptoms.length);
      similarityScore += symptomScore;
      factorsCount++;
    }
    
    // Comparer les objectifs de santé
    if (profileA.healthGoals && profileB.healthGoals) {
      const commonGoals = profileA.healthGoals.filter(g => profileB.healthGoals.includes(g));
      const goalScore = commonGoals.length / Math.max(profileA.healthGoals.length, profileB.healthGoals.length);
      similarityScore += goalScore;
      factorsCount++;
    }
    
    // Comparer les préférences
    if (profileA.preferences && profileB.preferences) {
      // Pour les préférences textuelles, calculer la similarité Jaccard
      const prefA = new Set(Object.values(profileA.preferences));
      const prefB = new Set(Object.values(profileB.preferences));
      const intersection = [...prefA].filter(x => prefB.has(x));
      const union = new Set([...prefA, ...prefB]);
      
      const preferenceScore = intersection.length / union.size;
      similarityScore += preferenceScore;
      factorsCount++;
    }
    
    // Si aucun facteur n'a été comparé, retourner 0
    if (factorsCount === 0) return 0;
    
    // Retourner le score moyen
    return similarityScore / factorsCount;
  } catch (error) {
    console.error("Erreur lors du calcul de similarité entre profils:", error);
    return 0;
  }
};

/**
 * Trouve les N profils les plus similaires à un profil donné
 * @param targetProfile Le profil pour lequel on cherche des similaires
 * @param allProfiles Liste de tous les profils disponibles
 * @param n Nombre de profils similaires à retourner
 * @returns Liste des N profils les plus similaires avec leur score
 */
export const findSimilarProfiles = (
  targetProfile: UserProfile,
  allProfiles: UserProfile[],
  n: number = 5
): Array<{ profile: UserProfile; similarityScore: number }> => {
  try {
    // Calculer la similarité pour chaque profil
    const profilesWithSimilarity = allProfiles
      .filter(profile => profile.userId !== targetProfile.userId) // Exclure le profil cible
      .map(profile => ({
        profile,
        similarityScore: calculateProfileSimilarity(targetProfile, profile)
      }))
      .sort((a, b) => b.similarityScore - a.similarityScore) // Trier par score de similarité décroissant
      .slice(0, n); // Prendre les N premiers
      
    return profilesWithSimilarity;
  } catch (error) {
    console.error("Erreur lors de la recherche de profils similaires:", error);
    return [];
  }
};

export default {
  calculateProfileSimilarity,
  findSimilarProfiles
};
