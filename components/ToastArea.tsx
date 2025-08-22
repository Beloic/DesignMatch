'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Types pour les toasts
export interface Toast {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

// Contexte pour les toasts
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Hook pour utiliser les toasts
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Provider pour les toasts
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000
    }
    
    setToasts(prev => [...prev, newToast])

    // Auto-remove après la durée spécifiée
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const clearToasts = () => {
    setToasts([])
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastArea />
    </ToastContext.Provider>
  )
}

// Composant principal ToastArea
const ToastArea: React.FC = () => {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

// Composant Toast individuel
const Toast: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 150)
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getToastStyles = () => {
    const baseStyles = "bg-background border shadow-lg rounded-lg p-4 transition-all duration-200 ease-in-out"
    
    switch (toast.type) {
      case 'success':
        return cn(baseStyles, "border-green-200", isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")
      case 'error':
        return cn(baseStyles, "border-red-200", isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")
      case 'warning':
        return cn(baseStyles, "border-yellow-200", isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")
      case 'info':
        return cn(baseStyles, "border-blue-200", isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")
      default:
        return cn(baseStyles, "border-border", isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")
    }
  }

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">
            {toast.title}
          </div>
          {toast.description && (
            <div className="mt-1 text-sm text-muted-foreground">
              {toast.description}
            </div>
          )}
          {toast.action && (
            <div className="mt-3">
              <button
                onClick={toast.action.onClick}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0">
          <button
            onClick={handleRemove}
            className="inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Composant de démonstration pour tester les toasts
export const ToastDemo: React.FC = () => {
  const { addToast } = useToast()

  const showSuccessToast = () => {
    addToast({
      title: 'Succès !',
      description: 'Votre action a été effectuée avec succès.',
      type: 'success'
    })
  }

  const showErrorToast = () => {
    addToast({
      title: 'Erreur !',
      description: 'Une erreur est survenue lors de l\'exécution de votre action.',
      type: 'error'
    })
  }

  const showWarningToast = () => {
    addToast({
      title: 'Attention !',
      description: 'Veuillez vérifier les informations saisies.',
      type: 'warning'
    })
  }

  const showInfoToast = () => {
    addToast({
      title: 'Information',
      description: 'Voici une information importante pour vous.',
      type: 'info'
    })
  }

  const showActionToast = () => {
    addToast({
      title: 'Action requise',
      description: 'Une action de votre part est nécessaire.',
      type: 'info',
      action: {
        label: 'Voir les détails',
        onClick: () => alert('Action cliquée !')
      }
    })
  }

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-lg font-semibold">Démonstration des toasts</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={showSuccessToast}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Toast Succès
        </button>
        <button
          onClick={showErrorToast}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Toast Erreur
        </button>
        <button
          onClick={showWarningToast}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Toast Avertissement
        </button>
        <button
          onClick={showInfoToast}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Toast Info
        </button>
        <button
          onClick={showActionToast}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Toast avec Action
        </button>
      </div>
    </div>
  )
}
