// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tkzwasiookscatqkzrly.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrendhc2lvb2tzY2F0cWt6cmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxODcxOTUsImV4cCI6MjA1ODc2MzE5NX0.J8gq5Qzwj6IfW4nqT1EChTPVRNqwGB4UC2FaS7qc8NQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);