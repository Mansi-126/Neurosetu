import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://broukltgoijqhnfhxzyk.supabase.co';
const supabaseAnonkey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyb3VrbHRnb2lqcWhuZmh4enlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3OTM4MzMsImV4cCI6MjA3OTM2OTgzM30.zL79wGDH7BfRphs--A2538WzzlhjDuADAolArOhfiOE'

const supabase = createClient(supabaseUrl, supabaseAnonkey);

export default supabase;

