import { createClient } from '@supabase/supabase-js'

const supabaseURL = 'https://egnbxopkpsqmbvvtoxod.supabase.co'
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDU5MjE3MSwiZXhwIjoxOTU2MTY4MTcxfQ.yOzeybYu9lUBjsFpYEzq1y_n2ofMWmdL4oFKmJaPizE'
const supabase = createClient(supabaseURL, supabasekey)

export default function useSupabase() {
    return { supabase }
}