import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  fullName: yup
    .string()
    .min(3, 'Please enter a name of minimum 3 characters.')
    .required('Please enter your full name'),
  subject: yup
    .string()
    .min(3, 'Your subject should be at least three characters')
    .required('Please enter a subject'),
  email: yup.string().email().required('Please enter an email'),
  body: yup
    .string()
    .min(3, 'Please enter a message of minimum 3 characters')
    .required('Please enter a message'),
}).required();

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className='contactContainer'>
        <h1>Contact</h1>
        <div className="contactForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formColumn">
                <div className="formGroup">
                    <label htmlFor="fullName">Full Name</label>
                    <input id="fullName" {...register('fullName')} />
                    <p>{errors.fullName?.message}</p>
                </div>

                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input id="email" {...register('email')} />
                    <p>{errors.email?.message}</p>
                </div>

                <div className="formGroup">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" {...register('subject')} />
                    <p>{errors.subject?.message}</p>
                </div>
                </div>

                <div className="textareaGroup">
                    <label htmlFor="body">Message</label>
                    <textarea rows={10} id="body" {...register('body')} />
                    <p>{errors.body?.message}</p>
                </div>

                <div className="formButton">
                <input className='btn-primary' type="submit" value="Submit" />
                </div>
            </form>
        </div>
    </div>
  );
}
