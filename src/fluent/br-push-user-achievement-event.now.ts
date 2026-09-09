import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['br-push-user-achievement-event'],
    name: 'Push User Achievement Event to Kafka',
    table: 'sn_lxp_user_achievement',
    when: 'after',
    action: ['update'],
    order: 100,
    active: true,
    filterCondition: 'achievement.type=certification^statusVALCHANGES^user.company=2f9b00b51b061c105b2699f4bd4bcb26^EQ',
    description:
        'Triggers when status changes on a user achievement record where the achievement type is certification, and pushes a content event to Kafka via KafkaProducer.pushContentEvent.',
    script: Now.include('../server/business-rules/push-user-achievement-event.js'),
})
