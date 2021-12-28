import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/useAuthUser'

const supabaseURL = 'https://egnbxopkpsqmbvvtoxod.supabase.co'
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDU5MjE3MSwiZXhwIjoxOTU2MTY4MTcxfQ.yOzeybYu9lUBjsFpYEzq1y_n2ofMWmdL4oFKmJaPizE'
const supabase = createClient(supabaseURL, supabasekey)

supabase.auth.onAuthStateChange((event, session) => {
    const { user } = useAuthUser()
    user.value = session?.user || null
})

export default function useSupabase() {
    return { supabase }
}