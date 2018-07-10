var maxOptions = {
  options: {
    methods: ['card', 'emoney', 'ibank', 'cash', 'sepa'],
    ibank: ['p24', 'platba24', 'raiffeisen', 'trustly'],
    emoney: ['paypal', 'qiwi', 'webmoney', 'yamoney'],
    cash: ['liqpay'],
    fast: ['p24', 'platba24', 'paypal', 'liqpay', 'qiwi'],
    cardIcons: ['mastercard', 'visa', 'mir', 'prostir', 'diners-club', 'american-express'],
    fields: true,
    title: 'my_title',
    link: 'https://fondy.eu',
    fullScreen: true,
    button: true,
    locales: ['ru', 'en', 'uk'],
    email: true,
    tooltip: true,
    apiDomain: 'api.fondy.eu',
    fee: true,
    //  css: 'bootstrap4' // bootstrap3 bootstrap4 foundation6
  },
  regular: {
    insert: true,
    open: true,
    hide: false,
    period: ['week', 'month']
  },
  recurring: {
    every: 2,
    period: 'month',
    amount: 100,
    end_time: '2020-11-14',
    start_time: '2018-11-11'
  },
  params: {
    merchant_id: 1396424,
//    verification_type: 'code',
//    required_rectoken: 'y',
//    verification: 'y',
    currency: 'UAH',
    amount: 500,
    order_desc: 'my_desc',
//    response_url: 'https://www.fondy.eu',
//    token: 'ca6b43549ceccdc764333ac8e05973aa4000ef50',
    email: 'asd@asd.asd',
    lang: 'ru',
    custom: {
      field_11: 'field_11_json_value',
      my_email: 'asd@asd.asd',
      field_5: 'asd123asd'
    },
  },
  messages: {
    ru: {
      field_11: 'field_11_ru',
      field_5: 'Номер договора',
      card_number: 'edit Номер карты',
      my_amount: 'Сума к оплате',
      my_email: 'Эл. адрес',
      my_title: 'Назначение платежа',
      my_desc: 'Благотворительная помощь (ребенку или отделению гематологии, или отделению плановой хирургии с онкологическими койками днепропетровской областной детской клинической больницы)'
    },
    en: {
      UAH: 'гривна',
      card_number_p: 'Card number',
      pay: 'Pay now {1} {0}',
      card_number: 'edit Card number',
      my_amount: 'Sum to pay',
      my_email: 'Email',
      my_title: 'Purpose of payment',
      my_desc: 'Charitable assistance (to a child or a department of hematology, or to a department of planned surgery with oncological beds of the Dnipropetrovsk regional children\'s clinical hospital)'
    },
    uk: {
      my_amount: 'Сума до оплати',
      my_email: 'електронна пошта',
      my_title: 'Назначення платежа',
      my_desc: 'Благодійна допомога (дитині або відділенню гематології, або відділенню планової хірургії з онкологічними ліжками дніпропетровської обласної дитячої клінічної лікарні)'
    }
  },
  validate: {
    ru: {
      credit_card: function (field) {
        return 'edit Поле ' + field + ' должно быть действительным номером карты'
      }
    },
    uk: {
      credit_card: function (field) {
        return 'edit Поле ' + field + ' має бути дійсним номером карти'
      }
    }
  }
}

var minOptions = {
  options: {
    fullScreen: true,
    fee: true,
  },
  params: {
    merchant_id: 1396424,
//    lang: 'ru',
    order_desc: 'Тестовый платеж',
//    verification_type: 'code',
//    required_rectoken: 'y',
//    verification: 'y',
//    token: 'ea28f1fa0dee99204a9d89fde75b55aa1a121e51'
  }
}
fondy('#app', maxOptions)