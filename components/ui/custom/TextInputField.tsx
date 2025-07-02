'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { ComponentProps, ReactNode, useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  labelStyles?: string;
  formDescription?: string;
  className?: string;
  formItemClassName?: string;
  icon?: ReactNode;
  type?: 'password' | 'text' | 'email' | 'number' | 'time' | 'tel';
};

type InputProps<T extends FieldValues> = BaseProps<T> & {
  inputType?: 'input';
} & ComponentProps<'input'>;

type TextareaProps<T extends FieldValues> = BaseProps<T> & {
  inputType: 'textarea';
} & ComponentProps<'textarea'>;

type TTextInputFieldProps<T extends FieldValues> =
  | ({
      inputType?: 'input';
    } & InputProps<T>)
  | ({
      inputType: 'textarea';
    } & TextareaProps<T>);

export function TextInputField<T extends FieldValues>({
  control,
  label,
  name,
  formDescription,
  labelStyles,
  inputType = 'input',
  className,
  formItemClassName,
  icon,
  type,
  ...inputProps
}: TTextInputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        const parentClasses = cn(
          'mt-2 h-[50px] w-full border px-[15px] flex rounded-[8px] gap-[10px] items-center bg-white/90',
          hasError && 'border-red-500'
        );

        return (
          <FormItem className={formItemClassName}>
            {label && (
              <FormLabel className={cn('text-white', labelStyles)}>
                {label}
                {inputProps.required && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <div>
                {inputType === 'input' && (
                  <div className={cn(parentClasses, className)}>
                    <Input
                      type={
                        type === 'password'
                          ? showPassword
                            ? 'text'
                            : 'password'
                          : type
                      }
                      id={name}
                      autoComplete="off"
                      className="ring-0 h-full outline-0 border-none placeholder:text-[#8F8F8F] flex-1 p-0 font-medium tracking-[-0.14px] text-[#3f3f3f] focus-visible:ring-0 bg-transparent"
                      {...(inputProps as ComponentProps<'input'>)}
                      {...field}
                      value={field.value ?? ''}
                    />
                    {icon && <span>{icon}</span>}
                    {type === 'password' && (
                      <button
                        type="button"
                        className="text-white cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={16} color="#666666" />
                        ) : (
                          <Eye size={16} color="#666666" />
                        )}
                      </button>
                    )}
                  </div>
                )}
                {inputType === 'textarea' && (
                  <Textarea
                    id={name}
                    autoComplete="off"
                    className={cn(
                      'h-[94px] ring-0 mt-2 focus-visible:ring-0 bg-white/90 resize-none',
                      className
                    )}
                    {...(inputProps as ComponentProps<'textarea'>)}
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      type === 'number'
                        ? field.onChange(Number(e.target.value))
                        : field.onChange(e.target.value)
                    }
                  />
                )}
              </div>
            </FormControl>
            {formDescription && (
              <FormDescription>{formDescription}</FormDescription>
            )}
            <FormMessage className="text-[12px] text-red-500" />
          </FormItem>
        );
      }}
    />
  );
}
