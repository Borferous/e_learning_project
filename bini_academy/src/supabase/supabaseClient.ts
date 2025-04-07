import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zeyuirreakbvehsrgmyv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpleXVpcnJlYWtidmVoc3JnbXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTA3NDQsImV4cCI6MjA1OTU2Njc0NH0.tbpPe5Vh-q4GQ8WpYrSKLyO8k6Dqb48BfR7ev9OtCPM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;