
module.exports = function(bp) {
  bp.middlewares.load()
  bp.hear({
    type: 'postback',
    text: 'GET_STARTED'
  }, event => {
    bp.messenger.sendText(event.user.id, 'Say you loasdad mad lkamsdkla ds makmdakdmaskd masdlk masdm ')
  })

 var regex = /remind me to (.+)/

 bp.hear({
   text: regex
 }, event => {
   var matches = regex.exec(event.text)

   bp.db.kvs.get('reminders').then(reminders => {
     if (!reminders) {
       reminders = []
     }

     var reminder = matches[1]
     bp.messenger.sendText(event.user.id, "i'll remind you to " + reminder)
     reminders.push(reminder)
     bp.db.kvs.set('reminders', reminders)
   })


 })

 bp.hear({
   text: 'tasks'
 }, event => {
   // var list = bp.db.kvs.get('reminders')
   bp.db.kvs.get('reminders').then(reminders => {

     if (!reminders) {
       reminders = []
       bp.messenger.sendText(event.user.id, "No Reminders for today:")
     }else{
       bp.messenger.sendText(event.user.id, "Reminders for today:")
     }

     reminders.forEach( function(reminder) {
      bp.messenger.sendText(event.user.id, reminder, {waitDelivery: true})
     })

   })

 })

 bp.hear({
   text: 'delete tasks'
 }, event => {
   bp.db.kvs.set('reminders', null).then(reminders => {
     bp.messenger.sendText(event.user.id, "Deleting reminders", {waitDelivery: true})
   })
 })

  bp.hear({
    type: 'message',
    text: 'helloworld'},
    // text: /.+/},
    event => {
      // bp.messenger.sendText(event.user.id, event.text)
      event.reply('#welcome')
    }
  )

  // bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
  //   event.reply('#welcome') // See the file `content.yml` to see the block
  // })

  // You can also pass a matcher object to better filter events
  // bp.hear({
  //   type: /message|text/i,
  //   text: /exit|bye|goodbye|quit|done|leave|stop/i
  // }, (event, next) => {
  //   event.reply('#goodbye', {
  //     // You can pass data to the UMM bloc!
  //     reason: 'unknown'
  //   })
  // })
}
