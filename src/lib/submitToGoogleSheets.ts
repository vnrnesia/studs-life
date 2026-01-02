/**
 * Submit form data to Google Sheets via Google Apps Script
 * @param formType - Type of form (e.g., 'University', 'Transfer', 'School', etc.)
 * @param formData - Form data object
 * @returns Promise with success status and message
 */
export async function submitToGoogleSheets(
    formType: string,
    formData: Record<string, any>
): Promise<{ success: boolean; message: string }> {
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

    if (!scriptUrl) {
        console.error('Google Sheets URL not configured');
        return {
            success: false,
            message: 'Configuration error. Please contact support.',
        };
    }

    try {
        // Prepare data with form type and timestamp
        // Map form data keys to Google Sheet headers (Russian)
        const mappedData = {
            'Тип формы': formType,
            'ФИО': formData.fullName,
            'Телефон': formData.phone,
            'Email': formData.email,
            'Дата рождения': formData.dateOfBirth,
            'Степень родства': formData.relationship,
            'Гражданство': formData.citizenship,
            'Регион': formData.region,
            'Город': formData.city,
            'Уровень образования': formData.educationLevel || formData.currentEducationLevel,
            'Направление': formData.fieldOfStudy || formData.targetField || formData.currentField,
            'Университет': formData.targetUniversity || formData.currentUniversity,
            'Страна': formData.targetCountry || formData.currentCountry,
            'Срок паспорта': formData.passportExpiry,
            'Есть паспорт': formData.hasPassport,
            'Месяц поездки': formData.travelMonth,
            'Предпочтения по работе': formData.workPreferences,
            'Предыдущие поездки': formData.previousTravel,
            'Откуда': formData.fromCity,
            'Куда': formData.toCity,
            'Дата поездки': formData.travelDate,
            'Багаж': formData.needsBaggage,
            ...formData // Keep original keys just in case
        };

        const dataToSend = {
            timestamp: new Date().toISOString(),
            ...mappedData,
        };

        // Send POST request to Google Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors mode
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        // Note: With no-cors mode, we can't read the response
        // We assume success if no error was thrown
        return {
            success: true,
            message: 'Form submitted successfully!',
        };
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return {
            success: false,
            message: 'Failed to submit form. Please try again.',
        };
    }
}
