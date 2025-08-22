'use client'

import { useState, useEffect } from 'react'
import { Talent, Mission } from '@/lib/types'

interface Favorites {
  talents: string[]
  missions: string[]
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorites>({ talents: [], missions: [] })

  useEffect(() => {
    // Charger les favoris depuis localStorage
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error)
      }
    }
  }, [])

  const saveFavorites = (newFavorites: Favorites) => {
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const addTalentToFavorites = (talentId: string) => {
    const newFavorites = {
      ...favorites,
      talents: favorites.talents.includes(talentId) 
        ? favorites.talents 
        : [...favorites.talents, talentId]
    }
    saveFavorites(newFavorites)
  }

  const removeTalentFromFavorites = (talentId: string) => {
    const newFavorites = {
      ...favorites,
      talents: favorites.talents.filter(id => id !== talentId)
    }
    saveFavorites(newFavorites)
  }

  const addMissionToFavorites = (missionId: string) => {
    const newFavorites = {
      ...favorites,
      missions: favorites.missions.includes(missionId) 
        ? favorites.missions 
        : [...favorites.missions, missionId]
    }
    saveFavorites(newFavorites)
  }

  const removeMissionFromFavorites = (missionId: string) => {
    const newFavorites = {
      ...favorites,
      missions: favorites.missions.filter(id => id !== missionId)
    }
    saveFavorites(newFavorites)
  }

  const isTalentFavorite = (talentId: string): boolean => {
    return favorites.talents.includes(talentId)
  }

  const isMissionFavorite = (missionId: string): boolean => {
    return favorites.missions.includes(missionId)
  }

  const toggleTalentFavorite = (talentId: string) => {
    if (isTalentFavorite(talentId)) {
      removeTalentFromFavorites(talentId)
    } else {
      addTalentToFavorites(talentId)
    }
  }

  const toggleMissionFavorite = (missionId: string) => {
    if (isMissionFavorite(missionId)) {
      removeMissionFromFavorites(missionId)
    } else {
      addMissionToFavorites(missionId)
    }
  }

  const clearAllFavorites = () => {
    const newFavorites = { talents: [], missions: [] }
    saveFavorites(newFavorites)
  }

  const getFavoritesCount = () => {
    return favorites.talents.length + favorites.missions.length
  }

  return {
    favorites,
    isTalentFavorite,
    isMissionFavorite,
    toggleTalentFavorite,
    toggleMissionFavorite,
    addTalentToFavorites,
    removeTalentFromFavorites,
    addMissionToFavorites,
    removeMissionFromFavorites,
    clearAllFavorites,
    getFavoritesCount
  }
}
