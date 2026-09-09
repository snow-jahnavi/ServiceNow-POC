var KafkaProducer = Class.create();
KafkaProducer.prototype = {
    initialize: function () {},

    /**
     * Generic method to push data to Kafka using UniversalProfileKafkaUtils.
     * @param {string} topic - The Kafka topic name.
     * @param {string} key - The message key.
     * @param {object|string} value - The message payload (will be stringified if an object).
     * @returns {boolean} true if the message was enqueued successfully, false otherwise.
     */
    pushToKafka: function (topic, key, value) {
        try {
            var payload = typeof value === 'object' ? JSON.stringify(value) : value
            var kafkaUtils = new global.UniversalProfileKafkaUtils()
            kafkaUtils.insertKafkaOutboundQueue(topic, key, payload)
            gs.info('KafkaProducer: Successfully enqueued message to topic [' + topic + '] with key [' + key + ']')
            return true
        } catch (e) {
            gs.error('KafkaProducer: Failed to enqueue message to topic [' + topic + ']. Error: ' + e.message)
            return false
        }
    },

    /**
     * Push a content event to the "snu.content.event" Kafka topic.
     * @param {string} key - The message key.
     * @param {object|string} value - The message payload.
     * @returns {boolean} true if the message was enqueued successfully, false otherwise.
     */
    pushContentEvent: function (key, value) {
        return this.pushToKafka('snu.content.event', key, value)
    },

    /**
     * Push a user event to the "snu.user.events" Kafka topic.
     * @param {string} key - The message key.
     * @param {object|string} value - The message payload.
     * @returns {boolean} true if the message was enqueued successfully, false otherwise.
     */
    pushUserEvent: function (key, value) {
        return this.pushToKafka('snu.user.events', key, value)
    },

    type: 'KafkaProducer',
};
