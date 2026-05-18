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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      auth_users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          cart_id: string
          created_at: string
          id: string
          product_variant_id: string
          quantity: number
          updated_at: string
        }
        Insert: {
          cart_id: string
          created_at?: string
          id?: string
          product_variant_id: string
          quantity?: number
          updated_at?: string
        }
        Update: {
          cart_id?: string
          created_at?: string
          id?: string
          product_variant_id?: string
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          coupon_id: string | null
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          coupon_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          coupon_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      colors: {
        Row: {
          created_at: string
          hex: string
          id: string
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          hex: string
          id?: string
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          hex?: string
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          discount_percent: number
          id: string
          is_active: boolean
        }
        Insert: {
          code: string
          created_at?: string
          discount_percent: number
          id?: string
          is_active?: boolean
        }
        Update: {
          code?: string
          created_at?: string
          discount_percent?: number
          id?: string
          is_active?: boolean
        }
        Relationships: []
      }
      order_items: {
        Row: {
          color_title: string
          created_at: string
          id: string
          image_path: string | null
          line_shipping_cents: number
          line_total_cents: number
          order_id: string
          product_title: string
          product_variant_id: string | null
          quantity: number
          size_title: string
          unit_price_cents: number
        }
        Insert: {
          color_title: string
          created_at?: string
          id?: string
          image_path?: string | null
          line_shipping_cents?: number
          line_total_cents: number
          order_id: string
          product_title: string
          product_variant_id?: string | null
          quantity?: number
          size_title: string
          unit_price_cents: number
        }
        Update: {
          color_title?: string
          created_at?: string
          id?: string
          image_path?: string | null
          line_shipping_cents?: number
          line_total_cents?: number
          order_id?: string
          product_title?: string
          product_variant_id?: string | null
          quantity?: number
          size_title?: string
          unit_price_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          apartment: string | null
          city: string
          company_name: string | null
          country: string
          coupon_code: string | null
          created_at: string
          discount_cents: number
          estimated_delivery_at: string | null
          first_name: string
          id: string
          last_name: string
          order_number: string
          payment_method: string
          phone: string
          postal_code: string
          shipping_cents: number
          state: string
          status: string
          street_address: string
          subtotal_cents: number
          total_cents: number
          updated_at: string
          user_id: string
        }
        Insert: {
          apartment?: string | null
          city: string
          company_name?: string | null
          country: string
          coupon_code?: string | null
          created_at?: string
          discount_cents?: number
          estimated_delivery_at?: string | null
          first_name: string
          id?: string
          last_name: string
          order_number: string
          payment_method?: string
          phone: string
          postal_code: string
          shipping_cents?: number
          state: string
          status?: string
          street_address: string
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          apartment?: string | null
          city?: string
          company_name?: string | null
          country?: string
          coupon_code?: string | null
          created_at?: string
          discount_cents?: number
          estimated_delivery_at?: string | null
          first_name?: string
          id?: string
          last_name?: string
          order_number?: string
          payment_method?: string
          phone?: string
          postal_code?: string
          shipping_cents?: number
          state?: string
          status?: string
          street_address?: string
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          color_id: string
          created_at: string
          id: string
          path: string
          product_id: string
          sort: number
        }
        Insert: {
          color_id: string
          created_at?: string
          id?: string
          path: string
          product_id: string
          sort?: number
        }
        Update: {
          color_id?: string
          created_at?: string
          id?: string
          path?: string
          product_id?: string
          sort?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_images_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_specs: {
        Row: {
          created_at: string
          id: string
          name: string
          product_id: string
          sort: number
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          product_id: string
          sort?: number
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          product_id?: string
          sort?: number
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_specs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          color_id: string
          created_at: string
          id: string
          product_id: string
          size_id: string
          sku: string | null
          stock: number
        }
        Insert: {
          color_id: string
          created_at?: string
          id?: string
          product_id: string
          size_id: string
          sku?: string | null
          stock?: number
        }
        Update: {
          color_id?: string
          created_at?: string
          id?: string
          product_id?: string
          size_id?: string
          sku?: string | null
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variants_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      product_videos: {
        Row: {
          color_id: string
          created_at: string
          id: string
          poster_path: string | null
          product_id: string
          provider: string
          video_id: string
        }
        Insert: {
          color_id: string
          created_at?: string
          id?: string
          poster_path?: string | null
          product_id: string
          provider?: string
          video_id: string
        }
        Update: {
          color_id?: string
          created_at?: string
          id?: string
          poster_path?: string | null
          product_id?: string
          provider?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_videos_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_videos_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string
          compare_at_price_cents: number | null
          created_at: string
          description: string
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          price_cents: number
          shipping_cents: number
          slug: string
          title: string
        }
        Insert: {
          category_id: string
          compare_at_price_cents?: number | null
          created_at?: string
          description: string
          gender: Database["public"]["Enums"]["gender_type"]
          id?: string
          price_cents?: number
          shipping_cents?: number
          slug: string
          title: string
        }
        Update: {
          category_id?: string
          compare_at_price_cents?: number | null
          created_at?: string
          description?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          price_cents?: number
          shipping_cents?: number
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sizes: {
        Row: {
          created_at: string
          id: string
          slug: string
          sort: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          slug: string
          sort?: number
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          slug?: string
          sort?: number
          title?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_variant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_variant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_variant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
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
      gender_type: "men" | "women"
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
    Enums: {
      gender_type: ["men", "women"],
    },
  },
} as const
