import { NextResponse } from 'next/server';

const TELEGRAM_TOKEN = "8623701592:AAGDuf4qt7ItYoBMU8mEnSbX7fx61YFMylk";
const TELEGRAM_CHAT_ID = "7199898267";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, telegram, contactMethod, services, sphere, company, additionalInfo } = body;

        const message = `
🟢 Новая заявка (GreenByte Website):
👤 Имя: ${name || 'Не указано'}
📞 Телефон: ${phone || 'Не указано'}
✈️ Telegram: ${telegram || 'Не указано'}
📲 Способ связи: ${contactMethod}
🎯 Услуга: ${services || 'Не указано'}
🏢 Сфера: ${sphere || 'Не указано'}
🏢 Компания: ${company || 'Не указано'}
💬 Инфо: ${additionalInfo || 'Нет'}
        `.trim();

        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
            }),
        });

        if (!response.ok) {
            const errDetails = await response.text();
            console.error('Telegram API Error:', errDetails);
            return NextResponse.json({ success: false, error: errDetails }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error(error);
        const errorMsg = error instanceof Error ? error.message : 'Server Exception';
        return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
    }
}
