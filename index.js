// const _ = require('lodash')
const request = require('request');

module.exports = function(bp) {
  bp.middlewares.load()
  // const utterances = {
  //   good: /good|great|fine|ok|excellent|fantastic/i,
  //   bad: /bad|sad|not good|not great|bof/i,
  //   stop: /stop|cancel|abort/i
  // }

  // const variants = {
  //   feeling_good: () => _.sample(['Glad to hear that!', 'Fantastic!', 'Yay!']),
  //   feeling_bad: () => _.sample(['So sorry to hear that', ':('])
  // }

  bp.hear(/hi/i, (event) => {
    // bp.reply(event)
    let platform = event.platform

    event.reply('#welcome')
    // event.reply('#debug', { platform: platform})

    if (platform == 'facebook') {
      event.reply('#debug_facebook', {name: event.user.first_name})
    }
  })

  bp.hear(/bye|paalam/i, (event) => {
    let platform = event.platform
    if (platform == 'facebook') {
      event.reply('#bye_facebook', {name: event.user.first_name})
    }
    event.reply('#bye', { user: event.user.name })
  })


  // bp.hear(/good/i, (event, next) => {
  //   event.reply(event.user.id, variants.feeling_good)
  // })
  //
  // bp.hear(/bad/i, (event, next) => {
  //   event.reply(event.user.id, variants.feeling_bad)
  // })

  bp.hear({'rasa_nlu.intent.name': 'pay_bills'}, (event) => {
    event.reply('#pay_bills_start', { user: event.user.id})
  })

  bp.hear({'rasa_nlu.intent.name': 'pay_loans'}, (event) => {
    event.reply('#pay_loans', { user: event.user.id})
  })

  bp.hear({'rasa_nlu.intent.name': 'check_account'}, (event) => {
    event.reply("check_balance")

    request('http://www.mocky.io/v2/5ab0c0972e00006800e8b755', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });

  })


  bp.hear({'rasa_nlu.intent.name': 'check_balance'}, (event) => {

    event.reply('#check_balance_start')

    request('http://www.mocky.io/v2/5ab0d2272e0000080ae8b7aa?mocky-delay=100ms', function (error, response, body) {
      let account_list = JSON.parse(body).accounts;

      let primary_account = account_list[0]
      let secondary_account = account_list[1]
      let number_of_accounts = account_list.length


      if (!!number_of_accounts){
        event.reply('#account_list_summary', { number_of_accounts: number_of_accounts })
        event.reply('#check_balance', { account_type: primary_account.type,
                                        account_id: primary_account.account_name,
                                        balance: primary_account.balance})
      } else{
        event.reply('#check_account_failed')
      }
    });
  })

  bp.hear({'rasa_nlu.intent.name': 'transfer_credits'}, (event) => {
    // bp.reply(event.user.id, '#transfer_credits')
    event.reply('#transfer_credits')
  })


  bp.hear({'rasa_nlu.intent.name': 'leave'}, (event) => {
    event.reply('#bye')
  })
}
