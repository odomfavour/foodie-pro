'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-provider';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TextInputField } from '@/components/ui/custom/TextInputField'; // <-- adjust path as needed
import { useRouter } from 'next/navigation';

// Schema definition
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);

    try {
      // TODO: replace this with actual login logic
      const response = await login(data);
      console.log('response', response, isAuthenticated);
      if (response?.token && isAuthenticated) {
        if (response?.user?.role == 'customer') {
          router.push('/menu');
        } else {
          router.push('/dashboard');
          console.log('Login data:', data);
          toast.success('Logged in successfully');
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white">Login</h2>
      <p className="text-gray-400 mb-4">Please sign in to continue</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email field using your custom component */}
          <TextInputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            required
            type="email"
          />

          {/* Password field using your custom component */}
          <TextInputField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            required
            type="password"
          />

          <div className="text-right text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-300 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            variant="default"
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-white text-center mt-4">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-blue-300 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
