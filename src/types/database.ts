export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string | null
          id: string
          match_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          match_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: true
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      help_requests: {
        Row: {
          completed_at: string | null
          contact_preference: string | null
          created_at: string | null
          email: string | null
          gemeente: string
          id: string
          konsensi_user_id: string | null
          matched_at: string | null
          name: string
          phone: string | null
          postcode: string
          situation: string | null
          source: string | null
          source_organisation_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          contact_preference?: string | null
          created_at?: string | null
          email?: string | null
          gemeente: string
          id?: string
          konsensi_user_id?: string | null
          matched_at?: string | null
          name: string
          phone?: string | null
          postcode: string
          situation?: string | null
          source?: string | null
          source_organisation_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          contact_preference?: string | null
          created_at?: string | null
          email?: string | null
          gemeente?: string
          id?: string
          konsensi_user_id?: string | null
          matched_at?: string | null
          name?: string
          phone?: string | null
          postcode?: string
          situation?: string | null
          source?: string | null
          source_organisation_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "help_requests_source_organisation_id_fkey"
            columns: ["source_organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string | null
          expires_at: string | null
          help_request_id: string | null
          id: string
          notified_at: string | null
          organisation_id: string | null
          priority: number | null
          responded_at: string | null
          response_note: string | null
          status: string | null
          viewed_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          help_request_id?: string | null
          id?: string
          notified_at?: string | null
          organisation_id?: string | null
          priority?: number | null
          responded_at?: string | null
          response_note?: string | null
          status?: string | null
          viewed_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          help_request_id?: string | null
          id?: string
          notified_at?: string | null
          organisation_id?: string | null
          priority?: number | null
          responded_at?: string | null
          response_note?: string | null
          status?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_help_request_id_fkey"
            columns: ["help_request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          read_at: string | null
          sender_name: string | null
          sender_type: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          read_at?: string | null
          sender_name?: string | null
          sender_type: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          read_at?: string | null
          sender_name?: string | null
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          channel: string | null
          created_at: string | null
          delivered_at: string | null
          failed_at: string | null
          failure_reason: string | null
          help_request_id: string | null
          id: string
          message: string
          organisation_id: string | null
          read_at: string | null
          recipient_email: string | null
          recipient_phone: string | null
          recipient_type: string
          sent_at: string | null
          title: string
          type: string
        }
        Insert: {
          channel?: string | null
          created_at?: string | null
          delivered_at?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          help_request_id?: string | null
          id?: string
          message: string
          organisation_id?: string | null
          read_at?: string | null
          recipient_email?: string | null
          recipient_phone?: string | null
          recipient_type: string
          sent_at?: string | null
          title: string
          type: string
        }
        Update: {
          channel?: string | null
          created_at?: string | null
          delivered_at?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          help_request_id?: string | null
          id?: string
          message?: string
          organisation_id?: string | null
          read_at?: string | null
          recipient_email?: string | null
          recipient_phone?: string | null
          recipient_type?: string
          sent_at?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_help_request_id_fkey"
            columns: ["help_request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      organisation_users: {
        Row: {
          created_at: string | null
          id: string
          organisation_id: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organisation_id?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organisation_id?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organisation_users_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      organisations: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_naam: string | null
          contact_preference: string | null
          contact_telefoon: string | null
          created_at: string | null
          current_capacity: number | null
          description: string | null
          email: string
          estimated_wait_days: number | null
          gemeente: string
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          kvk_number: string | null
          logo_url: string | null
          max_capacity: number | null
          name: string
          nvvk_member: boolean | null
          phone: string | null
          postcode: string | null
          province: string | null
          slug: string
          specialisaties: string[] | null
          status: string | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
          website: string | null
          white_label_domain: string | null
          white_label_enabled: boolean | null
          white_label_primary_color: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_naam?: string | null
          contact_preference?: string | null
          contact_telefoon?: string | null
          created_at?: string | null
          current_capacity?: number | null
          description?: string | null
          email: string
          estimated_wait_days?: number | null
          gemeente: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          kvk_number?: string | null
          logo_url?: string | null
          max_capacity?: number | null
          name: string
          nvvk_member?: boolean | null
          phone?: string | null
          postcode?: string | null
          province?: string | null
          slug: string
          specialisaties?: string[] | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
          website?: string | null
          white_label_domain?: string | null
          white_label_enabled?: boolean | null
          white_label_primary_color?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_naam?: string | null
          contact_preference?: string | null
          contact_telefoon?: string | null
          created_at?: string | null
          current_capacity?: number | null
          description?: string | null
          email?: string
          estimated_wait_days?: number | null
          gemeente?: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          kvk_number?: string | null
          logo_url?: string | null
          max_capacity?: number | null
          name?: string
          nvvk_member?: boolean | null
          phone?: string | null
          postcode?: string | null
          province?: string | null
          slug?: string
          specialisaties?: string[] | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
          website?: string | null
          white_label_domain?: string | null
          white_label_enabled?: boolean | null
          white_label_primary_color?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

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
