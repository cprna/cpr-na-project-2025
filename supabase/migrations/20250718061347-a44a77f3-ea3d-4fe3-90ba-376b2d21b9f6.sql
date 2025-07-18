-- Update profiles table to support simple login with name, age, gender, occupation
ALTER TABLE public.profiles 
DROP COLUMN email,
ADD COLUMN age INTEGER,
ADD COLUMN gender TEXT CHECK (gender IN ('ชาย', 'หญิง', 'อื่นๆ')),
ADD COLUMN occupation TEXT,
ADD COLUMN login_date TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create a simple_users table for non-auth based users
CREATE TABLE public.simple_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age > 0 AND age < 150),
  gender TEXT NOT NULL CHECK (gender IN ('ชาย', 'หญิง', 'อื่นๆ')),
  occupation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on simple_users
ALTER TABLE public.simple_users ENABLE ROW LEVEL SECURITY;

-- Create policies for simple_users (allow everyone to create and read their own records)
CREATE POLICY "Anyone can create simple users" 
ON public.simple_users 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view all simple users" 
ON public.simple_users 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update simple users" 
ON public.simple_users 
FOR UPDATE 
USING (true);

-- Update exam_results to work with simple_users
ALTER TABLE public.exam_results 
ADD COLUMN simple_user_id UUID REFERENCES public.simple_users(id),
ALTER COLUMN user_id DROP NOT NULL;

-- Update learning_progress to work with simple_users  
ALTER TABLE public.learning_progress
ADD COLUMN simple_user_id UUID REFERENCES public.simple_users(id),
ALTER COLUMN user_id DROP NOT NULL;

-- Create index for better performance
CREATE INDEX idx_simple_users_name ON public.simple_users(full_name);
CREATE INDEX idx_exam_results_simple_user ON public.exam_results(simple_user_id);
CREATE INDEX idx_learning_progress_simple_user ON public.learning_progress(simple_user_id);