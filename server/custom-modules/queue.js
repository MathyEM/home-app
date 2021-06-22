function Queue(id) {
	this.id = id
	this.running = false
	this.elements = []
}

// Add element to queue
Queue.prototype.enqueue = function(e) {
	this.elements.push(e)
}

// Remove element from the front of the queue
Queue.prototype.dequeue = function() {
	return this.elements.shift()
}

// Check if the queue is empty
Queue.prototype.isEmpty = function() {
	return this.elements.length == 0
}

// Get the element at the front of the queue - without modifying it
Queue.prototype.peek = function() {
	return !this.isEmpty() ? this.elements[0] : undefined;
}

Queue.prototype.length = function() {
	return this.elements.length
}

global.UPDATE_TODO_QUEUE = []

module.exports = {
	Queue
}