/* eslint-disable no-useless-escape */
export default {
    greeting: `*Привет, \${name}*`,

    wizardRescheduleAppointment: {
        actions: {
            date: 'Выбери запись которую хочешь изменить',
            done: `✅ Время встречи изменено на *\${date} в \${time}(МСК)*. `,
            noEvents: 'У тебя нет записей',
            noTime: 'Нет времени для записи'
        }
    },

    wizardGetAppointment: {
        intro: `Для записи нажми кнопку Записаться`,
        actions: {
            name:
                'Напиши свое имя и фамилию',
            date: 'Выбери дату и время встречи',
            time: `Выбери время встречи`,
            contact: `У тебя не указан username, поделись контактом`,
            done: `✅ Ты записан на встречу *\${date} в \${time}(МСК)*. `,
        },
        menu: {
            getAppointment: 'Записаться',
            rescheduleAppointment: 'Изменить запись'
        },
    }
};
