const _ = require('lodash')

module.exports = function(bp) {
  bp.middlewares.load()
  const utterances = {
    good: /good|great|fine|ok|excellent|fantastic/i,
    bad: /bad|sad|not good|not great|bof/i,
    stop: /stop|cancel|abort/i
  }

  const variants = {
    feeling_good: () => _.sample(['Glad to hear that!', 'Fantastic!', 'Yay!']),
    feeling_bad: () => _.sample(['So sorry to hear that', ':('])
  }

  bp.hear(/hi/i, (event) => {
    // bp.reply(event)
    let plat = event.platform
    event.reply('#debug', { platform: plat })
  })

  bp.hear(/good/i, (event, next) => {
    event.reply(event.user.id, variants.feeling_good)
  })

  bp.hear(/bad/i, (event, next) => {
    event.reply(event.user.id, variants.feeling_bad)
  })

  bp.hear({'rasa_nlu.intent.name': 'pay_bills'}, (event) => {
    bp.reply(event.user.id, '#pay_bills')
  })

  bp.hear({'rasa_nlu.intent.name': 'pay_loans'}, (event) => {
    bp.reply(event.user.id, '#pay_loans')
  })



  bp.hear({'rasa_nlu.intent.name': 'check_balance'}, (event) => {
    // bp.reply(event.user.id, '#check_balance')
    event.reply('#check_balance')
    // bp.messenger.sendText(event.user.id, '#check_balance')
  })

  bp.hear({'rasa_nlu.intent.name': 'transfer_credits'}, (event) => {
    // bp.reply(event.user.id, '#transfer_credits')
    event.reply('#transfer_credits')
  })
}
