export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          teaching_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          teaching_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          teaching_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_teaching_id_fkey"
            columns: ["teaching_id"]
            isOneToOne: false
            referencedRelation: "teachings"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          name_en: string | null
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          name_en?: string | null
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          name_en?: string | null
          sort_order?: number | null
        }
        Relationships: []
      }
      daily_dhamma: {
        Row: {
          created_at: string
          excerpt: string | null
          featured_date: string
          id: string
          teaching_id: string
        }
        Insert: {
          created_at?: string
          excerpt?: string | null
          featured_date: string
          id?: string
          teaching_id: string
        }
        Update: {
          created_at?: string
          excerpt?: string | null
          featured_date?: string
          id?: string
          teaching_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_dhamma_teaching_id_fkey"
            columns: ["teaching_id"]
            isOneToOne: false
            referencedRelation: "teachings"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          donor_message: string | null
          donor_name: string | null
          id: string
          payment_method: string
          status: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          donor_message?: string | null
          donor_name?: string | null
          id?: string
          payment_method: string
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          donor_message?: string | null
          donor_name?: string | null
          id?: string
          payment_method?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      paragraphs: {
        Row: {
          created_at: string
          id: string
          myanmar_explanation: string | null
          myanmar_translation: string
          pali_romanized: string | null
          pali_text: string
          sort_order: number
          teaching_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          myanmar_explanation?: string | null
          myanmar_translation: string
          pali_romanized?: string | null
          pali_text: string
          sort_order?: number
          teaching_id: string
        }
        Update: {
          created_at?: string
          id?: string
          myanmar_explanation?: string | null
          myanmar_translation?: string
          pali_romanized?: string | null
          pali_text?: string
          sort_order?: number
          teaching_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "paragraphs_teaching_id_fkey"
            columns: ["teaching_id"]
            isOneToOne: false
            referencedRelation: "teachings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          id: string
          is_downloaded: boolean
          last_paragraph_id: string | null
          last_read_at: string
          progress_percentage: number | null
          teaching_id: string
          user_id: string
        }
        Insert: {
          id?: string
          is_downloaded?: boolean
          last_paragraph_id?: string | null
          last_read_at?: string
          progress_percentage?: number | null
          teaching_id: string
          user_id: string
        }
        Update: {
          id?: string
          is_downloaded?: boolean
          last_paragraph_id?: string | null
          last_read_at?: string
          progress_percentage?: number | null
          teaching_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_progress_last_paragraph_id_fkey"
            columns: ["last_paragraph_id"]
            isOneToOne: false
            referencedRelation: "paragraphs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_progress_teaching_id_fkey"
            columns: ["teaching_id"]
            isOneToOne: false
            referencedRelation: "teachings"
            referencedColumns: ["id"]
          },
        ]
      }
      teachings: {
        Row: {
          category_id: string | null
          created_at: string
          created_by: string | null
          download_count: number
          id: string
          is_daily_dhamma: boolean
          is_published: boolean
          myanmar_audio_url: string | null
          pali_audio_url: string | null
          source: string | null
          title: string
          title_en: string | null
          updated_at: string
          view_count: number
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          download_count?: number
          id?: string
          is_daily_dhamma?: boolean
          is_published?: boolean
          myanmar_audio_url?: string | null
          pali_audio_url?: string | null
          source?: string | null
          title: string
          title_en?: string | null
          updated_at?: string
          view_count?: number
        }
        Update: {
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          download_count?: number
          id?: string
          is_daily_dhamma?: boolean
          is_published?: boolean
          myanmar_audio_url?: string | null
          pali_audio_url?: string | null
          source?: string | null
          title?: string
          title_en?: string | null
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "teachings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teachings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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

export const Constants = {
  public: {
    Enums: {},
  },
} as const
