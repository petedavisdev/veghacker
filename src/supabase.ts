import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://siscchtwatkpsgnnxaqv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNDMwMzM1NiwiZXhwIjoxOTM5ODc5MzU2fQ.RZIAtktVv1kWQPNYvT9T52heU3KYX5qlDFE_0JkCMfU"
);
