export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      organisations: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          email: string
          phone: string | null
          website: string | null
          address: string | null
          postcode: string | null
          gemeente: string
          province: string | null
          contact_preference: 'email' | 'dashboard'
          max_capacity: number
          current_capacity: number
          estimated_wait_days: number
          white_label_enabled: boolean
          white_label_primary_color: string | null
          white_label_domain: string | null
          is_verified: boolean
          verified_at: string | null
          verified_by: string | null
          kvk_number: string | null
          nvvk_member: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
          email: string
          phone?: string | null
          website?: string | null
          address?: string | null
          postcode?: string | null
          gemeente: string
          province?: string | null
          contact_preference?: 'email' | 'dashboard'
          max_capacity?: number
          current_capacity?: number
          estimated_wait_days?: number
          white_label_enabled?: boolean
          white_label_primary_color?: string | null
          white_label_domain?: string | null
          is_verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
          kvk_number?: string | null
          nvvk_member?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          email?: string
          phone?: string | null
          website?: string | null
          address?: string | null
          postcode?: string | null
          gemeente?: string
          province?: string | null
          contact_preference?: 'email' | 'dashboard'
          max_capacity?: number
          current_capacity?: number
          estimated_wait_days?: number
          white_label_enabled?: boolean
          white_label_primary_color?: string | null
          white_label_domain?: string | null
          is_verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
          kvk_number?: string | null
          nvvk_member?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      organisation_users: {
        Row: {
          id: string
          organisation_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          created_at: string
        }
        Insert: {
          id?: string
          organisation_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
        Update: {
          id?: string
          organisation_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
      }
      help_requests: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          contact_preference: 'email' | 'sms' | 'app'
          postcode: string
          gemeente: string
          source: 'website' | 'konsensi_app' | 'white_label'
          source_organisation_id: string | null
          konsensi_user_id: string | null
          status: 'pending' | 'matching' | 'matched' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
          matched_at: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          contact_preference?: 'email' | 'sms' | 'app'
          postcode: string
          gemeente: string
          source?: 'website' | 'konsensi_app' | 'white_label'
          source_organisation_id?: string | null
          konsensi_user_id?: string | null
          status?: 'pending' | 'matching' | 'matched' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
          matched_at?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          contact_preference?: 'email' | 'sms' | 'app'
          postcode?: string
          gemeente?: string
          source?: 'website' | 'konsensi_app' | 'white_label'
          source_organisation_id?: string | null
          konsensi_user_id?: string | null
          status?: 'pending' | 'matching' | 'matched' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
          matched_at?: string | null
          completed_at?: string | null
        }
      }
      matches: {
        Row: {
          id: string
          help_request_id: string
          organisation_id: string
          status: 'pending' | 'accepted' | 'rejected' | 'expired'
          priority: number
          notified_at: string | null
          viewed_at: string | null
          responded_at: string | null
          response_note: string | null
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          help_request_id: string
          organisation_id: string
          status?: 'pending' | 'accepted' | 'rejected' | 'expired'
          priority?: number
          notified_at?: string | null
          viewed_at?: string | null
          responded_at?: string | null
          response_note?: string | null
          created_at?: string
          expires_at?: string
        }
        Update: {
          id?: string
          help_request_id?: string
          organisation_id?: string
          status?: 'pending' | 'accepted' | 'rejected' | 'expired'
          priority?: number
          notified_at?: string | null
          viewed_at?: string | null
          responded_at?: string | null
          response_note?: string | null
          created_at?: string
          expires_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          recipient_type: 'help_seeker' | 'organisation'
          recipient_email: string | null
          recipient_phone: string | null
          organisation_id: string | null
          help_request_id: string | null
          type: 'match_found' | 'organisation_accepted' | 'new_help_request' | 'request_reminder' | 'request_expired'
          title: string
          message: string
          channel: 'email' | 'sms' | 'app' | 'dashboard'
          sent_at: string | null
          delivered_at: string | null
          read_at: string | null
          failed_at: string | null
          failure_reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          recipient_type: 'help_seeker' | 'organisation'
          recipient_email?: string | null
          recipient_phone?: string | null
          organisation_id?: string | null
          help_request_id?: string | null
          type: 'match_found' | 'organisation_accepted' | 'new_help_request' | 'request_reminder' | 'request_expired'
          title: string
          message: string
          channel?: 'email' | 'sms' | 'app' | 'dashboard'
          sent_at?: string | null
          delivered_at?: string | null
          read_at?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          recipient_type?: 'help_seeker' | 'organisation'
          recipient_email?: string | null
          recipient_phone?: string | null
          organisation_id?: string | null
          help_request_id?: string | null
          type?: 'match_found' | 'organisation_accepted' | 'new_help_request' | 'request_reminder' | 'request_expired'
          title?: string
          message?: string
          channel?: 'email' | 'sms' | 'app' | 'dashboard'
          sent_at?: string | null
          delivered_at?: string | null
          read_at?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          created_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          match_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          match_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_type: 'help_seeker' | 'organisation'
          sender_name: string | null
          content: string
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_type: 'help_seeker' | 'organisation'
          sender_name?: string | null
          content: string
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_type?: 'help_seeker' | 'organisation'
          sender_name?: string | null
          content?: string
          read_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Organisation = Database['public']['Tables']['organisations']['Row']
export type OrganisationInsert = Database['public']['Tables']['organisations']['Insert']
export type OrganisationUpdate = Database['public']['Tables']['organisations']['Update']

export type HelpRequest = Database['public']['Tables']['help_requests']['Row']
export type HelpRequestInsert = Database['public']['Tables']['help_requests']['Insert']
export type HelpRequestUpdate = Database['public']['Tables']['help_requests']['Update']

export type Match = Database['public']['Tables']['matches']['Row']
export type MatchInsert = Database['public']['Tables']['matches']['Insert']
export type MatchUpdate = Database['public']['Tables']['matches']['Update']

export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']

export type Conversation = Database['public']['Tables']['conversations']['Row']
export type Message = Database['public']['Tables']['messages']['Row']

// Extended types with relations
export type MatchWithOrganisation = Match & {
  organisations: Organisation
}

export type HelpRequestWithMatches = HelpRequest & {
  matches: MatchWithOrganisation[]
}
