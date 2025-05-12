'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { FiPlus, FiEdit2, FiBook, FiLock, FiBookOpen } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';

const subjectSchema = z.object({
    subjectCode: z.string()
        .min(1, 'Subject code is required')
        .max(10, 'Code must be 10 characters or less')
        .regex(/^[A-Z0-9]+$/, 'Only uppercase letters and numbers allowed'),
    name: z.string()
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must be 100 characters or less'),
    isOpen: z.boolean().default(false),
    prerequisites: z.string()
        .optional(),
    creditHours: z.number()
        .int()
        .min(1, 'Minimum 1 credit hour')
        .max(6, 'Maximum 6 credit hours')
        .default(3),

});

type SubjectFormValues = z.infer<typeof subjectSchema>;

interface SubjectFormProps {
    defaultValues?: Partial<SubjectFormValues>;
    isEdit?: boolean;
    onSuccess?: () => void;
    onOpenChange?: (open: boolean) => void;
}

export default function NewSubjectForm({
    defaultValues,
    isEdit = false,
    onSuccess,
    onOpenChange
}: SubjectFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isDirty }
    } = useForm<SubjectFormValues>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            subjectCode: '',
            name: '',
            isOpen: false,
            prerequisites: '',
            creditHours: 3,
            ...defaultValues
        }
    });

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) reset();
        onOpenChange?.(open);
    };

    const handleFormSubmit: SubmitHandler<SubjectFormValues> = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/subjects/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subjectName: data.name,
                    subjectCode: data.subjectCode,
                    isOpen: data.isOpen,
                    prerequisites: data.prerequisites || '',
                    creditHours: data.creditHours,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.log(error);
                console.log(data)
                toast.error(error.error || 'An error occurred');
                return;
            }

            toast.success(`Subject ${isEdit ? 'updated' : 'created'} successfully!`);
            handleOpenChange(false);
            onSuccess?.();
            reset();
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    {isEdit ? (
                        <>
                            <FiEdit2 size={16} /> Edit Subject
                        </>
                    ) : (
                        <>
                            <FiPlus size={16} /> Add Subject
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-gray-900/80 backdrop-blur-sm border-gray-700 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <FiBook size={20} />
                        {isEdit ? 'Edit Subject' : 'Create New Subject'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit ? 'Update the subject details below.' : 'Fill out the form to add a new subject.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="space-y-2">
                            {/* Subject Code */}
                            <div className="space-y-2 text-white">
                                <Label htmlFor="subjectCode">Subject Code *</Label>
                                <Input
                                    id="subjectCode"
                                    placeholder="MATH101"
                                    {...register('subjectCode')}
                                    className={errors.subjectCode ? 'border-red-500' : ''}
                                />
                                {errors.subjectCode && (
                                    <p className="text-sm text-red-500">{errors.subjectCode.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Subject Name */}
                        <div className="space-y-2 text-white">
                            <Label htmlFor="name">Subject Name *</Label>
                            <Input
                                id="name"
                                placeholder="Calculus I"
                                {...register('name')}
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Prerequisites */}
                    <div className="space-y-2 text-white">
                        <Label htmlFor="prerequisites">Prerequisites</Label>
                        <Input
                            id="prerequisites"
                            placeholder="MATH100, PHYS101 (comma separated)"
                            {...register('prerequisites')}
                        />
                        <p className="text-xs text-gray-400">Leave empty if no prerequisites</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Credit Hours */}
                        <div className="space-y-2 ">
                            <Label htmlFor="creditHours" className='text-white'>Credit Hours</Label>
                            <Controller
                                name="creditHours"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <Input
                                            id="creditHours"
                                            type="number"
                                            min="1"
                                            max="6"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                            className="pl-10 text-white min-h-[50px]"
                                        />
                                        <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                )}
                            />
                            {errors.creditHours && (
                                <p className="text-sm text-red-500">{errors.creditHours.message}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label className='text-white'>Status</Label>
                            <Controller
                                name="isOpen"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center gap-3 p-2 border rounded-lg text-white min-h-[50px]">
                                        {field.value ? (
                                            <FiBookOpen className="text-green-500" />
                                        ) : (
                                            <FiLock className="text-red-500" />
                                        )}
                                        <Label htmlFor="isOpen" className="flex-1 cursor-pointer">
                                            {field.value ? 'Open for Enrollment' : 'Closed for Enrollment'}
                                        </Label>
                                        <Checkbox
                                            id="isOpen"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="h-5 w-5"
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            onClick={() => handleOpenChange(false)}
                            className="gap-2 cursor-pointer border-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || (!isEdit && !isDirty)}
                            variant="outline"
                            className="cursor-pointer hover:bg-gray-300 text-black"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin">↻</span> Processing...
                                </>
                            ) : isEdit ? (
                                'Update Subject'
                            ) : (
                                'Create Subject'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}