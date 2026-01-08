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
        // Mapping from English values to Russian
        const valueMapping: Record<string, string> = {
            // Service types
            'university': 'Для абитуриентов',
            'transfer': 'Для переводников',
            'school': 'Для школьников в Китай',
            'umrah': 'Умра в Мекку',
            'workVisa': 'Рабочая виза',
            'ticket': 'Покупка билета',
            'University': 'Для абитуриентов',
            'Transfer': 'Для переводников',
            'School': 'Для школьников в Китай',
            'Umrah': 'Умра в Мекку',
            'Work Visa': 'Рабочая виза',
            'Ticket': 'Покупка билета',

            // Education levels / Form of study
            'language': 'Языковые курсы',
            'preparatory': 'Подготовительный факультет',
            'bachelor': 'Бакалавриат',
            'master': 'Магистратура',
            'paid': 'Платное обучение',
            'grant': 'Грант/Бюджет',

            // Relationships
            'self': 'Сам(а)',
            'father': 'Отец',
            'mother': 'Мать',
            'friend': 'Друг/Знакомый',

            // Passport / Baggage / Yes-No
            'yes': 'Да',
            'no': 'Нет',
            'yesBaggage': 'С багажом',
            'noBaggage': 'Без багажа',

            // Countries
            'Turkmenistan': 'Туркменистан',
            'China': 'Китай',
            'Turkey': 'Турция',
            'Uzbekistan': 'Узбекистан',
            'Tajikistan': 'Таджикистан',
            'Russia': 'Россия',
            'Kazakhstan': 'Казахстан',
            'Kyrgyzstan': 'Киргизия',
            'Afghanistan': 'Афганистан',
            'Iran': 'Иран',
            'Belarus': 'Беларусь',
            'Cyprus': 'Кипр',
            'Europe': 'Европа',

            // Regions (Turkmenistan)
            'Lebap': 'Лебап',
            'Mary': 'Мары',
            'Dashoguz': 'Дашогуз',
            'Balkan': 'Балкан',
            'Ahal': 'Ахал',
            'Ashgabat': 'Ашхабад',

            // Transfer types
            'same': 'В той же стране',
            'different': 'В другую страну'
        };

        const mapValue = (val: any) => {
            if (typeof val !== 'string') return val;
            return valueMapping[val] || val;
        };

        // Prepare data with form type and timestamp
        // Map form data keys to Google Sheet headers (Russian)
        const mappedData = {
            'Тип формы': mapValue(formType),
            'ФИО': formData.fullName,
            'Телефон': formData.phone,
            'Email': formData.email,
            'Дата рождения': formData.dateOfBirth,
            'Степень родства': mapValue(formData.relationship),
            'Гражданство': mapValue(formData.citizenship),
            'Регион': mapValue(formData.region),
            'Город': formData.city,
            'Уровень образования': mapValue(formData.educationLevel || formData.currentEducationLevel),
            'Направление обучения': formData.fieldOfStudy || formData.targetField || formData.currentField,
            'Университет': formData.targetUniversity || formData.currentUniversity,
            'Страна назначения': mapValue(formData.targetCountry || formData.currentCountry),
            'Срок паспорта': formData.passportExpiry,
            'Есть паспорт': mapValue(formData.hasPassport),
            'Месяц поездки': mapValue(formData.travelMonth),
            'Предпочтения по работе': formData.workPreferences,
            'Предыдущие поездки': formData.previousTravel,
            'Откуда': formData.fromCity,
            'Куда': formData.toCity,
            'Дата поездки': formData.travelDate,
            'Багаж': mapValue(formData.needsBaggage),
            // Fallback for any other values that might need mapping
            ...Object.keys(formData).reduce((acc: any, key) => {
                acc[key] = mapValue(formData[key]);
                return acc;
            }, {})
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
