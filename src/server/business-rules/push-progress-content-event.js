(function executeRule(current, previous) {
    var kafkaProducer = new KafkaProducer();
    var operation = current.operation;
    kafkaProducer.pushContentEvent(current, operation);
})(current, previous);
