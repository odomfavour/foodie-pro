'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TextInputField } from '@/components/ui/custom/TextInputField';
import { toast } from 'react-toastify'; // if you're using toast
import { useRegister } from '@/hooks/custom/use-auth';

// ✅ Validation Schema
const signupSchema = z.object({
  fullName: z.string().min(3, 'Full Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneCode: z.string().min(2, 'Phone code is required'),
  phone: z.string().min(6, 'Phone number must be at least 6 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const { mutate: registerMutate, isPending: loading } = useRegister();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phoneCode: '+234',
      phone: '',
      address: '',
    },
  });

  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const onSubmit = async (data: SignupFormValues) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      address: data.address,
      phone: {
        code: data.phoneCode,
        number: data.phone.replace(/^0/, ''),
      },
    };

    console.log('hhdf', payload);

    registerMutate(payload, {
      onSuccess: () => {
        toast.success('Signup successful');
        router.push('/login');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Signup failed');
      },
    });
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-white">Create Account</h2>
      <p className="my-5 text-gray-400">Get Started with Your Account</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* ✅ Step 1: Basic Info */}
          {step === 1 && (
            <>
              <TextInputField
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                required
              />
              <TextInputField
                control={form.control}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                required
              />
              <TextInputField
                control={form.control}
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                required
              />
            </>
          )}

          {/* ✅ Step 2: Additional Info */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Phone Code
                </label>
                <select
                  {...form.register('phoneCode')}
                  className="w-full rounded-md border border-gray-300 p-2 text-black bg-white"
                >
                  <option value="+234">+234 (Nigeria)</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (India)</option>
                </select>
              </div>

              <TextInputField
                control={form.control}
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="Enter your phone number"
                required
              />
              <TextInputField
                control={form.control}
                name="address"
                label="Address"
                placeholder="Enter your address"
                required
              />
            </>
          )}

          {/* ✅ Navigation Buttons */}
          <div className="flex justify-end">
            <div className="flex gap-3 mt-4">
              {step > 1 && (
                <Button type="button" onClick={prevStep} variant="outline">
                  Back
                </Button>
              )}
              {step < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading ? 'Signing up...' : 'Signup'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>

      <p className="text-sm text-center mt-4 text-white">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-300 hover:underline">
          Login here
        </Link>
      </p>
    </section>
  );
};

export default Signup;
