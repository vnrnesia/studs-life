import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { formType, formData } = body;

        const apiKey = process.env.CRM_API_KEY;
        if (!apiKey) {
            console.error('CRM_API_KEY is not defined in environment variables');
            return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
        }

        // Direction Mapping
        const directionMapping: Record<string, string | null> = {
            'university': 'admission',
            'University': 'admission',
            'transfer': 'translation',
            'Transfer': 'translation',
            'school': 'admission',
            'School': 'admission',
            'umrah': 'umrah',
            'Umrah': 'umrah',
            'workVisa': 'work_visa',
            'Work Visa': 'work_visa',
            'ticket': 'tickets',
            'Ticket': 'tickets',
            'General Inquiry': null,
            'Лид-магнит': 'admission',
        };

        const direction = directionMapping[formType];

        // Ignore if direction is null
        if (direction === undefined || direction === null) {
            console.log(`Ignoring CRM submission for formType: ${formType}`);
            return NextResponse.json({ success: true, message: 'Ignored' });
        }

        // Calculate age from dateOfBirth
        let age = null;
        if (formData.dateOfBirth) {
            const dob = new Date(formData.dateOfBirth);
            const diffMs = Date.now() - dob.getTime();
            const ageDate = new Date(diffMs);
            age = Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        // Map the payload
        const crmPayload = {
            ...formData, // Spread all extra properties first
            full_name: formData.fullName || formData.name,
            phone: formData.phone,
            email: formData.email,
            country: formData.citizenship,
            education: formData.educationLevel || formData.currentEducationLevel,
            age: age,
            relation: formData.relationship,
            direction: direction,
        };

        // Remove duplicate/unmapped keys we just re-mapped explicitly
        delete crmPayload.fullName;
        delete crmPayload.name;
        delete crmPayload.citizenship;
        delete crmPayload.educationLevel;
        delete crmPayload.currentEducationLevel;
        delete crmPayload.relationship;
        delete crmPayload.dateOfBirth;

        // Remove undefined/null properties to not send empty fields
        const cleanPayload = Object.fromEntries(
            Object.entries(crmPayload).filter(([_, v]) => v != null && v !== '')
        );

        console.log(`Sending to CRM (${formType} -> ${direction}):`, cleanPayload);

        // Fetch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const crmResponse = await fetch('http://manager-sl.ru/api/leads/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
            },
            body: JSON.stringify(cleanPayload),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!crmResponse.ok) {
            let errorText = '';
            try {
                errorText = await crmResponse.text();
            } catch (e) {
                errorText = 'Could not read error text';
            }
            console.error(`CRM API Error (${crmResponse.status}):`, errorText);
            return NextResponse.json({ success: false, message: 'CRM API Error' }, { status: crmResponse.status });
        }

        const result = await crmResponse.json();
        console.log('CRM API Success:', result);

        return NextResponse.json({ success: true, message: 'Success' });

    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.error('CRM API Timeout');
            return NextResponse.json({ success: false, message: 'Timeout' }, { status: 504 });
        }
        console.error('CRM API Exception:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
