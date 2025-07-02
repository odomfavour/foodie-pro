'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TextInputField } from '@/components/ui/custom/TextInputField'; // Adjust path if needed

// ✅ Validation Schema
const signupSchema = z.object({
  fullName: z.string().min(3, 'Full Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  answer: z.string().min(2, 'Security answer must be at least 2 characters'),
  userType: z.enum(['admin', 'user', 'moderator']),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      answer: '',
      userType: 'user',
    },
  });

  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const onSubmit = async (data: SignupFormValues) => {
    console.log('Signup Data:', data);
    alert('Signup successful!');
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
              <TextInputField
                control={form.control}
                name="phone"
                type="tel"
                label="Phone"
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
              <TextInputField
                control={form.control}
                name="answer"
                label="Security Answer"
                placeholder="Enter security answer"
                required
              />
              {/* You can replace this with a custom SelectField later if needed */}
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
                <Button type="submit">Signup</Button>
              )}
            </div>
          </div>
        </form>
      </Form>

      {/* ✅ Already have an account? */}
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
