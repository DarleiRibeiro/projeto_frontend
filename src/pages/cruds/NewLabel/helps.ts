import moment from "moment/moment";

export const validityMonth = [
    {
        amount: '1',
        dateFormat: `1 Mês, De ${moment().format('DD/MM/YY')} até ${moment().add(1, 'month').format('DD/MM/YY')}`
    },
    {
        amount: '2',
        dateFormat: `2 Mês, De ${moment().format('DD/MM/YY')} até ${moment().add(2, 'month').format('DD/MM/YY')}`
    },
    {
        amount: '3',
        dateFormat: `3 Mês, De ${moment().format('DD/MM/YY')} até ${moment().add(3, 'month').format('DD/MM/YY')}`
    },
]
