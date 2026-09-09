var KafkaProducer = Class.create()
KafkaProducer.prototype = {
    initialize: function () {},

    /**
     * Generic method to push data to Kafka using UniversalProfileKafkaUtils.
     * @param {string} topic - The Kafka topic name.
     * @param {string} payload - The message payload (JSON string).
     * @param {string} operation - The operation type (e.g. "insert", "update").
     * @param {string} injectCorrelationId - The correlation ID for tracing.
     * @param {string} state - The state value.
     * @returns {boolean} true if the message was enqueued successfully, false otherwise.
     */
    pushToKafka: function (topic, payload, operation, injectCorrelationId) {
        try {
            var kafkaUtils = new global.UniversalProfileKafkaUtils()
            kafkaUtils.insertKafkaOutboundQueue(topic, payload, operation, injectCorrelationId)
            gs.info('KafkaProducer: Successfully enqueued message to topic [' + topic + '] with operation [' + operation + '] and correlationId [' + injectCorrelationId + ']')
            return true
        } catch (e) {
            gs.error('KafkaProducer: Failed to enqueue message to topic [' + topic + ']. Error: ' + e.message)
            return false
        }
    },

    /**
     * Push a content event to the "snu.content.event" Kafka topic.
     * @param {GlideRecord} gr - The GlideRecord to extract data from.
     * @param {string} operation - The operation type ("insert" or "update").
     * @returns {boolean} true if the message was enqueued successfully, false otherwise.
     */
    pushContentEvent: function (gr, operation, correlationId) {
        var payload = JSON.stringify({ sys_id: gr.getUniqueValue() })
        var correlationId = gr.getValue('content_id')
        return this.pushToKafka('snu.content.event', payload, operation, correlationId)
    },

    /**
     * Push a user event to the "snu.user.events" Kafka topic.
     * @param {GlideRecord} gr - The GlideRecord to extract data from.
     * @param {string} operation - The operation type ("insert" or "update").
     * @returns {boolean} true if the message was enqueued successfully, false otherwise.
     */
    pushUserEvent: function (gr, operation, correlationId) {
        var payload = JSON.stringify({ sys_id: gr.getUniqueValue() })
        var correlationId = gr.getValue('user')
        return this.pushToKafka('snu.user.events', payload, operation, correlationId)
    },

    type: 'KafkaProducer',
}
