const topics = {};
const buffer = {};
const hOP = topics.hasOwnProperty;
export function subscribe(topic, listener, me) {
      // Create the topic's object if not yet created
  if (!hOP.call(topics, topic)) topics[topic] = [];

    // Add the listener to queue
  const one = { l: listener, t: me };
  const index = topics[topic].push(one) - 1;

    // Provide handle back for removal of topic
  const buf = buffer[topic];
  if (buf) {
    listener.apply(me, buf);
    delete buffer[topic];
  }
  return function () {
    const one_topic = topics[topic];
    if (one_topic) {
      const i = one_topic.indexOf(one);
      if (i >= 0) { one_topic.splice(i, 1); }
      if (one_topic.length == 0) {
        delete topics[topic];
      }
    }
  };
}
export function publish(needBuffer, topic) {
  let begin = 2;
    // If the topic doesn't exist, or there's no listeners in queue, just leave
  if (typeof (needBuffer) === 'string') {
    topic = needBuffer;
		                                          needBuffer = false;
    begin = 1;
  }
  const args = Array.prototype.slice.call(arguments, begin);
  if (!hOP.call(topics, topic)) {
		                                          if (needBuffer) {
			                    buffer[topic] = args;
                                          }
		                                          return;
  }

    // Cycle through topics queue, fire!

  topics[topic].forEach((item) => {
    item.l.apply(item.t, args);
  });
}
