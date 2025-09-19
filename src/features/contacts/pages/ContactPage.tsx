/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import MyButton from '../../../components/MyButton'
import api from '../../../utils/api'
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useLanguage } from '../../i18n/useLanguage';
import { contacttranslations } from '../i18n/contactTransilation';
import ContactService, { type ContactRequest, type InquiryType } from '../service';
import { toast } from 'sonner';
import ContactTable from './ContactTable';
function Contact() {
    const [locationData, setLocationData] = useState(null)
    const [isLoadingLocation, setIsLoadingLocation] = useState(false)
    const [locationError, setLocationError] = useState("")
    const [hasRequestedLocation, setHasRequestedLocation] = useState(false)

    const { language } = useLanguage();

    const t = contacttranslations[language];
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,

    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            organization: '',
            message: '',
            inquiry_type: 'general' as InquiryType
        }
    })



    // Function to fetch location data from coordinates
    const fetchLocationData = async (latitude: number, longitude: number) => {
        try {
            setIsLoadingLocation(true);
            setLocationError("");

            const response = await api.post(
                "/locate/place/",
                { latitude, longitude }, // JSON body directly
                { headers: { "Content-Type": "application/json" } }
            );

            const result = response.data; // axios parses JSON automatically

            if (result.success && result.data) {
                setLocationData(result.data);

                // Auto-fill the organization field using the API response
                const locationString = `${result.data.village}, ${result.data.cell}, ${result.data.sector}, ${result.data.district}, ${result.data.province}`;
                setValue("organization", locationString);

                return result.data;
            } else {
                throw new Error(result.message || "Location not found");
            }
        } catch (error: any) {
            console.error("Error fetching location:", error);
            setLocationError(error.message || "Failed to fetch location");
            return null;
        } finally {
            setIsLoadingLocation(false);
        }
    };


    // Function to get user's current position
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by this browser')
            return
        }

        setIsLoadingLocation(true)
        setHasRequestedLocation(true)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                await fetchLocationData(latitude, longitude)
            },
            (error) => {
                setIsLoadingLocation(false)
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError('Location access denied by user')
                        break
                    case error.POSITION_UNAVAILABLE:
                        setLocationError('Location information is unavailable')
                        break
                    case error.TIMEOUT:
                        setLocationError('Location request timed out')
                        break
                    default:
                        setLocationError('An unknown error occurred')
                        break
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        )
    }

    const onSubmit = async (data: ContactRequest) => {
        try {
            console.log('Form Data:', data)
            await ContactService.createContact(data)

            toast.success(t.success)
            reset()
        } catch (error) {
            console.error('Error submitting form:', error)
            toast.error(t.fail)
        }
    }

    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <ContactTable />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6 text-primary-dark bg-gradient-to-r from-primary-dark to-blue-600 bg-clip-text ">
                        {t.contactHeader}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t.contactDescription}
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-primary-normal to-blue-600 px-8 py-6">
                        <h3 className="text-2xl font-semibold text-white">{t.sendMessage}</h3>
                        <p className="text-blue-100 mt-2">{t.respondWithin}</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                        {/* Personal Information Section */}
                        <div className="mb-10">
                            <h4 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-primary-normal/20">
                                {t.personalInfo}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                        {t.fullName} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name', {
                                            required: `${t.fullName} is required`,
                                            minLength: {
                                                value: 2,
                                                message: `${t.fullName} must be at least 2 characters`
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: `${t.fullName} must be less than 50 characters`
                                            }
                                        })}
                                        className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        placeholder={t.fullName}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600 font-medium">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                        {t.email} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email', {
                                            required: `${t.email} is required`,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Please enter a valid email address'
                                            }
                                        })}
                                        className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        placeholder={t.email}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600 font-medium">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Organization Information Section */}
                        <div className="mb-10">
                            <h4 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-primary-normal/20">
                                {t.organization}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Phone Field */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-semibold text-gray-700"
                                    >
                                        {t.phone} <span className="text-red-500">*</span>
                                    </label>

                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{
                                            required: `${t.phone} is required`,
                                            validate: (value) =>
                                                value?.startsWith("+") || "Phone number must include country code",
                                        }}
                                        render={({ field }) => (
                                            <PhoneInput
                                                {...field}
                                                id="phone"
                                                defaultCountry="RW"
                                                international
                                                withCountryCallingCode
                                                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200
                focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal
                ${errors.phone
                                                        ? "border-red-400 bg-red-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            />
                                        )}
                                    />

                                    {errors.phone && (
                                        <p className="text-sm text-red-600 font-medium">
                                            {errors.phone.message as string}
                                        </p>
                                    )}
                                </div>

                                {/* Organization Field */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="organization" className="block text-sm font-semibold text-gray-700">
                                            {t.organization}
                                        </label>
                                        {!hasRequestedLocation && (
                                            <button
                                                type="button"
                                                onClick={getCurrentLocation}
                                                disabled={isLoadingLocation}
                                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-primary-normal bg-primary-normal/10 hover:bg-primary-normal/20 rounded-full transition-colors duration-200 disabled:opacity-50"
                                            >
                                                {isLoadingLocation ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-primary-normal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        {t.sending}
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {t.useLocation}
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        id="organization"
                                        {...register('organization', {
                                            maxLength: {
                                                value: 200,
                                                message: `${t.organization} must be less than 200 characters`
                                            }
                                        })}
                                        className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal ${errors.organization ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            } ${locationData ? 'bg-green-50 border-green-300' : ''}`}
                                        placeholder={t.organization}
                                    />
                                    {locationData && (
                                        <div className="flex items-center text-sm text-green-600 mt-1">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {t.locationDetected}
                                        </div>
                                    )}
                                    {locationError && (
                                        <div className="flex items-center text-sm text-amber-600 mt-1">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {locationError}
                                        </div>
                                    )}
                                    {errors.organization && (
                                        <p className="text-sm text-red-600 font-medium">{errors.organization.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Inquiry Information Section */}
                        <div className="mb-10">
                            <h4 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-primary-normal/20">
                                {t.inquiry}
                            </h4>

                            {/* Inquiry Type Field */}
                            <div className="mb-6">
                                <label htmlFor="inquiry_type" className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t.inquiryType} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="inquiry_type"
                                    {...register('inquiry_type', {
                                        required: 'Please select an inquiry type'
                                    })}
                                    className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal ${errors.inquiry_type ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <option value="general">{t.general}</option>
                                    <option value="implementation">{t.implementation}</option>
                                    <option value="partnership">{t.partnership}</option>
                                    <option value="technical">{t.technical}</option>
                                    <option value="demo">{t.demo}</option>
                                </select>
                                {errors.inquiry_type && (
                                    <p className="text-sm text-red-600 font-medium mt-1">{errors.inquiry_type.message}</p>
                                )}
                            </div>

                            {/* Message Field */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                                    {t.message} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    {...register('message', {
                                        required: `${t.message} is required`,
                                        minLength: {
                                            value: 10,
                                            message: `${t.message} must be at least 10 characters`
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: `${t.message} must be less than 1000 characters`
                                        }
                                    })}
                                    className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    placeholder={t.message}
                                />
                                {errors.message && (
                                    <p className="text-sm text-red-600 font-medium">{errors.message.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-gray-500">
                                    {t.requiredNote}
                                </p>
                                <MyButton
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="text-white font-semibold px-8 py-4 bg-gradient-to-r from-primary-normal to-blue-600 hover:from-primary-dark hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {t.sending}
                                        </>
                                    ) : (
                                        <>
                                            {t.submit}
                                            <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </>
                                    )}
                                </MyButton>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Additional Contact Info */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="w-12 h-12 bg-primary-normal rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h5 className="font-semibold text-gray-800 mb-2">Email Us</h5>
                        <p className="text-gray-600">contact@smartvillage.com</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="w-12 h-12 bg-primary-normal rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h5 className="font-semibold text-gray-800 mb-2">Call Us</h5>
                        <p className="text-gray-600">+1 (555) 123-SMART</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="w-12 h-12 bg-primary-normal rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h5 className="font-semibold text-gray-800 mb-2">Response Time</h5>
                        <p className="text-gray-600">{t.respondWithin}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact