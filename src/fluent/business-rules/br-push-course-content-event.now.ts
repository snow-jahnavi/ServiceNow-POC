import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['br-push-course-content-event'],
    name: 'Push Course Content Event to Kafka',
    table: 'sn_lxp_course',
    when: 'after',
    action: ['update'],
    order: 100,
    active: true,
    filterCondition: 'stateCHANGESTOpublished^ORstateCHANGESTOretired^type=on_demand^EQ',
    description:
        'Triggers when an on-demand course state changes to published or retired, and pushes a content event to Kafka via KafkaProducer.pushContentEvent.',
    script: Now.include('../../server/business-rules/push-course-content-event.js'),
})
