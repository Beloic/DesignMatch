'use client'

import { useState } from 'react'
import { MessageSquare, Send, Search, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'
import { getInitials, formatDate } from '@/lib/utils'

// Données mock pour les conversations
const mockConversations = [
  {
    id: '1',
    participant: {
      id: 'u1',
      name: 'Sophie Martin',
      avatar: '/avatars/sophie-martin.jpg',
      role: 'Product Designer'
    },
    lastMessage: 'Bonjour ! J\'ai regardé votre profil et je suis très intéressée par votre expérience...',
    lastMessageAt: '2024-01-15T10:30:00Z',
    unreadCount: 2
  },
  {
    id: '2',
    participant: {
      id: 'u2',
      name: 'Thomas Dubois',
      avatar: '/avatars/thomas-dubois.jpg',
      role: 'UX Researcher'
    },
    lastMessage: 'Merci pour votre candidature. Nous aimerions organiser un entretien...',
    lastMessageAt: '2024-01-14T16:45:00Z',
    unreadCount: 0
  },
  {
    id: '3',
    participant: {
      id: 'u3',
      name: 'Emma Leroy',
      avatar: '/avatars/emma-leroy.jpg',
      role: 'UI Designer'
    },
    lastMessage: 'Parfait ! Je suis disponible jeudi à 14h pour l\'entretien.',
    lastMessageAt: '2024-01-13T09:15:00Z',
    unreadCount: 1
  }
]

// Messages mock pour la conversation sélectionnée
const mockMessages = [
  {
    id: 'm1',
    content: 'Bonjour ! J\'ai regardé votre profil et je suis très intéressée par votre expérience en design system.',
    senderId: 'u1',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false
  },
  {
    id: 'm2',
    content: 'Merci beaucoup ! Oui, j\'ai effectivement une bonne expérience dans ce domaine.',
    senderId: 'me',
    timestamp: '2024-01-15T10:35:00Z',
    isRead: true
  },
  {
    id: 'm3',
    content: 'Parfait ! Nous recherchons quelqu\'un pour nous aider à structurer notre design system. Êtes-vous disponible pour un entretien ?',
    senderId: 'u1',
    timestamp: '2024-01-15T10:40:00Z',
    isRead: false
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState('')
  const { language } = useLanguage()

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    // En mode mock, on ne fait rien avec le message
    setNewMessage('')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Messages</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Gérez vos conversations avec les talents et recruteurs
          </p>
        </div>

        <div className="bg-card border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
            {/* Liste des conversations */}
            <div className="border-r bg-muted/20">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une conversation..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(600px-80px)]">
                {mockConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(conversation.participant.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground truncate">
                            {conversation.participant.name}
                          </h3>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-1">
                          {conversation.participant.role}
                        </p>
                        
                        <p className="text-sm text-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(conversation.lastMessageAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone de chat */}
            <div className="lg:col-span-2 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Header de la conversation */}
                  <div className="p-4 border-b bg-muted/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(selectedConversation.participant.name)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {selectedConversation.participant.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedConversation.participant.role}
                          </p>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.senderId === 'me'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {formatDate(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input pour nouveau message */}
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Tapez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Sélectionnez une conversation
                    </h3>
                    <p className="text-muted-foreground">
                      Choisissez une conversation dans la liste pour commencer à discuter
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Note de démo */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm">
            <MessageSquare className="h-4 w-4" />
            <span>Interface de démonstration - pas de messagerie réelle</span>
          </div>
        </div>
      </div>
    </div>
  )
}
