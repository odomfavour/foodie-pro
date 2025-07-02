'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { cn } from '@/lib/utils';
import { Control, FieldValues, Path } from 'react-hook-form';
import { ReactNode } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';

type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  labelStyles?: string;
  formDescription?: string;
  className?: string;
  formItemClassName?: string;
  icon?: ReactNode;
};

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps<T extends FieldValues> = BaseProps<T> & {
  options: SelectOption[];
  placeholder?: string;
};

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  labelStyles,
  formDescription,
  options,
  className,
  formItemClassName,
  placeholder = 'Select an option',
  icon,
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          {label && (
            <FormLabel className={cn('text-[#3f3f3f]', labelStyles)}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <SelectTrigger
                className={cn(
                  'mt-2 h-[50px] w-full border px-[15px] flex rounded-[8px] items-center bg-white/90 text-[#3f3f3f] font-medium tracking-[-0.14px] placeholder:text-[#8F8F8F]',
                  className
                )}
              >
                <SelectValue placeholder={placeholder} />
                {icon && <span className="ml-auto">{icon}</span>}
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {formDescription && (
            <FormDescription>{formDescription}</FormDescription>
          )}
          <FormMessage className="text-[12px] text-red-500" />
        </FormItem>
      )}
    />
  );
}
