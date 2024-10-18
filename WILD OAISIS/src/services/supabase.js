import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jhotqrhqrooyrjwjyuaj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impob3Rxcmhxcm9veXJqd2p5dWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMzE5MzcsImV4cCI6MjAxMDgwNzkzN30.tuI7vfYYT4oKR8wB31YUv1W6qQ2F7nn2IXA4sOb-W3M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
