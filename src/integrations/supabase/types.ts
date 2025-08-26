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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      arsip: {
        Row: {
          created_at: string | null
          description: string | null
          filename: string | null
          id: number
          uploaded_by: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          filename?: string | null
          id?: number
          uploaded_by?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          filename?: string | null
          id?: number
          uploaded_by?: string | null
          url?: string | null
        }
        Relationships: []
      }
      clubs: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      cohorts: {
        Row: {
          club_id: number | null
          created_at: string | null
          id: number
          name: string
          year: number | null
        }
        Insert: {
          club_id?: number | null
          created_at?: string | null
          id?: number
          name: string
          year?: number | null
        }
        Update: {
          club_id?: number | null
          created_at?: string | null
          id?: number
          name?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cohorts_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number | null
          created_at: string | null
          id: number
          method: string | null
          name: string | null
          note: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: number
          method?: string | null
          name?: string | null
          note?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: number
          method?: string | null
          name?: string | null
          note?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          id: number
          lokasi: string
          nama: string
          tanggal: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          lokasi: string
          nama: string
          tanggal: string
        }
        Update: {
          created_at?: string | null
          id?: number
          lokasi?: string
          nama?: string
          tanggal?: string
        }
        Relationships: []
      }
      jadwal: {
        Row: {
          created_at: string | null
          id: number
          kegiatan: string
          tempat: string
          waktu: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          kegiatan: string
          tempat: string
          waktu: string
        }
        Update: {
          created_at?: string | null
          id?: number
          kegiatan?: string
          tempat?: string
          waktu?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          biodata: string | null
          cohort_id: number | null
          created_at: string | null
          id: number
          name: string
          phone: string | null
          photo_url: string | null
        }
        Insert: {
          biodata?: string | null
          cohort_id?: number | null
          created_at?: string | null
          id?: number
          name: string
          phone?: string | null
          photo_url?: string | null
        }
        Update: {
          biodata?: string | null
          cohort_id?: number | null
          created_at?: string | null
          id?: number
          name?: string
          phone?: string | null
          photo_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      pengurus: {
        Row: {
          created_at: string | null
          id: number
          jabatan: string
          kontak: string
          nama: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          jabatan: string
          kontak: string
          nama: string
        }
        Update: {
          created_at?: string | null
          id?: number
          jabatan?: string
          kontak?: string
          nama?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string | null
          email: string | null
          event_id: number | null
          id: number
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          event_id?: number | null
          id?: number
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          event_id?: number | null
          id?: number
          name?: string
          phone?: string | null
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

export const Constants = {
  public: {
    Enums: {},
  },
} as const
