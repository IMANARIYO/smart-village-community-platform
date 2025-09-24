import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import MyButton from "../../../components/MyButton";
import api from "../../../utils/api";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useLanguage } from "../../i18n/useLanguage";
import { contacttranslations } from "../i18n/contactTransilation";
import ContactService, { CreateContactRequest, type InquiryType } from "../service";
import { toast } from "sonner";


function Contact() {
    const [locationData, setLocationData] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState("");
    const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

    const { language } = useLanguage();
    const t = contacttranslations[language];

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,

        clearErrors
    } = useForm<CreateContactRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            organization: "",
            message: "",
            inquiry_type: "general" as InquiryType,
        },
    });



    // Automatically focus the first invalid field
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstKey = Object.keys(errors)[0] as keyof CreateContactRequest;
            const el = document.getElementById(firstKey);
            el?.focus();
        }
    }, [errors]);

    const fetchLocationData = async (latitude: number, longitude: number) => {
        try {
            setIsLoadingLocation(true);
            setLocationError("");
            const response = await api.post(
                "/locate/place/",
                { latitude, longitude },
                { headers: { "Content-Type": "application/json" } }
            );
            const result = response.data;

            if (result.success && result.data) {
                setLocationData(result.data);
                const locationString = `${result.data.village}, ${result.data.cell}, ${result.data.sector}, ${result.data.district}, ${result.data.province}`;
                setValue("organization", locationString);
                clearErrors("organization");
                return result.data;
            } else throw new Error(result.message || "Location not found");
        } catch (error) {
            console.error(error || "Failed to fetch location");
            return null;
        } finally {
            setIsLoadingLocation(false);
        }
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by this browser");
            return;
        }
        setIsLoadingLocation(true);
        setHasRequestedLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await fetchLocationData(latitude, longitude);
            },
            (error) => {
                setIsLoadingLocation(false);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError("Location access denied by user");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationError("Location information is unavailable");
                        break;
                    case error.TIMEOUT:
                        setLocationError("Location request timed out");
                        break;
                    default:
                        setLocationError("An unknown error occurred");
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
    };

    const onSubmit = async (data: CreateContactRequest) => {
        try {
            console.log("Submitting data:", data);
            await ContactService.createContact(data);
            toast.success(t.success);
            reset();
            setLocationData(null);
            setHasRequestedLocation(false);
        } catch (error) {
            console.error("Error submitting the contact message:", error);
            toast.error(t.fail);
        }
    };

    return (
        <section
            id="contact"
            className="bg-gradient-to-br from-gray-50 to-blue-50 w-full"
            aria-labelledby="contact-heading"
            role="region"
        >


            <div className="w-full px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <header className="text-center mb-16">
                    <h2 id="contact-heading" className="text-5xl font-bold mb-6 text-primary-dark bg-clip-text bg-gradient-to-r from-primary-normal to-blue-600">
                        {t.contactHeader}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t.contactDescription}
                    </p>
                </header>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    aria-labelledby="contact-form-heading"
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden  mx-auto"
                    noValidate
                >
                    <div className="bg-gradient-to-r from-primary-normal to-blue-600 px-8 py-6">
                        <h3 id="contact-form-heading" className="text-2xl font-semibold text-white">
                            {t.sendMessage}
                        </h3>
                        <p className="text-blue-100 mt-2">{t.respondWithin}</p>
                    </div>

                    <div className="p-8 space-y-10">
                        {/* Personal Info */}
                        <fieldset className="space-y-6">
                            <legend className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-primary-normal/20">
                                {t.personalInfo}
                            </legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                        {t.fullName} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        autoComplete="name"
                                        {...register("name", {
                                            required: `${t.fullName} is required`,
                                            minLength: {
                                                value: 2,
                                                message: `${t.fullName} must be at least 2 characters`
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: `${t.fullName} must be less than 50 characters`
                                            },
                                            validate: {
                                                notEmpty: (value) => value.trim().length > 0 || `${t.fullName} cannot be empty`,
                                                validName: (value) => /^[a-zA-Z\s'-]+$/.test(value.trim()) || "Please enter a valid name"
                                            }
                                        })}
                                        className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        placeholder={t.fullName}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600 font-medium" role="alert">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                        {t.email} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        autoComplete="email"
                                        {...register("email", {
                                            required: `${t.email} is required`,
                                            validate: {
                                                notEmpty: (value) => value.trim().length > 0 || `${t.email} cannot be empty`,
                                                validEmail: (value) => {
                                                    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                                                    return emailRegex.test(value.trim()) || "Please enter a valid email address";
                                                }
                                            }
                                        })}
                                        className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        placeholder={t.email}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600 font-medium" role="alert">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </fieldset>

                        {/* Organization Info */}
                        <fieldset className="space-y-6">
                            <legend className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-primary-normal/20">
                                {t.organization}
                            </legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Phone */}
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
                                {/* Organization */}
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
                                                {isLoadingLocation ? `${t.sending}...` : t.useLocation}
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        id="organization"
                                        autoComplete="organization"
                                        {...register("organization", {
                                            maxLength: {
                                                value: 200,
                                                message: `${t.organization} must be less than 200 characters`
                                            }
                                        })}
                                        className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal ${errors.organization ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            } ${locationData ? "bg-green-50 border-green-300" : ""}`}
                                        placeholder={t.organization}
                                    />
                                    {locationData && <p className="text-sm text-green-600">{t.locationDetected}</p>}
                                    {locationError && <p className="text-sm text-amber-600">{locationError}</p>}
                                    {errors.organization && (
                                        <p className="text-sm text-red-600 font-medium" role="alert">
                                            {errors.organization.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </fieldset>

                        {/* Inquiry */}
                        <fieldset className="space-y-6">
                            <legend className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-primary-normal/20">
                                {t.inquiry}
                            </legend>

                            {/* Type */}
                            <div className="space-y-2">
                                <label htmlFor="inquiry_type" className="block text-sm font-semibold text-gray-700">
                                    {t.inquiryType} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="inquiry_type"
                                    {...register("inquiry_type", {
                                        required: "Please select an inquiry type",
                                        validate: {
                                            notEmpty: (value: InquiryType) => {
                                                // Convert to string for comparison if needed
                                                const stringValue = value as string;
                                                return stringValue !== "" && stringValue !== undefined || "Please select an inquiry type";
                                            }
                                        }
                                    })}
                                    className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal ${errors.inquiry_type ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <option value="">Select inquiry type...</option>
                                    <option value="general">{t.general}</option>
                                    <option value="implementation">{t.implementation}</option>
                                    <option value="partnership">{t.partnership}</option>
                                    <option value="technical">{t.technical}</option>
                                    <option value="demo">{t.demo}</option>
                                </select>
                                {errors.inquiry_type && (
                                    <p className="text-sm text-red-600 font-medium" role="alert">
                                        {errors.inquiry_type.message}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                                    {t.message} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    {...register("message", {
                                        required: `${t.message} is required`,
                                        validate: {
                                            notEmpty: (value) => value.trim().length > 0 || `${t.message} cannot be empty`,
                                            minLength: (value) => value.trim().length >= 10 || `${t.message} must be at least 10 characters`,
                                            maxLength: (value) => value.trim().length <= 1000 || `${t.message} must be less than 1000 characters`
                                        }
                                    })}
                                    className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-normal/20 focus:border-primary-normal resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    placeholder={t.message}
                                />
                                {errors.message && (
                                    <p className="text-sm text-red-600 font-medium" role="alert">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>
                        </fieldset>

                        {/* Submit */}
                        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">{t.requiredNote}</p>
                            <MyButton
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="text-white font-semibold px-8 py-4 bg-gradient-to-r from-primary-normal to-blue-600 hover:from-primary-dark hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {isSubmitting ? `${t.sending}...` : t.submit}
                            </MyButton>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contact;