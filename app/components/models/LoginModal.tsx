'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState, useCallback } from 'react';
import { useForm, FieldValue, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

// [ ]internal imports
import { useRegisterModal } from '@/app/hooks/useRegisterModal  ';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { useLoginModal } from '@/app/hooks/useLoginModal  ';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
	const registerModel = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<any> = (data: any) => {
		setIsLoading(true);

		signIn('credentials', {
			...data,
			redirect: false,
		}).then(callback => {
			console.log(callback);
			setIsLoading(false);
			if (callback?.ok) {
				toast.success('Login successful');
				router.refresh();
				loginModal.onClose();
			}
			if (callback?.error) {
				toast.error(callback?.error);
			}
		});
	};

	const body = (
		<>
			<div className='flex flex-col gap-4'>
				<Heading title='Welcome back' subtitle='Login to continue' />
				<Input
					id='email'
					label='Email'
					disabled={isLoading}
					errors={errors}
					register={register}
					required
				/>

				<Input
					id='password'
					label='Password'
					type='password'
					disabled={isLoading}
					errors={errors}
					register={register}
					required
				/>
			</div>
		</>
	);

	const footer = (
		<div className='mt-4 flex flex-col gap-4'>
			<hr />
			<Button
				outline
				label='Continue with Google'
				onClick={() => signIn('google')}
				disabled={isLoading}
				icon={FcGoogle}
			/>
			<Button
				outline
				label='Continue with Github'
				onClick={() => signIn('github')}
				disabled={isLoading}
				icon={AiFillGithub}
			/>
			<div className='mt-5 text-center  text-neutral-500'>
				<div className='flex flex-row items-center justify-center gap-2'>
					<div className=''>New here register</div>
					<div
						className='inline-block cursor-pointer text-neutral-800
						transition-all  duration-200 hover:underline
						'
						// style={{
						// 	backgroundImage:
						// 		'linear-gradient(to right, currentColor 100%, currentColor 0)',
						// 	backgroundPosition: '0 100%',
						// 	backgroundRepeat: 'repeat-x',
						// }}
						onClick={loginModal.onClose}
					>
						here
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={body}
			footer={footer}
			secondaryAction={() => {}}
		/>
	);
};
export default LoginModal;
