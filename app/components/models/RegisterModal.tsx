'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

// [ ]internal imports
import { useRegisterModal } from '@/app/hooks/useRegisterModal  ';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { useLoginModal } from '@/app/hooks/useLoginModal  ';

const RegisterModal = () => {
	const registerModel = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<any> = async (data: any) => {
		setIsLoading(true);

		try {
			if (!data.email.includes('@') || !data.email.includes('.')) {
				toast.error('missing @ or . in emai');
				return;
			}
			const response = await axios
				.post('/api/register', data)
				.then(() => registerModel.onClose());
			toast.success('SignIn Successful');
			console.log(response);
		} catch (error: any) {
			toast.error('Something went wrong');
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const body = (
		<>
			<div className='flex flex-col gap-4'>
				<Heading
					title='Welcome to Airbnb'
					subtitle='Create an account to continue'
				/>
				<Input
					id='email'
					label='Email'
					disabled={isLoading}
					errors={errors}
					register={register}
					required
				/>
				<Input
					id='name'
					label='Name'
					type='text'
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
					<div className=''>Already have an account ? </div>
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
						onClick={registerModel.onClose}
					>
						Login
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModel.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={registerModel.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={body}
			footer={footer}
			secondaryAction={() => {}}
		/>
	);
};
export default RegisterModal;
