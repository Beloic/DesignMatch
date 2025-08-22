'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  contentClassName?: string
  variant?: 'default' | 'card' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center' | 'right'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  showDivider?: boolean
}

export function Section({
  children,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  contentClassName,
  variant = 'default',
  size = 'md',
  align = 'left',
  spacing = 'md',
  showDivider = false
}: SectionProps) {
  const getSpacingClasses = () => {
    switch (spacing) {
      case 'none': return ''
      case 'sm': return 'space-y-3'
      case 'lg': return 'space-y-8'
      default: return 'space-y-6'
    }
  }

  const getTitleSize = () => {
    switch (size) {
      case 'sm': return 'text-lg'
      case 'lg': return 'text-3xl'
      default: return 'text-2xl'
    }
  }

  const getDescriptionSize = () => {
    switch (size) {
      case 'sm': return 'text-sm'
      case 'lg': return 'text-lg'
      default: return 'text-base'
    }
  }

  const getAlignmentClasses = () => {
    switch (align) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      default: return 'text-left'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'bg-card border rounded-lg p-6 shadow-sm'
      case 'bordered':
        return 'border-l-4 border-primary pl-6'
      default:
        return ''
    }
  }

  return (
    <section className={cn(
      "w-full",
      getSpacingClasses(),
      getVariantClasses(),
      className
    )}>
      {/* En-tête de section */}
      {(title || description) && (
        <div className={cn("mb-6", getAlignmentClasses())}>
          {title && (
            <h2 className={cn(
              "font-bold text-foreground mb-2",
              getTitleSize(),
              titleClassName
            )}>
              {title}
            </h2>
          )}
          
          {description && (
            <p className={cn(
              "text-muted-foreground",
              getDescriptionSize(),
              descriptionClassName
            )}>
              {description}
            </p>
          )}
          
          {showDivider && (
            <div className={cn(
              "mt-4 h-px bg-border",
              align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : 'mr-auto',
              align === 'center' ? 'w-16' : 'w-12'
            )} />
          )}
        </div>
      )}
      
      {/* Contenu de la section */}
      <div className={cn("", contentClassName)}>
        {children}
      </div>
    </section>
  )
}

// Composants de section spécialisés
export function SectionHeader({
  children,
  className,
  align = 'left',
  size = 'md'
}: {
  children: ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
}) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-lg'
      case 'lg': return 'text-3xl'
      default: return 'text-2xl'
    }
  }

  const getAlignmentClasses = () => {
    switch (align) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      default: return 'text-left'
    }
  }

  return (
    <div className={cn(
      "mb-6",
      getAlignmentClasses(),
      className
    )}>
      <h2 className={cn(
        "font-bold text-foreground",
        getSizeClasses()
      )}>
        {children}
      </h2>
    </div>
  )
}

export function SectionContent({
  children,
  className,
  padding = true
}: {
  children: ReactNode
  className?: string
  padding?: boolean
}) {
  return (
    <div className={cn(
      padding && "p-6",
      className
    )}>
      {children}
    </div>
  )
}

export function SectionFooter({
  children,
  className,
  align = 'left'
}: {
  children: ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}) {
  const getAlignmentClasses = () => {
    switch (align) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      default: return 'text-left'
    }
  }

  return (
    <div className={cn(
      "mt-6 pt-6 border-t",
      getAlignmentClasses(),
      className
    )}>
      {children}
    </div>
  )
}

// Composant de section avec grille
export function SectionGrid({
  children,
  cols = 1,
  gap = 'md',
  className
}: {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const getGridCols = () => {
    switch (cols) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-1 md:grid-cols-2'
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      default: return 'grid-cols-1'
    }
  }

  const getGap = () => {
    switch (gap) {
      case 'sm': return 'gap-4'
      case 'lg': return 'gap-8'
      default: return 'gap-6'
    }
  }

  return (
    <div className={cn(
      "grid",
      getGridCols(),
      getGap(),
      className
    )}>
      {children}
    </div>
  )
}

// Composant de section avec liste
export function SectionList({
  children,
  className,
  spacing = 'md'
}: {
  children: ReactNode
  className?: string
  spacing?: 'sm' | 'md' | 'lg'
}) {
  const getSpacing = () => {
    switch (spacing) {
      case 'sm': return 'space-y-3'
      case 'lg': return 'space-y-8'
      default: return 'space-y-4'
    }
  }

  return (
    <div className={cn(
      "divide-y divide-border",
      getSpacing(),
      className
    )}>
      {children}
    </div>
  )
}
