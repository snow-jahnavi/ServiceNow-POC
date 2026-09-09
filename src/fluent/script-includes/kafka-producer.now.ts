import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['KafkaProducer'],
    name: 'KafkaProducer',
    script: Now.include('../../server/script-includes/kafka-producer.js'),
    description:
        'Generic Kafka producer utility that pushes data to Kafka topics via UniversalProfileKafkaUtils.insertKafkaOutboundQueue. Provides topic-specific helpers for snu.content.event and snu.user.events.',
    active: true,
    accessibleFrom: 'public',
})
