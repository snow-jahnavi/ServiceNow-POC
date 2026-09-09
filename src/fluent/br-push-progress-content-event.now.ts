import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['br-push-progress-content-event'],
    name: 'Push Progress Content Event to Kafka',
    table: 'sn_lxp_progress',
    when: 'after',
    action: ['update'],
    order: 100,
    active: true,
    filterCondition: 'content.type=on_demand^stateCHANGESTOenrolled^ORstateCHANGESTOcompleted^user.company=2f9b00b51b061c105b2699f4bd4bcb26^EQ',
    description:
        'Triggers when an on-demand progress record state changes to enrolled or completed for users from FutureX IT Ltd, and pushes a content event to Kafka via KafkaProducer.pushContentEvent.',
    script: Now.include('../server/business-rules/push-progress-content-event.js'),
})
