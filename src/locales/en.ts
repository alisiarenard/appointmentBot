/* eslint-disable no-useless-escape */
export default {
    greeting: `*Привет, \${name}*`,

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
        },
    }
};
